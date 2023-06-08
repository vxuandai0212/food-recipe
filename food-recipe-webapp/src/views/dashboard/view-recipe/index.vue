<template>
  <div v-loading="containerLoading" class="common-card">
    <el-row :gutter="20">
      <el-col :span="6">
        <label>{{ title }}</label>
        <el-tag v-if="view" style="margin-left:8px;">{{ view }}</el-tag>
      </el-col>
      <el-col :span="18">
        <time-picker />
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <table-comp />
      <pagination-comp />
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TableComp from '@/views/dashboard/view-recipe/components/table.vue'
import PaginationComp from '@/views/dashboard/view-recipe/components/pagination.vue'
import TimePicker from '@/views/dashboard/components/TimePicker.vue'
import { mapState } from 'vuex'

@Component({
  components: {
    TimePicker,
    TableComp,
    PaginationComp
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.viewRecipe.ui.containerLoading,
      items: (state: any) => state.viewRecipe.items,
      total: (state: any) => state.viewRecipe.total,
      view: (state: any) => state.viewRecipe.view
    })
  }
})
export default class List extends Vue {
  get title() { return 'Lượt xem công thức' }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('viewRecipe/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('viewRecipe/getAllItem')
    await this.$store.commit('viewRecipe/SET_UI_CONTAINER_LOADING', false)
  }

  async onSearchKeyword() {
    await this.$store.commit('viewRecipe/SET_QUERY_PAGE', 1)
    await this.$store.commit('viewRecipe/SET_QUERY_LIMIT', 5)
    await this.getAllItem()
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('viewRecipe/RESET_LIST_QUERY')
    await this.getAllItem()
  }
}
</script>
<style lang="scss"></style>
