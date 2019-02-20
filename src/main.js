import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'
import ajax from '@/lib/ajax'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import VueVideoPlayer from 'vue-video-player'
import 'vuescroll/dist/vuescroll.css'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.use(vuescroll)
Vue.use(VueVideoPlayer)
new Vue({ router, store, render: h => h(App) }).$mount('#app')
