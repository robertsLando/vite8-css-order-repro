import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
	plugins: [
		vue({ template: { transformAssetUrls } }),
		vuetify({ autoImport: true }),
	],
})
