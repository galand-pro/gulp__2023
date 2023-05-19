import * as flsFunctions from "./modules/functions.js";
import './_vendor.js';
import vars from './_vars.js';
import './_functions.js';
import './_components.js';


flsFunctions.isWebp();

// Перевод в sticky
//window.addEventListener("scroll", function () {
//    var header = document.querySelector("header");
//    header.classList.toggle("sticky", window.scrollY > 0);
//})


// FORM PHP Mailer//
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert("Ошибка");
                form.classList.remove('_sending');
            }

        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Функция теста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    //Получаем input dile в переменную 
    const formImage = document.getElementById('formImage');
    //Получаем картинку для превью в переменную
    const formPreview = document.getElementById('formPreview');

    //Прослушиваем изменения в input file
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        // проверяем тип файла
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Прикрепить можно только изображения');
            formImage.value = '';
            return;
        }
        // проверяем размер файла (<2mb)
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2 МБ');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }
});

// END-FORM //

// YANDEX MAP //
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.761396, 37.552669],
        zoom: 17
    }, {
        searchControlProvider: 'yandex#search'
    }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Группа компаний велес',
            balloonContent: '<b>ГРУППА КОМПАНИЙ ВЕЛЕС</b><br>2-я Звенигородская ул., 13 стр. 41<br><b>ТЕЛЕФОНЫ:</b><br>+7 (495) 018-22-13<br><b>ВРЕМЯ РАБОТЫ:</b><br>Понедельник-пятница : 09:00 - 18:00<br>Суббота-воскресенье : выходной'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-logo.png',
            // Размеры метки.
            iconImageSize: [42, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-20, -70]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.761396, 37.552669], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/ball.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPlacemark)
    // .add(myPlacemarkWithContent);
});
// END YANDEX MAP //