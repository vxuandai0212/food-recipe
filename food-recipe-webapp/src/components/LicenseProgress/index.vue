<template>
  <el-tooltip class="item" effect="dark" :content="content" placement="bottom-end">
    <el-progress :percentage="percentage" :format="format" />
  </el-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  computed: {}
})
export default class LicenseProgress extends Vue {
  @Prop({ type: Number, required: true }) from!: number
  @Prop({ type: Number, required: true }) to!: number

  get content() {
    return 'Từ ngày 20/10/2021 đến hết ngày 20/10/2022'
  }

  get percentage() {
    return 80
  }

  format(percentage) {
    return percentage === 100 ? 'Hết hạn' : 'Còn lại 2 tháng sử dụng'
  }
}
</script>
<style scoped></style>
