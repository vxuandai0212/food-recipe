const DEFAULT_LIST_QUERY = {
  page: 1,
  limit: 10,
  searchKeyword: '',
  type: null,
  from: null,
  to: null
}

const state = {
  list: {
    query: Object.assign({}, DEFAULT_LIST_QUERY),
    total: 0,
    items: [],
    sum: 0
  },
  ui: {
    containerLoading: true,
    listLoading: false
  }
}

const mutations = {
  SET_UI_CONTAINER_LOADING: (state, value) => { state.ui.containerLoading = value },
  SET_UI_LIST_LOADING: (state, value) => { state.ui.listLoading = value },

  RESET_LIST_QUERY: (state) => { state.list.query = Object.assign({}, DEFAULT_LIST_QUERY) },
  SET_LIST_QUERY_SEARCH_KEYWORD: (state, value) => { state.list.query.searchKeyword = value },
  SET_LIST_QUERY_PAGE: (state, value) => { state.list.query.page = value },
  SET_LIST_QUERY_LIMIT: (state, value) => { state.list.query.limit = value },
  SET_LIST_QUERY_TYPE: (state, value) => { state.list.query.type = value },
  SET_LIST_QUERY_FROM: (state, value) => { state.list.query.from = value },
  SET_LIST_QUERY_TO: (state, value) => { state.list.query.to = value },

  SET_LIST_TOTAL: (state, value) => { state.list.total = value },
  SET_LIST_ITEMS: (state, value) => { state.list.items = value },
  SET_LIST_SUM: (state, value) => { state.list.sum = value }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
