<template>
  <div id="sidebar">
    <div v-if="isAdminView" class="sidebar-item" :class="{'active': currentModule === DASHBOARD.NAME}">
      <el-tooltip content="Dashboard" placement="right" :disabled="sidebar.opened" :open-delay="200">
        <router-link :to="{ name: DASHBOARD.NAME }">
          <svg-icon class="icon" icon-class="dashboard" />
          <span class="name">Dashboard</span>
          <div class="devider " :class="{'active': currentModule === DASHBOARD.NAME}" />
        </router-link>
      </el-tooltip>
    </div>

    <div
      v-if="isAdminView"
      class="sidebar-item"
      :class="{'active': currentModule === AD.NAME}"
      @mouseenter="isAdHovered = true"
      @mouseleave="isAdHovered = false"
    >
      <a @click="toggleAdSubSidebar">
        <svg-icon class="icon" icon-class="wechat" />
        <span class="name">Quảng cáo</span>
        <svg-icon v-if="!showAdSubSidebar" icon-class="arrow-right-1" class="open-subsidebar-icon" />
        <svg-icon v-if="showAdSubSidebar" icon-class="arrow-down-2" class="close-subsidebar-icon" />
      </a>
      <div class="devider" :class="{'active': currentModule === AD.NAME}" />
      <div v-show="isAdHovered && !sidebar.opened" class="hover-sub-sidebar">
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === AD.CUSTOMER_LIST.NAME || currentRouteName === AD.CUSTOMER_DETAIL.NAME}"
        >
          <router-link :to="{ name: AD.CUSTOMER_LIST.NAME }">Khách hàng</router-link>
        </div>
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === AD.LINK_LIST.NAME || currentRouteName === AD.LINK_DETAIL.NAME || currentRouteName === AD.LINK_LOG.NAME}"
        >
          <router-link :to="{ name: AD.LINK_LIST.NAME }">Chiến dịch</router-link>
        </div>
      </div>
    </div>
    <el-collapse-transition v-if="isAdminView">
      <div v-show="showAdSubSidebar && sidebar.opened" class="sub-sidebar">
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === AD.CUSTOMER_LIST.NAME || currentRouteName === AD.CUSTOMER_DETAIL.NAME}"
        >
          <router-link :to="{ name: AD.CUSTOMER_LIST.NAME }">Khách hàng</router-link>
        </div>
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === AD.LINK_LIST.NAME || currentRouteName === AD.LINK_DETAIL.NAME || currentRouteName === AD.LINK_LOG.NAME}"
        >
          <router-link :to="{ name: AD.LINK_LIST.NAME }">Chiến dịch</router-link>
        </div>
      </div>
    </el-collapse-transition>

    <div v-if="isAdminView" class="sidebar-item" :class="{'active': currentModule === RECIPE.NAME}">
      <el-tooltip content="Công thức nấu ăn" placement="right" :disabled="sidebar.opened" :open-delay="200">
        <router-link :to="{ name: RECIPE.LIST.NAME }">
          <svg-icon class="icon" icon-class="bill" />
          <span class="name">Công thức</span>
          <div class="devider " :class="{'active': currentModule === RECIPE.NAME}" />
        </router-link>
      </el-tooltip>
    </div>

    <!-- icon-class="template" -->

    <!-- icon-class="customer" -->

    <!-- icon-class="guide" -->

    <!-- icon-class="clipboard" -->

    <div v-if="isAdminView" class="sidebar-item" :class="{'active': currentModule === INGREDIENT.NAME}">
      <el-tooltip content="Thành phần chế biến" placement="right" :disabled="sidebar.opened" :open-delay="200">
        <router-link :to="{ name: INGREDIENT.LIST.NAME }">
          <svg-icon class="icon" icon-class="audience" />
          <span class="name">Thành phần</span>
          <div class="devider " :class="{'active': currentModule === INGREDIENT.NAME}" />
        </router-link>
      </el-tooltip>
    </div>

    <div v-if="isAdminView" class="sidebar-item" :class="{'active': currentModule === NUTRITION.NAME}">
      <el-tooltip content="Dinh dưỡng" placement="right" :disabled="sidebar.opened" :open-delay="200">
        <router-link :to="{ name: NUTRITION.NAME }">
          <svg-icon class="icon" icon-class="feature" />
          <span class="name">Dinh dưỡng</span>
          <div class="devider " :class="{'active': currentModule === NUTRITION.NAME}" />
        </router-link>
      </el-tooltip>
    </div>

    <div v-if="isAdminView" class="sidebar-item" :class="{'active': currentModule === EVENT.NAME}">
      <el-tooltip content="Dịp chế biến" placement="right" :disabled="sidebar.opened" :open-delay="200">
        <router-link :to="{ name: EVENT.NAME }">
          <svg-icon class="icon" icon-class="star" />
          <span class="name">Dịp chế biến</span>
          <div class="devider " :class="{'active': currentModule === EVENT.NAME}" />
        </router-link>
      </el-tooltip>
    </div>

    <div v-if="isAdminView" class="sidebar-item" :class="{'active': currentModule === STORAGE.NAME}">
      <el-tooltip content="Lưu trữ" placement="right" :disabled="sidebar.opened" :open-delay="200">
        <router-link :to="{ name: STORAGE.NAME }">
          <svg-icon class="icon" icon-class="campaign" />
          <span class="name">Lưu trữ</span>
          <div class="devider " :class="{'active': currentModule === STORAGE.NAME}" />
        </router-link>
      </el-tooltip>
    </div>

    <div
      v-if="isAdminView"
      class="sidebar-item"
      :class="{'active': currentModule === FT_CATEGORY.NAME || currentModule == FT_POST.NAME}"
      @mouseenter="isFtHovered = true"
      @mouseleave="isFtHovered = false"
    >
      <a @click="toggleFtSubSidebar">
        <svg-icon class="icon" icon-class="premium" />
        <span class="name">fancythings.io</span>
        <svg-icon v-if="!showFtSubSidebar" icon-class="arrow-right-1" class="open-subsidebar-icon" />
        <svg-icon v-if="showFtSubSidebar" icon-class="arrow-down-2" class="close-subsidebar-icon" />
      </a>
      <div class="devider" :class="{'active': currentModule === FT_CATEGORY.NAME || currentModule === FT_POST.NAME}" />
      <div v-show="isFtHovered && !sidebar.opened" class="hover-sub-sidebar">
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === FT_CATEGORY.NAME}"
        >
          <router-link :to="{ name: FT_CATEGORY.NAME }">Danh mục</router-link>
        </div>
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === FT_POST.LIST.NAME || currentRouteName === FT_POST.DETAIL.NAME}"
        >
          <router-link :to="{ name: FT_POST.LIST.NAME }">Bài viết</router-link>
        </div>
      </div>
    </div>
    <el-collapse-transition v-if="isAdminView">
      <div v-show="showFtSubSidebar && sidebar.opened" class="sub-sidebar">
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === FT_CATEGORY.NAME}"
        >
          <router-link :to="{ name: FT_CATEGORY.NAME }">Danh mục</router-link>
        </div>
        <div
          class="sub-sidebar-item"
          :class="{'active': currentRouteName === FT_POST.LIST.NAME || currentRouteName === FT_POST.DETAIL.NAME}"
        >
          <router-link :to="{ name: FT_POST.LIST.NAME }">Bài viết</router-link>
        </div>
      </div>
    </el-collapse-transition>

    <user-action />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserAction from '@/layout/components/Sidebar/UserAction.vue'
