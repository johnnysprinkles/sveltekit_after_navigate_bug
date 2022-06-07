//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		prerender: {
			default: true,
			entries: [
				'*',
				'/todos/_uid_'
			]
		},

		vite: {
			server: {
				fs: {
					strict: false
				}
			}
		}
	}
};

export default config;
