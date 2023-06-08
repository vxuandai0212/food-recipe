import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'recipe_keyword' })
export class RecipeKeyword {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('recipe_id_idx')
  @Column({
    name: 'recipe_id',
    type: 'int',
    unsigned: false,
    nullable: false
  })
  recipeId: number

  @Index('keyword_id_idx')
  @Column({
    name: 'keyword_id',
    type: 'int',
    unsigned: false,
    nullable: false
  })
  keywordId: number
}
