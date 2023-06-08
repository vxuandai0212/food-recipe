import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import imageService from 'services/image'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_IMAGE_SUCCESS, SET_COVER_SUCCESS } from 'constants/message'

const upload = catchAsync(async (req: any, res: any) => {
  const image = await imageService.upload(req)
  res.status(httpStatus.CREATED).send(successContentReponse(image))
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await imageService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const setCover = catchAsync(async (req: any, res: any) => {
  await imageService.setCover(req.body)
  res.status(httpStatus.OK).send(successSimpleResponse(SET_COVER_SUCCESS))
})

const deleteImage = catchAsync(async (req: any, res: any) => {
  await imageService.deleteImage(req.body)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_IMAGE_SUCCESS))
})

const imageController = {
  upload,
  getAll,
  setCover,
  deleteImage
}

export default imageController
