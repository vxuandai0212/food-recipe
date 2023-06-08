import { getCustomRepository } from 'typeorm'
import {
  AdViewRepository,
  AdRepository,
  IngredientNutritionRepository,
  RecipeRepository,
  ImageRepository,
  RecipeCookEventRepository,
  RecipeIngredientRepository,
  KeywordRepository,
  ViewRepository,
  IngredientInfoRepository,
  AdLocationRepository
} from 'repositories/index'
import {
  ContentImage,
  Image,
  Storage,
  Ingredient,
  CookEvent,
  RecipeKeyword,
  AdLocation,
  Keyword,
  Nutrition
} from 'entity/index'
import {
  CONTENT_IMAGE_IS_COVER_TYPE,
  CONTENT_IMAGE_OBJECT_TYPE,
  VIEW_TYPE
} from 'constants/entity'
import { redisClient, ENABLE_REDIS, REDIS_TTL } from 'config/redis'
import { v2 } from 'cloudinary'

v2.config({
  cloud_name: 'fit1501040028',
  api_key: '933392669637745',
  api_secret: '1zoGKEuecwuoB1MTdo-9UYjzf80',
  secure: true
})

const recent = async (payload: any) => {
  const { page, limit } = payload
  const recipeRepository = getCustomRepository(RecipeRepository)
  const items = await recipeRepository
    .createQueryBuilder('r')
    .leftJoin(
      ContentImage,
      'ci',
      'ci.objectId = r.id and ci.objectType = :type and ci.isCover = :isCover',
      {
        type: CONTENT_IMAGE_OBJECT_TYPE.RECIPE,
        isCover: CONTENT_IMAGE_IS_COVER_TYPE.ENABLE
      }
    )
    .leftJoin(Image, 'i', 'i.id = ci.imageId')
    .leftJoin(Storage, 's', 's.id = i.storageId')
    .select('r.id', 'id')
    .addSelect('r.name', 'name')
    .addSelect('r.cookTime', 'cookTime')
    .addSelect('s.cloudName', 'imageCloudName')
    .addSelect('i.publicId', 'imagePublicId')
    .where('DATE(r.created_at) = CURDATE()')
    .offset((page - 1) * limit)
    .limit(limit)
    .orderBy('r.id', 'DESC')
    .distinct(true)
    .getRawMany()

  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const { imageCloudName, imagePublicId } = item
      if (imageCloudName && imagePublicId) {
        item.imageUrl = v2.url(imagePublicId)
      }
    }
  }

  const count = await recipeRepository
    .createQueryBuilder('r')
    .select('count(distinct r.id)', 'total')
    .where('DATE(r.created_at) = CURDATE()')
    .getRawOne()
  const { total } = count

  return { total, items }
}

const viewKeyword = async (ip: any, keyword: any) => {
  const keywordRepository = getCustomRepository(KeywordRepository)
  const viewRepository = getCustomRepository(ViewRepository)
  const keywordEntity = await keywordRepository.findOne({ name: keyword })
  if (keywordEntity) {
    const { id } = keywordEntity
    const view = await viewRepository.create()
    view.ipAddress = ip
    view.objectId = id
    view.type = VIEW_TYPE.KEYWORD
    view.viewAt = new Date()
    await viewRepository.save(view)
  } else {
    const newKeywordEntity = await keywordRepository.create()
    newKeywordEntity.name = keyword
    await keywordRepository.save(newKeywordEntity)
    const { id } = newKeywordEntity
    const view = await viewRepository.create()
    view.ipAddress = ip
    view.objectId = id
    view.type = VIEW_TYPE.KEYWORD
    view.viewAt = new Date()
    await viewRepository.save(view)
  }
}

const viewRecipe = async (ip: any, recipeId: any) => {
  const viewRepository = getCustomRepository(ViewRepository)
  const view = await viewRepository.create()
  view.ipAddress = ip
  view.objectId = recipeId
  view.type = VIEW_TYPE.RECIPE
  view.viewAt = new Date()
  await viewRepository.save(view)
}

