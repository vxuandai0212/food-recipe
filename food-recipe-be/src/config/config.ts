import Joi from 'joi'

export const LOGIN_URL = 'https://mtpos.co'

const envVarsSchema = Joi.object()
  .keys({
    ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(120)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app')
  })
  .unknown()

const MONGODB_URL = process.env.MONGODB_URL

export const ENV = process.env.NODE_ENV
export const PORT = process.env.PORT
export const MONGOOSE_CONFIG = {
  url: MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
  options: {
    autoIndex: true
  }
}

export const JWT_SECRET: any = process.env.JWT_SECRET
export const JWT_ACCESS_EXPIRATION_MINUTES = process.env.JWT_ACCESS_EXPIRATION_MINUTES
export const JWT_REFRESH_EXPIRATION_DAYS = process.env.JWT_REFRESH_EXPIRATION_DAYS
export const JWT_RESET_PASSWORD_EXPIRATION_MINUTES = process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES
export const JWT_VERIFY_EMAIL_EXPIRATION_MINUTES = process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES

export const EMAIL_SMTP_HOST = process.env.SMTP_HOST
export const EMAIL_SMTP_PORT = process.env.SMTP_PORT
export const EMAIL_SMTP_USERNAME = process.env.SMTP_USERNAME
export const EMAIL_SMTP_PASSWORD = process.env.SMTP_USERNAME
export const EMAIL_FROM = process.env.EMAIL_FROM

const envVars = {
  ENV,
  PORT,
  MONGODB_URL,
  MONGOOSE_CONFIG,
  JWT_SECRET,
  JWT_ACCESS_EXPIRATION_MINUTES,
  JWT_REFRESH_EXPIRATION_DAYS,
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_USERNAME,
  EMAIL_SMTP_PASSWORD,
  EMAIL_FROM
}

const { error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(envVars)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
