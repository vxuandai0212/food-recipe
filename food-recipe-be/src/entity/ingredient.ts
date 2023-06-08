import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { MAX_LENGTH_DISPLAY_PRICE, MAX_LENGTH_DISPLAY_PRICE_UNIT, MAX_LENGTH_INGREDIENT_NAME } from 'constants/constraint'

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('name_idx')
  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_INGREDIENT_NAME,
    nullable: false
  })
  name: string

  @Column({
    name: 'price',
    type: 'double',
    unsigned: true,
    nullable: false
  })
  price: number

  @Column({
    name: 'display_price',
    type: 'varchar',
    length: MAX_LENGTH_DISPLAY_PRICE,
    nullable: true
  })
  displayPrice: string

  @Column({
    name: 'display_price_unit',
    type: 'varchar',
    length: MAX_LENGTH_DISPLAY_PRICE_UNIT,
    nullable: true
  })
  displayPriceUnit: string
}
