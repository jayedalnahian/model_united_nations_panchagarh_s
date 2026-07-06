import { IRequestUser } from "./requestUser.interface.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IRequestUser;
    }
  }
}
