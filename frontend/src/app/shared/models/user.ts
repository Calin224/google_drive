import {Folder} from "./folder";
import {UserFollow} from './userFollow';

interface Profile {
  url: string
  publicId?: string
  appUserId: string
  id: number;
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  folders: Folder[]
  profile: Profile
  followedByUsers: UserFollow[]
  followedUser: UserFollow[]
}
