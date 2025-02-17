import { Folder } from "./folder";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  folders: Folder[]
}
