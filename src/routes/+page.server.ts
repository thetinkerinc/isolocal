import { codeToHtml } from 'shiki';
import * as _ from 'radashi';

import type { PageServerLoad } from './$types';

type Snippets = {
	[key: string]: {
		code: string;
		html: string;
	};
};

export const load: PageServerLoad = async ({ locals }) => {
	return {
		snippets: await makeSnippets(locals.localStorage.theme)
	};
};

async function makeSnippets(theme: App.Theme) {
	const snippets: { [key: string]: string } = import.meta.glob('../snippets/*', {
		query: '?raw',
		import: 'default',
		eager: true
	});
	const themes = ['one-dark-pro', 'poimandres', 'solarized-light', 'slack-dark'];
	return await _.reduce(
		Object.entries(snippets),
		async (a: Snippets, [k, v]) => {
			const fname = k.replace('../snippets/', '');
			const lang = fname.split('.')[1];
			const html = await codeToHtml(v, {
				theme: themes[theme - 1],
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
