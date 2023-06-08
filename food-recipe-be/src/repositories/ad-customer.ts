import { EntityRepository, Repository, Not } from 'typeorm'
import { AdCustomer } from 'entity/ad-customer'

@EntityRepository(AdCustomer)
export class AdCustomerRepository extends Repository<AdCustomer> {
  isAdCustomerPhoneExist(phone: string, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { phone, id: Not(excludeId) } })
    } else {
      return this.findOne({ phone })
    }
  }
}
