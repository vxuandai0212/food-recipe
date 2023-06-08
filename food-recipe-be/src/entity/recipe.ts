import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { MAX_LENGTH_RECIPE_INSTRUCTION, MAX_LENGTH_RECIPE_INSTRUCTION_DESIGN, MAX_LENGTH_RECIPE_NAME } from 'constants/constraint'

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('name_idx')
  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_RECIPE_NAME,
    nullable: false
  })
  name: string

  @Column({
    name: 'cook_time',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  cookTime: number

  @Column({
    name: 'instruction',
    type: 'varchar',
    length: MAX_LENGTH_RECIPE_INSTRUCTION,
    nullable: true
  })
  instruction: string

  @Column({
    name: 'instruction_design',
    type: 'varchar',
    length: MAX_LENGTH_RECIPE_INSTRUCTION_DESIGN,
    nullable: true
  })
  instructionDesign: string

  @Index('created_at_idx')
  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false
  })
  createdAt: Date
}
