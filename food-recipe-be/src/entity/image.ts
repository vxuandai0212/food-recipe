import { MAX_LENGTH_IMAGE_PUBLIC_ID } from 'constants/constraint'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('public_id_idx')
  @Column({
    name: 'public_id',
    type: 'varchar',
    length: MAX_LENGTH_IMAGE_PUBLIC_ID,
    nullable: false
  })
  publicId: string

  @Index('storage_id_idx')
  @Column({
    name: 'storage_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  storageId: number
}
