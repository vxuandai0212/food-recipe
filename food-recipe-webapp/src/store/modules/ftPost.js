import { METHOD, sendRequest } from '@/api/config'
import { FT_POST } from '@/api/endpoint'
import { pickBy } from 'lodash'

const DEFAULT_FORM = {
  id: null,
  title: '',
  categoryId: null,
  subCategoryId: null,
  rawContent: null,
  content: null
}

const DEFAULT_LIST_QUERY = {
  page: 1,
  limit: 10,
  searchKeyword: '',
  categoryId: null,
  subCategoryId: null
}

const DEFAULT_DETAIL_ITEM = {
  id: null,
  title: '',
  categoryId: null,
  subCategoryId: null,
  rawContent: null,
  content: null,
  image: null
}

const state = {
  list: {
    query: Object.assign({}, DEFAULT_LIST_QUERY),
    total: 0,
    items: []
  },
  form: Object.assign({}, DEFAULT_FORM),
  detail: {
    item: Object.assign({}, DEFAULT_DETAIL_ITEM)
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
  SET_LIST_QUERY_SEARCH_KEYWORD: (state, value) => { state.list.query.searchKeyword = value },
  SET_LIST_QUERY_CATEGORY_ID: (state, value) => { state.list.query.categoryId = value },
  SET_LIST_QUERY_SUB_CATEGORY_ID: (state, value) => { state.list.query.subCategoryId = value },
  SET_LIST_QUERY_PAGE: (state, value) => { state.list.query.page = value },
  SET_LIST_QUERY_LIMIT: (state, value) => { state.list.query.limit = value },

  SET_LIST_TOTAL: (state, value) => { state.list.total = value },
  SET_LIST_ITEMS: (state, value) => { state.list.items = value },

  SET_DETAIL_ITEM: (state, value) => { state.detail.item = value },
  SET_DETAIL_CATEGORY_ID: (state, value) => { state.detail.item.categoryId = value },
  SET_DETAIL_SUB_CATEGORY_ID: (state, value) => { state.detail.item.subCategoryId = value },
  SET_DETAIL_ITEM_IMAGE: (state, value) => { state.detail.item.image = value },

  RESET_FORM: (state) => { state.form = Object.assign({}, DEFAULT_FORM) },
  SET_FORM: (state, value) => { state.form = Object.assign({}, value) },
  SET_FORM_TITLE: (state, value) => { state.form.title = value },
  SET_FORM_CATEGORY_ID: (state, value) => { state.form.categoryId = value },
  SET_FORM_SUB_CATEGORY_ID: (state, value) => { state.form.subCategoryId = value },
  SET_FORM_RAW_CONTENT: (state, value) => { state.form.rawContent = value },
  SET_FORM_CONTENT: (state, value) => { state.form.content = value }
}

const actions = {
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, FT_POST.GET_ALL, pickBy(state.list.query))
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
  getDetailItem({ commit }, id) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, FT_POST.GET, { id })
        .then(({ data }) => {
          commit('SET_DETAIL_ITEM', data)
          resolve(data)
        })
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  upsert(context, payload) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, FT_POST.UPSERT, payload)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  delete(context, id) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, FT_POST.DELETE, { id })
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
