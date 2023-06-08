<template>
  <div>
    <PageTitle><BackToPrevious :text="backText" class="mb-18 d-inline-block" /></PageTitle>
    <info />
    <div v-loading="containerLoading">
      <table-comp />
      <pagination-comp />
    </div>
    <form-dialog @on-saved="resetFilterAndGetAll" />
    <delete-dialog v-if="item" @confirm="resetFilterAndGetAll" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BackToPrevious from '@/components/BackToPrevious/index.vue'
import PageTitle from '@/components/PageTitle/index.vue'
import TableComp from '@/views/ad/link/list/components/table.vue'
import PaginationComp from '@/views/ad/link/list/components/pagination.vue'
import FormDialog from '@/views/ad/link/list/components/form-dialog.vue'
import DeleteDialog from '@/views/ad/link/list/components/delete-dialog.vue'
import Info from '@/views/ad/customer/detail/components/info.vue'
import { mapState } from 'vuex'

@Component({
  components: {
    BackToPrevious,
    PageTitle,
    TableComp,
    PaginationComp,
    FormDialog,
    DeleteDialog,
    Info
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.ad.ui.containerLoading,
      item: (state: any) => state.ad.detail.item
    })
  }
})
export default class List extends Vue {
  backText = 'Chi tiết khách hàng'

  get customerId() { return this.$route.params.customerId }

  async created() { await this.resetFilterAndGetAll() }

  async getAllItem() {
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', true)
    await this.$store.commit('ad/SET_LIST_QUERY_AD_CUSTOMER_ID', this.customerId)
    await this.$store.commit('ad/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('ad/SET_LIST_QUERY_LIMIT', 10)
    await this.$store.dispatch('ad/getAllItem')
    await this.$store.commit('ad/SET_UI_CONTAINER_LOADING', false)
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('ad/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  openDialog() {
    this.$store.commit('ad/RESET_FORM')
    this.$store.commit('ad/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
