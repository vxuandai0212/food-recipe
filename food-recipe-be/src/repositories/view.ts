import { EntityRepository, Repository } from 'typeorm'
import { View } from 'entity/index'

@EntityRepository(View)
export class ViewRepository extends Repository<View> {}
