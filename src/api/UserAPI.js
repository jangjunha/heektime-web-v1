import * as Networking from './base';

export default {

  signup: data => Networking.POST('/users', data),

  getMe: () => Networking.GET('/me'),
  getUserByUsername: username => Networking.GET(`/username/${username}`),

  getUserTimetables: id => Networking.GET(`/users/${id}/timetables`),
  createUserTimetable: data => Networking.POST('/me/timetables', data),

  addLectureToUserTimetable: (timetableId, lecture) =>
    Networking.POST(`/me/timetables/${timetableId}/lectures`, lecture),
  editLectureFromUserTimetable: (timetableId, lectureId, lecture) =>
    Networking.PUT(`/me/timetables/${timetableId}/lectures/${lectureId}`, lecture),
  deleteLectureFromUserTimetable: (timetableId, lectureId) =>
    Networking.DELETE(`/me/timetables/${timetableId}/lectures/${lectureId}`),
};
