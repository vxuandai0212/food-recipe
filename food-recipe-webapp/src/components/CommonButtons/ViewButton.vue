<template>
  <el-tooltip v-if="show" :content="tooltip" placement="top-start" effect="dark" :open-delay="300">
    <el-button
      type="success"
      size="default"
      class="btn-icon d-inline-block"
      @click="$emit('click')"
    >
      <svg-icon icon-class="eye" style="height: 14px; vertical-align: middle;" />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LockButton extends Vue {
  @Prop({ type: Boolean, default: true }) readonly show!: boolean;
  @Prop({ type: String, default: 'Xem' }) readonly tooltip!: string
}
</script>
