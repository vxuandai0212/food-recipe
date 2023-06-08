<template>
  <div>
    <!-- Tên danh mục -->
    <div class="form-group">
      <vt-input
        v-model="name"
        class="mb-8"
        :max-length="MAX_LENGTH_FT_CATEGORY_NAME"
        :class="{ error: validations.name.anyError() }"
        @blur="onNameBlur"
      >
        <template #label>
          <span class="required">Tên danh mục</span>
        </template>
      </vt-input>
      <div class="form-error">
        <div v-if="validations.name.validated">
          <div v-if="!validations.name.require">
            Tên thành phần bắt buộc nhập
          </div>
        </div>
      </div>
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
  MAX_LENGTH_FT_CATEGORY_NAME
} from '@/utils/constants/constraint'
import VtInput from '@/components/VtInput/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'
import { mapState } from 'vuex'
import { pick } from 'lodash'

@Component({
  components: {
    VtInput
  },
  computed: {
    ...mapState({
      loading: (state: any) => state.ftCategory.ui.commandLoading
    })
  }
})
export default class Form extends Vue {
  MAX_LENGTH_FT_CATEGORY_NAME = MAX_LENGTH_FT_CATEGORY_NAME

  get name() { return this.$store.state.ftCategory.form.name }
  set name(value) { this.$store.commit('ftCategory/SET_FORM_NAME', value) }

  get isFormValid(): boolean {
    return this.validations.name.require
  }

  validations = {
    name: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onNameBlur() {
    const name = this.name
    this.validations.name.validated = true
    if (name) {
      this.validations.name.require = true
    } else {
      this.validations.name.require = false
    }
  }

  onCloseForm() {
    this.$emit('close-form')
  }

  async onSubmitForm() {
    try {
      const form = this.$store.state.ftCategory.form
      const id = form.id
      if (!id) {
        await this.$store.dispatch('ftCategory/upsert', pick(form, ['name', 'parentId', 'level']))
      } else {
        await this.$store.dispatch('ftCategory/upsert', pick(form, ['id', 'name', 'parentId', 'level']))
      }
      createSuccessNotify(this, ACTION.SAVE, FIELD.FT_CATEGORY)
      this.$emit('saved')
    } catch (error) {
      console.log(error)
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
