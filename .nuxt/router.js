import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5ab5c5fa = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _7f8905fa = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _115d8496 = () => interopDefault(import('../pages/regist.vue' /* webpackChunkName: "pages/regist" */))
const _c002b766 = () => interopDefault(import('../pages/backend/sources/create.vue' /* webpackChunkName: "pages/backend/sources/create" */))
const _aa2b9822 = () => interopDefault(import('../pages/backend/news/one/_id.vue' /* webpackChunkName: "pages/backend/news/one/_id" */))
const _1b92f5e0 = () => interopDefault(import('../pages/backend/sources/one/_id.vue' /* webpackChunkName: "pages/backend/sources/one/_id" */))
const _234dd7cc = () => interopDefault(import('../pages/backend/news/_page.vue' /* webpackChunkName: "pages/backend/news/_page" */))
const _1a0dfd2d = () => interopDefault(import('../pages/backend/sources/_page.vue' /* webpackChunkName: "pages/backend/sources/_page" */))
const _07bd5658 = () => interopDefault(import('../pages/news/one/_id.vue' /* webpackChunkName: "pages/news/one/_id" */))
const _5d31edf1 = () => interopDefault(import('../pages/news/_page.vue' /* webpackChunkName: "pages/news/_page" */))
const _dde3ba3a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _5ab5c5fa,
    name: "login"
  }, {
    path: "/profile",
    component: _7f8905fa,
    name: "profile"
  }, {
    path: "/regist",
    component: _115d8496,
    name: "regist"
  }, {
    path: "/backend/sources/create",
    component: _c002b766,
    name: "backend-sources-create"
  }, {
    path: "/backend/news/one/:id?",
    component: _aa2b9822,
    name: "backend-news-one-id"
  }, {
    path: "/backend/sources/one/:id?",
    component: _1b92f5e0,
    name: "backend-sources-one-id"
  }, {
    path: "/backend/news/:page?",
    component: _234dd7cc,
    name: "backend-news-page"
  }, {
    path: "/backend/sources/:page?",
    component: _1a0dfd2d,
    name: "backend-sources-page"
  }, {
    path: "/news/one/:id?",
    component: _07bd5658,
    name: "news-one-id"
  }, {
    path: "/news/:page?",
    component: _5d31edf1,
    name: "news-page"
  }, {
    path: "/",
    component: _dde3ba3a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
