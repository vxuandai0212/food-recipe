<template>
  <div>
    <!-- Tên cloud -->
    <div class="form-group">
      <vt-input
        v-model="cloudName"
        class="mb-8"
        :max-length="MAX_LENGTH_STORAGE_CLOUD_NAME"
        :class="{ error: validations.cloudName.anyError() }"
        @blur="onCloudNameBlur"
      >
        <template #label>
          <span class="required">Tên cloud</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.cloudName.validated">
          <div v-if="!validations.cloudName.require">
            Tên cloud bắt buộc nhập
          </div>
          <div v-else-if="validations.cloudName.required && !validations.cloudName.notExist">
            Tên cloud đã tồn tại
          </div>
        </div>
      </div>
    </div>
    <!-- Api key -->
    <div class="form-group">
      <vt-input
        v-model="apiKey"
        class="mb-8"
        :max-length="MAX_LENGTH_STORAGE_API_KEY"
        :class="{ error: validations.apiKey.anyError() }"
        @blur="onApiKeyBlur"
      >
        <template #label>
          <span class="required">Api key</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.apiKey.validated">
          <div v-if="!validations.apiKey.require">
            Api key bắt buộc nhập
          </div>
        </div>
      </div>
    </div>
    <!-- Api secret -->
    <div class="form-group">
      <vt-input
        v-model="apiSecret"
        class="mb-8"
        :max-length="MAX_LENGTH_STORAGE_API_SECRET"
        :class="{ error: validations.apiSecret.anyError() }"
        @blur="onApiSecretBlur"
      >
        <template #label>
          <span class="required">Api secret</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.apiSecret.validated">
          <div v-if="!validations.apiSecret.require">
            Api secret bắt buộc nhập
          </div>
        </div>
      </div>
    </div>
    <!-- Mặc định -->
    <div class="form-group mb-4">
      <label>Mặc định</label>
      <el-switch
        v-model="isDefault"
        style="margin-left:10px;"
        :active-value="STORAGE_IS_DEFAULT.ACTIVE.value"
        :inactive-value="STORAGE_IS_DEFAULT.DISABLE.value"
      />
    </div>
    <div class="text-right btn-wrapper mb-24">
      <el-button type="primary" plain size="medium" @click="onCloseForm">Đóng</el-button>
      <el-button
        type="primary"
        size="medium"
        :loading="loading"
        :disabled="!isFormValid"
        @click="onSubmitForm"
      >Lưu</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  MAX_LENGTH_STORAGE_CLOUD_NAME,
  MAX_LENGTH_STORAGE_API_KEY,
  MAX_LENGTH_STORAGE_API_SECRET
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { STORAGE_IS_DEFAULT } from '@/utils/constants/common'
import { mapState } from 'vuex'
import { STORAGE_CLOUD_NAME_TAKEN } from '@/utils/constants/error'
import { pick } from 'lodash'

@Component({
  components: {
    VtInput
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.storage.ui.commandLoading
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_STORAGE_CLOUD_NAME = MAX_LENGTH_STORAGE_CLOUD_NAME
  MAX_LENGTH_STORAGE_API_KEY = MAX_LENGTH_STORAGE_API_KEY
  MAX_LENGTH_STORAGE_API_SECRET = MAX_LENGTH_STORAGE_API_SECRET
  STORAGE_IS_DEFAULT = STORAGE_IS_DEFAULT

  get cloudName() { return this.$store.state.storage.form.cloudName }
  set cloudName(value) { this.$store.commit('storage/SET_FORM_CLOUD_NAME', value) }

  get apiKey() { return this.$store.state.storage.form.apiKey }
  set apiKey(value) { this.$store.commit('storage/SET_FORM_API_KEY', value) }

  get apiSecret() { return this.$store.state.storage.form.apiSecret }
  set apiSecret(value) { this.$store.commit('storage/SET_FORM_API_SECRET', value) }

  get isDefault() { return this.$store.state.storage.form.isDefault }
  set isDefault(value) { this.$store.commit('storage/SET_FORM_IS_DEFAULT', value) }

  get isFormValid(): boolean {
    return this.validations.cloudName.require &&
      this.validations.cloudName.notExist &&
      this.validations.apiKey.require &&
      this.validations.apiSecret.require &&
      this.validations.isDefault.require
  }

  validations = {
    cloudName: {
      require: true,
      validated: false,
      notExist: true,
      anyError() {
        return !this.require || !this.notExist
      }
    },
    apiKey: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    },
    apiSecret: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    },
    isDefault: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onCloudNameBlur() {
    const cloudName = this.cloudName
    this.validations.cloudName.validated = true
    if (cloudName) {
      this.validations.cloudName.require = true
    } else {
      this.validations.cloudName.require = false
    }
  }

  onApiKeyBlur() {
    const apiKey = this.apiKey
    this.validations.apiKey.validated = true
    if (apiKey) {
      this.validations.apiKey.require = true
    } else {
      this.validations.apiKey.require = false
    }
  }

  onApiSecretBlur() {
    const apiSecret = this.apiSecret
    this.validations.apiSecret.validated = true
    if (apiSecret) {
      this.validations.apiSecret.require = true
    } else {
      this.validations.apiSecret.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.storage.form
      const id = form.id
      if (!id) {
        await this.$store.dispatch('storage/upsert', pick(form, ['cloudName', 'apiKey', 'apiSecret', 'isDefault']))
      } else {
        await this.$store.dispatch('storage/upsert', pick(form, ['id', 'cloudName', 'apiKey', 'apiSecret', 'isDefault']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.STORAGE)
      this.$emit('saved')
    } catch (error) {
      if ((error as any).message === STORAGE_CLOUD_NAME_TAKEN) {
        this.validations.cloudName.notExist = false
      }
    }
  }
}
</script>
<style lang="scss">
.btn-wrapper button {
  width: 110px;
  font-size: 16px;
  line-height: 18px;
  height: 50px;
}
</style>
