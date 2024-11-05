import { Transaction } from 'sequelize';
import { Client, Individual, Company, Trust, Partnership, HUF, ClientData } from '../models/client';

export const createClient = async (clientData: ClientData): Promise<Client> => {
  const transaction: Transaction = await Client.sequelize!.transaction();

  try {
    const { individual, company, trust, partnership, huf, ...clientFields } = clientData;
    const client = await Client.create(clientFields, { transaction });

    switch (clientData.clientType) {
      case 'Individual':
        if (individual) await Individual.create({ ...individual, clientId: client.id }, { transaction });
        break;
      case 'PrivateLimitedCompany':
      case 'LimitedCompany':
        if (company) await Company.create({ ...company, clientId: client.id }, { transaction });
        break;
      case 'Trust':
        if (trust) await Trust.create({ ...trust, clientId: client.id }, { transaction });
        break;
      case 'LLP':
      case 'PartnershipFirm':
        if (partnership) await Partnership.create({ ...partnership, clientId: client.id }, { transaction });
        break;
      case 'HUF':
        if (huf) await HUF.create({ ...huf, clientId: client.id }, { transaction });
        break;
    }

    await transaction.commit();
    return client;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getClientById = async (id: number): Promise<Client | null> => {
  return await Client.findByPk(id, {
    include: [
      { model: Individual, as: 'individual' },
      { model: Company, as: 'company' },
      { model: Trust, as: 'trust' },
      { model: Partnership, as: 'partnership' },
      { model: HUF, as: 'huf' },
    ],
  });
};

export const updateClient = async (id: number, clientData: Partial<ClientData>): Promise<Client | null> => {
  const transaction: Transaction = await Client.sequelize!.transaction();

  try {
    const client = await Client.findByPk(id);
    if (!client) {
      await transaction.rollback();
      return null;
    }

    const { individual, company, trust, partnership, huf, ...clientFields } = clientData;
    await client.update(clientFields, { transaction });

    switch (client.clientType) {
      case 'Individual':
        if (individual) await Individual.update(individual, { where: { clientId: id }, transaction });
        break;
      case 'PrivateLimitedCompany':
      case 'LimitedCompany':
        if (company) await Company.update(company, { where: { clientId: id }, transaction });
        break;
      case 'Trust':
        if (trust) await Trust.update(trust, { where: { clientId: id }, transaction });
        break;
      case 'LLP':
      case 'PartnershipFirm':
        if (partnership) await Partnership.update(partnership, { where: { clientId: id }, transaction });
        break;
      case 'HUF':
        if (huf) await HUF.update(huf, { where: { clientId: id }, transaction });
        break;
    }

    await transaction.commit();
    return client;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const deleteClient = async (id: number): Promise<boolean> => {
  const transaction: Transaction = await Client.sequelize!.transaction();

  try {
    const client = await Client.findByPk(id);
    if (!client) {
      await transaction.rollback();
      return false;
    }

    switch (client.clientType) {
      case 'Individual':
        await Individual.destroy({ where: { clientId: id }, transaction });
        break;
      case 'PrivateLimitedCompany':
      case 'LimitedCompany':
        await Company.destroy({ where: { clientId: id }, transaction });
        break;
      case 'Trust':
        await Trust.destroy({ where: { clientId: id }, transaction });
        break;
      case 'LLP':
      case 'PartnershipFirm':
        await Partnership.destroy({ where: { clientId: id }, transaction });
        break;
      case 'HUF':
        await HUF.destroy({ where: { clientId: id }, transaction });
        
        break;
    }

    await client.destroy({ transaction });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getAllClients = async (): Promise<Client[]> => {
  return await Client.findAll({
    include: [
      { model: Individual, as: 'individual' },
      { model: Company, as: 'company' },
      { model: Trust, as: 'trust' },
      { model: Partnership, as: 'partnership' },
      { model: HUF, as: 'huf' },
    ],
  });
};