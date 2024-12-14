const Department = require("../models/department_postgres");

async function getAllDepartments(req, res, next) {
    try {
        const departments = await Department.getAll();
        res.status(200)
            .json({
                status: 'success',
                data: departments,
                message: 'Got All Departments'
            });
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

async function getDepartment(req, res, next) {
    let depID = parseInt(req.params.id);
    try {
        const department = await Department.getOne(depID);
        res.status(200)
            .json({
                status: 'success',
                data: department,
                message: 'Got Department'
            });
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

async function createDepartment(req, res, next) {
    try {
        const department = await Department.create(req.body);
        res.status(200)
            .json({
                status: 'success',
                data: department,
                message: 'Inserted Department'
            });
    } catch (error) {
        res.status(500).json({message: error.message});
        return next(error);
    }
}

async function updateDepartment(req, res, next) {
    let depID = parseInt(req.params.id);

    try {
        await Department.getOne(depID);
        try {
            const department = await Department.update(depID, req.body);
            res.status(200)
                .json({
                    status: 'success',
                    data: department,
                    message: 'Updated Department'
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

async function removeDepartment(req, res, next) {
    let depID = parseInt(req.params.id);

    try {
        await Department.getOne(depID);
        try {
            const department = await Department.delete(depID);
            res.status(200)
                .json({
                    status: 'success',
                    data: department,
                    message: 'Deleted Department'
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
    getAllDepartments: getAllDepartments,
    getDepartment: getDepartment,
    createDepartment: createDepartment,
    updateDepartment: updateDepartment,
    removeDepartment: removeDepartment
};