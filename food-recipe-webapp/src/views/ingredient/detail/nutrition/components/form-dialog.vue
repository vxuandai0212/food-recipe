<template>
  <my-dialog
    :title="title"
    :visible="dialogVisible"
    :on-change-visible-dialog="onChangeVisibleDialog"
  >
    <form-comp
      :init-form="form"
      @close-form="closeDialog"
      @saved="onSaved"
    />
  </my-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import MyDialog from '@/components/Dialog/index.vue'
import FormComp from '@/views/ingredient/detail/nutrition/components/form.vue'

@Component({
  components: { MyDialog, FormComp },
  computed: {
    ...mapState({
      dialogVisible: (state: any) => state.ingredientNutrition.ui.visibleFormDialog
    })
  }
})
export default class FormDialog extends Vue {
  get title() {
    return this.form.id ? 'Cập nhật chất dinh dưỡng' : 'Thêm chất dinh dưỡng'
  }

  get form() {
    return this.$store.state.ingredientNutrition.form
  }

  onChangeVisibleDialog(value) {
    this.$store.commit('ingredientNutrition/SET_UI_VISIBLE_FORM_DIALOG', value)
  }

  closeDialog() {
    this.$store.commit('ingredientNutrition/SET_UI_VISIBLE_FORM_DIALOG', false)
  }

  onSaved() {
    this.$store.commit('ingredientNutrition/SET_UI_VISIBLE_FORM_DIALOG', false)
    this.$emit('on-saved')
  }
}
</script>
<style scoped></style>
