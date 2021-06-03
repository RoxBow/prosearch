import User from './user';

type Realisation = {
  readonly id: string;
  readonly author: User;
  readonly createdAt: string;
  readonly url?: string;
};

interface Project {
  readonly _id: string;
  readonly name: string;
  readonly author: {
    username: User['username'];
  };
  readonly realisations: [Realisation];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export default Project;
