<template>
  <div v-loading="containerLoading">
    <el-col :span="24">
      <el-col :span="24">
        <el-button style="float: right;" type="primary" plain @click="save">Lưu</el-button>
      </el-col>
      <el-col :span="24">
        <el-divider />
      </el-col>
      <el-col :span="24">
        <div id="recipe-instruction" />
      </el-col>
    </el-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { Note, Step, Tip } from '@/views/recipe/detail/instruction/editor-js/index'
import { createSuccessNotify } from '@/utils/common'
import { pick } from 'lodash'
import { ACTION, FIELD } from '@/utils/constant'
import EditorJS from '@editorjs/editorjs'

@Component({
  components: {
  },
  computed: {
    ...mapState({
      containerLoading: (state: any) => state.recipe.ui.containerLoading
    })
  }
})
export default class List extends Vue {
  editor = new EditorJS({
    holder: 'recipe-instruction',
    inlineToolbar: ['link', 'marker', 'bold', 'italic'],
    placeholder: 'Thêm nội dung',
    autofocus: true,
    tools: {
      step: Step,
      note: Note,
      tip: Tip
    }
  })

  get recipeId() { return this.$route.params.recipeId }

  async created() { await this.getItem() }

  async getItem() {
    await this.editor.isReady
    await this.$store.commit('recipe/SET_UI_CONTAINER_LOADING', true)
    await this.$store.dispatch('recipe/getDetailItem', this.recipeId)
    const instruction = await this.$store.state.recipe.detail.item.instructionDesign
    if (instruction) {
      await this.editor.render(instruction ? JSON.parse(instruction) : {})
    }
    await this.$store.commit('recipe/SET_UI_CONTAINER_LOADING', false)
  }

  save() {
    this.editor.save().then(async(data) => {
      const { blocks } = data
      const form = this.$store.state.recipe.detail.item
      form.instruction = JSON.stringify(blocks)
      form.instructionDesign = JSON.stringify(data)
      await this.$store.dispatch('recipe/upsert',
        pick(form, ['id', 'name', 'cookTime', 'instruction', 'instructionDesign'])
      )
      createSuccessNotify(this, ACTION.SAVE, FIELD.RECIPE)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    })
  }
}
</script>
<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #4691f6;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}
</style>
