import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6cc6e66c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _604d4e6c = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _654350e5 = () => interopDefault(import('../pages/regist.vue' /* webpackChunkName: "pages/regist" */))
const _b5775106 = () => interopDefault(import('../pages/backend/sources/create.vue' /* webpackChunkName: "pages/backend/sources/create" */))
const _293a19c2 = () => interopDefault(import('../pages/backend/news/one/_id.vue' /* webpackChunkName: "pages/backend/news/one/_id" */))
const _d4b19040 = () => interopDefault(import('../pages/backend/sources/one/_id.vue' /* webpackChunkName: "pages/backend/sources/one/_id" */))
const _af66ba08 = () => interopDefault(import('../pages/backend/news/_page.vue' /* webpackChunkName: "pages/backend/news/_page" */))
const _2ea5b806 = () => interopDefault(import('../pages/backend/sources/_page.vue' /* webpackChunkName: "pages/backend/sources/_page" */))
const _a3b777f8 = () => interopDefault(import('../pages/news/one/_id.vue' /* webpackChunkName: "pages/news/one/_id" */))
const _def22dbe = () => interopDefault(import('../pages/news/_page.vue' /* webpackChunkName: "pages/news/_page" */))
const _00162c9a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _6cc6e66c,
    name: "login"
  }, {
    path: "/profile",
    component: _604d4e6c,
    name: "profile"
  }, {
    path: "/regist",
    component: _654350e5,
    name: "regist"
  }, {
    path: "/backend/sources/create",
    component: _b5775106,
    name: "backend-sources-create"
  }, {
    path: "/backend/news/one/:id?",
    component: _293a19c2,
    name: "backend-news-one-id"
  }, {
    path: "/backend/sources/one/:id?",
    component: _d4b19040,
    name: "backend-sources-one-id"
  }, {
    path: "/backend/news/:page?",
    component: _af66ba08,
    name: "backend-news-page"
  }, {
    path: "/backend/sources/:page?",
    component: _2ea5b806,
    name: "backend-sources-page"
  }, {
    path: "/news/one/:id?",
    component: _a3b777f8,
    name: "news-one-id"
  }, {
    path: "/news/:page?",
    component: _def22dbe,
    name: "news-page"
  }, {
    path: "/",
    component: _00162c9a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
