"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../controllers/client");
const router = (0, express_1.Router)();
router.post('/', client_1.addClient);
router.get('/:id', client_1.getClient);
router.put('/:id', client_1.updateClient);
router.delete('/:id', client_1.deleteClient);
router.get('/', client_1.listAllClients);
exports.default = router;
