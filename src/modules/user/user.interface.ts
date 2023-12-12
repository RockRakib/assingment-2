import { Model } from "mongoose";

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age?: number;
  email?: string;
  isActive: boolean;
  hobbies: string[];
  orders?: TOrder[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  isDeleted: boolean;
}

export interface IUserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
}

export default TUser;
