export interface StaffAttributes {
    id?: number; 
    first_name: string; 
    last_name: string; 
    email: string; 
    phone: string; 
    gender: string; 
    alternate_number?: string; 
    roleId: number; 
    designation: string; 
    password: string; 
    documents_collected: boolean; 
    staff_id: string; // staff_id changed to string
    isVerified: boolean; 
    createdAt?: Date; 
    updatedAt?: Date; 
    role?: Role; // Keep this for role information
  }