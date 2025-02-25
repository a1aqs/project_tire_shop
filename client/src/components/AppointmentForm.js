import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import "./AppointmentForm.css"; // Добавь импорт стилей

const AppointmentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      date: "",
      service: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Имя слишком короткое")
        .max(50, "Имя слишком длинное")
        .required("Обязательное поле"),
      phone: Yup.string()
        .matches(/^(\+7|8)?\d{10}$/, "Некорректный номер")
        .required("Обязательное поле"),
      date: Yup.date()
        .min(new Date(), "Дата не может быть в прошлом")
        .required("Выберите дату"),
      service: Yup.string().required("Выберите услугу"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        alert("Запись успешно отправлена!");
        resetForm();
      } catch (error) {
        alert("Ошибка отправки");
      }
    },
  });

  return (
    <Container className="form-container">
      <Paper elevation={3} className="form-paper">
        <Box component="form" onSubmit={formik.handleSubmit} className="form-box">
          <h2>Запись на шиномонтаж</h2>
          <TextField
            label="Имя"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />
          <TextField
            label="Телефон"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
          />
          <TextField
            label="Дата"
            type="date"
            name="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            fullWidth
          />
          <TextField
            label="Услуга"
            name="service"
            select
            value={formik.values.service}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.service && Boolean(formik.errors.service)}
            helperText={formik.touched.service && formik.errors.service}
            fullWidth
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
