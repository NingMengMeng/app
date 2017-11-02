export default {
    path: 'schedule',
    component: r => require.ensure([], () => r(require('../components/Content/Schedules/Schedules.vue')), 'schedule')
};
