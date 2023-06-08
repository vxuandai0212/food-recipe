import { METHOD, sendRequest } from '@/api/config'
import { IMAGE } from '@/api/endpoint'
import { pickBy } from 'lodash'

const DEFAULT_LIST_QUERY = {
  objectId: null,
  objectType: null
}

const state = {
  list: {
    query: Object.assign({}, DEFAULT_LIST_QUERY),
    items: []
  },
  detail: null,
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
  SET_LIST_QUERY_OBJECT_ID: (state, value) => { state.list.query.objectId = value },
  SET_LIST_QUERY_OBJECT_TYPE: (state, value) => { state.list.query.objectType = value },

  SET_LIST_ITEMS: (state, value) => { state.list.items = value }
}

const actions = {
  getAllItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, IMAGE.GET_ALL, pickBy(state.list.query))
        .then(res => {
          const { data } = res
          commit('SET_LIST_ITEMS', data)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  setCover(context, payload) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, IMAGE.SET_COVER, payload)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  // eslint-disable-next-line
  delete(context, id) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, IMAGE.DELETE, { id: id[0] })
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
