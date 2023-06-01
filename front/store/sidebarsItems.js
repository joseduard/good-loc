const state = () => ({
  sidebarUnauthenticatedUser: [
    {
      icon: 'mdi-chart-bubble',
      title: 'Liste des jeux',
      to: '/game-list',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Liste de GM',
      to: '/game-master-list',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'A propos',
      to: '/inspirep',
    },
  ],
  sidebarUser: [
    {
      icon: 'mdi-chart-bubble',
      title: 'Mes informations',
      to: '/',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire1',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire2',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire3',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'A propos',
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
