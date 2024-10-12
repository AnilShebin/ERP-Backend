import { Role } from './role';

export interface UserAttributes {
  id: number;
  name: string;
  staff_id: number;
  password: string;
  phone: string | null;
  isVerified: boolean;
  roleId: number;
  role?: Role;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export interface Role {
  id: number;
  name: string;
  code: string;
}