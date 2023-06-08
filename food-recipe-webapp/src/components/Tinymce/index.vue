<template>
  <editor
    v-model="contentProp"
    api-key="ler562itr2wqgr95e8vg54rk47skgnv0ox74pw4ji7n9re9o"
    :init="editorConfig"
    :output-format="outputFormat"
  />
</template>

<script>

import plugins from './plugins'
import toolbar from './toolbar'
import menubar from './menubar'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'TinymceEditor',
  components: { 'editor': Editor },
  props: {
    existContent: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    isAutoContent: {
      type: Boolean,
      default: false
    },
    autoContentTags: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      outputFormat: 'html'
    }
  },
  computed: {
    contentProp: {
      // getter
      get: function() {
        return this.content
      },
      // setter
      set: function(newValue) {
        this.$emit('update:content', newValue)
      }
    },
    editorConfig() {
      const fullFeatureConfig = {
        menubar: menubar,
        plugins: plugins,
        toolbar: toolbar,
        toolbar_sticky: true,
        image_advtab: true,
        importcss_append: true,
        file_picker_callback: function(callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', {
              text: 'My text'
            })
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', {
              alt: 'My alt text'
            })
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', {
              source2: 'alt.ogg',
              poster: 'https://www.google.com/logos/google.jpg'
            })
          }
        },
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }

      if (this.isAutoContent) {
        const specialChars = this.autoContentTags.reduce((a, c) => {
          const { key } = c
          const v = {
            text: key,
            value: '${' + key + '}'
          }
          a.push(v)
          return a
        }, [])
        const initConfig = {
          setup: function(editor) {
            var onAction = function(autocompleteApi, rng, value) {
              editor.selection.setRng(rng)
              editor.insertContent(value)
              autocompleteApi.hide()
            }

            var getMatchedChars = function(pattern) {
              return specialChars.filter(function(char) {
                return char.text.indexOf(pattern) !== -1
              })
            }

            editor.ui.registry.addAutocompleter('specialchars_cardmenuitems', {
              ch: '@',
              minChars: 0,
              columns: 1,
              highlightOn: ['char_name'],
              onAction: onAction,
              fetch: function(pattern) {
                // eslint-disable-next-line
                return new tinymce.util.Promise(function(resolve) {
                  var results = getMatchedChars(pattern).map(function(char) {
                    return {
                      type: 'cardmenuitem',
                      value: char.value,
                      label: char.text,
                      items: [
                        {
                          type: 'cardcontainer',
                          direction: 'vertical',
                          items: [
                            {
                              type: 'cardtext',
                              text: char.text,
                              name: 'char_name'
                            },
                            {
                              type: 'cardtext',
                              text: char.value
                            }
                          ]
                        }
                      ]
                    }
                  })
                  resolve(results)
                })
              }
            })
          }
        }
        return Object.assign(initConfig, fullFeatureConfig)
      }
      return fullFeatureConfig
    }
  },
  mounted() {
    this.content = this.existContent;
  }
}
</script>
