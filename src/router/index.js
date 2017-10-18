import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import LoginForm from '@/components/LoginForm';
import UserView from '@/views/UserView';
import UserTimetableView from '@/views/UserTimetableView';
import UserMenu from '@/components/UserMenu';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        default: Hello,
        menubar: null,
      },
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        default: LoginForm,
        menubar: null,
      },
    },
    {
      path: '/user/:username/',
      components: {
        default: UserView,
        menubar: UserMenu,
      },
      props: {
        default: false,
        menubar: true,
      },
      children: [
        {
          path: '',
          name: 'User',
          component: Hello,
        },
        {
          path: 'timetable/:timetable_id',
          name: 'UserTimetable',
          component: UserTimetableView,
        },
      ],
    },
  ],
});
