import Vue from 'vue'
import Router from 'vue-router'
import pos from '@/components/page/pos'
import Error from '@/components/page/Error'

Vue.use(Router)

export default new Router({
mode:'history',
  routes: [
    {
      path:'/',
      name:'pos',
      component:pos
    },
    // 配置404页面
    {
      path:'*',
      name:'Error',
      component:Error
    }
  ]
})
