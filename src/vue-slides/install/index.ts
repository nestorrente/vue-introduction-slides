import Vue from 'vue';
import installDirectives from '@/vue-slides/install/directives';
import installMixin from '@/vue-slides/install/mixin';
import defineProperties from '@/vue-slides/install/properties';

import '@/vue-slides/css/vue-slides/vue-slides.scss';
import '../css/themes/default/default-theme.scss';
import '../css/transitions.scss';
import '../css/appear.scss';

export default function install(vue: typeof Vue): void {
	installDirectives();
	installMixin();
	defineProperties();
}
