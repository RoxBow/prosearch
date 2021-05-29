import { User as UserFilled } from './user';

declare global {
  declare namespace Express {
    export interface User extends UserFilled {}
  }
}
