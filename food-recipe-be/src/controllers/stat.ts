import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import statService from 'services/stat'
import { successContentReponse } from 'utils/common'

const overview = catchAsync(async (req: any, res: any) => {
  const result = await statService.overview()
  res.status(httpStatus.OK).send(successContentReponse(result))
})

const statController = {
  overview
}

export default statController
