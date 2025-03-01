import { codeToHtml } from 'shiki';
import * as _ from 'radashi';

import type { PageServerLoad } from './$types';

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
	return await _.all(
		_.mapEntries(snippets, (k: string, v: string) => {
			const fname = k.replace('../snippets/', '');
			const lang = fname.split('.')[1];
			return [
				fname,
				codeToHtml(v, {
					theme: 'one-dark-pro',
					lang
				})
			];
		})
	);
}
