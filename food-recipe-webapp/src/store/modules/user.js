/* eslint-disable @typescript-eslint/no-unused-vars */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { METHOD, sendRequest } from '@/api/config'
import { AUTHORIZE } from '@/api/endpoint'

const state = {
  token: getToken(),
  name: '',
  role: null,
  email: null,
  grantApplications: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_GRANT_APPLICATIONS: (state, grantApplications) => { state.grantApplications = grantApplications }
}

const actions = {
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, AUTHORIZE.LOGIN, { email: email.trim(), password: password })
        .then(({ data }) => {
          commit('SET_TOKEN', data.tokens.access.token)
          commit('SET_EMAIL', data.user.email)
          setToken(data.tokens.access.token)
          resolve()
        })
        .catch(err => reject(err))
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, AUTHORIZE.INFO, {})
        .then(({ fullname, role, grantApplications }) => {
          commit('SET_NAME', fullname)
          commit('SET_ROLE', role)
          commit('SET_GRANT_APPLICATIONS', grantApplications)
          resolve({ role })
        })
        .catch(err => reject(err))
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', null)
      removeToken()
      resetRouter()
      resolve()
    })
  },
  addToken({ commit }, token) {
    return new Promise(resolve => {
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', null)
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
