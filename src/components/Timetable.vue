<template>
  <div class="timetable">
    <timetable-column header></timetable-column>
    <timetable-column
      v-for="weekday in weekdays"
      :key="'column-' + weekday"
      :header-val="weekdayNames[weekday]"
      :items="weekdayItems(weekday)"
      :preview-items="weekdayPreviewItems(weekday)"
      :editable="editable"
      @delete-lecture="(lectureId) => $emit('delete-lecture', lectureId)"
    >
    </timetable-column>
  </div>
</template>

<script>
  import TimetableColumn from '@/components/TimetableColumn';

  export default {
    name: 'timetable',
    components: { TimetableColumn },
    props: {
      timetable: {
        type: Object,
      },
      'preview-lectures': {
        type: Array,
        default() {
          return [];
        },
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        weekdays: [0, 1, 2, 3, 4],
        weekdayNames: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      };
    },
    computed: {
      items() {
        return this.toItems(this.timetable.lectures);
      },
      previewItems() {
        return this.toItems(this.previewLectures);
      },
    },
    methods: {
      toItems(lectures) {
        return lectures.reduce((res, lecture) => [
          ...res,
          ...lecture.times.map(time => ({ ...time, lecture })),
        ], []);
      },
      weekdayItems(weekday) {
        return this.items.filter(item => item.weekday === weekday);
      },
      weekdayPreviewItems(weekday) {
        return this.previewItems.filter(item => item.weekday === weekday);
      },
    },
  };
</script>

<style lang="scss">
  @import '~styles/settings-timetable.scss';

  .timetable {
    $grid-color: #e4e4e4;

    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;

    font-size: 10pt;

    .col {
      flex: 1;

      &:not(:first-child) {
        border-left: 1px solid $grid-color;
      }

      .timetable-item {
        position: absolute;
        box-sizing: border-box;
        margin: -1px;
        z-index: 1;
      }
    }

    .row {
      height: $timetable-time-height;
      display: flex;

      &:not(:first-child) {
        border-top: 1px solid $grid-color;
      }
    }

    .header-col {
      max-width: 40px;

      .row {
        justify-content: flex-end;
      }
    }

    .header-row {
      max-height: $header-height;

      align-items: center;
      justify-content: center;
    }
  }
</style>
