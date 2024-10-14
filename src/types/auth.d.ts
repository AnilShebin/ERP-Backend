// types/auth.ts
export interface LoginData {
    staff_id: string; // Ensure this matches the staff_id type in your model
    password: string;
  }
  
  export interface RegisterData {
    company_name: string;
    company_email: string;
    password: string; 
    phone?: string; 
}