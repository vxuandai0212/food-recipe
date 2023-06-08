import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import cookEventService from 'services/cook-event'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_COOK_EVENT_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const cookEvent = await cookEventService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(cookEvent))
  } else {
    const cookEvent = await cookEventService.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(cookEvent))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await cookEventService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteCookEvent = catchAsync(async (req: any, res: any) => {
  const ids = req.body.ids
  await cookEventService.deleteCookEvent(ids)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_COOK_EVENT_SUCCESS))
})

const cookEventController = {
  upsert,
  getAll,
  deleteCookEvent
}

export default cookEventController
