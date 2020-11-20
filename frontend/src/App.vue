<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-4"
      dark
    >
      <div class="d-flex align-center">
        <h1>Enotes</h1>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main';
//import Login from './views/login'

export default {
  name: 'App',

  components: {
    Main,
    //Login,
  },

  data: () => ({
    //
  }),
};
</script>
