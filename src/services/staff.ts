import { Staff, StaffAttributes } from '../models/staff';

export const createStaff = async (staffData: StaffAttributes): Promise<Staff> => {
  const staff = await Staff.create(staffData);
  return staff;
};

export const getStaffById = async (id: number): Promise<Staff | null> => {
  return await Staff.findByPk(id);
};

export const updateStaff = async (id: number, staffData: Partial<StaffAttributes>): Promise<[number, Staff[]]> => {
  return await Staff.update(staffData, {
    where: { id },
    returning: true,
  });
};

export const deleteStaff = async (id: number): Promise<number> => {
  return await Staff.destroy({ where: { id } });
};

export const getAllStaff = async (): Promise<Staff[]> => {
  return await Staff.findAll();
};
