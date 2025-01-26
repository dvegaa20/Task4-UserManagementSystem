import { Models } from "node-appwrite";

export interface User extends Models.Document {
  name: string;
  email: string;
  password: string;
  status: string;
  last_login_time: Date;
}
