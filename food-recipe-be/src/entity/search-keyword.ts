import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'search_keyword' })
export class SearchKeyword {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('keyword_id_idx')
  @Column({
    name: 'keyword_id',
    type: 'int',
    unsigned: false,
    nullable: false
  })
  keywordId: number

  @Index('search_at_idx')
  @Column({
    name: 'search_at',
    type: 'datetime',
    nullable: false
  })
  searchAt: Date
}
