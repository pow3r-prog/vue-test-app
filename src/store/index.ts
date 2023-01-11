import { createStore, createLogger } from 'vuex'

import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    packages: [],
  },
  getters: {
    getPackages: (state) => state.packages,
  },
  actions: {
    async fetchPackages({ commit }) {
      try {
        const data = await axios.get(
          'https://data.jsdelivr.com/v1/stats/packages'
        )
        commit('SET_PACKAGES', data.data)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
  mutations: {
    SET_PACKAGES(state, packages) {
      state.packages = packages
    },
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
