<template>
  <el-tooltip v-if="show" content="Hủy mời" placement="top-start" effect="dark" :open-delay="300">
    <el-button
      type="danger"
      plain
      size="medium"
      class="btn-icon cancel-button"
      @click="$emit('click')"
    >
      <svg-icon icon-class="cancel" />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CancelButton extends Vue {
  @Prop({ type: Boolean, default: true }) readonly show!: boolean;
}
</script>
<style lang="scss">
.cancel-button .svg-icon {
  vertical-align: middle;
}
</style>
