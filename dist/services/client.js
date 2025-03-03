"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClients = exports.deleteClient = exports.updateClient = exports.getClientById = exports.createClient = void 0;
const client_1 = require("../models/client");
const createClient = async (clientData) => {
    const transaction = await client_1.Client.sequelize.transaction();
    try {
        const { individual, company, trust, partnership, huf, ...clientFields } = clientData;
        const client = await client_1.Client.create(clientFields, { transaction });
        switch (clientData.clientType) {
            case 'Individual':
                if (individual)
                    await client_1.Individual.create({ ...individual, clientId: client.id }, { transaction });
                break;
            case 'PrivateLimitedCompany':
            case 'LimitedCompany':
                if (company)
                    await client_1.Company.create({ ...company, clientId: client.id }, { transaction });
                break;
            case 'Trust':
                if (trust)
                    await client_1.Trust.create({ ...trust, clientId: client.id }, { transaction });
                break;
            case 'LLP':
            case 'PartnershipFirm':
                if (partnership)
                    await client_1.Partnership.create({ ...partnership, clientId: client.id }, { transaction });
                break;
            case 'HUF':
                if (huf)
                    await client_1.HUF.create({ ...huf, clientId: client.id }, { transaction });
                break;
        }
        await transaction.commit();
        return client;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.createClient = createClient;
const getClientById = async (id) => {
    return await client_1.Client.findByPk(id, {
        include: [
            { model: client_1.Individual, as: 'individual' },
            { model: client_1.Company, as: 'company' },
            { model: client_1.Trust, as: 'trust' },
            { model: client_1.Partnership, as: 'partnership' },
            { model: client_1.HUF, as: 'huf' },
        ],
    });
};
exports.getClientById = getClientById;
const updateClient = async (id, clientData) => {
    const transaction = await client_1.Client.sequelize.transaction();
    try {
        const client = await client_1.Client.findByPk(id);
        if (!client) {
            await transaction.rollback();
            return null;
        }
        const { individual, company, trust, partnership, huf, ...clientFields } = clientData;
        await client.update(clientFields, { transaction });
        switch (client.clientType) {
            case 'Individual':
                if (individual)
                    await client_1.Individual.update(individual, { where: { clientId: id }, transaction });
                break;
            case 'PrivateLimitedCompany':
            case 'LimitedCompany':
                if (company)
                    await client_1.Company.update(company, { where: { clientId: id }, transaction });
                break;
            case 'Trust':
                if (trust)
                    await client_1.Trust.update(trust, { where: { clientId: id }, transaction });
                break;
            case 'LLP':
            case 'PartnershipFirm':
                if (partnership)
                    await client_1.Partnership.update(partnership, { where: { clientId: id }, transaction });
                break;
            case 'HUF':
                if (huf)
                    await client_1.HUF.update(huf, { where: { clientId: id }, transaction });
                break;
        }
        await transaction.commit();
        return client;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.updateClient = updateClient;
const deleteClient = async (id) => {
    const transaction = await client_1.Client.sequelize.transaction();
    try {
        const client = await client_1.Client.findByPk(id);
        if (!client) {
            await transaction.rollback();
            return false;
        }
        switch (client.clientType) {
            case 'Individual':
                await client_1.Individual.destroy({ where: { clientId: id }, transaction });
                break;
            case 'PrivateLimitedCompany':
            case 'LimitedCompany':
                await client_1.Company.destroy({ where: { clientId: id }, transaction });
                break;
            case 'Trust':
                await client_1.Trust.destroy({ where: { clientId: id }, transaction });
                break;
            case 'LLP':
            case 'PartnershipFirm':
                await client_1.Partnership.destroy({ where: { clientId: id }, transaction });
                break;
            case 'HUF':
                await client_1.HUF.destroy({ where: { clientId: id }, transaction });
                break;
        }
        await client.destroy({ transaction });
        await transaction.commit();
        return true;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.deleteClient = deleteClient;
const getAllClients = async () => {
    return await client_1.Client.findAll({
        include: [
            { model: client_1.Individual, as: 'individual' },
            { model: client_1.Company, as: 'company' },
            { model: client_1.Trust, as: 'trust' },
            { model: client_1.Partnership, as: 'partnership' },
            { model: client_1.HUF, as: 'huf' },
        ],
    });
};
exports.getAllClients = getAllClients;