const searchRecipe = async (page: any, limit: any, searchKeyword: any) => {
  const recipeRepository = getCustomRepository(RecipeRepository)

  let recipeQb = await recipeRepository
    .createQueryBuilder('r')
    .leftJoin(
      ContentImage,
      'ci',
      'ci.objectId = r.id and ci.objectType = :type and ci.isCover = :isCover',
      {
        type: CONTENT_IMAGE_OBJECT_TYPE.RECIPE,
        isCover: CONTENT_IMAGE_IS_COVER_TYPE.ENABLE
      }
    )
    .leftJoin(Image, 'i', 'i.id = ci.imageId')
    .leftJoin(Storage, 's', 's.id = i.storageId')
    .innerJoin(RecipeKeyword, 'rk', 'rk.recipeId = r.id')
    .innerJoin(Keyword, 'k', 'k.id = rk.keywordId')
    .select('r.id', 'id')
    .addSelect('r.name', 'name')
    .addSelect('r.cookTime', 'cookTime')
    .addSelect('s.cloudName', 'imageCloudName')
    .addSelect('i.publicId', 'imagePublicId')

  if (searchKeyword) {
    recipeQb = recipeQb.where('k.name = :searchKeyword', { searchKeyword })
  }

  const items = await recipeQb
    .offset((page - 1) * limit)
    .limit(limit)
    .orderBy('r.id', 'DESC')
    .distinct(true)
    .getRawMany()

  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const { imageCloudName, imagePublicId } = item
      if (imageCloudName && imagePublicId) {
        item.imageUrl = v2.url(imagePublicId)
      }
    }
  }

  let countQb = await recipeRepository
    .createQueryBuilder('r')
    .innerJoin(RecipeKeyword, 'rk', 'rk.recipeId = r.id')
    .innerJoin(Keyword, 'k', 'k.id = rk.keywordId')
    .select('count(distinct r.id)', 'total')

  if (searchKeyword) {
    countQb = countQb.where('k.name = :searchKeyword', { searchKeyword })
  }

  const count = await countQb.getRawOne()
  const { total } = count

  return { total, items }
}

const search = async (req: any) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
  const { page, limit, searchKeyword } = req.body

  if (searchKeyword) {
    await viewKeyword(ip, searchKeyword)
  }

  if (ENABLE_REDIS) {
    const redisKey = `apis/recipes/search:${JSON.stringify(req.body)}`
    if (await redisClient.exists(redisKey)) {
      const result: any = await redisClient.get(redisKey)
      return JSON.parse(result)
    } else {
      const result = await searchRecipe(page, limit, searchKeyword)
      const redisValue = JSON.stringify(result)
      redisClient.set(redisKey, redisValue)
      redisClient.expire(redisKey, REDIS_TTL)
      return result
    }
  } else {
    const result = await searchRecipe(page, limit, searchKeyword)
    return result
  }
}

