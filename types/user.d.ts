interface User {
  id: string;
  username: string;
  projects: [string];
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export default User;
