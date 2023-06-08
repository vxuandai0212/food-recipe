<template>
  <div class="align-center">
    <el-button type="text" size="mini" :disabled="moveLeftBtnDisabled" class="move-btn left" @click="moveLeft">
      <svg-icon class="d-inline-block" icon-class="arrow-left-2" />
    </el-button>
    <div class="button-group-wrapper" :style="{'max-width': maxWidth + 'px'}">
      <div class="button-group" :style="{'margin-left': marginLeft + 'px'}">
        <el-button
          v-for="fbApp in fbAppList"
          :key="fbApp.id"
          type="primary"
          :class="{'is-plain': selectedAppId !== fbApp.id}"
          :style="{'font-weight': selectedAppId !== fbApp.id ? 'normal' : 'bold' }"
          class="button-group-item truncate"
          @click="onClick(fbApp.id)"
        >
          {{ fbApp.appName }}
        </el-button>
      </div>
    </div>
    <el-button type="text" size="mini" class="move-btn right" :disabled="moveRightBtnDisabled" @click="moveRight">
      <svg-icon icon-class="arrow-right-2" />
    </el-button>

  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FirebaseApp } from '@/types/audience';

const BUTTON_WIDTH = 120;
@Component
export default class FbAppButtonGroup extends Vue {
  @Prop(Number) readonly selectedAppId!: number;
  @Prop(Array) readonly fbAppList!: FirebaseApp[];
  @Prop(Number) readonly maxWidth!: number;

  marginLeft = 0;

  get fullWidth() {
    return this.fbAppList.length * BUTTON_WIDTH + (this.fbAppList.length - 1) * 8;
  }
  get hiddenWidth() {
    return this.fullWidth - this.maxWidth;
  }
  get moveRightBtnDisabled(): boolean {
    return this.fullWidth < this.maxWidth || this.marginLeft === -this.hiddenWidth;
  }
  get moveLeftBtnDisabled(): boolean {
    return this.fullWidth < this.maxWidth || this.marginLeft === 0;
  }

  onClick(appId: number) {
    this.$emit('select', appId);
  }
  moveRight() {
    this.marginLeft -= BUTTON_WIDTH;
    if (this.marginLeft < -this.hiddenWidth) {
      this.marginLeft = -this.hiddenWidth;
    }
  }
  moveLeft() {
    this.marginLeft += BUTTON_WIDTH;
    if (this.marginLeft > 0) {
      this.marginLeft = 0;
    }
  }
}
</script>
<style lang="scss" scoped>
.button-group {
  margin: 0;
}
.el-button+.el-button {
  margin-left: 8px;
}
.el-button {
  padding: 11px 12px;
  font-size: 16px;
  line-height: 24px;
}
.el-button.is-plain{
  padding: 11px 12px;
}
.button-group-item {
  width: 120px;
}
.button-group-wrapper {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}

</style>
<style lang="scss">
.move-btn {
  padding-top: 0;
  padding-bottom: 0;
  .svg-icon {
    stroke: #5e81f4;
  }
  &.is-disabled .svg-icon {
    stroke: #afc0fa;
  }

}
</style>
