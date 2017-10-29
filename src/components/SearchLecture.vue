<template>
  <div class="search-lecture">
    <div class="section-filter">
      <lecture-filter
        :emptyOnlyEnabled.sync="emptyOnlyEnabled"
        :weekdaysEnabled.sync="weekdaysEnabled"
        :weekdays.sync="weekdays"
        :periodEnabled.sync="periodEnabled"
        :periodRange.sync="periodRange"
      ></lecture-filter>
      <input @input="setKeyword($event.target.value)" type="text" placeholder="학수번호 / 강의명 / 교수 검색" class="keyword">
    </div>
    <lecture-list
      :lectures="filteredLectures"
      :filled-times="filledTimes"
      @lecture-mouseenter="(lecture) => $emit('lecture-mouseenter', lecture)"
      @lecture-click="(lecture) => $emit('lecture-select', lecture)"
      class="lecture-list"
    ></lecture-list>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { isOverlap } from '@/util';
  import LectureList from '@/components/LectureList';
  import LectureFilter from '@/components/LectureFilter/LectureFilter';

  export default {
    name: 'search-lecture',
    components: { LectureList, LectureFilter },
    props: {
      lectures: {
        type: Array,
        default() {
          return [];
        },
      },
      'filled-times': {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        keyword: '',

        emptyOnlyEnabled: false,

        weekdaysEnabled: false,
        weekdays: [0, 1, 2, 3, 4, 5, 6],

        periodEnabled: false,
        periodRange: [0, 12],
      };
    },
    computed: {
      filteredLectures() {
        console.log('!');
        let lectures = this.lectures;

        if (this.keyword) lectures = this.filterByKeyword(lectures);
        if (this.emptyOnlyEnabled) lectures = this.filterEmptyOnly(lectures);
        if (this.weekdaysEnabled) lectures = this.filterWeekdays(lectures);
//        if (this.periodEnabled) lectures = this.filterPeriods(lectures);

        return lectures;
      },
    },
    methods: {
      filterByKeyword(lectures) {
        return lectures.filter(lecture => (
          (lecture.identifier && lecture.identifier.toLowerCase().indexOf(this.keyword) !== -1) ||
          (lecture.title && lecture.title.toLowerCase().indexOf(this.keyword) !== -1) ||
          (lecture.professor && lecture.professor.toLowerCase().indexOf(this.keyword) !== -1)
        ));
      },

      filterEmptyOnly(lectures) {
        return lectures.filter(lecture => !isOverlap(lecture, this.filledTimes));
      },

      filterWeekdays(lectures) {
        return lectures.filter((lecture) => {
          for (let j = 0; j < lecture.times.length; j += 1) {
            const time = lecture.times[j];
            if (this.weekdays.indexOf(time.weekday) === -1) return false;
          }
          return true;
        });
      },

//      filterPeriods(lectures) {
//        return lectures.filter((lecture) => {
//          for (let j = 0; j < lecture.times.length; j += 1) {
//            const time = lecture.times[j];
//            // TODO: 교시->시간 처리 필요
//            if (time.timeBegin < this.periodRange[0] || time.timeEnd > this.periodRange[1]) {
//              return false;
//            }
//          }
//          return true;
//        });
//      },

      setKeyword: _.debounce(function (value) {
        this.keyword = value.trim().toLowerCase();
      }, 150),
    },
  };
</script>

<style lang="scss">
  .search-lecture {
    .section-filter {
      input.keyword {
        box-sizing: border-box;
        width: 100%;
        padding: 6px 8px;
        font-size: 11pt;
        margin-bottom: 4px;
      }
    }

    .lecture-list {
    }
  }
</style>
