import morgan from 'morgan'
import { ENV } from 'config/config'
import logger from 'config/logger'
import moment from 'moment'

morgan.token('message', (req, res: any) => res.locals.errorMessage || '')
morgan.token('date', (req, res) => {
  return moment().format('YYYY-MM-DD HH:mm:ss')
})

const getIpFormat = () => (ENV === 'production' ? ':remote-addr - [:date[clf]] ' : '[:date[clf]] ')
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
})

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
})

export default { successHandler, errorHandler }
