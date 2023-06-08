import { METHOD, sendRequest } from '@/api/config'
import { AD } from '@/api/endpoint'
import { pickBy } from 'lodash'

const DEFAULT_FORM = {
  id: null,
  name: '',
  link: null,
  adCustomerId: null,
  price: null,
  validFromDate: null,
  validToDate: null,
  payStatus: null,
  status: null,
  type: null
}

const DEFAULT_DETAIL_ITEM = {
  id: null,
  name: null,
  link: null,
  adCustomerId: null,
  price: null,
  validFromDate: null,
  validToDate: null,
  payStatus: null,
  status: null,
  type: null
}

const DEFAULT_LIST_QUERY = {
  page: 1,
  limit: 10,
  searchKeyword: '',
  adCustomerId: null
}

const state = {
  list: {
    query: Object.assign({}, DEFAULT_LIST_QUERY),
    total: 0,
    items: [],
    active: 0,
    inactive: 0,
    payed: 0,
    notPayed: 0,
    expire: 0
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
  SET_LIST_QUERY_AD_CUSTOMER_ID: (state, value) => { state.list.query.adCustomerId = value },
  SET_LIST_QUERY_PAGE: (state, value) => { state.list.query.page = value },
  SET_LIST_QUERY_LIMIT: (state, value) => { state.list.query.limit = value },

  SET_LIST_TOTAL: (state, value) => { state.list.total = value },
  SET_LIST_ITEMS: (state, value) => { state.list.items = value },
  SET_LIST_ACTIVE: (state, value) => { state.list.active = value },
  SET_LIST_INACTIVE: (state, value) => { state.list.inactive = value },
  SET_LIST_PAYED: (state, value) => { state.list.payed = value },
  SET_LIST_NOT_PAYED: (state, value) => { state.list.notPayed = value },
  SET_LIST_EXPIRE: (state, value) => { state.list.expire = value },

  SET_DETAIL_ITEM: (state, value) => { state.detail.item = value },
  RESET_DETAIL_ITEM: (state) => { state.detail = Object.assign({}, DEFAULT_DETAIL_ITEM) },

  RESET_FORM: (state) => { state.form = Object.assign({}, DEFAULT_FORM) },
  SET_FORM: (state, value) => { state.form = Object.assign({}, value) },
  SET_FORM_NAME: (state, value) => { state.form.name = value },
  SET_FORM_LINK: (state, value) => { state.form.link = value },
  SET_FORM_AD_CUSTOMER_ID: (state, value) => { state.form.adCustomerId = value },
  SET_FORM_PRICE: (state, value) => { state.form.price = value },
  SET_FORM_VALID_FROM_DATE: (state, value) => { state.form.validFromDate = value },
  SET_FORM_VALID_TO_DATE: (state, value) => { state.form.validToDate = value },
  SET_FORM_PAY_STATUS: (state, value) => { state.form.payStatus = value },
  SET_FORM_STATUS: (state, value) => { state.form.status = value },
  SET_FORM_TYPE: (state, value) => { state.form.type = value }
}

const actions = {
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, AD.GET_ALL, pickBy(state.list.query))
        .then(res => {
          const { data } = res
          const { total, items, active, inactive, payed, notPayed, expire } = data
          commit('SET_LIST_ITEMS', items)
          commit('SET_LIST_TOTAL', total)
          commit('SET_LIST_ACTIVE', active)
          commit('SET_LIST_INACTIVE', inactive)
          commit('SET_LIST_PAYED', payed)
          commit('SET_LIST_NOT_PAYED', notPayed)
          commit('SET_LIST_EXPIRE', expire)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  getDetailItem({ commit }, id) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, AD.GET, { id })
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
      sendRequest(METHOD.POST, AD.UPSERT, payload)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  delete(context, id) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, AD.DELETE, { id })
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
