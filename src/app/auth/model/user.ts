import { Profile } from './profile';

export class User {

    id: number;
    username: string;
    password: string;
    enabled: boolean;
    roles: string[] = [];
    accessToken: string;
    profile: Profile;

    loadUserByUsername(user: User, username: string): User {
      user.username = username;
      return user;
    }

}
