import { createApp, VueElement } from 'vue'
import { createI18n } from "vue-i18n"
import App from './App.vue'
import { messages } from './messages'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas)
library.add(fab)

const i18n = createI18n({
    locale: "en",
    fallbackLocale: 'en',
    messages
});

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(i18n);
app.mount('#app');
