import { EntityRepository, Repository } from 'typeorm'
import { Image } from 'entity/image'

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {}
