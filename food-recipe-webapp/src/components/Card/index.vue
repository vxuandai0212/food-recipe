<template>
  <el-col
    v-loading="loading"
    :style="{
      borderRadius: '20px',
      background: '#FFFFFF',
      padding: '24px 24px 32px 32px',
      width: width
    }"
  >
    <h2 class="primary" style="margin-bottom: 24px">{{ title }}</h2>
    <el-col>
      <slot />
    </el-col>
  </el-col>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Card extends Vue {
  @Prop({ type: String, default: 'calc(63% - 16px)' }) readonly width!: String
  @Prop({ type: String, default: 'Tiêu đề card' }) readonly title!: String
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
}
</script>
<style lang="scss"></style>
