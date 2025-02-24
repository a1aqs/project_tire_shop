import { useState } from "react";
import { TextField, Button, MenuItem, Container, Typography, Paper, Box } from "@mui/material";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("Замена шин");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, date, service });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Запись на шиномонтаж
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Имя"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Телефон"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            label="Дата и время"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <TextField
            label="Услуга"
            select
            fullWidth
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <MenuItem value="Замена шин">Замена шин</MenuItem>
            <MenuItem value="Балансировка">Балансировка</MenuItem>
            <MenuItem value="Ремонт прокола">Ремонт прокола</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Записаться
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AppointmentForm;