const getRecipeInfo = async (id: any) => {
  /**
   * id,
   * name,
   * instruction,
   * cookTime,
   * thumbnails: [ {cloudName, publicId} ],
   * cookEvents [],
   * ingredients: [
   *   { nutritions: [{ id, name, value }], info: [{ title, description, type }], imageCloudName, imagePublicId, quantity, displayQuantity, displayQuantityUnit, name, price, displayPrice, displayPriceUnit }
   * ],
   * ads: [{ id, name, link, type }]
   */
  const recipeRepository = getCustomRepository(RecipeRepository)
  const imageRepository = getCustomRepository(ImageRepository)
  const recipeCookEventRepository = getCustomRepository(
    RecipeCookEventRepository
  )
  const recipeIngredientRepository = getCustomRepository(
    RecipeIngredientRepository
  )
  const adRepository = getCustomRepository(AdRepository)
  const ingredientInfoRepository = getCustomRepository(IngredientInfoRepository)
  const ingredientNutritionRepository = getCustomRepository(IngredientNutritionRepository)

  const recipe = await recipeRepository
    .createQueryBuilder('r')
    .select('r.id', 'id')
    .addSelect('r.name', 'name')
    .addSelect('r.cookTime', 'cookTime')
    .addSelect('r.instruction', 'instruction')
    .where('r.id = :id', { id })
    .getRawOne()

  if (recipe) {
    const ads = await adRepository
      .createQueryBuilder('a')
      .innerJoin(AdLocation, 'al', 'al.adId = a.id and al.recipeId = :id', {
        id
      })
      .select('a.name', 'name')
      .addSelect('a.id', 'id')
      .addSelect('a.link', 'link')
      .addSelect('a.type', 'type')
      .getRawMany()

    recipe.ads = ads

    const images = await imageRepository
      .createQueryBuilder('i')
      .innerJoin(
        ContentImage,
        'ci',
        'ci.imageId = i.id and ci.objectType = :type and ci.objectId = :id and ci.isCover = :isCover',
        {
          id,
          type: CONTENT_IMAGE_OBJECT_TYPE.RECIPE,
          isCover: CONTENT_IMAGE_IS_COVER_TYPE.DISABLE
        }
      )
      .innerJoin(Storage, 's', 's.id = i.storageId')
      .select('s.cloudName', 'cloudName')
      .addSelect('i.publicId', 'publicId')
      .getRawMany()
    recipe.thumbnails = images

    if (recipe.thumbnails && recipe.thumbnails.length > 0) {
      for (let i = 0; i < recipe.thumbnails.length; i++) {
        const item = recipe.thumbnails[i]
        const { cloudName, publicId } = item
        if (cloudName && publicId) {
          item.url = v2.url(publicId)
        }
      }
    }

    const cookEventEntitys = await recipeCookEventRepository
      .createQueryBuilder('rce')
      .innerJoin(CookEvent, 'ce', 'rce.cookEventId = ce.id')
      .select('ce.name', 'name')
      .where('rce.recipeId = :id', { id })
      .getRawMany()
    recipe.cookEvents = cookEventEntitys.map((i) => i.name)

    const ingredients = await recipeIngredientRepository
      .createQueryBuilder('ri')
      .innerJoin(Ingredient, 'ig', 'ig.id = ri.ingredientId')
      .innerJoin(
        ContentImage,
        'ci',
        'ci.objectType = :type and ci.objectId = ig.id',
        { type: CONTENT_IMAGE_OBJECT_TYPE.INGREDIENT }
      )
      .innerJoin(Image, 'i', 'i.id = ci.imageId')
      .innerJoin(Storage, 's', 's.id = i.storageId')
      .select('ig.name', 'name')
      .addSelect('ig.id', 'id')
      .addSelect('ig.price', 'price')
      .addSelect('ig.displayPrice', 'displayPrice')
      .addSelect('ig.displayPriceUnit', 'displayPriceUnit')
      .addSelect('s.cloudName', 'imageCloudName')
      .addSelect('i.publicId', 'imagePublicId')
      .addSelect('ri.quantity', 'quantity')
      .addSelect('ri.displayQuantity', 'displayQuantity')
      .addSelect('ri.displayQuantityUnit', 'displayQuantityUnit')
      .where('ri.recipeId = :id', { id })
      .getRawMany()
    if (ingredients && ingredients.length > 0) {
      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i]
        const ingredientId = ingredient.id

        const { imageCloudName, imagePublicId } = ingredient
        if (imageCloudName && imagePublicId) {
          ingredient.url = v2.url(imagePublicId)
        }

        const info = await ingredientInfoRepository
          .createQueryBuilder('ii')
          .select('ii.title', 'title')
          .addSelect('ii.description', 'description')
          .addSelect('ii.type', 'type')
          .where('ii.ingredientId = :ingredientId', { ingredientId })
          .getRawMany()
        ingredient.info = info

        const nutritions = await ingredientNutritionRepository
          .createQueryBuilder('in')
          .innerJoin(Nutrition, 'n', 'n.id = in.nutritionId')
          .select('n.id', 'id')
          .addSelect('n.name', 'name')
          .addSelect('in.nutrition_value', 'value')
          .where('in.ingredientId = :ingredientId', { ingredientId })
          .getRawMany()
        ingredient.nutritions = nutritions
      }
    }
    recipe.ingredients = ingredients
  }
  return recipe
}

const recipeGet = async (req: any) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
  const { id } = req.body

  const recipeRepository = getCustomRepository(RecipeRepository)

  const recipe = await recipeRepository
    .createQueryBuilder('r')
    .select('r.id', 'id')
    .addSelect('r.name', 'name')
    .addSelect('r.cookTime', 'cookTime')
    .addSelect('r.instruction', 'instruction')
    .where('r.id = :id', { id })
    .getRawOne()

  if (recipe) {
    await viewRecipe(ip, id)
  }

  if (ENABLE_REDIS) {
    const redisKey = `apis/recipes/get:${id}`
    if (await redisClient.exists(redisKey)) {
      const result: any = await redisClient.get(redisKey)
      return JSON.parse(result)
    } else {
      const result = await getRecipeInfo(id)
      const redisValue = JSON.stringify(result)
      redisClient.set(redisKey, redisValue)
      redisClient.expire(redisKey, REDIS_TTL)
      return result
    }
  } else {
    const result = await getRecipeInfo(id)
    result.instruction = JSON.parse(result.instruction)
    return result
  }
}

const adView = async (req: any) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
  const { recipeId, adId } = req.body
  const adLocationRepository = getCustomRepository(AdLocationRepository)
  const adLocation = await adLocationRepository.findOneOrFail({
    recipeId,
    adId
  })
  if (adLocation) {
    const adViewRepository = getCustomRepository(AdViewRepository)
    const adView = adViewRepository.create()
    adView.adId = adId
    adView.ipAddress = ip
    adView.recipedId = recipeId
    adView.viewAt = new Date()
    await adViewRepository.save(adView)
  }
}

const service = {
  recent,
  search,
  recipeGet,
  adView
}

export default service
