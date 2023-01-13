import { createStore, createLogger } from 'vuex'

import axios from 'axios'

type TPackage = {
  type: string
  name: string
  hits: number
  bandwidth: number
}

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    packages: [] as TPackage[],
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
