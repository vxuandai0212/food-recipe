import { MAX_LENGTH_TOKEN } from 'constants/constraint'
import { TOKEN_TYPE } from 'constants/entity'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('token_idx')
  @Column({
    name: 'token',
    type: 'varchar',
    length: MAX_LENGTH_TOKEN,
    nullable: false,
    collation: 'utf8mb4_general_ci'
  })
  token: string

  @Index('user_id_idx')
  @Column({
    name: 'user_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  userId: number

  @Index('type_idx')
  @Column({
    name: 'type',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  type: TOKEN_TYPE

  @Index('expires_idx')
  @Column({
    name: 'expires',
    type: 'datetime',
    nullable: false
  })
  expires: Date

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
    default: () => 'NOW()'
  })
  createdAt: Date
}
