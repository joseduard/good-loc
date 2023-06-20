const state = () => ({
  games: [],
})

const getters = {
  getGamesList(state) {
    return state.games
  },
}
const mutations = {
  SET_GAMES_LIST(state, games) {
    state.games = games
  },
}
// const actions = {
//   async fetchGames({ commit }) {
//     try {
//       const response = await this.$axios.get('/games')
//       commit('SET_GAMES_LIST', response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
const actions = {
  setGamesList({ commit }) {
    this.$axios
      .get('/games')
      .then((response) => {
        commit('SET_GAMES_LIST', response)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
