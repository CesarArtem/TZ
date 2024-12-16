const express = require('express');
const employee_router = express.Router();

const query = require('../controllers/employee.js');

employee_router.get('/api/employees', query.getAllEmployees);
employee_router.get('/api/employees/:id', query.getEmployee);
employee_router.post('/api/employees', query.createEmployee);
employee_router.put('/api/employees/:id', query.updateEmployee);
employee_router.delete('/api/employees/:id', query.removeEmployee);

module.exports = employee_router;


