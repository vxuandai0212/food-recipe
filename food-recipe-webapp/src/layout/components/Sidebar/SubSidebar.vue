<template>
  <div class="sub-sidebar" :style="{paddingTop: paddingTop}">
    <div v-for="(item, index) in items" :key="index" class="sub-sidebar-item">
      <router-link :to="item.to">
        <svg-icon :icon-class="item.icon" />
        <span class="sub-sidebar-name">{{ item.text }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: false,
      default: () => 0
    }
  },

  computed: {
    paddingTop() {
      return (97 + (this.activeIndex - 1) * 51) + 'px'
    }
  }

}
</script>
<style lang="scss">

</style>
