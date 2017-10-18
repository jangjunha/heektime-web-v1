<template>
  <div class="col" :class="{ 'header-col': header }">
    <timetable-row header :header-val="headerVal"></timetable-row>
    <timetable-row v-for="n in 10" :key="'row-' + n" :header-val="header ? (n + 8) : null"></timetable-row>

    <!-- Size guide for items -->
    <div class="items-wrapper">
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
      return { beginTime: 540 };
    },
    computed: {
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
          height: this.toPercent(item.timeEnd - item.timeBegin),
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
    position: relative;

    .items-wrapper {
      height: $timetable-time-height;
      position: absolute;
      top: $header-height + 1; // border size
      left: 0;
      right: 0;
    }
  }
</style>
