import { User } from "@/modules/private/user/schema/user.schema";

export type LoginResponse = {
  user: User;
  token: string;
};
