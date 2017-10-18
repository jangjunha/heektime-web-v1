import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    me: null,  // User
    usernames: {/* [username: string]: [user_id: string] */},
    users: {/* [id: string]: User */},
    schools: {/* [id: string]: School  */},
    timetables: {/* [id: ] */},
  },
  actions,
  getters,
  mutations,
  strict: debug,
});
