// Функция для проверки email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Функция для добавления ошибки к полю
function setError(field, message) {
    field.classList.add('error');
    field.value = '';
    field.placeholder = message;
}

// Функция для удаления ошибки с поля
function clearError(field) {
    field.classList.remove('error');
    field.placeholder = field.getAttribute('data-original-placeholder');
}

// Добавляем исходные плейсхолдеры в data-атрибуты, чтобы можно было их восстанавливать
document.querySelectorAll('input').forEach(input => {
    input.setAttribute('data-original-placeholder', input.placeholder);

    // Очистка ошибки при фокусе на поле
    input.addEventListener('focus', function() {
        clearError(input);
    });
});

// Переключение между "Регистрация" и "Логин"
document.getElementById('toggle-login').addEventListener('click', function() {
    const formTitle = document.getElementById('form-title');
    const toggleLogin = document.getElementById('toggle-login');
    const mailField = document.getElementById('mail');

    // Если "Регистрация" активна, переключаем на "Логин"
    if (formTitle.classList.contains('active')) {
        formTitle.classList.remove('active');
        toggleLogin.classList.add('active');

        mailField.style.display = 'none'; // Скрываем поле для email
        mailField.value = ''; // Очищаем значение поля email
        clearError(mailField); // Очищаем возможные ошибки email при переключении
    }
});

// Переключение обратно на "Регистрация"
document.getElementById('form-title').addEventListener('click', function() {
    const formTitle = document.getElementById('form-title');
    const toggleLogin = document.getElementById('toggle-login');
    const mailField = document.getElementById('mail');

    // Если "Логин" активен, переключаем обратно на "Регистрация"
    if (toggleLogin.classList.contains('active')) {
        toggleLogin.classList.remove('active');
        formTitle.classList.add('active');

        mailField.style.display = 'block'; // Показываем поле для email
    }
});


// Обработка отправки формы
document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const mailField = document.getElementById('mail');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');

    // Очищаем предыдущие ошибки
    clearError(mailField);
    clearError(usernameField);
    clearError(passwordField);

    // Проверка полей
    if (!validateEmail(mailField.value)) {
        setError(mailField, 'Неверный формат email');
        return;
    }
    if (!usernameField.value.trim()) {
        setError(usernameField, 'Введите логин');
        return;
    }
    if (!passwordField.value.trim()) {
        setError(passwordField, 'Введите пароль');
        return;
    }

    // Подготовка данных для отправки
    const authData = {
        isLogin: false,
        username: usernameField.value,
        email: mailField.value,
        password: passwordField.value
    };

    // Отправка данных на сервер
    fetch('/api/auth/handleAuth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
    })
        .then(response => response.text())
        .then(data => {
            if (data.includes("redirect")) {
                window.location.href = "/"; // Перенаправляем на главную страницу
            } else {
                alert('Ошибка при регистрации');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных');
        });
});

// Функция для изменения текста кнопки и возврата его через 1 секунду
function displayMessage(message, isSuccess) {
    const submitButton = document.querySelector('button'); // Получаем кнопку "Start"
    submitButton.textContent = message; // Устанавливаем текст сообщения
    submitButton.style.backgroundColor = isSuccess ? '#00FF00' : '#FF0000'; // Зеленый для успеха, красный для ошибки

    setTimeout(() => {
        submitButton.textContent = 'Start'; // Возвращаем текст "Start"
        submitButton.style.backgroundColor = ''; // Убираем стиль фона
    }, 1000); // Задержка на 1 секунду
}