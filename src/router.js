import { createRouter, createWebHistory } from 'vue-router'

// Several lazy routes that all use the shared IconPanel component (which is
// also rendered eagerly in App.vue). This shared eager+async Vuetify usage is
// what makes Rolldown extract the Vuetify component CSS into a separate eager
// stylesheet that is linked *before* index.css in the production HTML.
const routes = [
	{ path: '/', component: () => import('./views/Home.vue') },
	{ path: '/other', component: () => import('./views/Other.vue') },
]
for (let i = 1; i <= 5; i++) {
	routes.push({ path: `/page${i}`, component: () => import(`./views/Page${i}.vue`) })
}

export default createRouter({ history: createWebHistory(), routes })
