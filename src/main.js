
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// The card layout shared by all three pages. Global rather than scoped, because it
// is used by Home, About and Portfolio and was previously duplicated in each.
import './assets/card.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
