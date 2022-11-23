import { Hospital } from './hospital';

export interface Medic {
  _id: string;
  name: string;
  img: string;
  user?: _MedicUser;
  hospital?: Hospital;
}

interface _MedicUser {
  id: string;
  name: string;
  img?: string;
}
