const state = () => ({
  showSignUpModal: false,
  showSignInModal: false,
  showForgotPasswordModal: false,
})
const getters = {
  getShowSignUpModal(state) {
    return state.showSignUpModal
  },
  getShowSignInModal(state) {
    return state.showSignInModal
  },
  getShowForgotPasswordModal(state) {
    return state.showForgotPasswordModal
  },
}
const mutations = {
  SET_SHOW_SIGN_UP_MODAL(state, payload) {
    state.showSignUpModal = payload
  },
  SET_SHOW_SIGN_IN_MODAL(state, payload) {
    state.showSignInModal = payload
  },
  SET_SHOW_FORGOT_PASSWORD(state, payload) {
    state.showForgotPasswordModal = payload
  },
}
const actions = {
  setShowSignUpModal({ commit }, payload) {
    commit('SET_SHOW_SIGN_UP_MODAL', payload)
  },
  setShowSignInModal({ commit }, payload) {
    commit('SET_SHOW_SIGN_IN_MODAL', payload)
  },
  setShowForgotPasswordModal({ commit }, payload) {
    commit('SET_SHOW_FORGOT_PASSWORD', payload)
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
