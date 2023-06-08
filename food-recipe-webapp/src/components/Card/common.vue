<template>
  <div class="common-card mb-32" :class="{ 'd-flex': dFlex }"><slot /></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Card extends Vue {
  @Prop({ type: Boolean, default: true }) readonly dFlex!: boolean
}
</script>
<style lang="scss"></style>
