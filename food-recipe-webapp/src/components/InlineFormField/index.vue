<template>
  <div>
    <p class="m-0 color-gray font-12 mb-8"> Mật khẩu ứng dụng</p>
    <div class="align-center">
      <p
        v-if="!isAppPassEditing"
        class="m-0 color-primary font-22 font-weight-bold line-height-28 d-inline-block mr-32"
        style="min-width: 60px;"
      >
        <span v-if="isShowAppPass">
          {{ application.appPass }}
        </span>
        <span v-if="!isShowAppPass">
          &bull;&bull;&bull;&bull;&bull;&bull;
        </span>
      </p>
      <el-input
        v-show="isAppPassEditing"
        ref="appPassInputRef"
        v-model="tempAppPass"
        class="app-pass-input"
        size="small"
        :type="appPassInputType"
        :maxlength="200"
        style="width: 300px;"
        @keypress.enter.native="onAppPassSaveClick"
      >
        <span slot="suffix">
          <svg-icon v-if="isPassEditingShow" icon-class="password-hide" @click="isPassEditingShow = !isPassEditingShow" />
          <svg-icon v-if="!isPassEditingShow" icon-class="password-show" @click="isPassEditingShow = !isPassEditingShow" />
        </span>
      </el-input>
      <ShowHideButton
        v-show="!isAppPassEditing"
        :is-show="isShowAppPass"
        @click="isShowAppPass = !isShowAppPass"
      />
      <el-button
        v-show="!isAppPassEditing"
        type="primary"
        class="btn-icon size-24 ml-8 fon-12"
        plain
        icon="el-icon-copy-document"
        @click.native="handleCopy(application.appPass,$event)"
      />
      <el-button
        v-show="!isAppPassEditing"
        type="success"
        class="btn-icon size-24"
        plain
        @click="onAppPassEditClick"
      >
        <svg-icon icon-class="edit" />
      </el-button>
      <el-button
        v-show="isAppPassEditing"
        type="success"
        class="btn-icon size-24"
        plain
        :disabled="isTempAppPassEmpty"
        @click="onAppPassSaveClick"
      >
        <svg-icon icon-class="save" />
      </el-button>
      <el-button
        v-show="isAppPassEditing"
        type="danger"
        class="btn-icon size-24"
        plain
        @click="onAppPassCancelClick"
      >
        <svg-icon icon-class="cancel" />
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Application } from '@/types/application';
import { createSuccessNotify } from '@/utils/common';
import { ACTION, FIELD } from '@/utils/constant';
import ShowHideButton from '@/components/CommonButtons/ShowHideButton.vue';
import clip from '@/utils/clipboard' // use clipboard directly

@Component({
  components: { ShowHideButton }
})
export default class InlineFormField extends Vue {
  @Prop(Object) readonly application!: Application;
  isShowAppPass = false;
  isAppPassEditing = false;
  tempAppPass = '';
  isPassEditingShow = false;

  get appPassInputType(): string {
    return this.isPassEditingShow ? 'text' : 'password';
  }
  get isTempAppPassEmpty() {
    return !this.tempAppPass || !this.tempAppPass.trim();
  }

  onAppPassEditClick() {
    this.tempAppPass = this.application.appPass;
    setTimeout(() => {
      (this.$refs['appPassInputRef'] as any).focus();
    }, 200);
    this.isAppPassEditing = true;
  }
  async onAppPassSaveClick() {
    if (this.isTempAppPassEmpty) {
      return;
    }
    this.application.appPass = this.tempAppPass;
    this.application.id = this.application.applicationId
    await this.onAppSave();
    this.isAppPassEditing = false;
  }

  onAppPassCancelClick() {
    this.isAppPassEditing = false;
  }

  async onAppSave() {
    await this.$store.dispatch('application/saveApplication', this.application);
    createSuccessNotify(this, ACTION.UPDATE, FIELD.APPLICATION)
  }
  handleCopy(text, event) {
    clip(text, event)
  }
}
</script>
<style lang="scss">
.app-pass-input .el-input__suffix-inner {
  .svg-icon {
    height: 32px;
    width: 14px;
    cursor: pointer;
  }
}
</style>
