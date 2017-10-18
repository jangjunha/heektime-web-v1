<template>
  <div class="col" :class="{ 'header-col': header }">
    <timetable-row header :header-val="headerVal"></timetable-row>
    <div class="times-wrapper">
      <timetable-row class="row-time" v-for="hour in hours" :key="'row-' + hour" :header-val="header ? hour : null"></timetable-row>

      <!-- Size guide for items -->
      <div class="items-wrapper" :style="{ height: `${100 / timeRows}%` }">
        <timetable-item
          v-for="item in allItems"
          :key="'item-' + item.weekday + '-' + item.timeBegin + item.timeEnd"
          :item="item"
          :style="styleFor(item)"
          :class="{ preview: item.preview, overlapped: item.preview && isOverlap(item) }"
          :editable="editable"
          @delete="$emit('delete-lecture', item.lecture.id)"
        ></timetable-item>
      </div>
    </div>
  </div>
</template>

<script>
  import TimetableRow from '@/components/TimetableRow';
  import TimetableItem from '@/components/TimetableItem';

  import { overlap } from '@/util';

  export default {
    name: 'timetable-column',
    components: { TimetableRow, TimetableItem },
    props: {
      header: {
        type: Boolean,
        default: false,
      },
      'header-val': {
        type: [String, Number],
        default: null,
      },
      items: {
        type: Array,
        default() { return []; },
      },
      'preview-items': {
        type: Array,
        default() { return []; },
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        beginTime: 540,
        timeRows: 10,
      };
    },
    computed: {
      hours() {
        return Array(this.timeRows).fill().map((_, i) => (this.beginTime / 60) + i);
      },
      wrapperHeight() {

      },
      allItems() {
        return [...this.items, ...this.previewItems.map(item => ({ ...item, preview: true }))];
      },
    },
    methods: {
      toRelative(minute) {
        return minute - this.beginTime;
      },
      toPercent(minute) {
        return `${((minute / 60) * 100)}%`;
      },
      styleFor(item) {
        return {
          left: 0,
          right: 0,
          top: this.toPercent(this.toRelative(item.timeBegin)),
          height: `calc(${this.toPercent(item.timeEnd - item.timeBegin)} + 1px)`,
        };
      },
      isOverlap(targetItem) {
        return this.items.filter(item => overlap(
          targetItem.timeBegin, targetItem.timeEnd, item.timeBegin, item.timeEnd,
        )).length > 0;
      },
    },
  };
</script>

<style lang="scss">
  @import '~styles/settings-timetable.scss';

  .col {
    display: flex;
    flex-direction: column;

    .times-wrapper {
      flex: 1;

      display: flex;
      flex-direction: column;
      position: relative;

      .row-time {
        flex: 1;
        border-top: 1px solid $grid-color;
      }

      .items-wrapper {
        top: 0;
        left: 0;
        right: 0;
        position: absolute;
        margin-top: 1px;
        box-sizing: border-box;
      }
    }
  }
</style>
