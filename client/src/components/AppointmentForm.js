import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Container, Typography, Paper, Box, Alert } from "@mui/material";
import "./App.css";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("Замена шин");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axios.post("http://localhost:5001/api/appointments", {
        name,
        phone,
        date,
        service,
      });

      if (response.status === 201) {
        setMessage({ type: "success", text: "Запись успешно создана!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Ошибка при записи. Попробуйте снова." });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Запись на шиномонтаж
        </Typography>
        {message && <Alert severity={message.type}>{message.text}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Имя" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Телефон" variant="outlined" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <TextField label="Дата и время" type="datetime-local" InputLabelProps={{ shrink: true }} fullWidth value={date} onChange={(e) => setDate(e.target.value)} required />
          <TextField label="Услуга" select fullWidth value={service} onChange={(e) => setService(e.target.value)} required>
            <MenuItem value="Замена шин">Замена шин</MenuItem>
            <MenuItem value="Балансировка">Балансировка</MenuItem>
            <MenuItem value="Ремонт прокола">Ремонт прокола</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Записаться
          </Button>
        </Box>
      </Paper>
      
      {/* Google Map */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom align="center">
          Наше местоположение
        </Typography>
        <Map />
      </Paper>
    </Container>
  );
};

// Компонент карты Google с исправленными координатами ОмГУ (Проспект Мира, 55а)
const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 55.0283, lng: 73.26501 }, // Кординаты Проспект Мира, 55а
        zoom: 17,
      });

      new window.google.maps.Marker({
        position: { lat: 55.0283, lng: 73.26501 },
        map,
        title: "ОмГУ, Проспект Мира, 55а",
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnl8jcu06JSx7kYvqH9qgnBO5Dbv0SnZ8&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => loadMap();
    } else {
      loadMap();
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px", marginTop: "20px" }} />;
};

export default AppointmentForm;
