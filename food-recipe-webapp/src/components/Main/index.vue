<template>
  <div>
    <PageTitle :title="title" style="margin-bottom: 20px;">
      <slot name="header" />
    </PageTitle>
    <slot name="main" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import PageTitle from '@/components/PageTitle/index.vue'

@Component({
  components: { PageTitle }
})
export default class MainSection extends Vue {
  @Prop(String) readonly title!: String
}
</script>
<style lang="scss"></style>
