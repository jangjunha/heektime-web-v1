<template>
  <div class="lecture-detail">
    <h5 class="lecture-title">{{ lecture.title }}</h5>
    <hr>
    <dl class="details">
      <dt>학수번호</dt>
      <dd>{{ lecture.identifier }}</dd>
      <dt>교수</dt>
      <dd>{{ lecture.professor }}</dd>
      <dt>학점</dt>
      <dd>{{ lecture.credit }}</dd>
      <dt>시간</dt>
      <dd>
        <ul class="times">
          <li v-for="(time, index) in lecture.times" :key="'lecture-time-' + lecture.identifier + '-' + index">
            <span class="time">{{ shortWeekdays[time.weekday] }} {{ time.periodBegin }}<template v-if="time.periodBegin !== time.periodEnd">-{{ time.periodEnd }}</template></span>
            <span class="room">{{ time.room }}</span>
          </li>
        </ul>
      </dd>
      <dt>분류</dt>
      <dd>
        {{ lecture.category.join(' > ') }}
      </dd>
      <dt>기타</dt>
      <dd>
        <ul class="tags">
          <li v-for="tag in lecture.tags" :key="'tag-' + tag.name">{{ tag.name }}</li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
  import { shortWeekdays } from '@/util/constants';

  export default {
    name: 'lecture-detail',
    props: {
      lecture: {
        type: Object,
      },
    },
    data() {
      return {
        shortWeekdays,
      };
    },
  };
</script>

<style lang="scss">
  .lecture-detail {
    .lecture-title {
      font-size: 16pt;
      margin: 8px 0;
    }
    .details {
      dt {
        font-weight: bold;
      }
      dd {
        ul {
          padding-left: 20px;
          margin: 0;
        }

        &:not(:last-child) {
          margin-bottom: 12px;
        }
      }
    }
  }
</style>
