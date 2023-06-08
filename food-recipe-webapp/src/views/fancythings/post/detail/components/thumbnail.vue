<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><h1>Hình ảnh</h1></el-col>
      <el-col v-if="!(detail.image && detail.image.id)" :span="6">
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
    <div v-if="detail.image && detail.image.id">
      <cld-image style="border-radius:25px;" :cloud-name="detail.image.cloudName" :public-id="detail.image.publicId" crop="scale" width="300" />
      <span class="el-upload-list__item-actions">
        <span
          @click="handlePictureCardPreview()"
        >
          <i class="el-icon-zoom-in" />
        </span>
        <span
          @click="handleRemove()"
        >
          <i class="el-icon-delete" />
        </span>
      </span>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <cld-image v-if="detail.image" :cloud-name="detail.image.cloudName" :public-id="detail.image.publicId" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { IMAGE } from '@/api/endpoint'
import { CONTENT_IMAGE_OBJECT_TYPE, CONTENT_IMAGE_IS_COVER } from '@/utils/constants/common'
import { getToken } from '@/utils/auth'
import AddResourceButton from '@/components/CommonButtons/AddResourceButton.vue'
@Component({
  components: {
    AddResourceButton
  },
  computed: {
    ...mapState({
      detail: (state: any) => state.ftPost.detail.item
    })
  }
})
export default class ImageComp extends Vue {
  IMAGE = IMAGE
  dialogVisible = false

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
      objectId: this.$route.params.postId,
      objectType: CONTENT_IMAGE_OBJECT_TYPE.FT_POST_THUMBNAIL,
      isCover: CONTENT_IMAGE_IS_COVER.DISABLE
    }
  }

  handleRemove() {
    const id = this.$store.state.ftPost.detail.item.image.id
    console.log(id)
    this.$store.dispatch('image/delete', [id]).then(() => {
      this.$store.commit('ftPost/SET_DETAIL_ITEM_IMAGE', {})
    })
  }

  handlePictureCardPreview() {
    this.dialogVisible = true
  }

  onSuccess(response) {
    const image = response.data
    this.$store.commit('ftPost/SET_DETAIL_ITEM_IMAGE', image)
  }
}
</script>
<style lang="scss">
.left-info .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 40px!important;
}
</style>
