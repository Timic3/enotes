import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export default new Vuex.Store({
  state,
  mutations: {
    logIn(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    logOut(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, user) {
      const response = await axios.post('http://localhost:15000/authentication/login', {
        username: user.username,
        password: user.password,
      });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        commit('logIn', response.data.user);
      }
      return response.data;
    },
    async register({ commit }, user) {
      const response = await axios.post('http://localhost:15000/authentication/register', {
        username: user.username,
        email: user.email,
        password: user.password,
        captcha: user.captcha
      });
      return response.data;
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('logOut');
    },
  },
  modules: {
  }
})
