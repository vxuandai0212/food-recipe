import { MAX_LENGTH_IP_ADDRESS } from 'constants/constraint'
import { VIEW_TYPE } from 'constants/entity'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'views' })
export class View {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('object_id_idx')
  @Column({
    name: 'object_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  objectId: number

  @Index('type_idx')
  @Column({
    name: 'type',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  type: VIEW_TYPE

  @Index('view_at_idx')
  @Column({
    name: 'view_at',
    type: 'datetime',
    nullable: false
  })
  viewAt: Date

  @Index('ip_address_idx')
  @Column({
    name: 'ip_address',
    type: 'varchar',
    length: MAX_LENGTH_IP_ADDRESS,
    nullable: false
  })
  ipAddress: number
}
