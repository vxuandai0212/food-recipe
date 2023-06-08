import { METHOD, sendRequest } from '@/api/config'
import { INGREDIENT_NUTRITION } from '@/api/endpoint'
import { pickBy } from 'lodash'

const DEFAULT_FORM = {
  id: null,
  ingredientId: null,
  nutritionId: null,
  nutritionValue: null
}

const DEFAULT_LIST_QUERY = {
  ingredientId: null
}

const DEFAULT_DETAIL_ITEM = {
  id: null,
  nutritionName: null,
  nutritionId: null,
  nutritionValue: null
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
  SET_LIST_QUERY_INGREDIENT_ID: (state, value) => { state.list.query.ingredientId = value },

  SET_LIST_TOTAL: (state, value) => { state.list.total = value },
  SET_LIST_ITEMS: (state, value) => { state.list.items = value },

  SET_DETAIL_ITEM: (state, value) => { state.detail.item = value },

  RESET_FORM: (state) => { state.form = Object.assign({}, DEFAULT_FORM) },
  SET_FORM: (state, value) => { state.form = Object.assign({}, value) },
  SET_FORM_INGREDIENT_ID: (state, value) => { state.form.ingredientId = value },
  SET_FORM_NUTRITION_ID: (state, value) => { state.form.nutritionId = value },
  SET_FORM_NUTRITION_VALUE: (state, value) => { state.form.nutritionValue = value }
}

const actions = {
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, INGREDIENT_NUTRITION.GET_ALL, pickBy(state.list.query))
        .then(res => {
          const { data } = res
          commit('SET_LIST_ITEMS', data)
          commit('SET_LIST_TOTAL', data.length)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  upsert(context, payload) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, INGREDIENT_NUTRITION.UPSERT, payload)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  delete(context, id) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, INGREDIENT_NUTRITION.DELETE, { id })
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
