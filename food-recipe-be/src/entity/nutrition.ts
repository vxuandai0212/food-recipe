import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { MAX_LENGTH_NUTRITION_NAME } from 'constants/constraint'

@Entity({ name: 'nutritions' })
export class Nutrition {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('name_idx')
  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_NUTRITION_NAME,
    nullable: false
  })
  name: string
}
