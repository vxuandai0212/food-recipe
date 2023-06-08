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
import TableComp from '@/views/ad/link/detail/components/table.vue'
import PaginationComp from '@/views/ad/link/detail/components/pagination.vue'
import Info from '@/views/ad/link/detail/components/info.vue'
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
      containerLoading: (state: any) => state.adView.ui.containerLoading
    })
  }
})
export default class List extends Vue {
  backText = 'Chi tiết quảng cáo'

  get adId() { return this.$route.params.adId }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('adView/SET_UI_CONTAINER_LOADING', true)
    await this.$store.commit('adView/SET_LIST_QUERY_AD_ID', this.adId)
    await this.$store.commit('adView/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('adView/SET_LIST_QUERY_LIMIT', 10)
    await this.$store.dispatch('adView/getAllItem')
    await this.$store.commit('adView/SET_UI_CONTAINER_LOADING', false)
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('adView/RESET_LIST_QUERY')
    await this.getAllItem()
  }
}
</script>
<style lang="scss"></style>
