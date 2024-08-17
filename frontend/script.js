document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('网络响应错误');
        }
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('message').textContent = '登录成功!';
            document.getElementById('message').style.color = 'green';
            window.location.href = '/admin.html'; // 登录成功后跳转
        } else {
            document.getElementById('message').textContent = data.message;
            document.getElementById('message').style.color = 'red';
        }
        document.getElementById('message').style.display = 'block';
    } catch (error) {
        console.error('登录请求失败:', error);
        document.getElementById('message').textContent = '登录失败，请稍后再试。';
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.display = 'block';
    }
});