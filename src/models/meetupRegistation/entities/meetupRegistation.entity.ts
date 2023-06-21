import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserAttributes, User } from '../../user';
import { Meetup } from '../../meetup/entities/meetup.entity';
import { IMeetupRegistration } from '../interfaces/meetupRegistration.interface';
import { IMeetupAttributes } from '../../meetup/interfaces';

@Entity('meetup_registrations')
class MeetupRegistation implements IMeetupRegistration {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user!: IUserAttributes;

  @ManyToOne(() => Meetup)
  @JoinColumn({ name: 'meetup_id' })
  public meetup!: IMeetupAttributes;

  @CreateDateColumn({ name: 'registration_date' })
  public registrationDate!: Date;
}

export default MeetupRegistation;
