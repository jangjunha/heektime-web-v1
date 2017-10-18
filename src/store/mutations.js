/* eslint-disable no-param-reassign */
import Vue from 'vue';

export default {
  SET_SCHOOLS: (state, { schools }) => {
    state.schools = schools.reduce((res, school) => ({ [school.id]: school, ...res }), {});
  },
  SET_SEMESTER_LECTURES: (state, { semesterId, lectures }) => {
    const schoolId = semesterId.split('/')[0];
    const semester = state.schools[schoolId]
      .semesters.filter(s => s.id === semesterId)[0];
    Vue.set(semester, 'lectures', lectures);
  },
  SET_ME: (state, { me }) => {
    state.me = me;
  },
  UNSET_ME: (state) => {
    state.me = null;
  },
  SET_USER: (state, { user }) => {
    Vue.set(state.users, user.id, user);
  },
  SET_USERNAME: (state, { username, user_id }) => {
    Vue.set(state.usernames, username, user_id);
  },
  SET_TIMETABLE: (state, { timetable }) => {
    Vue.set(state.timetables, timetable.id, timetable);
  },
  SET_USER_TIMETABLE_IDS: (state, { user_id, timetable_ids }) => {
    Vue.set(state.users[user_id], 'timetable:ids', timetable_ids);
  },

  ADD_LECTURE_TO_TIMETABLE: (state, { timetableId, lecture }) => {
    state.timetables[timetableId].lectures.push(lecture);
  },
  DELETE_LECTURE_FROM_TIMETABLE: (state, { timetableId, lectureId }) => {
    state.timetables[timetableId].lectures = state.timetables[timetableId].lectures
      .filter(lecture => lecture.id !== lectureId);
  },
};
