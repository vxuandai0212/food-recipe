import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import service from 'services/recipe-keyword'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_RECIPE_KEYWORD_SUCCESS } from 'constants/message'

const insert = catchAsync(async (req: any, res: any) => {
  const item = await service.insert(req.body)
  res.status(httpStatus.OK).send(successContentReponse(item))
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await service.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteRecipeKeyword = catchAsync(async (req: any, res: any) => {
  await service.deleteRecipeKeyword(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_RECIPE_KEYWORD_SUCCESS))
})

const keywordController = {
  insert,
  getAll,
  deleteRecipeKeyword
}

export default keywordController
