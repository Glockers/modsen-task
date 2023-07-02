import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IMeetupRegistration } from '../interfaces/meetupRegistration.interface';
import { Meetup } from '../../meetup/entities/meetup.entity';
import { IMeetupAttributes } from '../../meetup/interfaces';
import { User } from '../../user/entities/user.entity';
import { IUserAttributes } from '../../user/interfaces';

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

export { MeetupRegistation };
