import { MAX_LENGTH_AD_CUSTOMER_NAME, MAX_LENGTH_EMAIL, MAX_LENGTH_PHONE, MAX_LENGTH_WEBSITE } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ad_customer' })
export class AdCustomer {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_LENGTH_AD_CUSTOMER_NAME,
    nullable: true
  })
  name: string

  @Index('phone_idx')
  @Column({
    name: 'phone',
    type: 'varchar',
    length: MAX_LENGTH_PHONE,
    nullable: false
  })
  phone: string

  @Index('email_idx')
  @Column({
    name: 'email',
    type: 'varchar',
    length: MAX_LENGTH_EMAIL,
    nullable: true
  })
  email: string

  @Index('website_idx')
  @Column({
    name: 'website',
    type: 'varchar',
    length: MAX_LENGTH_WEBSITE,
    nullable: true
  })
  website: string
}
