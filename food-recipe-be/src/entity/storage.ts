import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { MAX_LENGTH_STORAGE_API_KEY, MAX_LENGTH_STORAGE_API_SECRET, MAX_LENGTH_STORAGE_CLOUD_NAME } from 'constants/constraint'
import { STORAGE_IS_DEFAULT } from 'constants/entity'

@Entity({ name: 'storages' })
export class Storage {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('cloud_name_idx')
  @Column({
    name: 'cloud_name',
    type: 'varchar',
    length: MAX_LENGTH_STORAGE_CLOUD_NAME,
    nullable: false
  })
  cloudName: string

  @Index('api_key_idx')
  @Column({
    name: 'api_key',
    type: 'varchar',
    length: MAX_LENGTH_STORAGE_API_KEY,
    nullable: false
  })
  apiKey: string

  @Index('api_secret_idx')
  @Column({
    name: 'api_secret',
    type: 'varchar',
    length: MAX_LENGTH_STORAGE_API_SECRET,
    nullable: false
  })
  apiSecret: string

  @Index('is_default_idx')
  @Column({
    name: 'is_default',
    type: 'tinyint',
    nullable: false
  })
  isDefault: STORAGE_IS_DEFAULT
}
