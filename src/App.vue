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
