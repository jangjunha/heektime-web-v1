import { UserAPI, SchoolAPI } from '@/api';

export default {
  FETCH_SCHOOLS: ({ commit }) => SchoolAPI.getSchools()
    .then((schools) => {
      commit('SET_SCHOOLS', { schools });
      return Promise.resolve();
    }),
  FETCH_SEMESTER_LECTURES: ({ commit, getters }, { semesterId }) => {
    const existLectures = getters.semesters[semesterId].lectures;
    if (existLectures && existLectures.length > 0) {
      console.info('Skip fetch lectures - already exists.');
      return Promise.resolve();
    }

    return SchoolAPI.getSemesterLectures(semesterId)
      .then((lectures) => {
        commit('SET_SEMESTER_LECTURES', { semesterId, lectures });
        return Promise.resolve();
      });
  },
  FETCH_ME: ({ commit, state }) => {
    if (state.me !== null) {
      console.info('Skip fetch me - already exists.');
      return Promise.resolve();
    }

    return UserAPI.getMe()
      .then((me) => {
        commit('SET_ME', { me });
        return Promise.resolve();
      });
  },
  LOGOUT: ({ commit }) => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    commit('UNSET_ME');
    return Promise.resolve();
  },
  FETCH_USER_BY_USERNAME: ({ commit }, { username }) => UserAPI.getUserByUsername(username)
    .then((user) => {
      commit('SET_USERNAME', { username, user_id: user.id });
      commit('SET_USER', { user });
      return Promise.resolve();
    }),
  FETCH_USER_TIMETABLES: ({ commit }, { user_id }) => UserAPI.getUserTimetables(user_id)
    .then((timetables) => {
      timetables.map(timetable => commit('SET_TIMETABLE', { timetable }));

      commit('SET_USER_TIMETABLE_IDS', {
        user_id,
        timetable_ids: timetables.map(timetable => timetable.id),
      });

      return Promise.resolve();
    }),

  ADD_LECTURE_TO_TIMETABLE: ({ commit }, { timetableId, lecture }) =>
    UserAPI.addLectureToUserTimetable(timetableId, lecture)
      .then(() => {
        commit('ADD_LECTURE_TO_TIMETABLE', { timetableId, lecture });
        return Promise.resolve();
      }),
  DELETE_LECTURE_FROM_TIMETABLE: ({ commit }, { timetableId, lectureId }) =>
    UserAPI.deleteLectureFromUserTimetable(timetableId, lectureId)
      .then(() => {
        commit('DELETE_LECTURE_FROM_TIMETABLE', { timetableId, lectureId });
        return Promise.resolve();
      }),
};
