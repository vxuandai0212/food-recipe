import { MAX_LENGTH_COOK_EVENT_NAME } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'cook_event' })
export class CookEvent {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('name_idx')
  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_COOK_EVENT_NAME,
    nullable: false
  })
  name: string
}
