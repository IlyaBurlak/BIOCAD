const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Подключение к базе данных
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Маршрут для получения списка устройств
app.get('/devices', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM devices');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Маршрут для добавления нового устройства
app.post('/devices', async (req, res) => {
    const { name, status } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO devices (name, status) VALUES ($1, $2) RETURNING *', [name, status]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// ... другие маршруты для обновления, удаления и т.д.

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});