import { EntityRepository, Repository } from 'typeorm'
import { IngredientInfo } from 'entity/ingredient-info'

@EntityRepository(IngredientInfo)
export class IngredientInfoRepository extends Repository<IngredientInfo> {}
