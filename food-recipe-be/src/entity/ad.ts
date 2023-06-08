import { MAX_LENGTH_AD_NAME, MAX_LENGTH_LINK } from 'constants/constraint'
import { AD_CATEGORY, AD_PAYED, AD_STATUS } from 'constants/entity'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ads' })
export class Ad {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('name_idx')
  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_AD_NAME,
    nullable: true
  })
  name: string

  @Index('link_idx')
  @Column({
    name: 'link',
    type: 'varchar',
    length: MAX_LENGTH_LINK,
    nullable: true
  })
  link: string

  @Index('ad_customer_idx')
  @Column({
    name: 'ad_customer_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  adCustomerId: number

  @Index('price_idx')
  @Column({
    name: 'price',
    type: 'double',
    unsigned: true,
    nullable: true
  })
  price: number

  @Index('valid_from_date_idx')
  @Column({
    name: 'valid_from_date',
    type: 'date',
    nullable: true
  })
  validFromDate: Date

  @Index('valid_to_date_idx')
  @Column({
    name: 'valid_to_date',
    type: 'date',
    nullable: true
  })
  validToDate: Date

  @Index('pay_status_idx')
  @Column({
    name: 'pay_status',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  payStatus: AD_PAYED

  @Index('status_idx')
  @Column({
    name: 'status',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  status: AD_STATUS

  @Index('type_idx')
  @Column({
    name: 'type',
    type: 'tinyint',
    unsigned: true,
    nullable: true
  })
  type: AD_CATEGORY
}
