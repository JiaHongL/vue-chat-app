import './assets/main.css'
import 'vue3-emoji-picker/css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { PageVisibilityPlugin } from './stores/plugins/pageVisibilityPlugin'
import { AutoScrollPlugin } from './stores/plugins/autoAutoScrollPlugin'

const app = createApp(App)

const pinia = createPinia()
pinia.use(PageVisibilityPlugin)
pinia.use(AutoScrollPlugin)

app.use(pinia)

app.use(router)

app.mount('#app')
