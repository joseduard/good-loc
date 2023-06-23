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
    return this.$axios
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
    return this.$axios
      .get(`api/user/account/message/list/${userId}`)
      .then((response) => {
        commit('SET_MESSAGES_LIST', response)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },


  postMessageCreate({ commit }, message) {
    return this.$axios
      .post('api/user/account/message/create', message)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  deleteMessage({ commit }, messageToDelete) {
    return this.$axios
    .delete(`api/user/account/message?` + `messageId=` + messageToDelete.messageId + `&` + `userId=`+ messageToDelete.userId)
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



