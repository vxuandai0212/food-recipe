<template>
  <div>
    <transition-group
      name="staggered-fade"
      tag="div"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <card-statistical
        v-for="(item,index) in items"
        :key="item.title"
        :total="item.total"
        :icon="item.icon"
        :title="item.title"
        :icon-title="item.iconTitle"
        style="margin-right: 1.6%; margin-bottom: 24px"
        :class="{'card-statistical':(index+1)%5===0}"
        :data-index="index"
      />
    </transition-group>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CardStatistical from '@/components/CardStatistical/index.vue'
import { mapState } from 'vuex'
import Velocity from 'velocity-animate'

@Component({
  components: { CardStatistical },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.stat.ui.containerLoading,
      items: (state: any) => state.stat.list.items
    })
  }
})
export default class StatSection extends Vue {
  async created() { await this.getAllItem() }

  async getAllItem() {
    await this.$store.commit('stat/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('stat/getAllItem')
    await this.$store.commit('stat/SET_UI_CONTAINER_LOADING', false)
  }

  beforeEnter(el) {
    el.style.opacity = 0
    el.style.transform = 'scaleX(0)'
  }

  enter(el, done) {
    var delay = el.dataset.index * 30
    setTimeout(function() {
      Velocity(
        el,
        { opacity: 1, transform: 'scaleX(1)' },
        { complete: done }
      )
    }, delay)
  }

  leave(el, done) {
    var delay = el.dataset.index * 30
    setTimeout(function() {
      Velocity(
        el,
        { opacity: 0, transform: 'scaleX(0)' },
        { complete: done }
      )
    }, delay)
  }
}
</script>
<style lang="scss" scoped></style>
