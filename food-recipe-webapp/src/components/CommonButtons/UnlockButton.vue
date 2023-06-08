<template>
  <el-tooltip v-if="show" content="Mở khóa" placement="top-start" effect="dark" :open-delay="300">
    <el-button
      type="primary"
      class="btn-icon"
      @click="$emit('click')"
    >
      <svg-icon icon-class="lock" />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class UnlockButton extends Vue {
  @Prop(Boolean) readonly show!: boolean;
}
</script>
