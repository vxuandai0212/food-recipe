import Vue from 'vue'

const Cookies = require('js-cookie')

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import locale from 'element-ui/lib/locale/lang/vi'
import Element from 'element-ui'
import './styles/vt-notify-theme/vt-notify-theme.scss'

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store';
import router from './router'
import EmailEditor from 'vue-email-editor'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import VueEllipseProgress from 'vue-ellipse-progress'
import loadMore from '@/directive/load-more/index' // pull down to load more

import Cloudinary, { CldImage, CldTransformation } from 'cloudinary-vue'

Vue.use(Cloudinary, {
  components: {
    CldImage,
    CldTransformation
  }
})

import Storage from 'vue-ls'

const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
}

Vue.use(Storage, options)
Vue.use(loadMore);
Vue.use(VueEllipseProgress)

import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.use(EmailEditor)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
  locale
})
Vue.use(Donut);

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import autosize from 'v-autosize/dist/plugin';

Vue.use(autosize);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
