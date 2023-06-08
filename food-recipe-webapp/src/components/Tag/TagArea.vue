<template>
  <el-card shadow="never" style="border-radius: 12px;">
    <div class="justify-between">
      <span class="block mb-2">Tags</span>
      <div class="w-65">
        <div class="search-input-wrapper mb-32 w-100 ">
          <el-popover
            v-model="isShowSuggestion"
            placement="bottom-start"
            trigger="focus"
            visible-arrow="false"
            popper-class="custom-alias-popover"
          >
            <search-input
              slot="reference"
              v-model="searchKeyword"
              placeholder="Nhập tên tag"
              class="tag-search-input w-100"
              :max-length="200"
              @input="onTagSearch"
              @focus="isShowSuggestion = true"
            />
            <div v-loading="suggestionLoading" class="alias-suggestion-wrapper">
              <div v-if="isShowCreateTag" class="mb-8">
                <p class="label">Tạo tag:</p>
                <div class="alias-item" @click="onCreateTag">
                  {{ searchKeyword }}
                </div>
              </div>
              <div v-if="options.length > 0">
                <p class="label">{{ addLabel }}</p>
                <div v-for="tag in options" :key="tag.id" class="alias-item" @click="onSelectTag(tag)">
                  <div class="truncate alias-name">{{ tag.name }}</div>
                </div>
              </div>
              <div v-if="isShowNoList">
                Không có tag nào
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <div>
      <el-tag
        v-for="(tag, index) in currentTagList"
        :key="tag.id"
        :type="getTagType(index)"
        size="default"
        effect="light"
        class="mr-16 mb-16"
        closable
        @close="onRemoveTag(tag)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
  </el-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SearchInput from '@/components/SearchInput/index.vue'
import { debounce } from 'lodash'

@Component({
  components: { SearchInput }
})
export default class TagArea extends Vue {
  @Prop({ required: true }) addLabel!: string
  @Prop() currentTagList!: any
  @Prop() options!: any

  get searchKeyword() {
    return this.$store.state.tag.list.query.searchKeyword
  }

  set searchKeyword(value) {
    this.$store.dispatch('tag/setListQuerySearchKeyword', value)
  }

  isShowCreateTag() {
    return this.options.length === 0 && this.searchKeyword.trim() !== ''
  }

  isShowSuggestion = false

  suggestionLoading = false

  get isShowNoList(): boolean {
    return this.options.length === 0 && !this.searchKeyword
  }

  getTagType(index: number) {
    const arr = ['primary', 'success', 'info', 'warning', 'danger']
    const ind = index % 5
    return arr[ind]
  }

  onTagSearch() {
    debounce(this.$emit('on-tag-search'), 200)
  }

  onSelectTag(tag) {
    this.$emit('on-select-tag', tag)
  }

  onCreateTag() {
    this.$emit('on-create-tag')
  }

  onRemoveTag(tag) {
    this.$emit('on-remove-tag', tag)
  }
}
</script>
