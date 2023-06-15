import Meetup from '../models/Meetup';
import MeetupRegistration from '../models/MeetupRegistration';

export const signUpForMeeting = async (user: any, meetup: Meetup) => {
  const registration = await MeetupRegistration.create({
    registrationDate: new Date()
  });

  await user.addMeetup(meetup, { through: registration });

  return true;
};
