import { CONTENT_IMAGE_IS_COVER_TYPE, CONTENT_IMAGE_OBJECT_TYPE } from 'constants/entity'
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity({ name: 'content_image' })
export class ContentImage {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('image_id_idx')
  @Column({
    name: 'image_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  imageId: number

  @Index('object_id_idx')
  @Column({
    name: 'object_id',
    type: 'int',
    unsigned: true,
    nullable: false
  })
  objectId: number

  @Index('object_type_idx')
  @Column({
    name: 'object_type',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  objectType: CONTENT_IMAGE_OBJECT_TYPE

  @Index('is_cover_idx')
  @Column({
    name: 'is_cover',
    type: 'tinyint',
    unsigned: true,
    nullable: false
  })
  isCover: CONTENT_IMAGE_IS_COVER_TYPE
}
