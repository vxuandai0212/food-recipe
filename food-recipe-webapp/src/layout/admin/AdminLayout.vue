<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div
      class="main-container"
    >
      <app-main style="background-color: #F5F6FA;" />
    </div>
  </div>
</template>
<script>
import { AppMain, Sidebar } from '../components'
import { mapGetters } from 'vuex'
export default {
  name: 'AdminLayout',
  components: { AppMain, Sidebar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: false
      }
    }
  }
}
</script>
