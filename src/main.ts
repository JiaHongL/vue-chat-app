import './assets/main.css'
import 'vue3-emoji-picker/css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { PageVisibilityPlugin } from './stores/plugins/pageVisibilityPlugin'
import { AutoScrollPlugin } from './stores/plugins/autoAutoScrollPlugin'
import Vue3TouchEvents, {
  type Vue3TouchEventsOptions,
} from "vue3-touch-events";


const app = createApp(App)

const pinia = createPinia()
pinia.use(PageVisibilityPlugin)
pinia.use(AutoScrollPlugin)

app.use(pinia)
app.use(router)
app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {disableClick: false})

app.mount('#app')
