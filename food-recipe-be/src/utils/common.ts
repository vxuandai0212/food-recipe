import moment from 'moment'

export const toTimeDB = (unix: number) => moment(unix).format('YYYY-MM-DD HH:MM:SS')

export const randomPassword = () => Math.random().toString(36).slice(-8)

export const successSimpleResponse = (message: string) => ({
  code: 'success',
  message
})

export const successContentReponse = (data: any) => ({
  code: 'success',
  data
})

export const addDays = (date: any, days: any) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const isNullOrEmpty = (data: any) => {
  return data === null || data === undefined || data.length === 0
}
