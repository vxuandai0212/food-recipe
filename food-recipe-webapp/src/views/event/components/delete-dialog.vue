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
      dialogVisible: (state: any) => state.cookEvent.ui.visibleDeleteDialog,
      commandLoading: (state: any) => state.cookEvent.ui.commandLoading,
      name: (state: any) => state.cookEvent.detail.item.name
    })
  }
})
export default class DeleteDialog extends Vue {
  get title() { return 'Xoá dịp nấu ăn' }

  get message() { return `Bạn có chắc chắn muốn xoá dịp nấu ăn ${(this as any).name}?` }

  onChangeVisibleDialog(value) {
    this.$store.commit('cookEvent/SET_UI_VISIBLE_DELETE', value)
  }

  confirm() {
    const id = this.$store.state.cookEvent.detail.item.id
    this.$store.dispatch('cookEvent/delete', [id])
    createSuccessNotify(this, ACTION.DELETE, FIELD.EVENT)
    this.$store.commit('cookEvent/SET_UI_VISIBLE_DELETE_DIALOG', false)
    this.$emit('confirm')
  }

  closeDialog() {
    this.$store.commit('cookEvent/SET_UI_VISIBLE_DELETE_DIALOG', false)
  }
}
</script>
<style scoped></style>
