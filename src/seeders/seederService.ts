//seeders/seederService.ts

import fs from 'fs';
import path from 'path';
import * as bcrypt from 'bcryptjs';
import Role from '../models/role';
import User from '../models/user';
import logger from '../config/logger';

const rolesJsonPath = path.join(__dirname, 'roles.json');
const superAdminJsonPath = path.join(__dirname, 'superAdmin.json');

const loadJsonFile = (filePath: string) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

async function initSeed() {
    try {
        const seedRoles = async () => {
            try {
                const roles = loadJsonFile(rolesJsonPath); // Load roles from JSON file

                for (const roleData of roles) {
                    const [role, created] = await Role.findOrCreate({
                        where: { code: roleData.code },
                        defaults: {
                            name: roleData.name,
                            code: roleData.code,
                        },
                    });
                }
            } catch (error) {
                console.error('Error seeding roles:', error);
            }
        };

        const seedSuperAdmins = async () => {
            try {
                const superAdmins = loadJsonFile(superAdminJsonPath); // Load super admins from JSON file

                const superAdminRole = await Role.findOne({
                    where: { code: 'SUPER_ADMIN' },
                });
                if (!superAdminRole) {
                    throw new Error('SuperAdmin role not found.');
                }

                for (const superAdminData of superAdmins) {
                    const superAdminExists = await User.findOne({
                        where: { staff_id: superAdminData.staff_id },
                    });

                    if (!superAdminExists) {
                        const hashedPassword = await bcrypt.hash(
                            superAdminData.password,
                            10
                        ); // Hash password
                        await User.create({
                            name: superAdminData.name,
                            staff_id: superAdminData.staff_id,
                            phone: superAdminData.phone,
                            password: hashedPassword,
                            isVerified: superAdminData.isVerified,
                            roleId: superAdminRole.id,
                        });
                    }
                }
            } catch (error) {
                console.error('Error seeding super admin:', error);
            }
        };

        await seedRoles();
        await seedSuperAdmins();
        logger.info('Roles and Super Admin seeded.');
    } catch (error) {
        logger.error('Seed data failed!', error);
    }
}

export default initSeed;
