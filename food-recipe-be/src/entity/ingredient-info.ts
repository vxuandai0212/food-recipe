import { MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION, MAX_LENGTH_INGREDIENT_INFO_TITLE } from 'constants/constraint'
import { INGREDIENT_INFO_TYPE } from 'constants/entity'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ingredient_info' })
export class IngredientInfo {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('ingredient_id_idx')
  @Column({
    name: 'ingredient_id',
    type: 'int',
    unsigned: false,
    nullable: false
  })
  ingredientId: number

  @Column({
    name: 'title',
    type: 'varchar',
    length: MAX_LENGTH_INGREDIENT_INFO_TITLE,
    nullable: true
  })
  title: string

  @Column({
    name: 'description',
    type: 'varchar',
    length: MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION,
    nullable: true
  })
  description: string

  @Index('type_idx')
  @Column({
    name: 'type',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  type: INGREDIENT_INFO_TYPE
}
