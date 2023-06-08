<template>
  <div>
    <PageTitle><BackToPrevious :text="backText" class="mb-18 d-inline-block" /></PageTitle>
    <info />
    <div v-loading="containerLoading">
      <table-comp />
      <pagination-comp />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BackToPrevious from '@/components/BackToPrevious/index.vue'
import PageTitle from '@/components/PageTitle/index.vue'
import TableComp from '@/views/ad/link/log/components/table.vue'
import PaginationComp from '@/views/ad/link/log/components/pagination.vue'
import Info from '@/views/ad/link/log/components/info.vue'
import { mapState } from 'vuex'

@Component({
  components: {
    BackToPrevious,
    PageTitle,
    TableComp,
    PaginationComp,
    Info
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.adViewLog.ui.containerLoading
    })
  }
})
export default class List extends Vue {
  backText = 'Lịch sử lượt xem'

  adId = this.$route.params.adId

  recipeId = this.$route.params.recipeId

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('adViewLog/SET_UI_CONTAINER_LOADING', true)
    await this.$store.commit('adViewLog/SET_LIST_QUERY_AD_ID', this.adId)
    await this.$store.commit('adViewLog/SET_LIST_QUERY_RECIPE_ID', this.recipeId)
    await this.$store.commit('adViewLog/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('adViewLog/SET_LIST_QUERY_LIMIT', 10)
    await this.$store.dispatch('adViewLog/getAllItem')
    await this.$store.commit('adViewLog/SET_UI_CONTAINER_LOADING', false)
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('adViewLog/RESET_LIST_QUERY')
    await this.getAllItem()
  }
}
</script>
<style lang="scss"></style>
