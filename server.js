const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json()); // Для обработки JSON-запросов

const PORT = 5001;
const TELEGRAM_BOT_TOKEN = '7710346622:AAG3tbWUX_0SyqMggZkYKnkNWWQOU-vefEI';
const TELEGRAM_CHAT_ID = '1060354132';  

let appointments = []; // Хранилище записей

// ✅ Получить все записи
app.get("/api/appointments", async (req, res) => {
  try {
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// ✅ Функция отправки уведомления в Telegram
async function sendTelegramNotification(appointment) {
    const message = `🚗 Новая запись на шиномонтаж!  
📅 Дата: ${appointment.date}  
👤 Имя: ${appointment.name}  
📞 Телефон: ${appointment.phone}  
🔧 Услуга: ${appointment.service}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });
        console.log('✅ Уведомление отправлено в Telegram');
    } catch (error) {
        console.error('❌ Ошибка отправки уведомления:', error.response?.data || error.message);
    }
}

// ✅ Добавить запись
app.post("/api/appointments", (req, res) => {
  try {
    const { name, phone, date, service } = req.body;
    const newAppointment = { id: appointments.length + 1, name, phone, date, service };
    appointments.push(newAppointment);
    
    console.log("Новая запись:", newAppointment);
    
    // 📢 Отправляем уведомление в Telegram
    sendTelegramNotification(newAppointment);

    res.status(201).json({ message: "Запись создана!", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании записи" });
  }
});

// ✅ Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});
