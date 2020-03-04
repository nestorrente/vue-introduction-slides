import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import slides from '@/slides';
import '@fortawesome/fontawesome-free/css/all.css';
import 'tailwindcss/dist/utilities.css';
import '@/assets/css/custom.scss';
import '@/highlight-config';
import VueTouch from 'vue-touch';

Vue.config.productionTip = false;

Vue.use(VueTouch, {name: 'v-touch'});

new Vue({
	router,
	slides,
	render: (h) => h(App),
}).$mount('#app');
