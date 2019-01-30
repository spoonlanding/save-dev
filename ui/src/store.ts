import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

const API_ENDPOINT = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/analyzePackage?pkg=';

export default new Vuex.Store({
  state: {
    pkg: {
      name: '',
      isDev: null
    }
  },
  mutations: {
    updatePkg(state, payload) {
      state.pkg = payload.pkg;
    },
  },
  actions: {
    search({ commit }, payload) {
      axios.get(`${API_ENDPOINT}${payload.query}`)
        .then(res => {
          commit({
            type: 'updatePkg',
            pkg: res.data,
          });
        })
        .catch(console.log)
    },
  },
});
