<template>
  <div class="user-container">
    <router-view class="user-container-content" v-if="isLoaded"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'user-container',
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
        const userId = this.$store.state.usernames[this.username];
        return this.$store.state.users[userId];
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
  .user-container {
    display: flex;

    .user-container-content {
      flex: 1;
    }
  }
</style>
