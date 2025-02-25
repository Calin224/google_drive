import {User} from './user';

export type UserFollow = {
  sourceUser: User;
  sourceUserId: string;

  targetUser: User;
  targetUserId: string;
}
