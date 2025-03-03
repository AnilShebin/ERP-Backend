"use strict";
// seeders/seederService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const role_1 = __importDefault(require("../models/role"));
const staff_1 = __importDefault(require("../models/staff")); // Use Staff model
const logger_1 = __importDefault(require("../config/logger"));
// Define paths to your JSON files
const rolesJsonPath = path_1.default.join(__dirname, 'roles.json');
const superAdminJsonPath = path_1.default.join(__dirname, 'superAdmin.json');
// Load JSON file and parse it
const loadJsonFile = (filePath) => {
    return JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
};
const initSeed = async () => {
    try {
        await seedRoles();
        await seedSuperAdmins();
        logger_1.default.info('Super Admin seeded successfully.');
    }
    catch (error) {
        logger_1.default.error('Seed data failed!', error);
    }
};
// Seed roles from JSON file
const seedRoles = async () => {
    try {
        const roles = loadJsonFile(rolesJsonPath); // Load roles from JSON file
        for (const roleData of roles) {
            await role_1.default.findOrCreate({
                where: { code: roleData.code },
                defaults: {
                    name: roleData.name,
                    code: roleData.code,
                },
            });
        }
    }
    catch (error) {
        logger_1.default.error('Error seeding roles:', error);
    }
};
// Seed super admins from JSON file using Staff model
const seedSuperAdmins = async () => {
    try {
        const superAdmins = loadJsonFile(superAdminJsonPath); // Load super admins from JSON file
        const superAdminRole = await role_1.default.findOne({
            where: { code: 'SUPER_ADMIN' },
        });
        if (!superAdminRole) {
            throw new Error('SuperAdmin role not found.');
        }
        let superAdminExistsCount = 0;
        for (const superAdminData of superAdmins) {
            const superAdminExists = await staff_1.default.findOne({
                where: { staff_id: superAdminData.staff_id }, // Check if staff exists
            });
            if (!superAdminExists) {
                const hashedPassword = await bcryptjs_1.default.hash(superAdminData.password, 10); // Hash password
                // Create a new staff member with required fields
                await staff_1.default.create({
                    first_name: superAdminData.first_name,
                    last_name: superAdminData.last_name,
                    email: superAdminData.email,
                    staff_id: superAdminData.staff_id,
                    phone: superAdminData.phone,
                    password: hashedPassword,
                    isVerified: superAdminData.isVerified,
                    roleId: superAdminRole.id,
                    gender: superAdminData.gender || 'Not specified', // Provide default values as needed
                    designation: superAdminData.designation || 'Not specified',
                    documents_collected: superAdminData.documents_collected || false,
                    // Required fields - use provided data or fallback values
                    address: superAdminData.address || 'Unknown Address',
                    city: superAdminData.city || 'Unknown City',
                    state: superAdminData.state || 'Unknown State',
                    country: superAdminData.country || 'Unknown Country',
                    postal_code: superAdminData.postal_code || '000000',
                    date_of_birth: superAdminData.date_of_birth || '2000-01-01', // Set default DOB if not provided
                });
            }
            else {
                superAdminExistsCount++;
            }
        }
        if (superAdminExistsCount > 0) {
            logger_1.default.info(`${superAdminExistsCount} Super Admin(s) already exist.`);
        }
    }
    catch (error) {
        logger_1.default.error('Error seeding super admin:', error);
    }
};
exports.default = initSeed;
