import { MAX_LENGTH_FAVORITE_KEYWORD_KEY } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'keywords' })
export class Keyword {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('name_idx')
  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_FAVORITE_KEYWORD_KEY,
    nullable: false
  })
  name: string
}
