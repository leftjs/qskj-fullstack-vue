import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './app';
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'src/styles/global.less'


Vue.use(ElementUI)
Vue.use(VueRouter)




// 1. 定义（路由）组件。
// 可以从其他文件 import 进来

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: App },
  //{ path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})



new Vue({ // eslint-disable-line
  router,
  el: '#app',
  render: h => h({template: `<div><router-view></router-view></div>`})
});
