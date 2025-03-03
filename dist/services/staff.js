"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStaff = exports.deleteStaff = exports.getStaffById = exports.updateStaff = exports.createStaff = void 0;
const staff_1 = require("../models/staff");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createStaff = async (staffData) => {
    const hashedPassword = await bcrypt_1.default.hash(staffData.password, 10);
    staffData.password = hashedPassword;
    const staff = await staff_1.Staff.create(staffData);
    return staff;
};
exports.createStaff = createStaff;
const updateStaff = async (staffId, staffData) => {
    const existingStaff = await staff_1.Staff.findOne({ where: { staff_id: staffId } }); // Use staff_id here
    if (!existingStaff) {
        throw new Error(`Staff member with Staff-id ${staffId} not found`);
    }
    if (staffData.password) {
        const hashedPassword = await bcrypt_1.default.hash(staffData.password, 10);
        staffData.password = hashedPassword;
    }
    const [affectedRows, updatedStaff] = await staff_1.Staff.update(staffData, {
        where: { staff_id: staffId }, // Use staff_id here
        returning: true,
    });
    if (affectedRows === 0) {
        throw new Error('No staff member was updated. Check if the provided data is valid.');
    }
    return [affectedRows, updatedStaff];
};
exports.updateStaff = updateStaff;
const getStaffById = async (staffId) => {
    return await staff_1.Staff.findOne({ where: { staff_id: staffId } }); // Use staff_id here
};
exports.getStaffById = getStaffById;
const deleteStaff = async (staffId) => {
    return await staff_1.Staff.destroy({ where: { staff_id: staffId } }); // Use staff_id here
};
exports.deleteStaff = deleteStaff;
const getAllStaff = async () => {
    return await staff_1.Staff.findAll();
};
exports.getAllStaff = getAllStaff;
