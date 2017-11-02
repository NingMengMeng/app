import kk from '../components/function/new3333/new.vue';

export default {
    path: 'home',
    component: r => require.ensure([], () => r(require('../components/function/nmm.vue')), 'home'),
    redirect: 'home/three',
    children: [
      {
          path: 'three',
          name: 'three',
          component: r => require.ensure([], () => r(require('../components/function/new3333/new.vue')), 'home')
        },{
          path: 'ffff',
          name: 'four',
          component: r => require.ensure([], () => r(require('../components/function/new12/kk.vue')), 'home')
        }
    ]
};
