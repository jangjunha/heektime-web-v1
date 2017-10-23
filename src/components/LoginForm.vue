<template>
  <div class="login-form">
    <h1>로그인</h1>

    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="사용자 이름">
      <input type="password" v-model="password" placeholder="비밀번호">
      <input type="submit" value="로그인">
    </form>
  </div>
</template>

<script>
  import { AuthAPI } from '@/api';
  import { errorCodes, setAccessToken, setRefreshToken } from '@/api/base';

  export default {
    name: 'login-form',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        AuthAPI.getAccessToken(this.username, this.password)
          .then((data) => {
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);

            return this.$store.dispatch('FETCH_ME');
          })
          .then(() => {
            this.$router.push({
              name: 'User',
              params: { username: this.$store.state.me.username },
            });
          })
          .catch((error) => {
            if (error.code === errorCodes.INVALID_USER_CREDENTIALS) {
              alert('사용자 이름 또는 비밀번호가 잘못되었습니다.');
            } else {
              alert(`로그인 실패 - ${error.message}`);
            }
          });
      },
    },
  };
</script>

<style lang="scss">
  @import '~styles/settings.scss';

  .login-form {
    margin: 0 auto;

    form {
      width: 100%;
      display: flex;
      flex-direction: column;

      input {
        width: 320px;
        padding: 8px 8px;
        margin: 4px 0;
        font-size: 12pt;
        box-sizing: border-box;
      }

      input[type=submit] {
        border: none;
        background-color: $tint-color;
        color: white;

        &:hover {
          background-color: darken($tint-color, 10);
        }
      }

      input[type=text], input[type=password] {

      }
    }
  }
</style>
