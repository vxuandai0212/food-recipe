import { EntityRepository, Repository } from 'typeorm'
import { ContentImage } from 'entity/content-image'

@EntityRepository(ContentImage)
export class ContentImageRepository extends Repository<ContentImage> {}
