import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Meetup } from '../../modules/meetup/entities/meetup.entity';

export const MeetupFactory = setSeederFactory(Meetup, (faker: Faker) => {
  const meetup = new Meetup();
  meetup.date = faker.date.anytime();
  meetup.description = faker.lorem.paragraph();
  meetup.location = faker.location.country();
  meetup.title = faker.lorem.words();
  meetup.tags = Array.from({ length: 5 }, () => faker.lorem.words());
  return meetup;
});
