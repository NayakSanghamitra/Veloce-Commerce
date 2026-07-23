import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vuetify Setup - Use explicit main.css path for Vue CLI / Webpack
import 'vuetify/lib/styles/main.css'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark', // Modern dark theme out of the box
  }
})

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
