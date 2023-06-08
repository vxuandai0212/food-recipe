import xss from 'xss'

const xssFilter = function (req: any, res: any, next: any) {
  if (req.body) req.body = clean(req.body)
  if (req.query) req.query = clean(req.query)
  if (req.params) req.params = clean(req.params)
  next()
}

const clean = (data = '') => {
  let isObject = false
  if (typeof data === 'object') {
    data = JSON.stringify(data)
    isObject = true
  }

  data = xss(data).trim()
  if (isObject) data = JSON.parse(data)

  return data
}

export default xssFilter
