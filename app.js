// Инициализируем SDK
const tg = window.Telegram.WebApp;

// Говорим Телеге, что мы готовы (чтобы скрыть прелоадер)
tg.ready();

// Растягиваем приложение на всю высоту экрана
tg.expand();

// Получаем данные юзера
const user = tg.initDataUnsafe.user;

const greetingEl = document.getElementById('greeting');
const mainBtn = document.getElementById('main-btn');
const closeBtn = document.getElementById('close-btn');

if (user) {
    greetingEl.innerText = `Привет, ${user.first_name}!`;
} else {
    greetingEl.innerText = 'Привет, аноним!';
}

// Настраиваем главную кнопку (MainButton), которая появляется внизу экрана
tg.MainButton.setText("ОТПРАВИТЬ ДАННЫЕ");
tg.MainButton.show();
tg.MainButton.onClick(() => {
    // Отправляем данные обратно боту
    tg.sendData(JSON.stringify({ 
        action: 'click', 
        userId: user ? user.id : null,
        time: new Date().toISOString()
    }));
});

mainBtn.addEventListener('click', () => {
    tg.showPopup({
        title: "Охуеть!",
        message: "Ты нажал на кнопку внутри Web App. Всё работает, блять!",
        buttons: [{ type: "ok" }]
    });
});

closeBtn.addEventListener('click', () => {
    tg.close();
});

// Включаем вибрацию при клике, если поддерживается
if (tg.HapticFeedback) {
    mainBtn.addEventListener('touchstart', () => {
        tg.HapticFeedback.impactOccurred('light');
    });
}