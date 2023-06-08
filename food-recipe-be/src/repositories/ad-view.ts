import { EntityRepository, Repository } from 'typeorm'
import { AdView } from 'entity/ad-view'

@EntityRepository(AdView)
export class AdViewRepository extends Repository<AdView> {}
