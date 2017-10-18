<template>
  <div class="search-lecture">
    <div class="section-filter">
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
  import LectureList from '@/components/LectureList';

  export default {
    name: 'search-lecture',
    components: { LectureList },
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
      };
    },
    computed: {
      filteredLectures() {
        if (!this.keyword) return this.lectures;

        return this.lectures.filter(lecture => (
            (lecture.identifier && lecture.identifier.toLowerCase().indexOf(this.keyword) !== -1) ||
            (lecture.title && lecture.title.toLowerCase().indexOf(this.keyword) !== -1) ||
            (lecture.professor && lecture.professor.toLowerCase().indexOf(this.keyword) !== -1)
        ));
      },
    },
    methods: {
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
