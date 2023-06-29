import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IMeetupAttributes } from '../interfaces/meetup.interface';

@Entity('meetups')
export class Meetup implements IMeetupAttributes {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public title!: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @Column({ type: 'varchar' })
  public location!: string;

  @Column({
    type: 'timestamptz'
  })
  public date!: Date;

  @Column('varchar', { array: true, default: () => 'ARRAY[]::varchar[]' })
  public tags!: string[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
