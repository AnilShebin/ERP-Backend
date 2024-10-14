// seeders/seederService.ts

import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import Role from '../models/role';
import Staff from '../models/staff'; // Use Staff model
import logger from '../config/logger';

// Define paths to your JSON files
const rolesJsonPath = path.join(__dirname, 'roles.json');
const superAdminJsonPath = path.join(__dirname, 'superAdmin.json');

// Load JSON file and parse it
const loadJsonFile = (filePath: string): any => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const initSeed = async () => {
    try {
        await seedRoles();
        await seedSuperAdmins();
        logger.info('Super Admin seeded successfully.');
    } catch (error) {
        logger.error('Seed data failed!', error);
    }
};

// Seed roles from JSON file
const seedRoles = async () => {
    try {
        const roles = loadJsonFile(rolesJsonPath); // Load roles from JSON file

        for (const roleData of roles) {
            await Role.findOrCreate({
                where: { code: roleData.code },
                defaults: {
                    name: roleData.name,
                    code: roleData.code,
                },
            });
        }
    } catch (error) {
        logger.error('Error seeding roles:', error);
    }
};

// Seed super admins from JSON file using Staff model
const seedSuperAdmins = async () => {
    try {
        const superAdmins = loadJsonFile(superAdminJsonPath); // Load super admins from JSON file

        const superAdminRole = await Role.findOne({
            where: { code: 'SUPER_ADMIN' },
        });

        if (!superAdminRole) {
            throw new Error('SuperAdmin role not found.');
        }

        let superAdminExistsCount = 0;

        for (const superAdminData of superAdmins) {
            const superAdminExists = await Staff.findOne({
                where: { staff_id: superAdminData.staff_id }, // Check if staff exists
            });

            if (!superAdminExists) {
                const hashedPassword = await bcrypt.hash(superAdminData.password, 10); // Hash password
                await Staff.create({ // Create a new staff member
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
                });
            } else {
                superAdminExistsCount++;
            }
        }

        if (superAdminExistsCount > 0) {
            logger.info(`${superAdminExistsCount} Super Admin(s) already exist.`);
        }
    } catch (error) {
        logger.error('Error seeding super admin:', error);
    }
};

export default initSeed;
