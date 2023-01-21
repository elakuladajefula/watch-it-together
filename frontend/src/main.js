import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from '@/store/store'
import Vuex from 'vuex'

loadFonts()

createApp(App)
  .use(store)
  .use(vuetify)
  .use(Vuex)
  .mount('#app')
