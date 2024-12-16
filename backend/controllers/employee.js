const Employee = require("../models/employee_postgres");

async function getAllEmployees(req, res, next) {
    try {
        const employees = await Employee.getAll();
        res.status(200)
                .json({
                    status: 'success',
                    data: employees,
                    message: 'Got All Employees'
                });
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

async function getEmployee(req, res, next) {
    let emplID = parseInt(req.params.id);
    try {
        const employee = await Employee.getOne(emplID);
        res.status(200)
            .json({
                status: 'success',
                data: employee,
                message: 'Got Employee'
            });
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

async function createEmployee(req, res, next) {
    req.body.department_id = parseInt(req.body.department_id);
    req.body.salary = parseFloat(req.body.salary);

    try {
        const employee = await Employee.create(req.body);
        res.status(200)
            .json({
                status: 'success',
                data: employee,
                message: 'Inserted Employee'
            });
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

async function updateEmployee(req, res, next) {
    let emplID = parseInt(req.params.id);

    req.body.department_id = parseInt(req.body.department_id);
    req.body.salary = parseFloat(req.body.salary);

    try {
        await Employee.getOne(emplID);
        try {
            const employee = await Employee.update(emplID, req.body);
            res.status(200)
                .json({
                    status: 'success',
                    data: employee,
                    message: 'Updated Employee'
                });
        } catch (error) {
            res.status(500).json({message: error.message});
            return next(error);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

async function removeEmployee(req, res, next) {
    let emplID = parseInt(req.params.id);

    try {
        await Employee.getOne(emplID);
        try {
            const employee = await Employee.delete(emplID);
            res.status(200)
                .json({
                    status: 'success',
                    data: employee,
                    message: 'Deleted Employee'
                });
        } catch (error) {
            res.status(500).json({message: error.message});
            return next(error);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

module.exports = {
    getAllEmployees: getAllEmployees,
    getEmployee: getEmployee,
    createEmployee: createEmployee,
    updateEmployee: updateEmployee,
    removeEmployee: removeEmployee
};