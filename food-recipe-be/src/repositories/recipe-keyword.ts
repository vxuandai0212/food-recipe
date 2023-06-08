import { EntityRepository, Repository } from 'typeorm'
import { RecipeKeyword } from 'entity/recipe-keyword'

@EntityRepository(RecipeKeyword)
export class RecipeKeywordRepository extends Repository<RecipeKeyword> {
  isRecipeKeywordExist(keywordId: any, recipeId: any) {
    return this.findOne({ where: { recipeId, keywordId } })
  }
}
