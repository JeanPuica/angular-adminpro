export interface Hospital {
  _id: string;
  name: string;
  img: string;
  user?: _HospitalUser;
}

interface _HospitalUser {
  id: string;
  name: string;
  img?: string;
}
