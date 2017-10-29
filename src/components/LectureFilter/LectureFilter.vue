<script>
  import { shortWeekdays } from '@/util/constants';
  import ToggleableFilter from '@/components/LectureFilter/ToggleableFilter';
  import SelectButton from '@/components/SelectButton';
//  import SelectRange from '@/components/SelectRange';

  export default {
    name: 'lecture-filter',
    components: { ToggleableFilter, SelectButton },
    data() {
      return {
        emptyOnlyEnabled: false,

        weekdaysEnabled: false,
        weekdaysAvailables: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [0, 1, 2, 3, 4, 5, 6],

        periodEnabled: false,
        periodRangeAvailable: [0, 12],
        periodRange: [0, 12],
      };
    },
    render(h) {
      const filters = [
        {
          name: '빈 시간대만',
          onToggle: (value) => {
            this.emptyOnlyEnabled = value;
            this.$emit('update:emptyOnlyEnabled', value);
          },
        },
        {
          name: '요일',
          filter: h(SelectButton, {
            props: {
              options: this.weekdaysAvailables.map(o => ({ title: shortWeekdays[o], value: o })),
              value: this.weekdays,
            },
            on: {
              change: (value) => {
                this.weekdays = value;
                this.$emit('update:weekdays', value);
              },
            },
          }),
          onToggle: (value) => {
            this.weekdaysEnabled = value;
            this.$emit('update:weekdaysEnabled', value);
          },
        },
//        {
//          name: '교시',
//          filter: h(SelectRange, {
//            props: {
//              value: this.periodRange,
//              minimum: this.periodRangeAvailable[0],
//              maximum: this.periodRangeAvailable[1],
//            },
//            on: {
//              change: (value) => {
//                this.periodRange = value;
//                this.$emit('update:periodRange', value);
//              },
//            },
//          }),
//          onToggle: (value) => {
//            this.periodEnabled = value;
//            this.$emit('update:periodEnabled', value);
//          },
//        },
      ];
      const toggleableFilters = filters.map(f =>
        h(ToggleableFilter, {
          props: { title: f.name },
          on: { change: f.onToggle },
        }, [f.filter]),
      );

      return h('div', { class: 'lecture-filter' }, toggleableFilters);
    },
  };
</script>

<style lang="scss">
  .lecture-filter {
    height: 1.8em;
    display: flex;
    flex-direction: row;

    > *:not(:last-child) {
      margin-right: 18px;
    }
  }
</style>
