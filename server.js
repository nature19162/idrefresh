const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9000;

// 中间件
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // 静态文件路径

// 登录接口
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'yourpassword') { // 修改为你的管理员用户名和密码
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '用户名或密码错误' });
    }
});

// 管理接口，用于生成提取码
app.post('/api/admin', (req, res) => {
    const { accounts } = req.body;
    const password = Math.floor(100000 + Math.random() * 900000).toString(); // 生成6位提取码

    const data = { accounts, password };
    fs.writeFileSync('data.json', JSON.stringify(data));

    res.json({ password });
});

// Webhook 接口，接收外部数据
app.post('/webhook', (req, res) => {
    const { accounts } = req.body;

    if (accounts) {
        fs.writeFileSync('data.json', JSON.stringify({ accounts }));

        res.json({ success: true, message: '数据已成功接收并保存' });
    } else {
        res.status(400).json({ success: false, message: '无效的数据' });
    }
});

// 获取内容接口
app.get('/api/content', (req, res) => {
    try {
        const data = fs.readFileSync('data.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.json({ accounts: [], password: '' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 https://localhost:${port}`);
});