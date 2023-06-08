<template>
  <my-dialog
    :title="title"
    :visible="dialogVisible"
    :on-change-visible-dialog="onChangeVisibleDialog"
  >
    <span>{{ message }}</span>
    <div class="text-right mt-16">
      <el-button type="primary" plain @click="closeDialog">Hủy</el-button>
      <el-button type="danger" :loading="commandLoading" @click="confirm">
        Xác nhận
      </el-button>
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
      dialogVisible: (state: any) => state.storage.ui.visibleDeleteDialog,
      commandLoading: (state: any) => state.storage.ui.commandLoading,
      name: (state: any) => state.storage.detail.item.cloudName
    })
  }
})
export default class DeleteDialog extends Vue {
  get title() { return 'Xoá nơi lưu trữ' }

  get message() { return `Bạn có chắc chắn muốn xoá nơi lưu trữ ${(this as any).name}?` }

  onChangeVisibleDialog(value) {
    this.$store.commit('storage/SET_UI_VISIBLE_DELETE', value)
  }

  confirm() {
    const id = this.$store.state.storage.detail.item.id
    this.$store.dispatch('storage/delete', [id])
    createSuccessNotify(this, ACTION.DELETE, FIELD.STORAGE)
    this.$store.commit('storage/SET_UI_VISIBLE_DELETE_DIALOG', false)
    this.$emit('confirm')
  }

  closeDialog() {
    this.$store.commit('storage/SET_UI_VISIBLE_DELETE_DIALOG', false)
  }
}
</script>
<style scoped></style>
