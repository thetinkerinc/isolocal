import { codeToHtml } from 'shiki';
import * as _ from 'radashi';

import type { PageServerLoad } from './$types';

type Snippets = {
	[key: string]: {
		code: string;
		html: string;
	};
};

export const load: PageServerLoad = async () => {
	return {
		snippets: await makeSnippets()
	};
};

async function makeSnippets() {
	const snippets: { [key: string]: string } = import.meta.glob('../snippets/*', {
		query: '?raw',
		import: 'default',
		eager: true
	});
	return await _.reduce(
		Object.entries(snippets),
		async (a: Snippets, [k, v]) => {
			const fname = k.replace('../snippets/', '');
			const lang = fname.split('.')[1];
			const html = await codeToHtml(v, {
				theme: 'one-dark-pro',
				lang
			});
			a[fname] = {
				code: v,
				html
			};
			return a;
		},
		{}
	);
}
