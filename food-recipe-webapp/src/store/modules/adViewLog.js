import { METHOD, sendRequest } from '@/api/config'
import { AD } from '@/api/endpoint'
import { pickBy } from 'lodash'

const DEFAULT_LIST_QUERY = {
  page: 1,
  limit: 10,
  adId: null,
  recipeId: null
}

const state = {
  list: {
    query: Object.assign({}, DEFAULT_LIST_QUERY),
    total: 0,
    items: []
  },
  ui: {
    containerLoading: true,
    listLoading: false,
    commandLoading: false,
    visibleFormDialog: false,
    visibleDeleteDialog: false
  }
}

const mutations = {
  SET_UI_CONTAINER_LOADING: (state, value) => { state.ui.containerLoading = value },
  SET_UI_LIST_LOADING: (state, value) => { state.ui.listLoading = value },
  SET_UI_COMMAND_LOADING: (state, value) => { state.ui.commandLoading = value },
  SET_UI_VISIBLE_FORM_DIALOG: (state, value) => { state.ui.visibleFormDialog = value },
  SET_UI_VISIBLE_DELETE_DIALOG: (state, value) => { state.ui.visibleDeleteDialog = value },

  RESET_LIST_QUERY: (state) => { state.list.query = Object.assign({}, DEFAULT_LIST_QUERY) },
  SET_LIST_QUERY_AD_ID: (state, value) => { state.list.query.adId = value },
  SET_LIST_QUERY_RECIPE_ID: (state, value) => { state.list.query.recipeId = value },
  SET_LIST_QUERY_PAGE: (state, value) => { state.list.query.page = value },
  SET_LIST_QUERY_LIMIT: (state, value) => { state.list.query.limit = value },

  SET_LIST_TOTAL: (state, value) => { state.list.total = value },
  SET_LIST_ITEMS: (state, value) => { state.list.items = value }
}

const actions = {
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, AD.AD_VIEW_LOG, pickBy(state.list.query))
        .then(res => {
          const { data } = res
          const { total, items } = data
          commit('SET_LIST_ITEMS', items)
          commit('SET_LIST_TOTAL', total)
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
