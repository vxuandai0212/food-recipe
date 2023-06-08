import { MAX_LENGTH_FT_CATEGORY_NAME } from 'constants/constraint'
import { FT_CATEGORY_LEVEL } from 'constants/entity'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ft_category' })
export class FtCategory {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_FT_CATEGORY_NAME,
    nullable: false
  })
  name: string

  @Index('parent_id_idx')
  @Column({
    name: 'parent_id',
    type: 'int',
    unsigned: true,
    nullable: true
  })
  parentId: number

  @Index('level_idx')
  @Column({
    name: 'level',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  level: FT_CATEGORY_LEVEL
}
