export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    isVerified: boolean;
    roleId: number; // Foreign key linking to Roles table
}
