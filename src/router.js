import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: () => import('./views/Home.vue'),
	},
	{
		path: '/other',
		component: () => import('./views/Other.vue'),
	},
]

export default createRouter({
	history: createWebHistory(),
	routes,
})
