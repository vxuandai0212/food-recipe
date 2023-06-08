<template>
  <div>
    <el-button v-if="isShow" type="primary" class="btn-icon size-24" plain @click="$emit('click')">
      <svg-icon icon-class="password-hide" />
    </el-button>
    <el-button v-if="!isShow" type="primary" class="btn-icon size-24" plain @click="$emit('click')">
      <svg-icon icon-class="password-show" />
    </el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ShowHideButton extends Vue {
  @Prop(Boolean) readonly isShow!: boolean;
}
</script>
