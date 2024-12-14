DROP DATABASE IF EXISTS TZ;
CREATE DATABASE TZ;

\c TZ;

CREATE TABLE Department (
    id_department SERIAL PRIMARY KEY,          -- Уникальный идентификатор для каждого отдела
    name_department VARCHAR(50) NOT NULL        -- Наименование отдела
);

CREATE TABLE Employee (
    id_employee SERIAL PRIMARY KEY,          -- Уникальный идентификатор для каждого сотрудника
    first_name VARCHAR(50) NOT NULL, -- Имя сотрудника
    last_name VARCHAR(50) NOT NULL,  -- Фамилия сотрудника
    otchestvo VARCHAR(50) DEFAULT '',  -- Фамилия сотрудника
    birth_date DATE NOT NULL,        -- Дата найма
    salary NUMERIC(10, 2),       -- Зарплата с двумя знаками после запятой
 	department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department (id_department) -- Внешний ключ
);



-- Вставка данных в таблицу Department
INSERT INTO Department (name_department) VALUES
('Отдел продаж'),
('Отдел маркетинга'),
('Отдел разработки'),
('Отдел кадров'),
('Финансовый отдел');

-- Вставка данных в таблицу Employee
INSERT INTO Employee (first_name, last_name, otchestvo, birth_date, salary, department_id) VALUES
('Иван', 'Иванов', 'Иванович', '1985-05-15', 50000.00, 1),
('Петр', 'Петров', 'Петрович', '1990-03-22', 60000.00, 2),
('Сергей', 'Сергеев', 'Сергеевич', '1988-07-30', 55000.00, 3),
('Анна', 'Антонова', 'Антоновна', '1992-11-10', 45000.00, 4),
('Мария', 'Маркова', 'Марковна', '1987-01-25', 70000.00, 5),
('Дмитрий', 'Дмитриев', 'Дмитриевич', '1983-09-14', 65000.00, 1),
('Елена', 'Еленина', 'Еленовна', '1995-12-05', 48000.00, 2),
('Алексей', 'Алексеев', 'Алексеевич', '1980-06-18', 72000.00, 3),
('Ольга', 'Ольгина', 'Ольгина', '1991-04-20', 53000.00, 4),
('Николай', 'Николаев', 'Николаевич', '1986-08-12', 60000.00, 5);