<template>
  <el-select
    v-model="value"
    style="width: 100%;"
    :multiple="multiple"
    :placeholder="placeholder"
    :filterable="filterable"
    :allow-create="allowCreate"
    :disabled="disabled"
    @change="onChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { get } from 'lodash'

@Component
export default class FixSelect extends Vue {
  @Prop({ type: String }) readonly placeholder!: String
  @Prop() readonly options!: any
  @Prop({ default: null }) readonly defaultValue: any
  @Prop() readonly valuePath!: string
  @Prop() readonly setValueCommand!: string
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean
  @Prop({ type: Boolean, default: false }) readonly filterable!: boolean
  @Prop({ type: Boolean, default: false }) readonly allowCreate!: boolean
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean

  get value() {
    return get(this.$store.state, this.valuePath, this.defaultValue)
  }

  set value(val) {
    if (this.setValueCommand) {
      this.$store.commit(this.setValueCommand, val)
    }
  }

  onChange(value) { this.$emit('on-change', value) }
}
</script>
<style lang="scss" scoped></style>
