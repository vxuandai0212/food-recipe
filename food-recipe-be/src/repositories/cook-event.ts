import { EntityRepository, Repository, Not } from 'typeorm'
import { CookEvent } from 'entity/cook-event'

@EntityRepository(CookEvent)
export class CookEventRepository extends Repository<CookEvent> {
  isCookEventNameTaken(name: string, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { name, id: Not(excludeId) } })
    } else {
      return this.findOne({ name })
    }
  }
}
