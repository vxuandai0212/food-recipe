import { EntityRepository, Repository, Not } from 'typeorm'
import { Storage } from 'entity/storage'

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {
  isStorageCloudNameTaken(cloudName: string, excludeId: any) {
    if (excludeId) {
      return this.findOne({ where: { cloudName, id: Not(excludeId) } })
    } else {
      return this.findOne({ cloudName })
    }
  }
}
