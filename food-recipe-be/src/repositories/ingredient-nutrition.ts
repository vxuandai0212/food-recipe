import { EntityRepository, Not, Repository } from 'typeorm'
import { IngredientNutrition } from 'entity/ingredient-nutrition'

@EntityRepository(IngredientNutrition)
export class IngredientNutritionRepository extends Repository<IngredientNutrition> {
  isIngredientNutritionExist(ingredientId: any, nutritionId: any, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { ingredientId, nutritionId, id: Not(excludeId) } })
    } else {
      return this.findOne({ where: { ingredientId, nutritionId } })
    }
  }
}
