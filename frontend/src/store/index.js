import Vue from 'vue'
import Vuex from 'vuex'

import { api } from '@/services'

// Modules
import Loja from './modules/loja'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.user || '{}'),
    token: localStorage.token || undefined,
    edit: [],
    extraFields: [],
    groupID: '',
    dashboard: [
      {
        key: 'loja',
        icon: { key: 'group', custom: true },
        title: 'Loja',
        layout: 'table'
      },
      {
        key: 'usuarios',
        icon: { key: 'user', custom: true },
        title: 'Usuarios',
        layout: 'table'
      }
    ]
  },
  getters: {
    userName: (state) => (state.user.name === undefined ? '' : state.user.name),
    userEmail: (state) =>
      state.user.email === undefined ? '' : state.user.email,
    isLogged: (state) =>
      Object.keys(state.user).length !== 0 && state.token !== undefined,
    extraFields: (state) => state.extraFields,
    edit: (state) => state.edit,
    groupID: (state) => state.groupID
  },
  mutations: {
    login: (state, payload) => {
      state.user = payload.user
      state.token = payload.token
    },
    logout: (state) => {
      state.user = {}
      state.token = undefined
    },
    edit: (state, payload) => {
      state.edit.push(payload)
    },
    getExtraFields: (state, payload) => {
      state.extraFields = payload
    },
    getGroupId: (state, payload) => {
      state.groupID = payload
    }
  },
  actions: {
    login: (context, payload) => {
      localStorage.user = JSON.stringify(payload.user)
      localStorage.token = payload.token
      api.defaults.headers.common.Authorization = `Bearer ${payload.token}`
      context.commit('login', payload)
    },
    logout: (context) => {
      localStorage.clear()
      delete api.defaults.headers.common.Authorization
      context.commit('logout')
    },
    edit: (context, payload) => {
      context.commit('edit', payload)
    },
    getExtraFields: (context, payload) => {
      context.commit('getExtraFields', payload)
    },
    getGroupId: (context, payload) => {
      context.commit('getGroupId', payload)
    }
  },
  modules: {
    loja: Loja
  }
})
