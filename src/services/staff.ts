import { Staff } from '../models/staff';
import bcrypt from 'bcrypt';
import { StaffAttributes } from '../types/staff';

export const createStaff = async (staffData: StaffAttributes): Promise<Staff> => {
  const hashedPassword = await bcrypt.hash(staffData.password, 10);
  staffData.password = hashedPassword;
  const staff = await Staff.create(staffData);
  return staff;
};

export const updateStaff = async (staffId: string, staffData: Partial<StaffAttributes>): Promise<[number, Staff[]]> => {
  const existingStaff = await Staff.findOne({ where: { staff_id: staffId } }); // Use staff_id here
  if (!existingStaff) {
    throw new Error(`Staff member with Staff-id ${staffId} not found`);
  }

  if (staffData.password) {
    const hashedPassword = await bcrypt.hash(staffData.password, 10);
    staffData.password = hashedPassword;
  }

  const [affectedRows, updatedStaff] = await Staff.update(staffData, {
    where: { staff_id: staffId }, // Use staff_id here
    returning: true,
  });

  if (affectedRows === 0) {
    throw new Error('No staff member was updated. Check if the provided data is valid.');
  }

  return [affectedRows, updatedStaff];
};

export const getStaffById = async (staffId: string): Promise<Staff | null> => {
  return await Staff.findOne({ where: { staff_id: staffId } }); // Use staff_id here
};

export const deleteStaff = async (staffId: string): Promise<number> => {
  return await Staff.destroy({ where: { staff_id: staffId } }); // Use staff_id here
};

export const getAllStaff = async (): Promise<Staff[]> => {
  return await Staff.findAll();
};
