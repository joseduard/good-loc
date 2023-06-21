const state = () => ({
  user: [],
  showAddGameModal: false,
})
const getters = {
  getUser(state) {
    return state.user
  },
  getShowAddGameModal(state) {
    return state.showAddGameModal
  },
}

const mutations = {
  SET_USER(state, user) {
    state.messagesList = user
  },
  SET_SHOW_ADD_GAME(state, payload) {
    state.showAddGameModal = payload
  },
}

const actions = {
  // get message by id
  setShowAddGameModal({ commit }, payload) {
    commit('SET_SHOW_ADD_GAME', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
