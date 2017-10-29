import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import UserContainer from '@/containers/UserContainer';
import UserHomeContainer from '@/containers/UserHomeContainer';
import UserTimetableContainer from '@/containers/UserTimetableContainer';
import UserMenu from '@/components/UserMenu';
import HomeMenu from '@/components/HomeMenu';
import NotFound from '@/components/NotFound';

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
        default: UserContainer,
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
          component: UserHomeContainer,
        },
        {
          path: 'timetable/:timetable_id',
          name: 'UserTimetable',
          component: UserTimetableContainer,
        },
      ],
    },
    { path: '*', components: { default: NotFound, menubar: null } },
  ],
});
