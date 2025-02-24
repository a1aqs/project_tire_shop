const pool = require('./db');

async function testDB() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('📅 Время в базе данных:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Ошибка выполнения запроса:', err);
  } finally {
    pool.end();
  }
}

testDB();
