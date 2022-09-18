export interface UserI {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  google: boolean;
  role: string;
}

export class User {
  constructor(public data: UserI) {}

  get imageUrl() {
    if (this.data.image) {
      return `/api/upload/users/${this.data.image}`;
    }

    return '/api/upload/users/no-image';
  }
}
