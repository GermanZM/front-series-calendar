import { User } from '../model/user';

export class FactoryUser {

  static createNewUser(): User {
    return new User();
  }

}
