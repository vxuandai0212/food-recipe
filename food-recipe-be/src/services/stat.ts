import { getCustomRepository } from 'typeorm'
import {
  RecipeRepository,
  CookEventRepository,
  StorageRepository,
  IngredientRepository,
  NutritionRepository,
  AdRepository,
  AdCustomerRepository,
  KeywordRepository,
  AdViewRepository
} from 'repositories/index'

const overview = async () => {
  const adRepository = getCustomRepository(AdRepository)
  const recipeRepository = getCustomRepository(RecipeRepository)
  const ingredientRepository = getCustomRepository(IngredientRepository)
  const nutritionRepository = getCustomRepository(NutritionRepository)
  const cookEventRepository = getCustomRepository(CookEventRepository)
  const adCustomerRepository = getCustomRepository(AdCustomerRepository)
  const storageRepository = getCustomRepository(StorageRepository)
  const keywordRepository = getCustomRepository(KeywordRepository)
  const adViewRepository = getCustomRepository(AdViewRepository)

  const result = []

  const countAdQuery = adRepository.createQueryBuilder('a').select('count(a.id)', 'totalAd')
  const { totalAd } = await countAdQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Quảng cáo', iconTitle: 'group-176', total: totalAd })

  const countRecipeQuery = recipeRepository.createQueryBuilder('a').select('count(a.id)', 'totalRecipe')
  const { totalRecipe } = await countRecipeQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Công thức', iconTitle: 'group-176', total: totalRecipe })

  const countIngredientQuery = ingredientRepository.createQueryBuilder('a').select('count(a.id)', 'totalIngredient')
  const { totalIngredient } = await countIngredientQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Thành phần', iconTitle: 'group-176', total: totalIngredient })

  const countNutritionQuery = nutritionRepository.createQueryBuilder('a').select('count(a.id)', 'totalNutrition')
  const { totalNutrition } = await countNutritionQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Dinh dưỡng', iconTitle: 'group-176', total: totalNutrition })

  const countCookEventQuery = cookEventRepository.createQueryBuilder('a').select('count(a.id)', 'totalCookEvent')
  const { totalCookEvent } = await countCookEventQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Dịp', iconTitle: 'group-176', total: totalCookEvent })

  const adCustomerQuery = adCustomerRepository.createQueryBuilder('a').select('count(a.id)', 'totalAdCustomer')
  const { totalAdCustomer } = await adCustomerQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Khách hàng', iconTitle: 'group-176', total: totalAdCustomer })

  const countStorageQuery = storageRepository.createQueryBuilder('a').select('count(a.id)', 'totalStorage')
  const { totalStorage } = await countStorageQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Lưu trữ', iconTitle: 'group-176', total: totalStorage })

  const countKeywordQuery = keywordRepository.createQueryBuilder('a').select('count(a.id)', 'totalKeyword')
  const { totalKeyword } = await countKeywordQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Từ khóa', iconTitle: 'group-176', total: totalKeyword })

  const countViewAdmobQuery = adViewRepository.createQueryBuilder('a').select('count(a.id)', 'totalViewAdmob')
    .where('a.id IN (:...ids)', { ids: [1, 2, 3, 4] })
  const { totalViewAdmob } = await countViewAdmobQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Lượt xem Admob', iconTitle: 'group-176', total: totalViewAdmob })

  const countViewNativeAdQuery = adViewRepository.createQueryBuilder('a').select('count(a.id)', 'totalViewNativeAd')
    .where('a.id NOT IN (:...ids)', { ids: [1, 2, 3, 4] })
  const { totalViewNativeAd } = await countViewNativeAdQuery.getRawOne()
  result.push({ icon: 'game-big', title: 'Lượt xem Native Ad', iconTitle: 'group-176', total: totalViewNativeAd })

  return result
}

const statService = {
  overview
}

export default statService
