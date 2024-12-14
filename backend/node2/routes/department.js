const express = require('express');
const department_router = express.Router();

const query = require('../controllers/department.js');

department_router.get('/api/departments', query.getAllDepartments);
department_router.get('/api/departments/:id', query.getDepartment);
department_router.post('/api/departments', query.createDepartment);
department_router.put('/api/departments/:id', query.updateDepartment);
department_router.delete('/api/departments/:id', query.removeDepartment);

module.exports = department_router;


