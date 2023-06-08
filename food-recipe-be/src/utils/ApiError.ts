class ApiError extends Error {
  statusCode: any
  isOperational: any

  constructor(statusCode?: number, message?: string, isOperational?:boolean, stack?:any) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export {
  ApiError
}
