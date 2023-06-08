import { EntityRepository, Repository, Not } from 'typeorm'
import { Recipe } from 'entity/recipe'

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  isRecipeNameTaken(name: string, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { name, id: Not(excludeId) } })
    } else {
      return this.findOne({ name })
    }
  }
}
