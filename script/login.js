
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = document.getElementById('user-name').value;
    const password = document.getElementById('password').value;
    if (userName === 'admin' && password === 'admin123') {
        window.location.href = 'main.html';
    } else {
        alert('Invalid Password');
    }
});

