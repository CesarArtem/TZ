const db = require('../db');

class Department {
    static async getAll() {
        return db.any('SELECT * FROM Department');
    }

    static async getOne(id) {
        return db.one('select * from Department where id_department = $1', id);
    }

    static async create(department) {
        const { name_department } = department;
        return db.one('INSERT INTO Department(name_department) VALUES($1) RETURNING *',
            [name_department]);
    }

    static async update(id, department) {
        const { name_department } = department;
        return db.one('update Department set name_department=$1' +
            'where id_department=$2 returning *', [name_department, id])
    }

    static async delete(id) {
        return db.one('delete from Department where id_department = $1 returning *', id);
    }
}

module.exports = Department
