const state = () => ({
  sidebarUnauthenticatedUser: [
    {
      faIconType: 'fas',
      faIcon: 'faHome',
      title: 'Liste des jeux',
      class: 'primary--text',
      to: '/game-list',
    },
    {
      faIconType: 'fas',
      faIcon: 'faHome',
      title: 'Liste de GM',
      class: 'primary--text',
      to: '/game-master-list',
    },
    {
      faIconType: 'fas',
      faIcon: 'faHome',
      title: 'A propos',
      to: '/inspirep',
      class: 'primary--text',
    },
  ],
  sidebarUser: [
    {
      faIconType: 'fas',
      faIcon: 'user',
      title: 'Mes informations',
      to: '/users/id',
      class: 'primary--text',
    },
    {
      faIconType: 'fas',
      faIcon: 'lightbulb',
      title: 'Inspire1',
      class: 'primary--text',
    },
    {
      faIconType: 'fas',
      faIcon: 'lightbulb',
      title: 'locations',
      class: 'primary--text',
      to: '/users/locations',
    },
    {
      faIconType: 'fas',
      faIcon: 'message',
      title: 'Mes messages',
      class: 'primary--text',
      to: '/users/message',
    },
    {
      faIconType: 'fas',
      faIcon: 'horse-head',
      title: 'A propos',
      class: 'primary--text',
    },
  ],
})
const getters = {
  getSidebarUser(state) {
    return state.sidebarUser
  },
  getSidebarUnauthenticatedUser(state) {
    return state.sidebarUnauthenticatedUser
  },
}

const mutations = {
  SET_SIDEBAR_USER(state, newItems) {
    state.sidebarUser = newItems
  },
  SET_SIDEBAR_UNAUTHENTICATION_USER(state, newItems) {
    state.sidebarUnauthenticatedUser = newItems
  },
}

const actions = {
  setSidebarUser({ commit }, newItems) {
    commit('SET_SIDEBAR_USER', newItems)
  },
  setSidebarUnauthenticationUser({ commit }, newItems) {
    commit('SET_SIDEBAR_UNAUTHENTICATION_USER', newItems)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
