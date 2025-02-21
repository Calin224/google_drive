import {Folder} from "./folder";

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
  folders: Folder[]
  profile: Profile
}
