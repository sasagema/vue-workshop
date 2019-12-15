import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import VueRouter from 'vue-router'
import Movies from './containers/Movies'
import NotFound from './components/NotFound'
import Watchlist from './components/Watchlist'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [{
  path:'/',
  component: Movies
},
{
  path: '/watchlist',
  component: Watchlist
},
{
  path: '*',
  component: NotFound
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
