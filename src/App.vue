<template>
  <div id="app">
    <nav>
      <router-view name="menubar"></router-view>
      <p>HeekTime</p>
    </nav>
    <router-view class="app-content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (window.localStorage.getItem('access_token') !== null) {
      this.$store.dispatch('FETCH_ME');
    }
  },
};
</script>

<style lang="scss">
  @import '~styles/settings.scss';

  html, body {
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .app-content {
    flex: 1;
  }

  nav {
    min-height: $navbar-height;
    padding: 0 22px;
    border-bottom: 1px solid #ddd;
    background-color: #f8f8f8;
    width: 100%;
    box-sizing: border-box;
    z-index: 100;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
