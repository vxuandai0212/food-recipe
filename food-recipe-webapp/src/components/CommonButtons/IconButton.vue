<template>
  <el-tooltip v-if="show" :content="note" placement="top-start" effect="dark" :open-delay="300">
    <el-button
      :type="type"
      size="default"
      class="btn-icon d-inline-block"
      @click="$emit('click')"
    >
      <svg-icon :icon-class="icon" style="height: 14px; vertical-align: middle;" />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class IconButton extends Vue {
  @Prop({ type: Boolean, default: true }) readonly show!: boolean;
  @Prop({ type: String, default: 'Tooltip message' }) readonly note!: string;
  @Prop({ type: String, default: 'default' }) readonly type!: string;
  @Prop({ type: String, default: 'eye' }) readonly icon!: string;
}
</script>
