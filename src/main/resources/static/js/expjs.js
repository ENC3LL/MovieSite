let lastClickedCard = null;
let currentCardId = null;

function expandCard(element, cardId) {
    lastClickedCard = element;
    currentCardId = cardId;
    let imgSrc;
    let txtFile;
    let title = '';

    async function expandCard(card, filmId) {
        // Загрузка описания фильма
        const response = await fetch(`/api/films/${filmId}/description`);
        const description = await response.text();

        // Отображение описания
        const expandedCard = document.getElementById('expandedCard');
        const filmDescription = document.getElementById('filmDescription');
        filmDescription.textContent = description;

        // Показ расширенной карточки
        expandedCard.style.display = 'block';
    }

    // Показать оверлей
    var overlay = document.getElementById('modal-overlay');
    overlay.classList.add('active');

    // Отключить прокрутку фона
    document.body.classList.add('no-scroll');

    if (cardId.startsWith('B')) {
        // Фильмы
        imgSrc = `film_images/Ba${cardId}.jpg`;
        txtFile = `descriptions/Des${cardId}.txt`;

        // Получаем название из глобального объекта
        if (window.movieTitlesMap && window.movieTitlesMap[cardId]) {
            title = window.movieTitlesMap[cardId];
        } else {
            title = 'Название не найдено';
        }

    } else if (cardId.startsWith('C')) {
        // Аниме
        imgSrc = `anime_images/Ca${cardId}.jpg`;
        txtFile = `descriptions/Des${cardId}.txt`;

        // Получаем название из глобального объекта
        if (window.animeTitlesMap && window.animeTitlesMap[cardId]) {
            title = window.animeTitlesMap[cardId];
        } else {
            title = 'Название не найдено';
        }

    } else {
        // Другие категории (если есть)
        imgSrc = `film_images/Aa${cardId}.jpg`;
        txtFile = `descriptions/Des${cardId}.txt`;
        title = 'Название не найдено';
    }

    const expandedImage = document.getElementById('expandedImage');
    expandedImage.src = imgSrc;

    // Устанавливаем название
    document.getElementById('expandedTitle').innerText = title;

    // Подгружаем описание
    fetch(txtFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById('filmDescription').innerText = data;
        })
        .catch(error => console.error('Error loading description:', error));

    // Загрузка дополнительных данных
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const filmData = data[cardId];
        if (filmData) {
            // Определяем класс для рейтинга
            let ratingClass = '';
            const ratingValue = parseFloat(filmData.rating);
            if (ratingValue >= 7) {
                ratingClass = 'rating-high';
            } else if (ratingValue >= 4) {
                ratingClass = 'rating-medium';
            } else {
                ratingClass = 'rating-low';
            }

            // Формируем строку с разметкой
            const infoLine = `<span class="${ratingClass}">${filmData.rating}</span>  ${filmData.year}    ${filmData.genres}    ${filmData.country}    ${filmData.duration}    ${filmData.ageRating}`;

            // Устанавливаем HTML вместо текста
            const additionalInfoElement = document.getElementById('additionalInfo');
            additionalInfoElement.innerHTML = infoLine;
        } else {
            console.warn(`No data found for cardId: ${cardId}`);
            document.getElementById('additionalInfo').innerText = '';
        }
    })
    .catch(error => console.error('Error loading additional data:', error));

    
    
    
    
    const expandedCard = document.getElementById('expandedCard');

    // Получаем позицию и размеры нажатой карточки
    const cardRect = element.getBoundingClientRect();

    // Устанавливаем начальные позиции и размеры для анимации
    expandedCard.style.top = `${cardRect.top}px`;
    expandedCard.style.left = `${cardRect.left}px`;
    expandedCard.style.width = `${cardRect.width}px`;
    expandedCard.style.height = `${cardRect.height}px`;

    // **Добавляем видимость и непрозрачность**
    expandedCard.style.visibility = 'visible';
    expandedCard.style.opacity = '1';

    // Принудительный reflow
    expandedCard.offsetHeight;

    // Добавляем класс для анимации
    expandedCard.classList.add('active');

    // Устанавливаем конечные позиции и размеры с небольшой задержкой
    setTimeout(() => {
        expandedCard.style.top = '50%';
        expandedCard.style.left = '50%';
        expandedCard.style.width = '1800px';
        expandedCard.style.height = '756px';
        expandedCard.style.transform = 'translate(-50%, -50%)';
    }, 10);
}

function closeCard() {
    const expandedCard = document.getElementById('expandedCard');

    // Проверяем, установлен ли lastClickedCard
    if (lastClickedCard) {
        // Получаем позицию и размеры последней нажатой карточки
        const cardRect = lastClickedCard.getBoundingClientRect();

        // Возвращаемся к исходным позициям и размерам для анимации
        expandedCard.style.top = `${cardRect.top}px`;
        expandedCard.style.left = `${cardRect.left}px`;
        expandedCard.style.width = `${cardRect.width}px`;
        expandedCard.style.height = `${cardRect.height}px`;
        expandedCard.style.transform = 'none';

        // Убираем активный класс после анимации
        setTimeout(() => {
            expandedCard.classList.remove('active');
            expandedCard.style.visibility = 'hidden';
            expandedCard.style.opacity = '0';
            expandedCard.style.top = '';
            expandedCard.style.left = '';
            expandedCard.style.width = '';
            expandedCard.style.height = '';
            expandedCard.style.transform = '';
            // Очистить lastClickedCard
            lastClickedCard = null;
        }, 50);
    } else {
        // Если lastClickedCard не установлен, просто скрываем карточку
        expandedCard.classList.remove('active');
        expandedCard.style.visibility = 'hidden';
        expandedCard.style.opacity = '0';
        expandedCard.style.top = '';
        expandedCard.style.left = '';
        expandedCard.style.width = '';
        expandedCard.style.height = '';
        expandedCard.style.transform = '';
    }

    // Скрыть оверлей
    var overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');

    // Включить прокрутку фона
    document.body.classList.remove('no-scroll');
}







function playMovie() {
    if (currentCardId) {
        window.location.href = 'player.html?filmId=' + currentCardId;
    } else {
        alert('Нет выбранного фильма');
    }
}
function addToCollection(button) {
    button.classList.toggle('clicked');
}