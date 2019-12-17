<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="secondary"
      class="elevation-2"
      dark
      centered
      grow
      :prev-icon="'mdi-arrow-left-bold-box-outline'"
      :next-icon="'mdi-arrow-right-bold-box-outline'"
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="'#tab-1'" dark>
        選單位
        <v-icon>mdi-check-circle</v-icon>
      </v-tab>

      <v-tab-item :value="'tab-1'">
        <v-card flat tile>
          <v-card-text>
            <h3>過濾字尾</h3>
            <p>點選切換要顯示的字尾，不影響課表篩選。</p>
            <div>
              <v-chip
                @click="p.check=!p.check"
                :color="p.check?'success':''"
                class="ma-1"
                v-for="(p, pi) in content.postfixes"
                :key="'p-'+pi"
              >{{p.name}}</v-chip>
            </div>
            <br />
            <v-divider></v-divider>
            <br />
            <h3>過濾系統</h3>
            <p>選取想要出現在課表內的課程系統。</p>
            <v-layout wrap>
              <v-flex
                class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                v-for="(cat, ci) in content.cats_list"
                :key="ci"
              >
                <h1>{{cat.name}}</h1>
                <br />
                <div>
                  <v-chip
                    @click="u.check=!u.check"
                    :color="u.check?'success':''"
                    class="ma-1"
                    v-for="(u, i) in cat.units.filter(x=>x.postfix.check)"
                    :key="i"
                  >{{u.name}}</v-chip>
                </div>
                <br />
                <v-divider></v-divider>
                <br />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab :href="'#tab-2'" dark>
        過濾班級
        <v-icon>mdi-account</v-icon>
      </v-tab>

      <v-tab-item :value="'tab-2'">
        <v-card>
          <v-card-text>
            <h3>過濾班級</h3>
            <p>依據班級過濾課表</p>
            <v-btn text small @click="content.classes.map(x=>x.check=true)">全選</v-btn>
            <v-btn text small @click="content.classes.map(x=>x.check=false)">全不選</v-btn>

            <v-layout wrap>
              <template v-for="(classlabel, cci) in content.classlabels ">
                <v-flex
                  class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                  v-if="content.classes.some(x=>x.show&&x.class==classlabel)"
                  :key="cci"
                >
                  <div>
                    <h3>
                      {{classlabel}}
                      <v-btn
                        text
                        small
                        @click="content.classes.filter(x=>x.class==classlabel).map(x=>x.check=true)"
                      >全選{{classlabel}}</v-btn>
                      <v-btn
                        text
                        small
                        @click="content.classes.filter(x=>x.class==classlabel).map(x=>x.check=false)"
                      >不選{{classlabel}}</v-btn>
                    </h3>
                    <div>
                      <template v-for="(c, i) in content.classes.filter(x=>x.show)">
                        <v-chip
                          v-if="c.class==classlabel"
                          @click="c.check=!c.check"
                          :color="c.check?'success':''"
                          class="ma-1"
                          :key="i"
                        >{{c.name}}</v-chip>
                      </template>
                    </div>
                    <br />
                    <v-divider></v-divider>
                  </div>
                </v-flex>
              </template>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab :href="'#tab-3'" dark>
        看課表
        <v-icon>mdi-table</v-icon>
      </v-tab>

      <v-tab-item :value="'tab-3'">
        <v-tabs
          v-model="tab2"
          background-color="success"
          class="elevation-2"
          centered
          :prev-icon="'mdi-arrow-left'"
          :next-icon="'mdi-arrow-right'"
          show-arrows
          fixed-tabs
        >
          <v-tab
            v-for="i in [0,1,2,3,4,5,6].filter(x=>filteredCourses.courses.some(y=>y.time.day==x&&y.class.some(x=>x.check)))"
            :href="'#tab2-'+i"
            :key="i"
          >
            {{['日','一','二','三','四','五','六'][i]}}
            <v-icon
              v-if="filteredCourses.courses.some(x=>x.time.day==i&&x.content.id==selectId)"
            >mdi-star</v-icon>
          </v-tab>

          <v-tab-item v-for="i in [0,1,2,3,4,5,6]" :value="'tab2-'+i" :key="i">
            <div v-for="(time,ti) in filteredCourses[i]" :key="ti">
              <v-card-title>第 {{time.time}} 節</v-card-title>
              <v-layout wrap>
                <template v-for="(course, ci) in time.courses">
                  <v-flex
                    v-if="course.class.some(x=>x.check)"
                    class="col-xs-12 col-sm-6 col-lg-3 col-xl-2"
                    :key="ci"
                  >
                    <v-card
                      :color="selectId==course.content.id?'success':hoverId==course.content.id?'grey lighten-3':''"
                      @mouseover="hoverId=course.content.id"
                      @click="selectId=course.content.id==selectId?null:course.content.id"
                    >
                      <v-card-text
                        :class="{
                        'white--text': selectId==course.content.id
                      }"
                      >
                        <h3>{{course.content.id}}-{{course.name}}-{{course.content.need.split(' ')[0]}}</h3>
                        <p>{{course.content.classname}} - {{course.content.teacher}} - {{course.content.classroom}}</p>
                        <p>{{course.content.other}} - {{course.content.need.split(' ')[1]}}</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </div>
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import content from "./allcontent";

export default {
  name: "Main",
  data() {
    return {
      tab: null,
      tab2: null,
      content,
      selectId: null,
      hoverId: null
    };
  },
  computed: {
    filteredCourses: content.filteredCourses
  }
};
</script>

<style scoped>
</style>