<template>
  <div class="user-view">
    <router-view class="user-view-content"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'user-view',
  };
</script>

<style lang="scss">
  .user-view {
    display: flex;

    .user-view-content {
      flex: 1;
    }
  }
</style>
