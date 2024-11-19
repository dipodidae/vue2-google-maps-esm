import Vue from 'vue/dist/vue.js'
import * as VueGoogleMaps from '../../dist/main.js'
import App from './app.vue'

Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw',
    libraries: 'places',
  },
})

// json filter is now not bundled with vue
Vue.filter('json', x => JSON.stringify(x))

new Vue({
  el: '#root',
  components: {
    myApp: App,
  },
})
