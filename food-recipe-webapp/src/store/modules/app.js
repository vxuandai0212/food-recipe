import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  language: getLanguage(),
  loading: false,
  lastRoute: null
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SET_LOADING: (state, value) => {
    state.loading = value
  },
  SET_LAST_ROUTE: (state, value) => {
    state.lastRoute = value;
  }
}

const actions = {
  setLastRoute({ commit }, value) {
    commit('SET_LAST_ROUTE', value);
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  setLoading({ commit }, value) {
    commit('SET_LOADING', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
