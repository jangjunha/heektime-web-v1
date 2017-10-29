<template>
  <div class="toggleable-filter">
    <p class="title" @click="updateValue(!enabled)" :class="{ enabled }">{{ title }}</p>
    <transition name="toggle-transition" class="filter">
      <slot v-if="enabled"></slot>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'toggleable-filter',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      title: {
        type: String,
        default: 'Toggle',
      },
    },
    data() {
      return {
        enabled: false,
      };
    },
    methods: {
      updateValue(value) {
        this.enabled = value;
        this.$emit('change', this.enabled);
      },
    },
  };
</script>

<style lang="scss">
  .toggleable-filter {
    display: flex;
    flex-direction: row;
    align-items: center;

    .title {
      font-weight: bold;
      color: #888;
      cursor: pointer;
      margin: 0 8px;
      user-select: none;

      &.enabled {
        color: #5555ff;
      }
    }
  }

  .toggle-transition-enter-active, .toggle-transition-leave-active {
    transition: transform .2s ease, opacity .2s linear;
  }

  .toggle-transition-enter, .toggle-transition-leave-to {
    transform: translateX(-4px);
    opacity: 0;
  }
</style>
