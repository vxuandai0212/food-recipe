import { EntityRepository, Repository } from 'typeorm'
import { RecipeCookEvent } from 'entity/recipe-cook-event'

@EntityRepository(RecipeCookEvent)
export class RecipeCookEventRepository extends Repository<RecipeCookEvent> {
  isRecipeCookEventExist(recipeId: any, cookEventId: any) {
    return this.findOne({ where: { recipeId, cookEventId } })
  }
}
