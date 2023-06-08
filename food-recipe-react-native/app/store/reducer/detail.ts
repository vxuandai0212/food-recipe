import { DataAction } from "app/constants/types/action"
import { INGREDIENT_INFO_TYPE } from "app/constants/types/enum"
import { RecipeDetailState } from "app/constants/types/state"
import * as types from 'app/store/action-type'
import _ from 'lodash'

const INITIAL_STATE: RecipeDetailState = {
  loading: false,
  item: {},
  adView: {
    ingredient: [],
    instructionTip: null,
    price: false,
    nutrition: false
  },
  currentIngredient: null,
  currentIngredientId: null,
  benefits: null,
  warnings: null,
  overuseWarnings: null,
  consumerWarnings: null,
  combineWarnings: null,
  selectTips: null,
  preprocessTips: null,
  preserveTips: null,
  allNutrition: null,
  currentIngredientNutrition: null
}

const getAllNutrition = (ingredients: any) => {
  let allNutrition: any = []
  _.forEach(ingredients, function(ingredient) {
    if (ingredient) {
      const currentNutritions = ingredient.nutritions
      if (currentNutritions) {
        _.forEach(currentNutritions, function(n) {
          const { name, value } = n
          allNutrition.push({name, value})
        })
      }
    }
  })
  let holder: any = {}

  allNutrition.forEach(function(d: any) {
    if (holder.hasOwnProperty(d.name)) {
      holder[d.name] = holder[d.name] + d.value;
    } else {
      holder[d.name] = d.value;
    }
  })

  let nutritions = []

  for (let prop in holder) {
    nutritions.push({ name: prop, value: holder[prop] })
  }

  return nutritions
}

export default (state: RecipeDetailState = INITIAL_STATE, { type, data }: DataAction) => {
  switch (type) {
    case types.DETAIL_SET_LOADING:
      return { ...state, loading: data }
    case types.DETAIL_SET_ITEM:
      const { instruction, ingredients } = data
      const adViewIngredient = []
      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i]
        const id = ingredient.id
        const infos = ingredient.info
        for (let j = 0; j < infos.length; j++) {
          const info = infos[j]
          const key = `${id}-${info.type}`
          adViewIngredient.push({ id: key, viewed: false })
        }
      }
      const adView = {
        ingredient: adViewIngredient,
        instructionTip: instruction ? instruction.map((i: any) => ({ id: i.id, viewed: false })) : [],
        price: false,
        nutrition: false
      }

      const allNutrition = getAllNutrition(ingredients)

      return { ...state, item: data, adView, allNutrition }
    case types.DETAIL_VIEW_PRICE_AD:
      return { ...state, price: true }
    case types.DETAIL_VIEW_NUTRITION_AD:
      return { ...state, nutrition: true }
    case types.DETAIL_VIEW_INGREDIENT_AD:
      const updateIngredientAdView = state.adView.ingredient.map(
        (i: any) => i.id === data ? {...i, viewed: true} : i
      )
      return { ...state, adView: { ...state.adView, ingredient: updateIngredientAdView } }
    case types.DETAIL_VIEW_INSTRUCTION_TIP_AD:
      const updateIntructionTipAdView = state.adView.instructionTip.map(
        (i: any) => i.id === data ? {...i, viewed: true} : i
      )
      return { ...state, adView: { ...state.adView, instructionTip: updateIntructionTipAdView } }
    case types.DETAIL_SET_CURRENT_INGREDIENT:
      const benefits = data.info.filter((i: any) => i.type === INGREDIENT_INFO_TYPE.BENEFIT)
      const warnings = data.info.filter((i: any) => [
        INGREDIENT_INFO_TYPE.WARNING_OVERUSE,
        INGREDIENT_INFO_TYPE.WARNING_CONSUMER,
        INGREDIENT_INFO_TYPE.WARNING_COMBINE
      ].includes(i.type))
      const overuseWarnings = data.info.filter((i: any) => i.type === INGREDIENT_INFO_TYPE.WARNING_OVERUSE)
      const consumerWarnings = data.info.filter((i: any) => i.type === INGREDIENT_INFO_TYPE.WARNING_CONSUMER)
      const combineWarnings = data.info.filter((i: any) => i.type === INGREDIENT_INFO_TYPE.WARNING_COMBINE)
      const selectTips = data.info.filter((i: any) => i.type === INGREDIENT_INFO_TYPE.TIP_SELECT)
      const preprocessTips = data.info.filter((i: any) => i.type === INGREDIENT_INFO_TYPE.TIP_PREPROCESS)
      const preserveTips = data.info.filter((i: any) => i.type === INGREDIENT_INFO_TYPE.TIP_PRESERVE)
      return { ...state, currentIngredient: data, benefits, warnings, overuseWarnings, consumerWarnings, combineWarnings, selectTips, preprocessTips, preserveTips }
    case types.DETAIL_SET_CURRENT_INGREDIENT_ID:
      const filterIngredients = state.item.ingredients!.filter((i: any) => i.id === data)
      if (filterIngredients) {
        const currentIngredientNutrition = filterIngredients[0]['nutritions']
        return { ...state, currentIngredientNutrition, currentIngredientId: data }
      } else {
        return { ...state, currentIngredientId: data }
      }
    default:
      return state
  }
}
