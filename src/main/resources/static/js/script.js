// script.js

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        carousel.addEventListener('wheel', (event) => {
            event.preventDefault();
            carousel.scrollBy({
                left: event.deltaY < 0 ? -300 : 300,
                behavior: 'smooth'
            });
        });
    });

    const logo = document.getElementById('logo');
    logo.addEventListener('click', () => {
        console.log('Логотип был нажат'); // Для отладки
        location.reload();
    });

    const searchInput = document.getElementById('search-input');
    const aiToggleButton = document.getElementById('ai-toggle-button');
    let isAiMode = false;

    aiToggleButton.addEventListener('click', () => {
        isAiMode = !isAiMode;
        searchInput.value = ''; // Очистка поля ввода
        if (isAiMode) {
            console.log('Режим ИИ активирован');
            searchInput.placeholder = 'Search anything with AI';
        } else {
            console.log('Обычный режим активирован');
            searchInput.placeholder = 'Search anything';
        }
    });

    // Переключение между вкладками
    const tabs = {
        movies: document.getElementById('tab-movies'),
        anime: document.getElementById('tab-anime'),
        forum: document.getElementById('tab-forum')
    };

    const sections = {
        movies: document.getElementById('section-movies'),
        anime: document.getElementById('section-anime'),
        forum: document.getElementById('section-forum')
    };

    const recommendations = {
        movies: document.getElementById('movies-recommendations'),
        anime: document.getElementById('anime-recommendations')
    };

    // Обработчики для переключения вкладок
    tabs.movies.addEventListener('click', () => {
        switchTab('movies');
    });

    tabs.anime.addEventListener('click', () => {
        switchTab('anime');
    });

    tabs.forum.addEventListener('click', () => {
        switchTab('forum');
    });

    function switchTab(tab) {
        // Сброс всех секций
        Object.values(sections).forEach(section => section.classList.remove('active'));
        Object.values(tabs).forEach(tabElement => tabElement.classList.remove('active'));
        Object.values(recommendations).forEach(rec => rec.classList.remove('active'));

        // Активация нужной секции и таба
        sections[tab].classList.add('active');
        tabs[tab].classList.add('active');

        // Отображение рекомендаций только для фильмов или аниме
        if (tab === 'movies') {
            recommendations.movies.classList.add('active');
        } else if (tab === 'anime') {
            recommendations.anime.classList.add('active');
        }
    }

    // Инициализация отображения
    switchTab('movies');

    // Глобальные объекты для хранения названий с привязкой к cardId
    window.movieTitlesMap = {};
    window.animeTitlesMap = {};

    // Загрузка названий фильмов из текстового файла
    fetch("film_images/titles.txt")
        .then(response => response.text())
        .then(text => {
            const titles = text.trim().split('\n'); // Разделяем по строкам

            const cards = recommendations.movies.querySelectorAll('.film-card');
            cards.forEach((card, index) => {
                const cardId = card.getAttribute('data-film-id');
                const titleElement = card.querySelector('.film-title');
                if (titles[index]) {
                    const title = titles[index].trim();
                    titleElement.textContent = title; // Устанавливаем название в карточке
                    window.movieTitlesMap[cardId] = title; // Сохраняем в глобальный объект
                }
            });
        })
        .catch(error => console.error('Error loading movie titles:', error));

    // Загрузка названий аниме из текстового файла
    fetch("anime_images/titles.txt")
        .then(response => response.text())
        .then(text => {
            const titles = text.trim().split('\n'); // Разделяем по строкам

            const cards = recommendations.anime.querySelectorAll('.film-card');
            cards.forEach((card, index) => {
                const cardId = card.getAttribute('data-film-id');
                const titleElement = card.querySelector('.anime-title');
                if (titles[index]) {
                    const title = titles[index].trim();
                    titleElement.textContent = title; // Устанавливаем название в карточке
                    window.animeTitlesMap[cardId] = title; // Сохраняем в глобальный объект
                }
            });
        })
        .catch(error => console.error('Error loading anime titles:', error));
});
