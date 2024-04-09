import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import GlobalMixin from '@/mixins/global-mixin';
import * as GoogleMaps from 'vue2-google-maps'; // 3rd Party Vue - https://www.npmjs.com/package/vue2-google-maps
import App from './App.vue';
import router from './router';
import 'bootswatch/dist/yeti/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

// Note: The BootstrapVue uses NEED to be separate, they won't in a single use comma seperated list
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// Optionally install the BoostrapVue Icon components plugin
Vue.use(IconsPlugin);

// Make all the global-mixin methods and data available in ALL components
// Vue.mixin(GlobalMixin);

// Use for Google Maps Vue2 - See component for NPM Link
Vue.use(GoogleMaps, {
  load: {
    key: 'enter_google_api_key_here', // Google API Key
    libraries: 'places',
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
