import { METHOD, sendRequest } from '@/api/config'
import { STAT } from '@/api/endpoint'

const state = {
  list: {
    items: []
  },
  ui: {
    containerLoading: true,
    listLoading: false
  }
}

const mutations = {
  SET_UI_CONTAINER_LOADING: (state, value) => { state.ui.containerLoading = value },
  SET_UI_LIST_LOADING: (state, value) => { state.ui.listLoading = value },

  SET_LIST_ITEMS: (state, value) => { state.list.items = value }
}

const actions = {
  // eslint-disable-next-line
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, STAT.OVERVIEW, {})
        .then(res => {
          const { data } = res
          commit('SET_LIST_ITEMS', data)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
