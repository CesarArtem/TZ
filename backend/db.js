const pgp = require('pg-promise')();

// Настройки подключения
const db = pgp({
    host: 'postgres',
    port: 5433,
    database: 'TZ',
    user: 'postgres',     // Имя пользователя
    password: 'password1234'    // Пароль
});

// Экспортируем объект db для использования в других файлах
module.exports = db;