<template>
  <el-tooltip v-if="show" content="Khóa" placement="top-start" effect="dark" :open-delay="300">
    <el-button
      type="primary"
      plain
      class="btn-icon"
      @click="$emit('click')"
    >
      <svg-icon icon-class="unlock" />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LockButton extends Vue {
  @Prop(Boolean) readonly show!: boolean;
}
</script>
