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
  documents_collected: { 
    documentName: string; 
    isOriginal: boolean; 
  }[]; // Now handles multiple documents with original status
  staff_id: string;
  isVerified: boolean;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  date_of_birth: string;
  createdAt?: Date;
  updatedAt?: Date;
  role?: Role; // Keep this for role information
}
