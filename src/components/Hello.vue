<template>
  <div class="hello">
    <h1>HeekTime</h1>

    <section>
      <p>HeekTime으로 편리하게 다음학기 시간표를 짜 보세요.</p>
      <img src="https://s3.ap-northeast-2.amazonaws.com/heektime-resource/images/heektime-screenshot-171019-2.png" alt="스크린샷" class="screenshot">
    </section>

    <section>
      <p>친구의 시간표도 볼 수 있어요. <a href="https://heektime.heek.kr/user/jangjunha/timetable/3cfb7a952fb544f1ae3e2194f7a141af">제 시간표를 확인해보세요!</a></p>
    </section>

    <section>
      <p>모바일에서도 사용할 수 있습니다. (iOS만 지원)</p>
      <a href="https://itunes.apple.com/mr/app/heektime-hiigtaim/id1134379996" target="_blank">
        <img src="https://s3.ap-northeast-2.amazonaws.com/heektime-resource/images/app_store.svg" alt="Available on App Store">
      </a>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  section {
    margin: 32px 0 64px 0;
  }

  img {
    max-width: 100%;

    &.screenshot {
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 8px 32px rgba(#444, 0.1);
    }
  }

  .hello {
    width: 800px;
    margin: 0 auto;
  }
</style>
