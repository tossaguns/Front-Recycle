
import { createApp } from 'vue'
import './assets/tailwind.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
