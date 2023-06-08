import { METHOD, sendRequest } from '@/api/config'
import { RECIPE, STAT } from '@/api/endpoint'
import { pickBy } from 'lodash'
import { VIEW_TYPE } from '@/utils/constants/common'

const DEFAULT_QUERY = {
  page: 1,
  limit: 10,
  searchKeyword: '',
  type: null
}

const state = {
  stats: [],
  topKeyword: {
    query: Object.assign({}, DEFAULT_QUERY),
    total: 0,
    items: [],
    ui: {
      containerLoading: true,
      listLoading: false
    }
  },
  topRecipe: {
    query: Object.assign({}, DEFAULT_QUERY),
    total: 0,
    items: [],
    ui: {
      containerLoading: true,
      listLoading: false
    }
  },
  topNutritionAd: {
    query: Object.assign({}, DEFAULT_QUERY),
    total: 0,
    items: [],
    ui: {
      containerLoading: true,
      listLoading: false
    }
  },
  topPriceAd: {
    query: Object.assign({}, DEFAULT_QUERY),
    total: 0,
    items: [],
    ui: {
      containerLoading: true,
      listLoading: false
    }
  }
}

const mutations = {
  SET_STAT: (state, value) => { state.stats = value },

  SET_TOP_KEYWORD_TOTAL: (state, value) => { state.topKeyword.total = value },
  SET_TOP_KEYWORD_ITEMS: (state, value) => { state.topKeyword.items = value },
  RESET_TOP_KEYWORD_QUERY: (state) => { state.topKeyword.query = Object.assign({}, DEFAULT_QUERY) },
  SET_TOP_KEYWORD_QUERY_PAGE: (state, value) => { state.topKeyword.query.page = value },
  SET_TOP_KEYWORD_QUERY_LIMIT: (state, value) => { state.topKeyword.query.limit = value },
  SET_TOP_KEYWORD_QUERY_SEARCH_KEYWORD: (state, value) => { state.topKeyword.query.searchKeyword = value },
  SET_TOP_KEYWORD_QUERY_TYPE: (state) => { state.topKeyword.query.type = VIEW_TYPE.KEYWORD },
  SET_TOP_KEYWORD_UI_CONTAINER_LOADING: (state, value) => { state.topKeyword.ui.containerLoading = value },
  SET_TOP_KEYWORD_UI_LIST_LOADING: (state, value) => { state.topKeyword.ui.listLoading = value },

  SET_TOP_RECIPE_TOTAL: (state, value) => { state.topRecipe.total = value },
  SET_TOP_RECIPE_ITEMS: (state, value) => { state.topRecipe.items = value },
  RESET_TOP_RECIPE_QUERY: (state) => { state.topRecipe.query = Object.assign({}, DEFAULT_QUERY) },
  SET_TOP_RECIPE_QUERY_PAGE: (state, value) => { state.topRecipe.query.page = value },
  SET_TOP_RECIPE_QUERY_LIMIT: (state, value) => { state.topRecipe.query.limit = value },
  SET_TOP_RECIPE_QUERY_SEARCH_KEYWORD: (state, value) => { state.topRecipe.query.searchKeyword = value },
  SET_TOP_RECIPE_QUERY_TYPE: (state) => { state.topRecipe.query.type = VIEW_TYPE.RECIPE },
  SET_TOP_RECIPE_UI_CONTAINER_LOADING: (state, value) => { state.topRecipe.ui.containerLoading = value },
  SET_TOP_RECIPE_UI_LIST_LOADING: (state, value) => { state.topRecipe.ui.listLoading = value },

  SET_TOP_NUTRITION_AD_TOTAL: (state, value) => { state.topNutritionAd.total = value },
  SET_TOP_NUTRITION_AD_ITEMS: (state, value) => { state.topNutritionAd.items = value },
  RESET_TOP_NUTRITION_AD_QUERY: (state) => { state.topNutritionAd.query = Object.assign({}, DEFAULT_QUERY) },
  SET_TOP_NUTRITION_AD_QUERY_PAGE: (state, value) => { state.topNutritionAd.query.page = value },
  SET_TOP_NUTRITION_AD_QUERY_LIMIT: (state, value) => { state.topNutritionAd.query.limit = value },
  SET_TOP_NUTRITION_AD_QUERY_SEARCH_KEYWORD: (state, value) => { state.topNutritionAd.query.searchKeyword = value },
  SET_TOP_NUTRITION_AD_QUERY_TYPE: (state) => { state.topNutritionAd.query.type = VIEW_TYPE.RECIPE_NUTRITION },
  SET_TOP_NUTRITION_AD_UI_CONTAINER_LOADING: (state, value) => { state.topNutritionAd.ui.containerLoading = value },
  SET_TOP_NUTRITION_AD_UI_LIST_LOADING: (state, value) => { state.topNutritionAd.ui.listLoading = value },

  SET_TOP_PRICE_AD_TOTAL: (state, value) => { state.topPriceAd.total = value },
  SET_TOP_PRICE_AD_ITEMS: (state, value) => { state.topPriceAd.items = value },
  RESET_TOP_PRICE_AD_QUERY: (state) => { state.topPriceAd.query = Object.assign({}, DEFAULT_QUERY) },
  SET_TOP_PRICE_AD_QUERY_PAGE: (state, value) => { state.topPriceAd.query.page = value },
  SET_TOP_PRICE_AD_QUERY_LIMIT: (state, value) => { state.topPriceAd.query.limit = value },
  SET_TOP_PRICE_AD_QUERY_SEARCH_KEYWORD: (state, value) => { state.topPriceAd.query.searchKeyword = value },
  SET_TOP_PRICE_AD_QUERY_TYPE: (state) => { state.topPriceAd.query.type = VIEW_TYPE.RECIPE_PRICE },
  SET_TOP_PRICE_AD_UI_CONTAINER_LOADING: (state, value) => { state.topPriceAd.ui.containerLoading = value },
  SET_TOP_PRICE_AD_UI_LIST_LOADING: (state, value) => { state.topPriceAd.ui.listLoading = value }
}

