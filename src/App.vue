<template>
  <div id="app">
    <template v-if="isLoaded">
      <nav>
        <div class="main-menu">
          <router-view name="menubar"></router-view>
        </div>
        <div class="common-menu">
          <router-link :to="{ name: 'Login' }" v-if="!$store.state.me">로그인</router-link>
          <a href="#" v-if="$store.state.me" @click="logout">로그아웃</a>
          <router-link :to="{ name: 'Home' }" class="logo">HeekTime</router-link>
        </div>
      </nav>
      <router-view class="app-content"></router-view>
    </template>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT');
      // TODO: reload?
    },
  },
  created() {
    if (window.localStorage.getItem('access_token') !== null) {
      this.$store.dispatch('FETCH_ME')
        .then(() => { this.isLoaded = true; })
        .catch(() => this.$store.dispatch('LOGOUT'));
    } else {
      this.isLoaded = true;
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

    .common-menu {
      display: flex;
      flex-direction: row;
      align-items: center;

      > * {
        margin-left: 32px;
      }
      > a {
        color: #222;
        text-decoration: none;
      }

      .logo {
        color: #888;
      }
    }
  }
</style>
