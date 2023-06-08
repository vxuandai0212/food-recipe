import { EntityRepository, Repository } from 'typeorm'
import { FtPost } from 'entity/fancythings/post'

@EntityRepository(FtPost)
export class FtPostRepository extends Repository<FtPost> {}
