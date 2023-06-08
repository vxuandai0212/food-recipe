import { getCustomRepository } from 'typeorm'
import { FtPostRepository } from 'repositories/fancythings/post'
import { FtCategoryRepository } from 'repositories/fancythings/category'
import { FT_POST_AVAILABLE } from 'constants/message'

const insert = async (payload: any) => {
  const ftCategoryRepository = getCustomRepository(FtCategoryRepository)
  let fresh: any = await ftCategoryRepository.create()
  fresh = Object.assign({}, payload)
  await ftCategoryRepository.save(fresh)
  return fresh
}

const update = async (payload: any) => {
  const { id } = payload
  const ftCategoryRepository = getCustomRepository(FtCategoryRepository)
  const exist = await ftCategoryRepository.findOneOrFail(id)
  Object.assign(exist, payload)
  await ftCategoryRepository.save(exist)
  return exist
}

const getAll = async (payload: any) => {
  const { page, limit, parentId, level } = payload
  const ftCategoryRepository = getCustomRepository(FtCategoryRepository)
  let getAllBaseQuery = ftCategoryRepository
    .createQueryBuilder('a')
  if (parentId) {
    getAllBaseQuery = getAllBaseQuery.andWhere('a.parentId = :parentId', { parentId })
  }
  if (level) {
    getAllBaseQuery = getAllBaseQuery.andWhere('a.level = :level', { level })
  }
  const items = await getAllBaseQuery
    .skip((page! - 1) * limit!)
    .take(limit)
    .getMany()

  let countBaseQuery = ftCategoryRepository
    .createQueryBuilder('a')
    .select('count(a.id)', 'total')
  if (parentId) {
    countBaseQuery = countBaseQuery.andWhere('a.parentId = :parentId', { parentId })
  }
  if (level) {
    countBaseQuery = countBaseQuery.andWhere('a.level = :level', { level })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const getActive = async () => {
  const ftCategoryRepository = getCustomRepository(FtCategoryRepository)
  const ftPostRepository = getCustomRepository(FtPostRepository)

  const allCategory = []

  const categories = await ftPostRepository
    .createQueryBuilder('p')
    .select('p.categoryId', 'id')
    .distinct(true)
    .getRawMany()

  for (let i = 0; i < categories.length; i++) {
    allCategory.push(categories[i].id)
  }

  const subCategories = await ftPostRepository
    .createQueryBuilder('p')
    .select('p.subCategoryId', 'id')
    .distinct(true)
    .getRawMany()

  for (let i = 0; i < subCategories.length; i++) {
    allCategory.push(subCategories[i].id)
  }

  const categoryItems = await ftCategoryRepository
    .createQueryBuilder('c')
    .where('id in (:allCategory)', { allCategory })
    .getMany()

  return categoryItems
}

const deleteCategory = async (id: any) => {
  const ftCategoryRepository = getCustomRepository(FtCategoryRepository)
  const ftPostRepository = getCustomRepository(FtPostRepository)
  const availablePosts = await ftPostRepository.find({ categoryId: id })
  if (availablePosts && availablePosts.length > 0) {
    throw new Error(FT_POST_AVAILABLE)
  }
  await ftCategoryRepository.delete(id)
}

const service = {
  insert,
  update,
  getAll,
  getActive,
  deleteCategory
}

export default service
