<template>
  <el-button
    class="add-btn"
    type="primary"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <svg-icon icon-class="excel" class="mr-8" />{{ text }}
  </el-button>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ImportButton extends Vue {
  @Prop(String) readonly text!: string;
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;
}
</script>
<style lang="scss" scoped>
.check-btn {
  font-size: 14px;
  .svg-icon {
    width: 15px;
    height: 15px;
  }
}
</style>
