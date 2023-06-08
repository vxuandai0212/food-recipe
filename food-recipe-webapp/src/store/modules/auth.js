const state = {
  authorizing: false
}

const mutations = {
  SET_AUTHORIZING: (state, value) => {
    state.authorizing = value
  }
}

const actions = {
  setAuthorizing({ commit }, value) {
    commit('SET_AUTHORIZING', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
