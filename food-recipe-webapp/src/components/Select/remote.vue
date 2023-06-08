<template>
  <el-select
    v-model="value"
    style="width: 100%;"
    filterable
    :allow-create="allowCreate"
    remote
    reserve-keyword
    :multiple="multiple"
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :value-key="valueKey"
    :loading="loading"
    @change="onChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <slot name="content" />
    </el-option>
  </el-select>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { get } from 'lodash'

@Component
export default class RemoteSelect extends Vue {
  @Prop({ type: String }) readonly placeholder!: String
  @Prop() readonly valuePath!: string
  @Prop() readonly setValueCommand!: string
  @Prop() readonly options: any
  @Prop({ default: false }) multiple!: boolean
  @Prop({ default: false }) allowCreate!: boolean
  @Prop({ default: 'value' }) valueKey!: string

  loading = false

  get value() {
    return get(this.$store.state, this.valuePath, null)
  }

  set value(val) {
    if (this.setValueCommand) {
      this.$store.commit(this.setValueCommand, val)
    }
  }

  remoteMethod(query) {
    if (query !== '') {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$emit('search', query.trim())
      }, 200)
    }
  }

  onChange(value) { this.$emit('on-change', value) }
}
</script>
<style lang="scss" scoped></style>
