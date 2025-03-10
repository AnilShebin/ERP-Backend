"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllClients = exports.deleteClient = exports.updateClient = exports.getClient = exports.addClient = void 0;
const http_status_1 = __importDefault(require("http-status"));
const clientService = __importStar(require("../services/client"));
const addClient = async (req, res, next) => {
    try {
        const client = await clientService.createClient(req.body);
        res.status(http_status_1.default.CREATED).json({
            success: true,
            data: client,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addClient = addClient;
const getClient = async (req, res, next) => {
    try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Invalid client ID',
            });
        }
        const client = await clientService.getClientById(clientId);
        if (!client) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Client not found',
            });
        }
        res.status(http_status_1.default.OK).json({ success: true, data: client });
    }
    catch (error) {
        next(error);
    }
};
exports.getClient = getClient;
const updateClient = async (req, res, next) => {
    try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Invalid client ID',
            });
        }
        const updatedClient = await clientService.updateClient(clientId, req.body);
        if (!updatedClient) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Client not found',
            });
        }
        res.status(http_status_1.default.OK).json({ success: true, data: updatedClient });
    }
    catch (error) {
        next(error);
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res, next) => {
    try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Invalid client ID',
            });
        }
        const result = await clientService.deleteClient(clientId);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Client not found',
            });
        }
        res.status(http_status_1.default.NO_CONTENT).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteClient = deleteClient;
const listAllClients = async (req, res, next) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(http_status_1.default.OK).json({ success: true, data: clients });
    }
    catch (error) {
        next(error);
    }
};
exports.listAllClients = listAllClients;
