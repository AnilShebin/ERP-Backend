import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as clientService from '../services/client';
import { ClientData } from '../models/client';

export const addClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await clientService.createClient(req.body as ClientData);
    res.status(httpStatus.CREATED).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

export const getClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid client ID',
      });
    }
    const client = await clientService.getClientById(clientId);
    if (!client) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Client not found',
      });
    }
    res.status(httpStatus.OK).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid client ID',
      });
    }
    const updatedClient = await clientService.updateClient(clientId, req.body as Partial<ClientData>);
    if (!updatedClient) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Client not found',
      });
    }
    res.status(httpStatus.OK).json({ success: true, data: updatedClient });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Invalid client ID',
      });
    }
    const result = await clientService.deleteClient(clientId);
    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Client not found',
      });
    }
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export const listAllClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await clientService.getAllClients();
    res.status(httpStatus.OK).json({ success: true, data: clients });
  } catch (error) {
    next(error);
  }
};