import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UI from '@/components/library'

import 'normalize.css'
import '@/assets/styles/common.less'



createApp(App).use(router).use(store).use(UI).mount('#app')
