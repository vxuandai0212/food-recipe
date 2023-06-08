<template>
  <div>
    <h2>Tên: <span>{{ name }}</span></h2>
    <h2>Giá: <span>{{ price }}</span></h2>
    <h2>Giá hiển thị: <span>{{ displayPrice }}</span></h2>
    <h2>Đơn vị giá hiển thị: <span>{{ displayPriceUnit }}</span></h2>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  computed: {
    ...mapState({
      name: (state: any) => state.ingredient.detail.item.name,
      price: (state: any) => state.ingredient.detail.item.price,
      displayPrice: (state: any) => state.ingredient.detail.item.displayPrice,
      displayPriceUnit: (state: any) => state.ingredient.detail.item.displayPriceUnit
    })
  }
})
export default class IngredientInfo extends Vue {

}
</script>
<style lang="scss"></style>
