import { EntityRepository, Not, Repository } from 'typeorm'
import { RecipeIngredient } from 'entity/recipe-ingredient'

@EntityRepository(RecipeIngredient)
export class RecipeIngredientRepository extends Repository<RecipeIngredient> {
  isRecipeIngredientExist(recipeId: any, ingredientId: any, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { recipeId, ingredientId, id: Not(excludeId) } })
    } else {
      return this.findOne({ where: { recipeId, ingredientId } })
    }
  }
}
