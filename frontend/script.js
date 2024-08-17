document.getElementById('unlockButton').addEventListener('click', async () => {
    const passwordInput = document.getElementById('passwordInput').value;
    const response = await fetch('https://nature19162-qxw9igzna-natures-projects-325c09d3.vercel.app/api/content'); // 使用完整域名
    const data = await response.json();
    if (passwordInput === data.password) {
        document.getElementById('passwordPrompt').style.display = 'none';
        const contentDiv = document.getElementById('content');
        contentDiv.style.display = 'block';
        data.accounts.forEach((account, index) => {
            const accountDiv = document.createElement('div');
            accountDiv.classList.add('account');
            accountDiv.innerHTML = `
                <div class="content-row">
                    <span>${index + 1}. 账号: ${account.contentLeft}</span>
                    <button class="copyButton" data-text="${account.contentLeft}">复制账号</button>
                </div>
                <div class="content-row">
                    <span>密码: ${account.contentRight}</span>
                    <button class="copyButton" data-text="${account.contentRight}">复制密码</button>
                </div>
                <div class="content-row">
                    <span>说明: ${account.description}</span>
                </div>`;
            contentDiv.appendChild(accountDiv);
        });

        document.querySelectorAll('.copyButton').forEach(button => {
            button.addEventListener('click', () => {
                const textToCopy = button.getAttribute('data-text');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert('复制成功!');
                });
            });
        });
    } else {
        alert('提取码错误!');
    }
});