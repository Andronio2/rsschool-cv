import i18Obj from './translate.js';

console.log(`
1. Смена изображений в секции portfolio +25
\tпри кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
\tкнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
2. Перевод страницы на два языка +25
\tпри клике по надписи ru англоязычная страница переводится на русский язык +10
\tпри клике по надписи en русскоязычная страница переводится на английский язык +10
\tнадписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
3. Переключение светлой и тёмной темы +25
\tНа страницу добавлен переключатель при клике по которому:
\tтёмная тема приложения сменяется светлой +10
\tсветлая тема приложения сменяется тёмной +10
\tпосле смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
5. Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5
\tДля получения максимального балла за пункт требований достаточно добавить кнопкам только один эффект

`);

// Открытие меню
document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.header').classList.toggle('open');
})

// Закрытие меню при клике
document.querySelector('.nav').addEventListener('click', (ev) => {
    if (ev.target.tagName === 'A') {
        document.querySelector('.header').classList.remove('open');
    }
})

// Переключение портфолио
document.querySelector('.portfolio-btn').addEventListener('click', (ev) => {
    if (ev.target.tagName === 'BUTTON') {
        const data = ev.target.dataset.weather;
        document.querySelectorAll('.profolio-btn-item').forEach( el => el.classList.remove('profolio-btn-active'));
        ev.target.classList.add("profolio-btn-active");
        document.querySelectorAll(".portfolio-item-img img").forEach( (el, idx) => el.src = `./assets/img/${data}/${idx + 1}.jpg`);
    }
})

// Кэширование картинок
function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach( el => {
        for (let i = 1; i <= 6; i++) {
          const img = new Image();
          img.src = `./assets/img/${el}/${i}.jpg`;
        }
    })
}
preloadImages();

// Переключение языков, сохранение в localStorage
document.querySelector('.lang').addEventListener('click', e => {
    if (e.target.classList.contains('lang-sw')) {
        document.querySelectorAll('.lang-sw').forEach( el => el.classList.toggle('lang-active'));
        switchLang(e.target.textContent);
        localStorage.setItem('lang', e.target.textContent);
    }
})

function switchLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach( el => {
        el.textContent = i18Obj[lang][el.dataset.i18n];
    })
}

// Сохранение темыв localStorage
document.querySelector('.dark-wrapper').addEventListener('click', () => {
    const theme = document.getElementById('dark');
    document.body.style.backgroundColor = theme.checked ? '#000' : '#fff';
    localStorage.setItem('theme', !theme.checked);
})

// Восстановление при загрузке
function getLocalStorage() {
    const lang = localStorage.getItem('lang');
    if (lang) {
        switchLang(lang);
        if (lang === 'ru') {
            document.querySelectorAll('.lang-sw').forEach( el => el.classList.toggle('lang-active'));
        }
    }
    let theme = localStorage.getItem('theme')
    if (theme) {
        theme = theme === 'true';
        document.getElementById('dark').checked = theme;
        document.body.style.backgroundColor = theme ?  '#fff' : '#000';
    }
}
window.addEventListener('load', getLocalStorage)