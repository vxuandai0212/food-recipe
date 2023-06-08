<template>
  <el-row>
    <el-col :span="21">
      <el-col style="max-width:800px " :span="23">
        <el-radio-group v-model="rangeTime" class="radio-button-group" @change="changeRadioTime">
          <el-radio-button :label="300000">5m</el-radio-button>
          <el-radio-button :label="1800000">30m</el-radio-button>
          <el-radio-button :label="3600000">1h</el-radio-button>
          <el-radio-button :label="10800000">3h</el-radio-button>
          <el-radio-button :label="21600000">6h</el-radio-button>
          <el-radio-button :label="43200000">12h</el-radio-button>
          <el-radio-button :label="86400000">1d</el-radio-button>
          <el-radio-button :label="259200000">3d</el-radio-button>
          <el-radio-button :label="604800000">7d</el-radio-button>
          <el-radio-button :label="2592000000">30d</el-radio-button>
          <el-radio-button :label="7776000000">90d</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-col>

    <el-col :span="3" style="text-align: right">

      <date-range-picker
        ref="dateRangePicker"
        v-model="dateTimeRange"
        class="dateRangePicker-notify"
        :auto-apply="true"
        opens="left"
        :single-date-picker="'range'"
        :ranges="false"
        @update="changeTimeRange"
      >
        <span slot="input">
          <el-button type="info" plain size="medium" class="btn-icon">
            <svg-icon style="width: 24px; height: 24px" icon-class="calendar" />
          </el-button>
        </span>
      </date-range-picker>

    </el-col>
  </el-row>
</template>

<script lang="ts">
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Pagination from '@/components/Pagination/index.vue';

@Component({
  components: { Pagination, DateRangePicker }
})

export default class RadioTime extends Vue {
  @Prop() dateRangePickerFrom:any
  @Prop() dateRangePickerTo:any
  private rangeTime: any = 300000;
  private dateTimeRange: any = {};

  @Watch('dateRangePickerFrom')
  onDateRangePickerFromChanged() {
    if (this.dateRangePickerTo - this.dateRangePickerFrom === 300000) {
      this.rangeTime = 300000
    }
  }

  public nextRange():void {
    if (parseInt(this.rangeTime) === 8) {
      this.rangeTime = '1'
    } else {
      const temp = parseInt(this.rangeTime) + 1;
      this.rangeTime = temp.toString()
    }
  }
  public dateTimeRangePicker():void {
    (this.$refs.dateRangePicker as any).togglePicker(true)
  }
  public changeRadioTime():void {
    const now = new Date().getTime();
    this.$emit('update:dateRangePickerFrom', now - this.rangeTime)
    this.$emit('update:dateRangePickerTo', now)
    this.$emit('changeDateRangePicker', { dateRangePickerFrom: now - this.rangeTime, dateRangePickerTo: now })
  }
  public changeTimeRange():void{
    this.$emit('update:dateRangePickerFrom', this.dateTimeRange.startDate ? this.dateTimeRange.startDate.getTime() : null)
    this.$emit('update:dateRangePickerTo', this.dateTimeRange.endDate ? this.dateTimeRange.endDate.getTime() : null)
    this.$emit('changeDateRangePicker', { dateRangePickerFrom: this.dateTimeRange.startDate ? this.dateTimeRange.startDate.getTime() : null, dateRangePickerTo: this.dateTimeRange.endDate ? this.dateTimeRange.endDate.getTime() : null })
  }
}
</script>

<style scoped>

</style>
