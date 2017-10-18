<template>
  <div class="modal-wrapper" v-if="visible" @click.self="dismiss">
    <div class="modal-dialog">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'popup-modal',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      dismiss() {
        this.visible = false;
        this.$emit('dismiss');
      },
    },
    watch: {
      show(value) {
        this.visible = value;
      },
    },
    created() {
      this.visible = this.show;
    },
  };
</script>

<style lang="scss">
  .modal-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(#000, 0.5);
    z-index: 1072;
    overflow-y: scroll;

    .modal-dialog {
      position: relative;
      margin: 30px auto;
      max-width: 500px;
      box-shadow: 0 20px 80px rgba(#000, 0.25);

      .modal-content {
        background: white;
        border: 1px solid #ccc;
      }
    }
  }
</style>
