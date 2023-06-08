<template>
  <div v-if="formData">
    <div class="form-group">
      <VtInput
        ref="tokenRef"
        v-model.trim="formData.token"
        class="mb-8"
        :max-length="200"
        :class="{error: validations.token.anyError()}"
        @blur="onTokenBlur"
      >
        <template #label>
          <span class="required">Token</span>
        </template>
      </VtInput>
      <div class="form-error">
        <div v-if="validations.token.touch">
          <div v-if="!validations.token.required">
            {{ getRequiredMessage('Token') }}
          </div>
          <div v-if="validations.token.required && !validations.token.notExisted">
            Token đã tồn tại
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <VtInput
        ref="deviceNameRef"
        v-model.trim="formData.deviceName"
        class="mb-8"
        :max-length="200"
        label="Thiết bị"
      />
      <div class="form-error" />
    </div>
    <div class="text-right form-action-wrapper">
      <el-button class="cancel-btn" type="primary" plain size="medium" @click="onCloseForm">Đóng</el-button>
      <el-button
        type="primary"
        size="medium"
        :loading="saveTokenLoading"
        :disabled="!isFormValid"
        @click="onSubmitForm"
      >Lưu</el-button>
    </div>

  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Token } from '@/types/token';
import VtInput from '@/components/VtInput/index.vue';
import { VALIDATE, ACTION, FIELD } from '@/utils/constant';
import { createSuccessNotify } from '@/utils/common';

@Component({
  components: { VtInput }
})
export default class TokenForm extends Vue {
  @Prop(Object) readonly formProp!: Token;
  formData: Token | null = null;
  validations = {
    token: { required: true, touch: false, notExisted: true, anyError() {
      return !this.required || !this.notExisted;
    } }
  }

  get isFormValid() {
    return this.validations.token.required && this.validations.token.notExisted;
  }
  get tokenInput() {
    if (this.$refs['tokenRef']) {
      return (this.$refs['tokenRef'] as any).$refs['vtInput'];
    } else {
      return null;
    }
  }
  get saveTokenLoading(): boolean {
    return this.$store.state.customer.saveTokenLoading;
  }

  created() {
    this.formData = this.formProp;
  }

  mounted() {
    setTimeout(() => {
      this.tokenInput && this.tokenInput.focus();
    }, 200);
  }

  getRequiredMessage(field: string) {
    return VALIDATE.required(field);
  }
  onTokenBlur() {
    this.validations.token.touch = true;
    this.validations.token.required = false;
    this.validations.token.notExisted = true;
    if (this.formData!.token) {
      this.validations.token.required = true;
    }
  }
  async onSubmitForm() {
    try {
      await this.$store.dispatch('firebaseApp/saveToken', this.formData);
      if (this.formData!.id) {
        createSuccessNotify(this, ACTION.UPDATE, FIELD.TOKEN);
      } else {
        createSuccessNotify(this, ACTION.ADD, FIELD.TOKEN);
      }
      this.$emit('saved');
    } catch (error) {
      if (error.message) {
        if (error.message.includes('Token đã tồn tại')) {
          this.validations.token.notExisted = false;
        } else {
          this.validations.token.notExisted = true;
        }
      }
    }
  }
  onCloseForm() {
    this.$emit('close-form')
  }
}
</script>
