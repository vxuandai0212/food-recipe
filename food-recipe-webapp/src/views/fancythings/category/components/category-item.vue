<template>
  <div style="margin-bottom: 10px;">
    <span :class="{ active: isActive }" style="margin-right: 30px;" @click="getAllChildCategory">{{ category.name }}</span>
    <span @click="openUpdateDialog"><i class="el-icon-edit" /></span>
    <span @click="openDeleteDialog"><i class="el-icon-delete" /></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FT_CATEGORY_LEVEL } from '@/utils/constants/ft-category'
@Component
export default class CategoryItem extends Vue {
  @Prop() category!: any

  get isActive() {
    const { id } = this.category
    return id === this.$store.state.ftCategory.detail.item.id || id === this.$store.state.ftSubCategory.detail.item.id
  }

  async getAllChildCategory() {
    const { level, id } = this.category
    if (level === FT_CATEGORY_LEVEL.LEVEL_1) {
      this.$store.commit('ftCategory/SET_DETAIL_ITEM', this.category)
      await this.$store.commit('ftSubCategory/RESET_LIST_QUERY')
      await this.$store.commit('ftSubCategory/SET_LIST_QUERY_PARENT_ID', id)
      await this.$store.commit('ftSubCategory/SET_UI_CONTAINER_LOADING', true)
      await this.$store.dispatch('ftSubCategory/getAllItem')
      await this.$store.commit('ftSubCategory/SET_UI_CONTAINER_LOADING', false)
    } else {
      this.$store.commit('ftSubCategory/SET_DETAIL_ITEM', this.category)
    }
    return
  }

  openUpdateDialog() {
    this.$store.commit('ftCategory/SET_FORM', this.category)
    this.$store.commit('ftCategory/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  openDeleteDialog() {
    this.$store.commit('ftCategory/SET_DETAIL_ITEM', this.category)
    this.$store.commit('ftCategory/SET_UI_VISIBLE_DELETE_DIALOG', true)
  }
}
</script>
<style scoped>
.active {
  color: blue;
}
</style>
