<template>
  <main-section :title="title">
    <template #main>
      <div v-loading="containerLoading">
        <el-col :span="24">
          <el-col :span="10">
            <el-row align="middle" type="flex" justify="space-around">
              <el-col>
                Chuyên mục
              </el-col>
              <el-col>
                <el-button type="primary" plain class="mr-8" @click="addCategory">Thêm chuyên mục</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-for="item in allCategory" :key="item.id" :span="24">
                <category :category="item" />
              </el-col>
            </el-row>
          </el-col>
          <el-col v-if="item && item.id" :span="12">
            <el-row align="middle" type="flex" justify="space-around">
              <el-col>
                Chuyên mục con
              </el-col>
              <el-col>
                <el-button type="primary" plain class="mr-8" @click="addSubCategory">Thêm chuyên mục con</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-for="item in allSubCategory" :key="item.id" :span="24">
                <category :category="item" />
              </el-col>
            </el-row>
          </el-col>
        </el-col>
        <form-dialog @on-saved="resetFilterAndGetAll" />
        <delete-dialog v-if="item" @confirm="resetFilterAndGetAll" />
      </div>
    </template>
  </main-section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MainSection from '@/components/Main/index.vue'
import Category from '@/views/fancythings/category/components/category-item.vue'
import FormDialog from '@/views/fancythings/category/components/form-dialog.vue'
import DeleteDialog from '@/views/fancythings/category/components/delete-dialog.vue'
import { mapState } from 'vuex'
import { FT_CATEGORY_LEVEL } from '@/utils/constants/ft-category'
@Component({
  components: {
    MainSection,
    Category,
    FormDialog,
    DeleteDialog
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.ftCategory.ui.containerLoading,
      allCategory: (state: any) => state.ftCategory.list.items,
      allSubCategory: (state: any) => state.ftSubCategory.list.items,
      item: (state: any) => state.ftCategory.detail.item
    })
  }
})
export default class List extends Vue {
  get title() { return 'Danh mục' }

  async created() {
    await this.resetFilterAndGetAll()
  }

  async getAllItem() {
    await this.$store.commit('ftCategory/SET_UI_CONTAINER_LOADING', true)
    await this.$store.commit('ftCategory/SET_LIST_QUERY_LEVEL', FT_CATEGORY_LEVEL.LEVEL_1)
    await this.$store.dispatch('ftCategory/getAllItem')
    await this.$store.commit('ftCategory/SET_UI_CONTAINER_LOADING', false)
    const currentCategory = (this as any).item
    if (currentCategory) {
      const { level, id, parentId } = currentCategory
      if (id && level === FT_CATEGORY_LEVEL.LEVEL_1) {
        await this.$store.commit('ftSubCategory/RESET_LIST_QUERY')
        await this.$store.commit('ftSubCategory/SET_LIST_QUERY_PARENT_ID', id)
        await this.$store.commit('ftSubCategory/SET_UI_CONTAINER_LOADING', true)
        await this.$store.dispatch('ftSubCategory/getAllItem')
        await this.$store.commit('ftSubCategory/SET_UI_CONTAINER_LOADING', false)
      } else if (parentId && level === FT_CATEGORY_LEVEL.LEVEL_2) {
        await this.$store.commit('ftSubCategory/RESET_LIST_QUERY')
        await this.$store.commit('ftSubCategory/SET_LIST_QUERY_PARENT_ID', parentId)
        await this.$store.commit('ftSubCategory/SET_UI_CONTAINER_LOADING', true)
        await this.$store.dispatch('ftSubCategory/getAllItem')
        await this.$store.commit('ftSubCategory/SET_UI_CONTAINER_LOADING', false)
      }
    }
  }

  async resetFilterAndGetAll() {
    await this.$store.commit('ftCategory/RESET_LIST_QUERY')
    await this.getAllItem()
  }

  async addCategory() {
    await this.$store.commit('ftCategory/RESET_FORM')
    await this.$store.commit('ftCategory/SET_FORM_LEVEL', FT_CATEGORY_LEVEL.LEVEL_1)
    await this.$store.commit('ftCategory/SET_UI_VISIBLE_FORM_DIALOG', true)
  }

  async addSubCategory() {
    await this.$store.commit('ftCategory/RESET_FORM')
    await this.$store.commit('ftCategory/SET_FORM_LEVEL', FT_CATEGORY_LEVEL.LEVEL_2)
    await this.$store.commit('ftCategory/SET_FORM_PARENT_ID', (this as any).item.id)
    await this.$store.commit('ftCategory/SET_UI_VISIBLE_FORM_DIALOG', true)
  }
}
</script>
<style lang="scss"></style>
