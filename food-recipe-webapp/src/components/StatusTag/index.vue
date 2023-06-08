<template>
  <div class="status-info">
    <el-tag v-if="status" class="el-tag--primary1 active">
      <svg-icon icon-class="circle" /> {{ activeLabel }}
    </el-tag>
    <el-tag v-if="!status" class="el-tag--primary1 inactive">
      <svg-icon icon-class="circle" /> {{ disableLabel }}
    </el-tag>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class StatusTag extends Vue {
  @Prop() readonly status!: any
  @Prop() readonly activeLabel!: string
  @Prop() readonly disableLabel!: string
}
</script>
<style lang="scss">
.status-info {
  .active svg,
  .inactive svg {
    width: 8px;
    height: 18px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .active svg {
    color: #7ce7ac;
  }
  .inactive svg {
    color: #e77b7b;
  }
}
</style>
