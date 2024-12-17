import React, {useState} from 'react';
import EmployeeForm from "../Form/EmployeeForm";

const DataTableActions = () => {

    const handleAddRecord = () => {

    };

    const handleEditRecord = () => {
        // Реализация изменения существующей записи
    };

    const handleDeleteRecord = () => {
        // Реализация удаления записи
    };

    return (
        <div className="data-table-actions">
            <EmployeeForm/>
            <button onClick={handleAddRecord}>Добавить запись</button>
            <button onClick={handleEditRecord}>Изменить</button>
            <button onClick={handleDeleteRecord}>Удалить</button>
        </div>
    );
};

export default DataTableActions;