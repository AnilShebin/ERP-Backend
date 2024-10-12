// types/auth.ts

export interface LoginData {
    staff_id: number;
    password: string;
}

export interface RegisterData {
    name: string;
    staff_id: number;
    password: string;
    roleId: number;   
    phone?: string; 
}
