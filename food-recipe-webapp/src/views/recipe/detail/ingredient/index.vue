<template>
  <div v-loading="containerLoading">
    <empty-table v-if="!hasItem" style="margin-top: 100px;">
      <template #message>{{ emptyTableMessage }}</template>
    </empty-table>
    <template v-else><table-comp /></template>
    <form-dialog @on-saved="resetFilterAndGetAll" />
    <delete-dialog v-if="item" @confirm="resetFilterAndGetAll" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EmptyTable from '@/components/EmptyTable/index.vue'
import TableComp from '@/views/recipe/detail/ingredient/components/table.vue'
import FormDialog from '@/views/recipe/detail/ingredient/components/form-dialog.vue'
import DeleteDialog from '@/views/recipe/detail/ingredient/components/delete-dialog.vue'
import { mapState } from 'vuex'

@Component({
  components: {
    EmptyTable,
    TableComp,
    FormDialog,
    DeleteDialog
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.recipeIngredient.ui.containerLoading,
      item: (state: any) => state.recipeIngredient.detail.item,
      total: (state: any) => state.recipeIngredient.list.total
    })
  }
})
export default class List extends Vue {
  hasItem() { return (this as any).total > 0 }

  get emptyTableMessage() { return 'Không có thành phần nào' }

  get recipeId() { return this.$route.params.recipeId }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('recipeIngredient/SET_LIST_QUERY_RECIPE_ID', this.recipeId)
    await this.$store.commit('recipeIngredient/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('recipeIngredient/getAllItem')
    await this.$store.commit('recipeIngredient/SET_UI_CONTAINER_LOADING', false)
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('recipeIngredient/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async openDialog() {
    await this.$store.commit('recipeIngredient/RESET_FORM')
    await this.$store.commit('recipeIngredient/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
