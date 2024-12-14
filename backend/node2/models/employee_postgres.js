const db = require('../db');

class Employee {
    static async getAll() {
        return db.any('SELECT * FROM Employee');
    }

    static async getOne(id) {
        return db.one('select * from Employee where id_employee = $1', id);
    }

    static async create(employee) {
        const { first_name, last_name, otchestvo, birth_date, salary, department_id } = employee;
        return db.one('INSERT INTO employee(first_name, last_name, otchestvo, birth_date, salary, department_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, otchestvo, birth_date, salary, department_id]);
    }

    static async update(id, employee) {
        const { first_name, last_name, otchestvo, birth_date, salary, department_id } = employee;
        return db.one('update Employee set first_name=$1, last_name=$2, otchestvo=$3, birth_date=$4, salary=$5, department_id=$6 ' +
        'where id_employee=$7 returning *', [first_name, last_name, otchestvo, birth_date, salary, department_id, id])
    }

    static async delete(id) {
        return db.one('delete from Employee where id_employee = $1 returning *', id);
    }
}

module.exports = Employee
