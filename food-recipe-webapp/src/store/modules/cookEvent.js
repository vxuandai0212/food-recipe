import { METHOD, sendRequest } from '@/api/config'
import { COOK_EVENT } from '@/api/endpoint'
import { pickBy } from 'lodash'

const DEFAULT_FORM = {
  id: null,
  name: ''
}

const DEFAULT_LIST_QUERY = {
  page: 1,
  limit: 10,
  searchKeyword: ''
}

const state = {
  list: {
    query: Object.assign({}, DEFAULT_LIST_QUERY),
    total: 0,
    items: []
  },
  form: Object.assign({}, DEFAULT_FORM),
  detail: {
    item: null
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

  SET_LIST_QUERY_SEARCH_KEYWORD: (state, value) => { state.list.query.searchKeyword = value },
  RESET_LIST_QUERY: (state) => { state.list.query = Object.assign({}, DEFAULT_LIST_QUERY) },
  SET_LIST_QUERY_PAGE: (state, value) => { state.list.query.page = value },
  SET_LIST_QUERY_LIMIT: (state, value) => { state.list.query.limit = value },

  SET_LIST_TOTAL: (state, value) => { state.list.total = value },
  SET_LIST_ITEMS: (state, value) => { state.list.items = value },

  SET_DETAIL_ITEM: (state, value) => { state.detail.item = value },

  RESET_FORM: (state) => { state.form = Object.assign({}, DEFAULT_FORM) },
  SET_FORM: (state, value) => { state.form = Object.assign({}, value) },
  SET_FORM_NAME: (state, value) => { state.form.name = value }
}

const actions = {
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, COOK_EVENT.GET_ALL, pickBy(state.list.query))
        .then(res => {
          const { data } = res
          const { total, items } = data
          commit('SET_LIST_ITEMS', items)
          commit('SET_LIST_TOTAL', total)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  upsert(context, payload) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, COOK_EVENT.UPSERT, payload)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  delete(context, ids) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, COOK_EVENT.DELETE, { ids })
        .then(res => resolve(res))
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
