<template>
  <div class="timetable-item" @mouseenter="mouseover = true" @mouseleave="mouseover = false">
    <ul class="overlay-menu" v-if="showMenu">
      <li class="danger" @click="$emit('delete')">X</li>
    </ul>

    <p class="title">{{ item.lecture.title }}</p>
    <p class="meta" v-if="false">{{ item.lecture.professor }}</p>
    <p class="meta">{{ item.room }}</p>
  </div>
</template>

<script>
  export default {
    name: 'timetable-item',
    props: {
      item: {
        type: Object,
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      showMenu() {
        return this.editable && this.mouseover;
      },
    },
    data() {
      return {
        mouseover: false,
      };
    },
  };
</script>

<style lang="scss">
  @import '~styles/settings-timetable.scss';

  .timetable-item {
    padding: 4px;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    overflow: hidden;
    word-break: break-all;

    .overlay-menu {
      position: absolute;
      top: 2px;
      right: 4px;

      list-style: none;
      margin: 0;
      padding: 0;
      color: #444;
      font-weight: 900;
      text-shadow: 0 0 2px white;

      display: flex;
      flex-direction: row;

      > li {
        cursor: pointer;

        &.danger {
          color: #ff4444;
        }
      }
    }

    .title {
      margin: 4px 0;
      font-weight: bold;
    }
    .meta {
      margin: 2px 0;
      color: #444;
    }

    &.preview {
      background: repeating-linear-gradient(
          -45deg,
          rgba(#FFFF96, 0.66),
          rgba(#FFFF96, 0.66) 10px,
          rgba(#F2F28C, 0.66) 0,
          rgba(#F2F28C, 0.66) 20px
      );
      z-index: 2 !important;
    }

    &.overlapped {
      background: repeating-linear-gradient(
          -45deg,
          rgba(#FF9696, 0.66),
          rgba(#FF9696, 0.66) 10px,
          rgba(#F22A30, 0.66) 0,
          rgba(#F22A30, 0.66) 20px
      );
      color: white;
      border: 1px solid #ff5f66;

      .title, .meta {
        color: white;
      }
    }
  }
</style>
