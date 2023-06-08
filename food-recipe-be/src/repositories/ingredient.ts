import { EntityRepository, Repository, Not } from 'typeorm'
import { Ingredient } from 'entity/ingredient'

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  isIngredientNameTaken(name: string, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { name, id: Not(excludeId) } })
    } else {
      return this.findOne({ name })
    }
  }
}
