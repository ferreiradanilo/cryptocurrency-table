import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

const app = createApp(App)
app.component('app')
app.mount('#app')

// custom filter
app.config.globalProperties.$filters = {
  // percent
  price_change (value) {
    value = value.toString()
    if (value.includes('-')) {
      return value
    } else {
      return ''
    }
  },
  // comma
  comma_sep (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  // truncate string
  str_limit (value, size) {
    if (!value) return ''
    value = value.toString()
    if (value.length <= size) {
      return value
    }
    return value.substr(0, size)
  }
}
