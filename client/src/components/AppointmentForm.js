import React, { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/appointments", formData);
      alert("Запись отправлена!");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Имя" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Телефон" onChange={handleChange} required />
      <input type="datetime-local" name="date" onChange={handleChange} required />
      <select name="service" onChange={handleChange} required>
        <option value="">Выберите услугу</option>
        <option value="Балансировка">Балансировка</option>
        <option value="Замена шин">Замена шин</option>
        <option value="Ремонт шин">Ремонт шин</option>
      </select>
      <button type="submit">Записаться</button>
    </form>
  );
};

export default AppointmentForm;
