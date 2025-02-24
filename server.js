const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Подключаем базу

const app = express();
app.use(cors());
app.use(express.json()); // Для обработки JSON-запросов

// ✅ 1. Получить все записи
app.get('/appointments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointments ORDER BY date ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ✅ 2. Создать новую запись
app.post('/appointments', async (req, res) => {
  try {
    const { name, phone, date, service } = req.body;
    const result = await pool.query(
      'INSERT INTO appointments (name, phone, date, service) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, phone, date, service]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ✅ 3. Обновить статус записи
app.put('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ✅ 4. Удалить запись
app.delete('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
    res.json({ message: 'Запись удалена' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
