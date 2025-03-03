"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staff_1 = require("../controllers/staff");
const router = (0, express_1.Router)();
router.post('/', staff_1.addStaff);
router.get('/:staffId', staff_1.getStaff);
router.put('/:staffId', staff_1.updateStaff);
router.delete('/:staffId', staff_1.deleteStaff);
router.get('/', staff_1.listAllStaff);
exports.default = router;
