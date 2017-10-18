export default {
  semesters(state) {  /* [id: string]: Semester */
    return Object.values(state.schools)
      .map(school => school.semesters)
      .reduce((res, semesters) => [...semesters, ...res], [])
      .reduce((res, semester) => ({ [semester.id]: semester, ...res }), {});
  },
};
