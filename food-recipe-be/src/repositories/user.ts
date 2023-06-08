import { EntityRepository, Repository, Not } from 'typeorm'
import { User } from 'entity/user'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  isEmailTaken(email: string, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { email, id: Not(excludeId) } })
    } else {
      return this.findOne({ email })
    }
  }
}
