import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Home,
  Detail,
  RecipeSearch,
  RecipePrice,
  RecipeNutrition,
  ViewImage,
  Tip,
  IngredientBenefit,
  IngredientWarning
} from 'app/screens/food-delivery'
import { SCREEN } from 'app/constants/types/screen'

const Stack = createStackNavigator()
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN.RECIPE_LIST} component={Home} />
      <Stack.Screen name={SCREEN.RECIPE_DETAIL} component={Detail} />
      <Stack.Screen name={SCREEN.RECIPE_SEARCH} component={RecipeSearch} />
      <Stack.Screen name={SCREEN.RECIPE_PRICE} component={RecipePrice} />
      <Stack.Screen name={SCREEN.RECIPE_NUTRITION} component={RecipeNutrition} />
      <Stack.Screen name={SCREEN.VIEW_IMAGE} component={ViewImage} />
      <Stack.Screen name={SCREEN.TIP} component={Tip} />
      <Stack.Screen name={SCREEN.INGREDIENT_BENEFIT} component={IngredientBenefit} />
      <Stack.Screen name={SCREEN.INGREDIENT_WARNING} component={IngredientWarning} />
    </Stack.Navigator>
  )
}

export default StackNavigator
