<template>
  <div class="login-form">
    <h1>회원가입</h1>

    <form @submit.prevent="signup">
      <div class="input-group">
        <input type="text" v-model="username" placeholder="사용자 이름" minlength="4">
        <p class="text-mute">4글자 이상</p>

        <input type="password" v-model="password" placeholder="비밀번호" minlength="8">
        <p class="text-mute">8글자 이상</p>
      </div>

      <div class="input-group">
        <input type="text" v-model="name" placeholder="이름" minlength="2">
        <p class="text-mute">2글자 이상</p>
      </div>
      <div class="input-group">
        <input type="submit" value="가입" :disabled="!username || !password || !name">
      </div>
    </form>
  </div>
</template>

<script>
  import { UserAPI } from '@/api';

  export default {
    name: 'signup-form',
    data() {
      return {
        username: '',
        password: '',
        name: '',
      };
    },
    methods: {
      signup() {
        UserAPI.signup({ username: this.username, password: this.password, name: this.name })
          .then(() => {
            this.$router.push({
              name: 'Login',
            });
          })
          .catch((error) => {
            alert(`가입 실패: ${error.message}`);
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~styles/settings.scss';

  .login-form {
    margin: 0 auto;

    .text-mute {
      font-size: 9pt;
      color: #888;
      margin: 0 4px 2px 4px;
      text-align: right;
    }

    form {
      width: 100%;
      display: flex;
      flex-direction: column;

      .input-group {
        margin: 6px 0;

        display: flex;
        flex-direction: column;
      }

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

        &:disabled {
          background-color: #ccc;
        }
      }

      input[type=text], input[type=password] {

      }
    }
  }
</style>
