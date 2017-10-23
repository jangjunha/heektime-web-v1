<template>
  <div class="select-menu">
    <div class="select" :class="{ disabled }" @focus="selectFocused=true" @focusout="selectFocused=false" tabindex="1">
      <span><slot name="selected" :option="selected">선택하세요</slot> ▾&nbsp;️</span>
    </div>

    <ul class="option-list" v-show="open" @mouseenter="optionFocused=true" @mouseleave="optionFocused=false">
      <li v-for="option in options" :class="{ selected: selected === option }" @click="selectOption(option)">
        <slot name="option" :option="option"><span>{{ option }}</span></slot>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'select-option',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      value: {
        type: Object,
      },
      options: {
        type: Array,
        default() {
          return [];
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        selected: null,
        selectFocused: false,
        optionFocused: false,
        open: false,
      };
    },
    computed: {
    },
    methods: {
      selectOption(option) {
        this.selected = option;
        this.$emit('change', this.selected);
        this.open = false;
      },
    },
    watch: {
      value() {
        this.selected = this.value;
      },
      selectFocused() {
        this.open = this.selectFocused || this.optionFocused;
      },
      optionFocused() {
        this.open = this.selectFocused || this.optionFocused;
      },
    },
    created() {
      this.selected = this.value;
    },
  };
</script>

<style lang="scss">
  @import '~styles/settings.scss';

  .select-menu {
    position: relative;

    .select {
      color: #666;
      cursor: pointer;

      &.disabled {
        color: #ccc;
      }
    }

    .option-list {
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px 0;

      list-style: none;
      white-space: nowrap;

      position: absolute;
      right: 0;
      min-width: 100%;
      flex-shrink: 0;

      li {
        cursor: pointer;

        > * {
          display: block;
          padding: 4px 12px;
          color: black;
          text-decoration: none;
        }

        &:hover {
          background-color: #eaeaea;
        }

        &.selected {
          background-color: $tint-color;
          color: white;

          > * {
            color: white;
          }
        }
      }
    }
  }
</style>
