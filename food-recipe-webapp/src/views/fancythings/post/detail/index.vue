<template>
  <div>
    <PageTitle>
      <el-row justify="space-between">
        <el-col :span="12">
          <BackToPrevious :to="{ name: FT_POST.LIST.NAME }" :text="backText" class="mb-18 d-inline-block" />
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button type="primary" class="mr-8" @click="savePost">Lưu</el-button>
          <el-button type="danger" @click="deletePost">Xoá</el-button>
        </el-col>
      </el-row>
    </PageTitle>
    <card>
      <el-col :span="24">
        <el-col style="margin-right: 20px;" :span="11">
          <el-col style="margin-bottom: 20px;" :span="24">
            <div v-if="isEditTitle">
              <!-- Tên bài viết -->
              <div class="form-group">
                <vt-input
                  v-model="tmpTitle"
                  class="mb-8"
                  :max-length="MAX_LENGTH_FT_POST_TITLE"
                  :class="{ error: validations.title.anyError() }"
                  @blur="onTitleBlur"
                >
                  <template #label>
                    <span class="required">Tên bài viết</span>
                  </template>
                </vt-input>
                <div class="form-error">
                  <div v-if="validations.title.validated">
                    <div v-if="!validations.title.require">
                      Tên bài viết bắt buộc nhập
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <el-button type="primary" plain size="small" :disabled="!isFormValid" @click="saveTitle">Lưu</el-button>
                <el-button plain size="small" @click="cancelEditTitle">Huỷ</el-button>
              </div>
            </div>
            <div v-else>
              <span style="margin-right: 30px;">{{ title }}</span>
              <span @click="editTitle"><i class="el-icon-edit" /></span>
            </div>
          </el-col>
          <el-col style="margin-bottom: 20px;" :span="24">
            <!-- Danh mục -->
            <div class="form-group mb-4">
              <fix-select
                placeholder="Chọn danh mục"
                :options="categoryOptions"
                value-path="ftPost.detail.item.categoryId"
                set-value-command="ftPost/SET_DETAIL_CATEGORY_ID"
                :filterable="true"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <!-- Danh mục con -->
            <div v-if="selectedCategory" class="form-group mb-4">
              <fix-select
                placeholder="Chọn danh mục con"
                :options="subCategoryOptions"
                value-path="ftPost.detail.item.subCategoryId"
                set-value-command="ftPost/SET_DETAIL_SUB_CATEGORY_ID"
                :filterable="true"
              />
            </div>
          </el-col>
        </el-col>
        <el-col :span="12">
          <thumbnail />
        </el-col>
        <el-col :span="24">
          <h2>Nội dung</h2>
          <div id="ft-post" />
        </el-col>
      </el-col>
    </card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BackToPrevious from '@/components/BackToPrevious/index.vue'
import PageTitle from '@/components/PageTitle/index.vue'
import Card from '@/components/Card/common.vue'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import CodeTool from '@editorjs/code'
import { Image, Video } from '@/views/fancythings/post/detail/components/editor-js'
import { MAX_LENGTH_FT_POST_TITLE } from '@/utils/constants/constraint'
import { pick } from 'lodash'
import { createSuccessNotify } from '@/utils/common'
import VtInput from '@/components/VtInput/index.vue'
import { ACTION, FIELD } from '@/utils/constant'
import { FT_POST } from '@/utils/constants/route'
import Thumbnail from '@/views/fancythings/post/detail/components/thumbnail.vue'
import { FT_CATEGORY_LEVEL } from '@/utils/constants/ft-category'
import FixSelect from '@/components/Select/fix.vue'
@Component({
  components: {
    BackToPrevious,
    PageTitle,
    Card,
    Thumbnail,
    VtInput,
    FixSelect
  }
})
export default class Detail extends Vue {
  FT_POST = FT_POST
  MAX_LENGTH_FT_POST_TITLE = MAX_LENGTH_FT_POST_TITLE

  tmpTitle = ''

  isEditTitle = false

  editor = new EditorJS({
    holder: 'ft-post',
    inlineToolbar: ['link', 'marker', 'bold', 'italic'],
    placeholder: 'Thêm nội dung',
    autofocus: true,
    tools: {
      header: Header,
      list: List,
      paragraph: Paragraph,
      image: Image,
      video: Video,
      code: CodeTool
    }
  })

  get isFormValid(): boolean {
    return this.validations.title.require
  }

  validations = {
    title: {
      require: true,
      validated: false,
      anyError() {
        return !this.require
      }
    }
  }

  onTitleBlur() {
    this.validations.title.validated = true
    if (this.tmpTitle) {
      this.validations.title.require = true
    } else {
      this.validations.title.require = false
    }
  }

  get allCategory() { return this.$store.state.ftCategory.list.items }

  get categoryOptions() {
    return this.allCategory
      .filter(i => i.level === FT_CATEGORY_LEVEL.LEVEL_1)
      .map(({ id, name }) => ({ label: name, key: id, value: id }))
  }

  get selectedCategory() { return this.$store.state.ftPost.detail.item.categoryId }

  get subCategoryOptions() {
    const selectedCategory = this.selectedCategory
    return this.allCategory
      .filter(i => i.parentId === selectedCategory)
      .map(({ id, name }) => ({ label: name, key: id, value: id }))
  }

  get postId() { return this.$route.params.postId }

  async getAllCategory() {
    await this.$store.commit('ftCategory/SET_LIST_QUERY_LEVEL', null)
    await this.$store.commit('ftCategory/SET_LIST_QUERY_PAGE', 1)
    await this.$store.commit('ftCategory/SET_LIST_QUERY_LIMIT', 1000)
    await this.$store.dispatch('ftCategory/getAllItem')
  }

  async created() {
    await this.getAllCategory()
    await this.getItem()
  }

  async getItem() {
    await this.editor.isReady
    await this.$store.commit('ftPost/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('ftPost/getDetailItem', this.postId)
    const content = await this.$store.state.ftPost.detail.item.rawContent
    if (content) {
      const r = JSON.parse(content)
      if (r && r.blocks.length > 0) {
        await this.editor.render(JSON.parse(content))
      }
    }
    await this.$store.commit('ftPost/SET_UI_CONTAINER_LOADING', false)
  }

  get backText() { return 'Chi tiết bài viết' }

  get title() { return this.$store.state.ftPost.detail.item.title }

  editTitle() { this.isEditTitle = true; this.tmpTitle = this.title }

  savePost() {
    this.editor.save().then(async(data) => {
      const { blocks } = data
      const form = this.$store.state.ftPost.detail.item
      form.content = JSON.stringify(blocks)
      form.rawContent = JSON.stringify(data)
      await this.$store.dispatch('ftPost/upsert',
        pick(form, ['id', 'title', 'categoryId', 'subCategoryId', 'rawContent', 'content'])
      )
      createSuccessNotify(this, ACTION.SAVE, FIELD.FT_POST)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    })
  }

  async saveTitle() {
    const form = this.$store.state.ftPost.detail.item
    form.title = this.tmpTitle
    await this.$store.dispatch('ftPost/upsert',
      pick(form, ['id', 'title'])
    )
    await createSuccessNotify(this, ACTION.SAVE, FIELD.FT_POST)
    this.isEditTitle = false
  }

  async deletePost() {
    const id = this.$route.params.postId
    await this.$store.dispatch('ftPost/delete', id)
    await createSuccessNotify(this, ACTION.DELETE, FIELD.FT_POST)
    await this.$router.push({ name: FT_POST.LIST.NAME })
  }

  cancelEditTitle() { this.isEditTitle = false; }
}
</script>
<style lang="scss"></style>
