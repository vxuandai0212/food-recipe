<template>
  <div>
    <p>Tên: <span>{{ name }}</span></p>
    <p>Thời gian chế biến: <span>{{ cookTime }} phút</span></p>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  computed: {
    ...mapState({
      name: (state: any) => state.recipe.detail.item.name,
      cookTime: (state: any) => state.recipe.detail.item.cookTime
    })
  }
})
export default class IngredientInfo extends Vue {
}
</script>
<style lang="scss"></style>
