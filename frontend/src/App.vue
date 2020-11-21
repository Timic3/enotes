<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-4"
      dark
    >
      <div class="d-flex align-center">
        <h1>ENotes</h1>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    //
  },

  data: () => ({
    //
  }),
};
</script>
