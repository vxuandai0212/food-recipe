import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import recipeCookEventService from 'services/recipe-cook-event'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_RECIPE_COOK_EVENT_SUCCESS } from 'constants/message'

const add = catchAsync(async (req: any, res: any) => {
  const recipeCookEvent = await recipeCookEventService.add(req.body)
  res.status(httpStatus.CREATED).send(successContentReponse(recipeCookEvent))
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await recipeCookEventService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteRecipeCookEvent = catchAsync(async (req: any, res: any) => {
  await recipeCookEventService.deleteRecipeCookEvent(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_RECIPE_COOK_EVENT_SUCCESS))
})

const recipeCookEventController = {
  add,
  getAll,
  deleteRecipeCookEvent
}

export default recipeCookEventController
