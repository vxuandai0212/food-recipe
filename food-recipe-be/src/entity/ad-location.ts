import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ad_location' })
export class AdLocation {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('ad_id_idx')
  @Column({
    name: 'ad_id',
    type: 'int',
    unsigned: false,
    nullable: false
  })
  adId: number

  @Index('recipe_id_idx')
  @Column({
    name: 'recipe_id',
    type: 'int',
    unsigned: false,
    nullable: false
  })
  recipeId: number
}
