<template>
  <div class="menu">
    <div class="profile-menu">
      <img class="profile-image" src="../assets/logo.png">
      <p class="profile-name">{{ username }}</p>
    </div>
    <div class="sub-menu">
      <select-option :value="semester" :options="semesters" @change="value => selectSemester(value)">
        <template slot="selected" scope="{ option }">
          <template v-if="option">{{ option.year }}&mdash;{{ option.term }}</template>
          <template v-else>학기 선택</template>
        </template>
        <template slot="option" scope="{ option }">
          <span>{{ option.year }}&mdash;{{ option.term }}</span>
        </template>
      </select-option>
      <select-option :value="timetable" :options="semesterTimetables" :disabled="!semester || semesterTimetables.length === 0">
        <template slot="selected" scope="{ option }">
          <template v-if="option">{{ option.title }}</template>
          <template v-else-if="semesterTimetables.length === 0">시간표 없음</template>
          <template v-else>시간표 선택</template>
        </template>
        <template slot="option" scope="{ option }">
          <router-link :to="{ name: 'UserTimetable', params: { username: username, timetable_id: option.id } }">{{ option.title }}</router-link>
        </template>
      </select-option>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import SelectOption from '@/components/SelectOption';

  export default {
    components: { SelectOption },
    props: ['username', 'timetable_id'],
    data() {
      return {
        internalSemester: null,
      };
    },
    computed: {
      semester() {
        if (!this.timetable) {
          return this.internalSemester;
        }
        return this.semesters.filter(semester => this.timetable.semester.id === semester.id)[0];
      },
      semesterTimetables() {
        if (!this.semester) return [];
        return this.timetables.filter(timetable => timetable.semester.id === this.semester.id);
      },
      timetable() {
        return (this.timetable_id ? this.$store.state.timetables[this.timetable_id] : null);
      },
      ...mapState({
        user(state) {
          if (!state.usernames[this.username]) return null;
          const userId = state.usernames[this.username];
          return state.users[userId];
        },
        semesters(state) {
          return state.schools.korea_univ_anam ? state.schools.korea_univ_anam.semesters : [];
        },
        timetables(state) {
          if (!this.user) return [];

          const timetableIds = this.user['timetable:ids'];
          if (!timetableIds) return [];

          return timetableIds.map(id => state.timetables[id]);
        },
      }),
    },
    methods: {
      selectSemester(value) {
        this.internalSemester = value;

        this.$router.push({ name: 'User', params: { username: this.username } });
      },
      refreshMenu() {
        if (!this.username) return;

        this.$store.dispatch('FETCH_USER_BY_USERNAME', { username: this.username })
          .then(() => {
            const userId = this.$store.state.usernames[this.username];
            this.$store.dispatch('FETCH_USER_TIMETABLES', { user_id: userId });
          });
      },
    },
    watch: {
      username() {
        this.refreshMenu();
      },
    },
    created() {
      this.$store.dispatch('FETCH_SCHOOLS');
      this.refreshMenu();
    },
  };
</script>

<style lang="scss">
  .menu {
    display: flex;
    flex-direction: row;

    .profile-menu {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 12px;

      .profile-image {
        $image-size: 28px;

        width: $image-size;
        height: $image-size;

        margin-right: 6px;

        border: 1px solid #ddd;
        border-radius: $image-size / 2;
        background-color: white;
      }

      .profile-name {
        margin: 0 4px;
        font-size: 20px;
        color: #2c3e50;
      }
    }

    .sub-menu {
      display: flex;
      flex-direction: row;
      align-items: center;

      > * {
        margin-left: 16px;
      }
    }
  }
</style>
