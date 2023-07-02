import { IMeetupAttributes } from '../../meetup/interfaces';
import { IUserAttributes } from '../../user/interfaces';

export interface IMeetupRegistration {
  id: number;
  user: IUserAttributes;
  meetup: IMeetupAttributes;
  registrationDate: Date;
}

export interface IMeetupRegistrationInput extends Omit<IMeetupRegistration, 'id' | 'registrationDate'> { }
