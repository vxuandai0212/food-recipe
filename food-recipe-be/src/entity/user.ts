import { Entity, Column, PrimaryGeneratedColumn, Index, BeforeInsert } from 'typeorm'
import bcrypt from 'bcryptjs'
import { MAX_LENGTH_EMAIL, MAX_LENGTH_ENCRYPTED_PASSWORD } from 'constants/constraint'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number

  @Index('email_idx')
  @Column({
    name: 'email',
    type: 'varchar',
    length: MAX_LENGTH_EMAIL,
    nullable: false,
    collation: 'utf8mb4_general_ci'
  })
  email: string

  @Column({
    type: 'varchar',
    length: MAX_LENGTH_ENCRYPTED_PASSWORD,
    nullable: false,
    collation: 'utf8mb4_general_ci'
  })
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8)
  }
}
