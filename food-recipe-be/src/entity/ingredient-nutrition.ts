import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ingredient_nutrition' })
export class IngredientNutrition {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('ingredient_id_idx')
  @Column({
    name: 'ingredient_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  ingredientId: number

  @Index('nutrition_id_idx')
  @Column({
    name: 'nutrition_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  nutritionId: number

  @Column({
    name: 'nutrition_value',
    type: 'float',
    unsigned: true,
    nullable: false
  })
  nutritionValue: number
}
