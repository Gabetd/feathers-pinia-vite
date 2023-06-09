localStorage.debug = '*'
import  { createApp } from 'vue'
import  './style.css'
import  App from './App.vue'
import  { router } from './router.js'
import  { pinia } from './modules/pinia.js'
import  { createHead } from '@vueuse/head'

const head = createHead()

createApp(App).use(pinia).use(router).use(head).mount('#app')