const actions = {
  getStat({ commit }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, STAT.OVERVIEW, {}).then(({ data }) => {
        commit('SET_STAT', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTopKeyword({ commit, state }) {
    commit('SET_TOP_KEYWORD_QUERY_TYPE')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, RECIPE.TOP_VIEW, pickBy(state.topKeyword.query))
        .then(res => {
          const { data } = res
          const { total, items } = data
          commit('SET_TOP_KEYWORD_ITEMS', items)
          commit('SET_TOP_KEYWORD_TOTAL', total)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  getTopRecipe({ commit, state }) {
    commit('SET_TOP_RECIPE_QUERY_TYPE')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, RECIPE.TOP_VIEW, pickBy(state.topRecipe.query))
        .then(res => {
          const { data } = res
          const { total, items } = data
          commit('SET_TOP_RECIPE_ITEMS', items)
          commit('SET_TOP_RECIPE_TOTAL', total)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  getTopNutritionAd({ commit, state }) {
    commit('SET_TOP_NUTRITION_AD_QUERY_TYPE')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, RECIPE.TOP_VIEW, pickBy(state.topNutritionAd.query))
        .then(res => {
          const { data } = res
          const { total, items } = data
          commit('SET_TOP_NUTRITION_AD_ITEMS', items)
          commit('SET_TOP_NUTRITION_AD_TOTAL', total)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  getTopPriceAd({ commit, state }) {
    commit('SET_TOP_PRICE_AD_QUERY_TYPE')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, RECIPE.TOP_VIEW, pickBy(state.topPriceAd.query))
        .then(res => {
          const { data } = res
          const { total, items } = data
          commit('SET_TOP_PRICE_AD_ITEMS', items)
          commit('SET_TOP_PRICE_AD_TOTAL', total)
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
