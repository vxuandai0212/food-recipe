import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'recipe_cook_event' })
export class RecipeCookEvent {
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

  @Index('cook_event_id_idx')
  @Column({
    name: 'cook_event_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  cookEventId: number
}
