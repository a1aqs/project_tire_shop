const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      // Твой пользователь в PostgreSQL
  host: 'localhost',     // Сервер базы данных
  database: 'tireshop',  // Имя базы данных
  password: 'blminthelife221',  // Пароль от PostgreSQL
  port: 5432,            // Порт PostgreSQL (обычно 5432)
});

pool.connect()
  .then(() => console.log('✅ Подключение к базе данных успешно!'))
  .catch(err => console.error('❌ Ошибка подключения к БД:', err));

module.exports = pool;
