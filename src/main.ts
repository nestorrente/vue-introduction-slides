import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import slides from '@/slides';
import '@fortawesome/fontawesome-free/css/all.css';
import './vue-slides/css/tailwind.css';
import '@/assets/css/custom.scss';
import '@/highlight-config';
import VueCompositionApi from '@vue/composition-api';
import VueTouch from 'vue-touch';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(VueTouch, {name: 'v-touch'});

new Vue({
	router,
	slides,
	render: (h) => h(App),
}).$mount('#app');
