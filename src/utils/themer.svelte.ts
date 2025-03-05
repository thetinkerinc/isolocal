import { browser } from '$app/environment';

import local from '$lib/index';

class Themer {
	_value: number = $state(1);

	constructor() {
		this._value = local.get('theme', 1);
	}

	get value() {
		return this._value;
	}

	set value(v) {
		local.set('theme', v);
		this._value = v;
	}
}

let themer: Themer;

function getThemer() {
	if (!browser) {
		return new Themer();
	}
	if (themer) {
		return themer;
	}
	themer = new Themer();
	return themer;
}

export default getThemer;
