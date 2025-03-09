import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		ignores: ['src/snippets/*']
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'no-mixed-spaces-and-tabs': 'off',
			'no-control-regex': 'off',
			'no-async-promise-executor': 'off',
			'no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_.',
					argsIgnorePattern: '^_.',
					caughtErrorsIgnorePattern: '^_.'
				}
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			},
			globals: {
				App: 'readonly'
			}
		},
		rules: {
			'svelte/no-at-html-tags': 'off'
		}
	}
);
