<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><h1>Hình ảnh</h1></el-col>
      <el-col :span="6">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :headers="headers"
          :show-file-list="false"
          :auto-upload="true"
          :multiple="false"
          :on-success="onSuccess"
          :data="requestData"
        >
          <i slot="default" class="el-icon-plus" />
        </el-upload>
      </el-col>
    </el-row>
    <el-row v-for="(listImage, index) in all" :key="index" style="margin-top:30px" :gutter="20">
      <el-col v-for="item in listImage" :key="item.id" :span="6">
        <el-badge v-if="item.isCover === CONTENT_IMAGE_IS_COVER.ENABLE" value="cover" class="item">
          <cld-image
            style="border-radius:25px;width:100%;"
            :cloud-name="item.cloudName"
            :public-id="item.publicId"
            crop="scale"
          />
        </el-badge>
        <cld-image
          v-else
          style="border-radius:25px;width:100%;"
          :cloud-name="item.cloudName"
          :public-id="item.publicId"
          crop="scale"
        />
        <span class="el-upload-list__item-actions">
          <span
            @click="handlePictureCardPreview(item)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            @click="handleRemove(item)"
          >
            <i class="el-icon-delete" />
          </span>
          <el-tooltip class="item" effect="dark" content="Đặt làm cover" placement="top-start">
            <span
              @click="handleSetCover(item)"
            >
              <i class="el-icon-star-off" />
            </span>
          </el-tooltip>
        </span>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <div v-if="preview.loading">Loading</div>
      <cld-image v-else style="width:100%" :cloud-name="preview.cloudName" :public-id="preview.publicId" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { IMAGE } from '@/api/endpoint'
import { CONTENT_IMAGE_OBJECT_TYPE, CONTENT_IMAGE_IS_COVER } from '@/utils/constants/common'
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex'
import { chunk } from 'lodash'
@Component({
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.image.ui.containerLoading,
      listLoading: (state: any) => state.image.ui.listLoading,
      all: (state: any) => chunk(state.image.list.items, 4)
    })
  }
})
export default class ImageComp extends Vue {
  IMAGE = IMAGE
  CONTENT_IMAGE_IS_COVER = CONTENT_IMAGE_IS_COVER
  dialogVisible = false
  preview = {
    cloudName: null,
    publicId: null,
    loading: true
  }

  get recipeId() { return this.$route.params.recipeId }

  created() {
    this.getAllItem()
  }

  getAllItem() {
    this.$store.commit('image/SET_LIST_QUERY_OBJECT_ID', this.recipeId)
    this.$store.commit('image/SET_LIST_QUERY_OBJECT_TYPE', CONTENT_IMAGE_OBJECT_TYPE.RECIPE)
    this.$store.dispatch('image/getAllItem')
  }

  get action() {
    const BASE_API_URL = process.env.VUE_APP_BASE_API_URL
    return BASE_API_URL.concat(IMAGE.UPLOAD)
  }

  get headers() {
    return {
      Authorization: `Bearer ${getToken()}`
    }
  }

  get requestData() {
    return {
      objectId: this.$route.params.recipeId,
      objectType: CONTENT_IMAGE_OBJECT_TYPE.RECIPE,
      isCover: CONTENT_IMAGE_IS_COVER.DISABLE
    }
  }

  handleRemove(item) {
    const { id } = item
    this.$store.dispatch('image/delete', [id]).then(() => {
      this.getAllItem()
    })
  }

  handlePictureCardPreview(item) {
    this.preview.loading = true
    const { cloudName, publicId } = item
    this.dialogVisible = true
    this.preview.cloudName = cloudName
    this.preview.publicId = publicId
    setTimeout(() => {
      this.preview.loading = false
    }, 1000)
  }

  onSuccess() {
    this.getAllItem()
  }

  handleSetCover(item) {
    const { id } = item
    this.$store.dispatch('image/setCover', { imageId: id, recipeId: this.recipeId }).then(() => {
      this.getAllItem()
    })
  }
}
</script>
<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
