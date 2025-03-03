"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRegisteredCompanies = exports.registerService = exports.login = void 0;
// services/auth.ts
const http_status_1 = __importDefault(require("http-status"));
const logger_1 = __importDefault(require("../config/logger"));
const staff_1 = __importDefault(require("../models/staff")); // Import Staff model
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const common_1 = require("../utils/common");
const login = async (data) => {
    try {
        const { staff_id, password } = data;
        const staff = await staff_1.default.findOne({
            where: { staff_id },
            include: [{ model: role_1.default, as: 'role' }]
        });
        // Check if staff exists and validate password
        if (!staff || !(await (0, common_1.comparePassword)(password, staff.password))) {
            throw new errorHandler_1.default(http_status_1.default.BAD_REQUEST, 'Invalid credentials');
        }
        const staffAttributes = staff.get({ plain: true });
        const token = (0, common_1.generateToken)(staffAttributes);
        return {
            id: staffAttributes.id, // Required
            staff_id: staffAttributes.staff_id,
            role: staffAttributes.role?.code,
            token,
        };
    }
    catch (error) {
        logger_1.default.error('Error in login service: ' + error);
        throw error;
    }
};
exports.login = login;
const registerService = async (data) => {
    const { company_name, company_email, phone, password } = data;
    // Check for existing company email
    const existingUser = await user_1.default.findOne({ where: { company_email } });
    if (existingUser) {
        throw new errorHandler_1.default(http_status_1.default.BAD_REQUEST, 'Company email already registered');
    }
    // Hash password
    const hashedPassword = await (0, common_1.hashPassword)(password);
    // Create new user
    const newUser = await user_1.default.create({
        company_name,
        company_email,
        phone,
        password: hashedPassword,
    });
    return {
        id: newUser.id,
        company_name: newUser.company_name,
        company_email: newUser.company_email,
        phone: newUser.phone,
    };
};
exports.registerService = registerService;
// New function to get all registered companies
const getAllRegisteredCompanies = async () => {
    try {
        const companies = await user_1.default.findAll(); // Fetch all users (assuming they represent companies)
        return companies.map(company => ({
            id: company.id,
            company_name: company.company_name,
            company_email: company.company_email,
            phone: company.phone,
        }));
    }
    catch (error) {
        logger_1.default.error('Error fetching all registered companies: ' + error);
        throw new errorHandler_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error fetching registered companies');
    }
};
exports.getAllRegisteredCompanies = getAllRegisteredCompanies;
