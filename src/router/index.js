import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import UserView from '@/views/UserView';
import UserHomeView from '@/views/UserHomeView';
import UserTimetableView from '@/views/UserTimetableView';
import UserMenu from '@/components/UserMenu';
import HomeMenu from '@/components/HomeMenu';
import NotFoundView from '@/views/NotFoundView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Hello,
        menubar: HomeMenu,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        default: SignupForm,
        menubar: HomeMenu,
      },
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        default: LoginForm,
        menubar: HomeMenu,
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
          component: UserHomeView,
        },
        {
          path: 'timetable/:timetable_id',
          name: 'UserTimetable',
          component: UserTimetableView,
        },
      ],
    },
    { path: '*', components: { default: NotFoundView, menubar: null } },
  ],
});
