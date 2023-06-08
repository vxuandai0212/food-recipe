import { EntityRepository, Repository, Not } from 'typeorm'
import { Nutrition } from 'entity/nutrition'

@EntityRepository(Nutrition)
export class NutritionRepository extends Repository<Nutrition> {
  isNutritionNameTaken(name: string, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { name, id: Not(excludeId) } })
    } else {
      return this.findOne({ name })
    }
  }
}
