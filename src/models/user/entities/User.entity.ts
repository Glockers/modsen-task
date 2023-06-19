import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserAttributes } from '../interfaces/user.interface';

@Entity('users')
export class User implements IUserAttributes {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public login!: string;

  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar' })
  public role!: string;
}
