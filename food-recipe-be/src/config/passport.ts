import { JWT_SECRET } from 'config/config'
import { TOKEN_TYPE } from 'constants/entity'
import { Strategy, ExtractJwt } from 'passport-jwt'
import userService from 'services/user'

const jwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
}

const jwtVerify = async (req: any, payload: any, done: any) => {
  try {
    if (payload.type !== TOKEN_TYPE.ACCESS) {
      throw new Error('Invalid token type')
    }
    const user = await userService.getUserInfo(payload.sub)
    if (!user) {
      return done(null, false)
    }
    req.user = user
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new Strategy(jwtOptions, jwtVerify)

export {
  jwtStrategy
}
