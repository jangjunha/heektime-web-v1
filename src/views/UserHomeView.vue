<template>
  <div class="user-home-view">
    <div class="section" v-if="lastSemester">
      <h2>고려대학교(서울) {{ lastSemester.year }}&mdash;{{ lastSemester.term }} 시간표</h2>
      <ul v-if="lastSemesterTimetables.length > 0" class="timetable-list">
        <li v-for="timetable in lastSemesterTimetables">
          <router-link
            :to="{ name: 'UserTimetable', params: { username: username, timetable_id: timetable.id } }"
          >{{ timetable.title }}</router-link>
        </li>
      </ul>
      <div class="empty-alert" v-else>
        <p>시간표가 없습니다 T_T</p>
      </div>
    </div>
    <div class="section" v-if="editable">
      <button class="btn-new" @click="showModal=true">새 시간표 만들기</button>
    </div>

    <popup-modal :show="showModal" @dismiss="showModal=false" class="modal-new-timetable">
      <div class="content">
        <h2>새 시간표</h2>
        <div class="input-group">
          <select-option :options="semesters" class="select-semester" v-model="newTimetableSemester">
            <template slot="selected" scope="{ option }">
              <template v-if="option">{{ option.year }}&mdash;{{ option.term }}</template>
              <template v-else>학기 선택</template>
            </template>
            <template slot="option" scope="{ option }">
              <span>{{ option.year }}&mdash;{{ option.term }}</span>
            </template>
          </select-option>
          <input type="text" placeholder="시간표 이름" v-model="newTimetableTitle">
        </div>
      </div>
      <button
        class="btn-new"
        @click="createTimetable"
        :disabled="!newTimetableSemester || !newTimetableTitle"
      >만들기</button>
    </popup-modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import { UserAPI } from '@/api';

  import PopupModal from '@/components/PopupModal';
  import SelectOption from '@/components/SelectOption';

  export default {
    name: 'user-home-view',
    components: { PopupModal, SelectOption },
    data() {
      return {
        isLoaded: false,
        showModal: false,

        newTimetableSemester: null,
        newTimetableTitle: '',
      };
    },
    computed: {
      editable() {
        if (this.$store.state.me === null) return false;
        return this.user.id === this.$store.state.me.id;
      },
      username() {
        return this.$route.params.username;
      },
      user() {
        const userId = this.$store.state.usernames[this.username];
        return this.$store.state.users[userId];
      },
      lastSemester() {
        const sorted = [...this.semesters]
          .sort((a, b) => (a.year !== b.year ? a.year < b.year : a.semester < b.semester));
        return sorted[0];
      },
      lastSemesterTimetables() {
        return this.timetables.filter(timetable => timetable.semester.id === this.lastSemester.id);
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
      createTimetable() {
        UserAPI.createUserTimetable({
          semester_id: this.newTimetableSemester.id,
          title: this.newTimetableTitle,
        }).then(() => {
          this.$store.dispatch('FETCH_USER_TIMETABLES', { user_id: this.user.id });
          this.showModal = false;
          this.newTimetableSemester = null;
          this.newTimetableTitle = '';
          alert('생성되었습니다!');
        });
      },
      refreshUser() {
        this.$store.dispatch('FETCH_USER_TIMETABLES', { user_id: this.user.id });
      },
    },
    watch: {
      username() {
        this.refreshUser();
      },
    },
    created() {
      this.$store.dispatch('FETCH_SCHOOLS');
    },
  };
</script>

<style lang="scss" scoped>
  .user-home-view {
    margin: 0 auto;
    padding: 32px 0;
    max-width: 960px;

    h2 {
      font-weight: 400;
      color: #444;
    }

    .section {
      margin-bottom: 64px;
    }

    .timetable-list {
      display: flex;
      flex-direction: column;

      list-style: none;
      padding: 0;
      margin: 0;

      li {
        &:not(:last-child) {
          border-bottom: 2px solid transparent;
        }

        a {
          display: block;
          text-decoration: none;
          background-color: #f4f4f4;
          color: #444;
          padding: 16px;

          &:hover {
            background-color: darken(#f4f4f4, 2);
          }
        }
      }
    }

    .modal-new-timetable {
      .content {
        padding: 8px;

        input[type=text], .select-semester {
          box-sizing: border-box;
          font-size: 16pt;
          width: 100%;
          padding: 8px;
        }

        .input-group > * {
          margin: 4px 0;
        }
      }
    }

    .btn-new {
      width: 100%;
      color: white;
      background-color: #5555ff;
      font-size: 16pt;
      border: 0;
      padding: 12px;
      margin: 0;

      &:hover {
        background-color: #4f4fec;
      }

      &:disabled {
        background-color: #ccc;
      }
    }

    .empty-alert {
      margin: 32px 0;
      color: #888;
    }
  }
</style>
