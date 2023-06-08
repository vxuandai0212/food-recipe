import { EntityRepository, Repository, Not } from 'typeorm'
import { AdLocation } from 'entity/ad-location'

@EntityRepository(AdLocation)
export class AdLocationRepository extends Repository<AdLocation> {}
