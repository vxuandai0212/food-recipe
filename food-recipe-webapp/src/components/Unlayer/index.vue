<template>
  <el-row id="unlayer-editor">
    <EmailEditor
      ref="unlayerEditor"
      :project-id="projectId"
      :options="unlayerOptions"
      @load="init"
    />
  </el-row>
</template>
<script>
export default {
  name: 'UnlayerEditor',
  props: {
    design: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isAutoContent: {
      type: Boolean,
      default: false
    },
    autoContentTags: {
      type: Array,
      default: function() {
        return [
          {
            key: 'Họ và tên',
            title: 'Vương Xuân Đại',
            value: 'Họ và tên'
          },
          {
            key: 'Địa chỉ',
            title: '',
            value: 'Địa chỉ'
          }
        ]
      }
    }
  },
  data() {
    return {
      projectId: 45094,
      fonts: {
        showDefaultFonts: true,
        customFonts: [
          {
            label: 'Sarabun',
            value: "'Sarabun', sans-serif",
            url: 'https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
          },
          {
            label: 'FS Magistral',
            value: "'FS Magistral', sans-serif"
          },
          {
            label: 'FS PFBeauSansPro',
            value: "'FS PFBeauSansPro', sans-serif",
            url: 'https://viettelfamily.com/fonts/vt_fonts/styles.css'
          }
        ]
      }
    }
  },
  computed: {
    unlayerOptions: function() {
      const tags = this.autoContentTags.reduce((a, c) => {
        const { key, title } = c
        const p = key.replace(/\s+/g, '')
        a[p] = a[p] ? a[p] : {}
        a[p].name = key
        a[p].value = '${' + key + '}'
        a[p].sample = title
        return a
      }, {})
      return this.isAutoContent ? {
        mergeTags: tags,
        mergeTagsConfig: {
          autocompleteTriggerChar: '@'
        },
        fonts: this.fonts
      } : { fonts: this.fonts }
    }
  },
  methods: {
    getEditorContent() {
      return new Promise((resolve, reject) => {
        this.$refs.unlayerEditor.exportHtml(
          data => resolve(data),
          err => reject(err)
        )
      })
    },
    init() {
      this.$refs.unlayerEditor.loadDesign(this.design)
      const editorEl = document.getElementsByTagName('iframe')
      if (editorEl && editorEl[0]) {
        editorEl[0].style.cssText = 'min-height: 800px!important'
      }
    }
  }
}
</script>

