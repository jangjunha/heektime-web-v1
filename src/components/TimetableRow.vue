<template>
  <div class="row" :class="{ 'header-row': header }">
    <span class="header" v-if="headerVal">{{ headerVal }}</span>
  </div>
</template>

<script>
  export default {
    name: 'timetable-row',
    props: {
      header: {
        type: Boolean,
        default: false,
      },
      'header-val': {
        type: [String, Number],
        default: null,
      },
    },
  };
</script>

<style lang="scss">
  .row {
  }
</style>
