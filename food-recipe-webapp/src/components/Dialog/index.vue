<template>
  <div>
    <el-dialog
      :visible.sync="visibleDialog"
      :width="width"
      :top="top"
      :close-on-click-modal="closeOnClickModal"
      @open="onOpenDialog"
      @close="onCloseDialog"
    >
      <template #title>
        <h2 class="primary">{{ title }}</h2>
      </template>
      <slot />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MyDialog extends Vue {
  @Prop({ default: '600px' }) readonly width!: string
  @Prop({ default: '5vh' }) readonly top!: string
  @Prop({ default: 'Tiêu đề dialog' }) readonly title!: string
  @Prop({ default: false }) readonly visible!: boolean
  @Prop({ default: false }) readonly closeOnClickModal!: boolean

  get visibleDialog() {
    return this.visible
  }

  set visibleDialog(value) {
    this.$emit('on-change-visible-dialog', value)
  }

  onCloseDialog() {
    this.$emit('on-close-dialog')
  }

  onOpenDialog() {
    this.$emit('on-open-dialog')
  }
}

</script>