import { mapGetters } from 'vuex'
import { AD, DASHBOARD, EVENT, INGREDIENT, NUTRITION, RECIPE, STORAGE, FT_CATEGORY, FT_POST } from '@/utils/constants/route'
@Component({
  components: {
    UserAction
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  }
})
export default class SideBar extends Vue {
  AD = AD
  DASHBOARD = DASHBOARD
  EVENT = EVENT
  INGREDIENT = INGREDIENT
  NUTRITION = NUTRITION
  RECIPE = RECIPE
  STORAGE = STORAGE
  FT_CATEGORY = FT_CATEGORY
  FT_POST = FT_POST

  isAdHovered = false
  showAdSubSidebar = false
  isFtHovered = false
  showFtSubSidebar = false

  get isAdminView() {
    return [
      AD.NAME,
      DASHBOARD.NAME,
      EVENT.NAME,
      INGREDIENT.NAME,
      NUTRITION.NAME,
      RECIPE.NAME,
      STORAGE.NAME,
      FT_CATEGORY.NAME,
      FT_POST.NAME
    ]
      .includes(this.currentModule)
  }

  get currentModule() {
    return this.$route.meta && this.$route.meta.module
  }

  get currentPath() {
    return this.$route && this.$route.path
  }

  get currentRouteName() {
    return this.$route.name
  }

  toggleAdSubSidebar() {
    this.showAdSubSidebar = !this.showAdSubSidebar
  }

  toggleFtSubSidebar() {
    this.showFtSubSidebar = !this.showFtSubSidebar
  }
}
</script>
