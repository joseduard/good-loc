const state = () => ({
  messagesList: [{ id: null, sender_id: null, receiver_id: null, content: null, created_at: null, updated_at:null,pseudo:null}],
 pseudo: [],
 img:[],
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
  SET_MESSAGES_LIST_PSEUDO(state, pseudo) {
    state.pseudo.push(pseudo.pseudo)
  },
  SET_MESSAGES_LIST_IMG(state, img) {

    state.img.push(img)
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
    const test = []
    return this.$axios
      .get(`api/user/account/message/list/${userId}`)
      .then(async (response) => {
        await
        response.data.forEach((element,index) => {
          this.$axios.get(`api/user/${element.sender_id}`)
      .then((res) => {
        // element.splice(0,0,{'user': res.data.pseudo})
        test.pseudo=res.data.pseudo
        test.index=index
        const img=res.data.img
        commit('SET_MESSAGES_LIST_PSEUDO', test)
        commit('SET_MESSAGES_LIST_IMG', img)
      })
        }) 
        commit('SET_MESSAGES_LIST', response.data)
        return Promise.resolve(response)
      .catch((error) => {
        return Promise.reject(error)
      })})
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
