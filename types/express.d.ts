import UserComplete from './user';

declare global {
  declare namespace Express {
    export interface User extends UserComplete {}
  }
}
