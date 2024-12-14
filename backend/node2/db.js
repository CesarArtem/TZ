const pgp = require('pg-promise')();

// Настройки подключения
const db = pgp({
    host: 'localhost',    // Хост, на котором работает PostgreSQL
    port: 5432,           // Порт PostgreSQL
    database: 'TZ', // Имя вашей базы данных
    user: 'postgres',     // Имя пользователя
    password: '123'    // Пароль
});

// Экспортируем объект db для использования в других файлах
module.exports = db;