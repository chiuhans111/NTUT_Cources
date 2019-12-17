<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-btn icon>
        <v-icon>mdi-book</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <h1>北科課表 108</h1>
      </div>
    </v-app-bar>

    <v-content>
      <allcontent></allcontent>
    </v-content>
    <v-card>
      <v-card-text>
        本系統純屬休閒開發，不保證資訊正確性。
        <v-btn
          
          text
          href="https://github.com/chiuhans111/NTUT_Cources"
        > GitHub 專案頁</v-btn>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import allcontent from "./components/allcontent.vue";

export default {
  name: "App",

  components: {
    allcontent
  },

  data: () => ({
    //
  })
};
</script>
