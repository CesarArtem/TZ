import React, {useState} from 'react';
import './EmployeeForm.css';

const EmployeeForm = (selectedRowD) => {

    const [departments, setDepartments]=useState([])
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        otchestvo: '',
        birth_date: '',
        salary: '',
        department_id: ''
    });


    fetch('http://localhost:3003/api/departments/', {
        method: 'GET',
        mode: 'cors'
    }).then(res => {
        return res.json()
    }).then(data => {
        setDepartments(data.data)
        console.log(departments)
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddRecord = () => {
        formData.department_id = parseInt(formData.department_id)
        formData.salary = parseFloat(formData.salary)
        let body = JSON.stringify(formData)
        fetch(`http://localhost:3003/api/employees/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }).then(res => {
            return res.json()
        }).then(data => {
                console.log(data)
                if (data.data !== undefined) {
                    alert("Успешное добавление")
                    window.location.reload();
                } else {
                    alert("Ошибка при добавлении")
                }
            }
        ).catch(error => {
            console.log(error)
            alert("Ошибка при добавлении. Попробуйте попозже")
        })
    };

    const handleEditRecord = () => {
        if (selectedRowD.selectedRow !== undefined) {
            console.log(selectedRowD.selectedRow[0].id_employee)
            formData.department_id = parseInt(formData.department_id)
            formData.salary = parseFloat(formData.salary)
            let body = JSON.stringify(formData)
            fetch(`http://localhost:3003/api/employees/` + selectedRowD.selectedRow[0].id_employee, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            }).then(res => {
                return res.json()
            }).then(data => {
                    console.log(data)
                    if (data.data !== undefined) {
                        alert("Успешное изменение")
                        window.location.reload();
                    } else {
                        alert("Ошибка при изменения")
                    }
                }
            ).catch(error => {
                console.log(error)
                alert("Ошибка при изменении. Попробуйте попозже")
            })
        } else {
            alert("Выберите поле для изменения")
        }
    };

    const handleDeleteRecord = () => {
        if (selectedRowD.selectedRow !== undefined) {
            fetch(`http://localhost:3003/api/employees/` + selectedRowD.selectedRow[0].id_employee, {
                method: 'DELETE',
                mode: 'cors'
            }).then(res => {
                return res.json()
            }).then(data => {
                    console.log(data)
                    if (data.data !== undefined) {
                        alert("Успешное удаление")
                        window.location.reload();
                    } else {
                        alert("Ошибка при удалении")
                    }
                }
            ).catch(error => {
                console.log(error)
                alert("Ошибка при удалении. Попробуйте попозже")
            })
        } else {
            alert("Выберите поле для удаления")
        }
    };

    return (
        <form>
            <div className={"formRow"}>
                <label className={"formLabel"}>
                    Имя:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={"formRow"}>
                <label className={"formLabel"}>
                    Фамилия:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={"formRow"}>
                <label className={"formLabel"}>
                    Отчество:
                    <input
                        type="text"
                        name="otchestvo"
                        value={formData.otchestvo}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className={"formRow"}>
                <label className={"formLabel"}>
                    Дата рождения:
                    <input
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={"formRow"}>
                <label className={"formLabel"}>
                    Зарплата:
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div className={"formRow"}>
                <label className={"formLabel"}>
                    Отдел:
                    <select
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите отдел</option>
                        {departments.map((dept) => (
                            <option key={dept.id_department} value={dept.id_department}>
                                {dept.name_department}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <a className={"buttonForSubmit"} onClick={handleAddRecord}>Добавить запись</a>
            <a className={"buttonForSubmit"} onClick={handleEditRecord}>Изменить</a>
            <a className={"buttonForSubmit"} onClick={handleDeleteRecord}>Удалить</a>
        </form>
    );
};

export default EmployeeForm;