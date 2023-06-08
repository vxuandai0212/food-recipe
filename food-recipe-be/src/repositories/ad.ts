import { EntityRepository, Repository } from 'typeorm'
import { Ad } from 'entity/ad'

@EntityRepository(Ad)
export class AdRepository extends Repository<Ad> {}
