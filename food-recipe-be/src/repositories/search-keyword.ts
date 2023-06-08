import { EntityRepository, Repository } from 'typeorm'
import { SearchKeyword } from 'entity/search-keyword'

@EntityRepository(SearchKeyword)
export class SearchKeywordRepository extends Repository<SearchKeyword> {}
