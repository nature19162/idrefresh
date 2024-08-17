// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const ADMIN_USERNAME = 'nature';
const ADMIN_PASSWORD = 'Wan190203';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '用户名或密码错误' });
    }
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});