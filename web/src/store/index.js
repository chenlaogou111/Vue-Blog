import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFighting: true
  },
  mutations: {
    toggleFighting(state) {
      state.isFighting = !state.isFighting;
    }
  }
})