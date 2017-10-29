<template>
  <div class="select-button">
    <div
      class="select-button-item"
      v-for="option in options"
      :key="`select-button-option-${option.value}`"
      :class="{ selected: isSelected(option) }"
      @click="selectOption(option)"
    >{{ option.title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'select-button',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: Array,
        default() {
          return [];
        },
      },
      options: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        selected: new Set(),
      };
    },
    methods: {
      selectOption(option) {
        if (this.isSelected(option)) {
          this.selected.delete(option.value);
        } else {
          this.selected.add(option.value);
        }
        this.$forceUpdate();
        this.$emit('change', [...this.selected]);
      },
      isSelected(option) {
        return this.selected.has(option.value);
      },
    },
    watch: {
      value() {
        this.selected = new Set(this.value);
      },
    },
    created() {
      this.selected = new Set(this.value);
    },
  };
</script>

<style lang="scss">
  .select-button {
    display: flex;
    flex-direction: row;

    .select-button-item {
      width: 1.6em;
      height: 1.6em;
      border: 1px solid #ccc;
      cursor: pointer;
      user-select: none;

      display: flex;
      justify-content:center;
      align-content:center;
      flex-direction:column;
      text-align: center;

      &.selected {
        background-color: #5555ff;
        color: white;
      }

      &:not(:first-child) {
        margin-left: -1px;
      }
    }
  }
</style>
