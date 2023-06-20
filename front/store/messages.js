const state = () => ({
  messagesList: [],
  message: null,
})
const getters = {
  getMessagesList(state) {
    return state.messagesList
  },
  getMessage(state) {
    return state.message
  },
}

const mutations = {
  SET_MESSAGES_LIST(state, messagesList) {
    state.messagesList = messagesList
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
}

const actions = {
  // get message by id
  setMessageById({ commit }, messageId) {
    this.$axios
      .get(`/user/account/message/${messageId}`)
      .then((response) => {
        commit('SET_MESSAGE', response)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // get all messages
  setMessagesList({ commit }, userId) {
    this.$axios
      .get(`/user/account/message/list/${userId}`)
      .then((response) => {
        commit('SET_MESSAGES_LIST', response)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  postMessageCreate({ commit }, message) {
    this.$axios
      .post('/user/account/message/create', message)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  deleteMessage({ commit }, messageId) {
    this.$axios
      .delete(`/user/account/message`, messageId)
      .then((response) => {
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
