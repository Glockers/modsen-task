import Meetup from '../../models/meetup/entities/meetup.entity';
import MeetupRegistration from '../../models/meetupRegistation/entities/MeetupRegistration.entity';
import User from '../../models/user/entities/User.entity';

export const signUpForMeeting = async (login: string, meetupId: number): Promise<boolean> => {
  MeetupRegistration.beforeCreate(
    async (reg) => {
      reg.registrationDate = new Date();
    }
  );
  const user = await User.findOne({ where: { login } });
  const meetup = await Meetup.findByPk(meetupId);
  if (user && meetup) {
    await user.addMeetup(meetup);
  } else {
    return false;
  }

  return true;
};
