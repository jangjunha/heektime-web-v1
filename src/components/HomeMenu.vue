<template>
  <div class="menu">
    <div class="sub-menu">
      <router-link :to="{ name: 'User', params: { username: this.me.username } }" v-if="this.me">내 시간표</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        internalSemester: null,
      };
    },
    computed: {
      me() {
        return this.$store.state.me;
      },
    },
    methods: {
    },
    watch: {

    },
    created() {
    },
  };
</script>

<style lang="scss" scoped>
  .menu {
    display: flex;
    flex-direction: row;

    .sub-menu {
      display: flex;
      flex-direction: row;
      align-items: center;

      > * {
        margin: 0 8px;
        text-decoration: none;
        color: #444;
      }
    }
  }
</style>
