import { MAX_LENGTH_CITY, MAX_LENGTH_COUNTRY, MAX_LENGTH_IP_ADDRESS } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'ip_location' })
export class IpLocation {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('ip_address_idx')
  @Column({
    name: 'ip_address',
    type: 'varchar',
    length: MAX_LENGTH_IP_ADDRESS,
    nullable: false
  })
  ipAddress: string

  @Index('country_idx')
  @Column({
    name: 'country',
    type: 'varchar',
    length: MAX_LENGTH_COUNTRY,
    nullable: true
  })
  country: string

  @Index('city_idx')
  @Column({
    name: 'city',
    type: 'varchar',
    length: MAX_LENGTH_CITY,
    nullable: true
  })
  city: string
}
