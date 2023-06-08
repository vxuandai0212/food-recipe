import { EntityRepository, Repository } from 'typeorm'
import { FtCategory } from 'entity/fancythings/category'

@EntityRepository(FtCategory)
export class FtCategoryRepository extends Repository<FtCategory> {}
