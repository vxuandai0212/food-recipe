import { MAX_LENGTH_DISPLAY_QUANTITY, MAX_LENGTH_DISPLAY_QUANTITY_UNIT } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'recipe_ingredient' })
export class RecipeIngredient {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('recipe_id_idx')
  @Column({
    name: 'recipe_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  recipeId: number

  @Index('ingredient_id_idx')
  @Column({
    name: 'ingredient_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  ingredientId: number

  @Column({
    name: 'quantity',
    type: 'float',
    unsigned: true,
    nullable: false
  })
  quantity: number

  @Column({
    name: 'display_quantity',
    type: 'varchar',
    length: MAX_LENGTH_DISPLAY_QUANTITY,
    nullable: true
  })
  displayQuantity: string

  @Column({
    name: 'display_quantity_unit',
    type: 'varchar',
    length: MAX_LENGTH_DISPLAY_QUANTITY_UNIT,
    nullable: true
  })
  displayQuantityUnit: string
}
