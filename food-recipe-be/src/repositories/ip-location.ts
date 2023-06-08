import { EntityRepository, Repository } from 'typeorm'
import { IpLocation } from 'entity/ip-location'

@EntityRepository(IpLocation)
export class IpLocationRepository extends Repository<IpLocation> {}
