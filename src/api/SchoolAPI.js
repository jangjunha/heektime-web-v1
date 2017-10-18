import * as Networking from './base';

export default {

  getSchools: () => Networking.GET('/schools'),

  getSemesterLectures: semesterId => Networking.GET(`/semesters/${semesterId}/lectures-url`)
    .then(({ url }) => fetch(url))
    .then(response => response.json()),
};
