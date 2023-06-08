import { EntityRepository, Repository } from 'typeorm'
import { Token } from 'entity/token'

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
