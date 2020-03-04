import Vue from 'vue';
import {DirectiveBinding} from 'vue/types/options';
import {VNode} from 'vue/types/vnode';

export default function installDirectives() {
	installAppearDirective();
}

const APPEARABLE_CLASS = 'appearable';
const APPEAR_CLASS = 'appear';

function installAppearDirective() {
	Vue.directive('appear', {
		bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
			el.classList.add(APPEARABLE_CLASS);
			if (binding.value) {
				el.classList.add(APPEAR_CLASS);
			}
		},
		update(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
			if (binding.value !== binding.oldValue) {
				if (binding.value) {
					el.classList.add(APPEAR_CLASS);
				} else {
					el.classList.remove(APPEAR_CLASS);
				}
			}
		}
	});
}
