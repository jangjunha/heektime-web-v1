<template>
  <div class="user-view">
    <router-view class="user-view-content" v-if="isLoaded"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'user-view',
    data() {
      return {
        isLoaded: false,
      };
    },
    computed: {
      username() {
        return this.$route.params.username;
      },
      user() {
        return this.$store.state.usernames[this.username];
      },
    },
    methods: {
      updateUsernames() {
        this.isLoaded = false;
        this.$store.dispatch('FETCH_USER_BY_USERNAME', { username: this.username })
          .then(() => { this.isLoaded = true; });
      },
    },
    watch: {
      username() {
        this.updateUsernames();
      },
    },
    created() {
      this.updateUsernames();
    },
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
