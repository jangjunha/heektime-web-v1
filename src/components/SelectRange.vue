<template>
  <div class="select-range">
    <input type="number" v-model="v0" :min="minimum" :max="v1" @change="updateValue">
    <span>-</span>
    <input type="number" v-model="v1" :min="v0" :max="maximum" @change="updateValue">
  </div>
</template>

<script>
  export default {
    name: 'select-range',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      minimum: {
        type: Number,
        default: 0,
      },
      maximum: {
        type: Number,
        default: 9,
      },
      value: {
        type: Array,
        default() {
          return [this.minimum, this.maximum];
        },
      },
    },
    data() {
      return {
        v0: this.minimum,
        v1: this.maximum,
      };
    },
    methods: {
      updateValue() {
        this.$emit('change', [this.v0, this.v1]);
      },
    },
    watch: {
      value() {
        this.v0 = this.value[0];
        this.v1 = this.value[1];
      },
    },
    created() {
      this.v0 = this.value[0];
      this.v1 = this.value[1];
    },
  };
</script>

<style lang="scss">
  .select-range {
    input[type=number] {
      border: 1px solid #ccc;
      font-size: 12pt;
      height: 1.6em;
      box-sizing: border-box;
      text-align: center;
    }
  }
</style>
