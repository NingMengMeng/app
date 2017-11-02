import Vue from 'vue';
import Router from 'vue-router';
import Content from '@/components/Content/Content.vue';
import Login from '@/components/Login/Login.vue';
import NotFound from '@/components/NotFound/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: Login,
    },{
      path: '/content',
      name: 'content',
      component: Content,
      children: [
        require('./shedule.route').default,
        require('./new.route').default
      ]
    }, {
      path: '*',
      component: NotFound
    }
  ]
});
