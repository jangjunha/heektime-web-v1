<template>
  <div>
    <table class="lectures-table">
      <tr>
        <th>학수번호</th>
        <th>강의명</th>
        <th>교수</th>
        <th>학점</th>
        <th>시간</th>
        <th>강의실</th>
      </tr>
      <tr
        v-for="lecture in lectures"
        @mouseenter="$emit('lecture-mouseenter', lecture)"
        @mouseleave="$emit('lecture-mouseenter', null)"
        @click="$emit('lecture-click', lecture)"
        :class="{ overlapped: isOverlap(lecture) }"
      >
        <td class="nowrap short">{{ lecture.identifier }}</td>
        <td>{{ lecture.title }}</td>
        <td class="short">{{ lecture.professor }}</td>
        <td class="short">{{ lecture.credit }}</td>
        <td class="short">{{ displayTime(lecture.times) }}</td>
        <td class="short">{{ displayRoom(lecture.times) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { shortWeekdays } from '@/util/constants';
  import { overlap } from '@/util';

  export default {
    name: 'lecture-list',
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
    methods: {
      displayTime(times) {
        if (!times) return '';

        const formattedTimes = times.map((time) => {
          const weekday = shortWeekdays[time.weekday];
          return time.periodBegin === time.periodEnd
            ? `${weekday}${time.periodBegin}`
            : `${weekday}${time.periodBegin}-${time.periodEnd}`;
        });
        return formattedTimes.join(', ');
      },
      displayRoom(times) {
        if (!times) return '';

        return Array.from(new Set(times.map(time => time.room))).join(', ');
      },
      isOverlap(lecture) {
        if (!this.filledTimes) return false;

        for (let i = 0; i < this.filledTimes.length; i += 1) {
          if (!lecture.times) continue;  // eslint-disable-line no-continue

          const t0 = this.filledTimes[i];

          for (let j = 0; j < lecture.times.length; j += 1) {
            const t1 = lecture.times[j];
            if (
              t0.weekday === t1.weekday &&
              overlap(t0.timeBegin, t0.timeEnd, t1.timeBegin, t1.timeEnd)
            ) {
              return true;
            }
          }
        }
        return false;
      },
    },
  };
</script>

<style lang="scss">
  .lectures-table {
    border-collapse: collapse;
    width: 100%;

    th {
      background-color: #f0f0f0;
    }

    th {
      word-break: keep-all;
    }
    th, td {
      border-bottom: 1px solid #e4e4e4;
      padding: 4px;
    }

    td {
      cursor: pointer;

      &.nowrap {
        white-space: nowrap;
      }
      &.short {
        max-width: 300px;
      }
    }

    tr {
      &.overlapped {
        color: #ccc;
      }

      &:nth-child(odd) {
        background-color: #f8f8f8;
      }

      &:hover {
        background-color: #ffffcc;
      }
    }
  }
</style>
