<template>
  <my-dialog :title="title" :visible="dialogVisible" :on-change-visible-dialog="onChangeVisibleDialog">
    <span>{{ message }}</span>
    <div class="text-right mt-16">
      <el-button type="primary" plain @click="closeDialog">Hủy</el-button>
      <el-button type="danger" @click="confirm">Xác nhận</el-button>
    </div>
  </my-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import MyDialog from '@/components/Dialog/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { createSuccessNotify } from '@/utils/common'

@Component({
  components: { MyDialog },
  computed: {
    ...mapState({
      dialogVisible: (state: any) => state.ad.ui.visibleDeleteDialog,
      name: (state: any) => state.ad.detail.item.name
    })
  }
})
export default class DeleteDialog extends Vue {
  get title() { return 'Xoá quảng cáo' }

  get message() { return `Bạn có chắc chắn muốn xoá quảng cáo ${(this as any).name}?` }

  onChangeVisibleDialog(value) {
    this.$store.commit('ad/SET_UI_VISIBLE_DELETE', value)
  }

  async confirm() {
    const id = this.$store.state.ad.detail.item.id
    await this.$store.dispatch('ad/delete', id)
    await createSuccessNotify(this, ACTION.DELETE, FIELD.AD)
    await this.$store.commit('ad/SET_UI_VISIBLE_DELETE_DIALOG', false)
    await this.$emit('confirm')
  }

  closeDialog() { this.$store.commit('ad/SET_UI_VISIBLE_DELETE_DIALOG', false) }
}
</script>
<style scoped></style>
