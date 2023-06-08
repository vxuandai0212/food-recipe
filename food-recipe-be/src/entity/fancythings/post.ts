import { MAX_LENGTH_FT_POST_TITLE } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ft_post' })
export class FtPost {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('title_idx')
  @Column({
    name: 'title',
    type: 'varchar',
    length: MAX_LENGTH_FT_POST_TITLE,
    nullable: false
  })
  title: string

  @Index('category_id_idx')
  @Column({
    name: 'category_id',
    type: 'int',
    unsigned: true,
    nullable: true
  })
  categoryId: number

  @Index('sub_category_id_idx')
  @Column({
    name: 'sub_category_id',
    type: 'int',
    unsigned: true,
    nullable: true
  })
  subCategoryId: number

  @Column({
    name: 'raw_content',
    type: 'text',
    nullable: true
  })
  rawContent: string

  @Column({
    name: 'content',
    type: 'text',
    nullable: true
  })
  content: string

  @Index('created_at_idx')
  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false
  })
  createdAt: Date

  @Index('updated_at_idx')
  @Column({
    name: 'updated_at',
    type: 'datetime',
    nullable: false
  })
  updatedAt: Date
}
