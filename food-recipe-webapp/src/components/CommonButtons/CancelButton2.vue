<template>
  <el-tooltip v-if="show" content="Hủy" placement="top-start" effect="dark" :open-delay="300">
    <el-button
      v-if="show"
      type="primary"
      class="btn-icon"
      plain
      @click="$emit('click')"
    >
      <svg-icon icon-class="cancel2" />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CancelButton2 extends Vue {
  @Prop({ type: Boolean, default: true }) readonly show!: boolean;
}
</script>
<style lang="scss" scoped>
.btn-icon {
  height: 24px;
  padding: 0 3px;
  .svg-icon {
    vertical-align: -3px;
    height: 13px;
  }
}
</style>
