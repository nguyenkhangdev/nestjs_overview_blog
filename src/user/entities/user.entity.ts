import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserRole } from '../interfaces/user-role.interface';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
