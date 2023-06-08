<template>
  <el-tooltip v-if="show" content="Xóa" placement="top-start" effect="dark" :open-delay="300">
    <el-button
      type="danger"
      plain
      size="medium"
      class="btn-icon"
      @click="$emit('click')"
    >
      <svg-icon icon-class="remove" />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class RemoveButton extends Vue {
  @Prop({ type: Boolean, default: true }) readonly show!: boolean;
}
</script>
