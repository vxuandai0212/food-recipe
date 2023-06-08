import { MAX_LENGTH_IP_ADDRESS } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ad_view' })
export class AdView {
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
  recipedId: number

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
