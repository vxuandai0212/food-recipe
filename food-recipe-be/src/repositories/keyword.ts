import { EntityRepository, Repository } from 'typeorm'
import { Keyword } from 'entity/keyword'

@EntityRepository(Keyword)
export class KeywordRepository extends Repository<Keyword> {}
