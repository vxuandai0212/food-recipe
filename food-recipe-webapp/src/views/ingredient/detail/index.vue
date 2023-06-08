<template>
  <div>
    <PageTitle>
      <BackToPrevious :text="backText" class="mb-18 d-inline-block" />
    </PageTitle>
    <card>
      <el-col :span="24">
        <el-col :span="24">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Thông tin cơ bản" :name="INGREDIENT.INFO.NAME" />
            <el-tab-pane label="Dinh dưỡng" :name="INGREDIENT.NUTRITION.NAME" />
            <el-tab-pane label="Lợi ích" :name="INGREDIENT.BENEFIT.NAME" />
            <el-tab-pane label="Chú ý" :name="INGREDIENT.WARNING.NAME" />
            <el-tab-pane label="Mẹo" :name="INGREDIENT.TIP.NAME" />
          </el-tabs>
        </el-col>
        <el-col>
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-col>
      </el-col>
    </card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BackToPrevious from '@/components/BackToPrevious/index.vue'
import PageTitle from '@/components/PageTitle/index.vue'
import { mapState } from 'vuex'
import Card from '@/components/Card/common.vue'
import { INGREDIENT } from '@/utils/constants/route'
@Component({
  components: {
    BackToPrevious,
    PageTitle,
    Card
  },
  computed: {
    ...mapState({
      detail: (state: any) => state.ingredient.detail.item
    })
  }
})
export default class Detail extends Vue {
  INGREDIENT = INGREDIENT

  get ingredientId() { return this.$route.params.ingredientId }

  get backText() { return 'Chi tiết thành phần' }

  get activeTab() { return this.$route.name }

  set activeTab(value) { this.$router.push({ name: value, params: { ingredientId: this.ingredientId }}) }
}
</script>
<style lang="scss"></style>
