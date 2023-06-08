<template>
  <div>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.id"
      closable
      :disable-transitions="false"
      style="margin-right:5px;"
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      max="MAX_LENGTH_TAG_NAME"
      size="medium"
      style="margin-top:5px;"
      @keyup.enter.native="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ {{ addLabel }}</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SearchInput from '@/components/SearchInput/index.vue'
import { MAX_LENGTH_TAG_NAME } from '@/utils/constants/constraint'
@Component({
  components: { SearchInput }
})
export default class DynamicTag extends Vue {
  @Prop({ required: true }) addLabel!: string
  @Prop() dynamicTags: any
  MAX_LENGTH_TAG_NAME = MAX_LENGTH_TAG_NAME

  inputVisible = false

  inputValue = ''

  created() {
    this.$emit('get-all-tag')
  }

  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      (this.$refs.saveTagInput as any).$refs.input.focus()
    })
  }

  handleInputConfirm() {
    this.$emit('input-confirm', this.inputValue)
    this.inputVisible = false
    this.inputValue = ''
  }

  handleClose(tag) {
    this.$emit('close', tag)
  }
}
</script>
<style lang="scss">
.__tag_container__{
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
