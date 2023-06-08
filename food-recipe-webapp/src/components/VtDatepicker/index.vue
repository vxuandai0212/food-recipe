<template>
  <div>
    <date-range-picker
      ref="dateRangePicker"
      :key="key"
      v-model="dateRange"
      style="width: 100%;"
      :auto-apply="true"
      opens="right"
      :single-date-picker="true"
      :ranges="false"
      :min-date="minDate"
      :max-date="maxDate"
      @select="onSelect"
    >
      <span slot="input">
        <VtInput
          :label="label"
          class="vt-datepicker-input"
          :value="dateInStr"
          @change="onInputChange"
          @enter="onInputChange"
        />
        <svg-icon icon-class="calendar" class="date-icon" />
      </span>
    </date-range-picker>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import VtInput from '@/components/VtInput/index.vue';
import { parseTime } from '@/utils/common';

@Component({
  components: { DateRangePicker, VtInput }
})
export default class VtDatePicker extends Vue {
  @Prop([Date, Number, String]) readonly value!: any;
  @Prop({ default: '' }) readonly label!: string;
  @Prop({ default: null }) readonly minDate!: Date | String;
  @Prop({ default: null }) readonly maxDate!: Date | String;
  dateRange: any = {};
  key = 0;

  get dateInStr(): string {
    if (this.dateRange.startDate) {
      return parseTime(new Date(this.dateRange.startDate), '{d}/{m}/{Y}')
    } else {
      return '';
    }
  }

  @Watch('value', { immediate: true, deep: true })
  onValueChanged(val: any) {
    if (val) {
      if (typeof (this.value) === 'number' || typeof (this.value) === 'string') {
        this.dateRange = {
          startDate: new Date(this.value),
          endDate: new Date(this.value)
        }
      }
    } else {
      this.dateRange = {
        startDate: null,
        endDate: null
      }
    }
  }

  created() {

  }

  onSelect({ startDate }) {
    this.$emit('input', (startDate as Date).getTime());
  }
  onInputChange(value: string) {
    if (!value.trim()) {
      this.$emit('input', null)
    } else {
      const arr = value.split('/')
      if (arr.length === 3) {
        const date = new Date(Number(arr[2]), Number(arr[1]) - 1, Number(arr[0]))
        this.$emit('input', date.getTime())
      }
    }
    (this.$refs.dateRangePicker as any).togglePicker(false);
  }
}
</script>
<style lang="scss" scoped>
.date-icon {
  position: absolute;
  top: 22px;
  right: 16px;
}
</style>
