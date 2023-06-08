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
import TableComp from '@/views/ingredient/detail/nutrition/components/table.vue'
import FormDialog from '@/views/ingredient/detail/nutrition/components/form-dialog.vue'
import DeleteDialog from '@/views/ingredient/detail/nutrition/components/delete-dialog.vue'
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
      containerLoading: (state: any) => state.ingredientNutrition.ui.containerLoading,
      item: (state: any) => state.ingredientNutrition.detail.item,
      total: (state: any) => state.ingredientNutrition.list.total
    })
  }
})
export default class List extends Vue {
  hasItem() { return (this as any).total > 0 }

  get emptyTableMessage() { return 'Không có chất dinh dưỡng nào' }

  get ingredientId() { return this.$route.params.ingredientId }

  async created() {
    await this.getAllNutrition()
    await this.resetFilterAndGetAll()
  }

  async getAllNutrition() {
    await this.$store.commit('nutrition/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('nutrition/SET_LIST_QUERY_LIMIT', 1000)
    await this.$store.dispatch('nutrition/getAllItem')
  }

  async getAllItem() {
    await this.$store.commit('ingredientNutrition/SET_LIST_QUERY_INGREDIENT_ID', this.ingredientId)
    await this.$store.commit('ingredientNutrition/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('ingredientNutrition/getAllItem')
    await this.$store.commit('ingredientNutrition/SET_UI_CONTAINER_LOADING', false)
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('ingredientNutrition/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async openDialog() {
    await this.$store.commit('ingredientNutrition/RESET_FORM')
    await this.$store.commit('ingredientNutrition/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
