import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'
import ajax from '@/lib/ajax'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css'
import 'video.js/dist/video-js.css'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.min.css'
import Plane from '@/components/Plane'
import PlaneTitle from '@/components/PlaneTitle'
import PlaneTools from '@/components/PlaneTools'
import videojs from 'video.js'

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.use(vuescroll)
// Vue.use(VueVideoPlayer)
Vue.component('Plane', Plane)
Vue.component('PlaneTitle', PlaneTitle)
Vue.component('PlaneTools', PlaneTools)

window.videojs = videojs
new Vue({ router, store, render: h => h(App) }).$mount('#app')
