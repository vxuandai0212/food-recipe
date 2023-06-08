<template>
  <div v-loading="containerLoading">
    <empty-table v-if="!hasItem" style="margin-top: 100px;">
      <template #message>
        {{ emptyTableMessage }}
      </template>
    </empty-table>
    <template v-else>
      <table-comp />
    </template>
    <form-dialog @on-saved="resetFilterAndGetAll" />
    <delete-dialog v-if="item" @confirm="resetFilterAndGetAll" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EmptyTable from '@/components/EmptyTable/index.vue'
import TableComp from '@/views/ingredient/detail/benefit/components/table.vue'
import FormDialog from '@/views/ingredient/detail/benefit/components/form-dialog.vue'
import DeleteDialog from '@/views/ingredient/detail/benefit/components/delete-dialog.vue'
import { mapState } from 'vuex'
import { INGREDIENT_INFO_TYPE } from '@/utils/constants/ingredient'

@Component({
  components: {
    EmptyTable,
    TableComp,
    FormDialog,
    DeleteDialog
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.ingredientInfo.ui.containerLoading,
      item: (state: any) => state.ingredientInfo.detail.item,
      total: (state: any) => state.ingredientInfo.list.total
    })
  }
})
export default class List extends Vue {
  hasItem() { return (this as any).total > 0 }

  get emptyTableMessage() { return 'Không có lợi ích nào' }

  get ingredientId() { return this.$route.params.ingredientId }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('ingredientInfo/SET_LIST_QUERY_INGREDIENT_ID', this.ingredientId)
    await this.$store.commit('ingredientInfo/SET_LIST_QUERY_TYPES', [INGREDIENT_INFO_TYPE.BENEFIT])
    await this.$store.commit('ingredientInfo/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('ingredientInfo/getAllItem')
    await this.$store.commit('ingredientInfo/SET_UI_CONTAINER_LOADING', false)
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('ingredientInfo/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async openDialog() {
    await this.$store.commit('ingredientInfo/RESET_FORM')
    await this.$store.commit('ingredientInfo/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
