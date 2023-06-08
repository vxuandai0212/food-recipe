import { METHOD, sendRequest } from '@/api/config'
import { VIEW } from '@/api/endpoint'
import { pickBy } from 'lodash'

const DEFAULT_TO_DATE = new Date().getTime()
const DEFAULT_FROM_DATE = DEFAULT_TO_DATE - 300000

const DEFAULT_LIST_QUERY = {
  page: 1,
  limit: 10,
  fromDate: DEFAULT_FROM_DATE,
  toDate: DEFAULT_TO_DATE
}

const state = {
  list: {
    query: Object.assign({}, DEFAULT_LIST_QUERY),
    total: 0,
    view: 0,
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
  SET_LIST_QUERY_PAGE: (state, value) => { state.list.query.page = value },
  SET_LIST_QUERY_LIMIT: (state, value) => { state.list.query.limit = value },
  SET_LIST_QUERY_FROM_DATE: (state, value) => { state.list.query.fromDate = value },
  SET_LIST_QUERY_TO_DATE: (state, value) => { state.list.query.toDate = value },

  SET_LIST_TOTAL: (state, value) => { state.list.total = value },
  SET_LIST_VIEW: (state, value) => { state.list.view = value },
  SET_LIST_ITEMS: (state, value) => { state.list.items = value }
}

const actions = {
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, VIEW.ADMOB_VIEW, pickBy(state.list.query))
        .then(res => {
          const { data } = res
          const { totalView, totalRecipe, items } = data
          commit('SET_LIST_ITEMS', items)
          commit('SET_LIST_TOTAL', totalRecipe)
          commit('SET_LIST_VIEW', totalView)
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
