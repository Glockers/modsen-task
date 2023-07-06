import { Faker } from '@faker-js/faker';
import { User } from '../../src/modules/user/entities/user.entity';
import { Role } from '../../src/common/types';
import { setSeederFactory } from 'typeorm-extension';

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.login = faker.internet.userName();
  user.password = faker.internet.password();
  user.name = faker.internet.userName();
  const roles = Object.values(Role);
  const randomIndex = Math.floor(Math.random() * roles.length);
  user.role = roles[randomIndex];
  return user;
});
