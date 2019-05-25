'use strict';
// Начинаем прослушивать страницу после загрузки DOM 
// элементов

window.addEventListener('DOMContentLoaded', () => {

            // Объявляем переменные
            let tab = document.querySelectorAll('.info-header-tab'), // Получаем кнопки табов по селекторам
                info = document.querySelector('.info-header'), //Получаем контейнер с кнопками табов
                tabContent = document.querySelectorAll('.info-tabcontent'); //Получаем табы с контентом

            function hideTabContent(a) { //Пишем функцию для сокрытия табов
                for (let i = a; i < tabContent.length; i++) { //Перебираем блоки
                    tabContent[i].classList.remove('show'); //Удаляем класс show
                    tabContent[i].classList.add('hide'); //Добавляем класс hide
                }
            }

            hideTabContent(1); //Устанавливаем первый блок для видимости

            function showTabContent(b) { //Пишем функцию для показа контента
                if (tabContent[b].classList.contains('hide')) { //Проверяем на наличие класса hide 
                    tabContent[b].classList.remove('hide'); //При наличии класса удаляем его
                    tabContent[b].classList.add('show'); //Добавляем класс show
                }
            }


            //Прослушиваем блок с классом info 
            info.addEventListener('click', (event) => {
                let target = event.target; //В переменную target присваеваем элемент на котором сработало событие
                if (target && target.classList.contains('info-header-tab')) {
                    //Проверяем имеет ли элемент на котором произошло событие 
                    //класс info-header-tab если имеет то перебираем табы
                    for (let i = 0; i < tab.length; i++) {
                        if (target == tab[i]) { //Если target равна tab n-номером
                            hideTabContent(0);
                            showTabContent(i);
                            break; //Чтоб вечно не прослушивалось выходим из функции
                        }
                    }
                }
            });

            //Timer

            let deadline = '2019-05-30';


            function addZero(num) {
                if (num <= 9) {
                    num = '0' + num;
                }
                return num;
            }

            function getTimeRemaning(endtime) {
                let t = Date.parse(endtime) - Date.parse(new Date()),
                    seconds = Math.floor((t / 1000) % 60),
                    minutes = Math.floor((t / 1000 / 60) % 60),
                    hours = Math.floor((t / (1000 * 60 * 60)));

                //hour = Math.floor((t/1000/60/60) % 24),
                //days = Math.floor((t/1000*60*60*24));

                return {
                    'total': t,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            }

            function setClock(id, endtime) {
                let timer = document.getElementById(id),
                    hours = timer.querySelector('.hours'),
                    minutes = timer.querySelector('.minutes'),
                    seconds = timer.querySelector('.seconds'),
                    timeInterval = setInterval(updateClock, 1000);

                function updateClock() {
                    let t = getTimeRemaning(endtime);
                    if (Date.parse(endtime) <= new Date()) {
                        hours.textContent = '00';
                        minutes.textContent = '00';
                        seconds.textContent = '00';
                    } else {
                        hours.textContent = addZero(t.hours);
                        minutes.textContent = addZero(t.minutes);
                        seconds.textContent = addZero(t.seconds);
                    }
                    if (total <= 0) {
                        clearInterval(timeInterval);
                    }
                }
            }

            setClock('timer', deadline);

            // Modal

            let more = document.querySelector('.more'),
                close = document.querySelector('.popup-close'),
                overlay = document.querySelector('.overlay');

            more.addEventListener('click', function () {
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            });

            close.addEventListener('click', function () {
                overlay.style.display = 'none';
                more.classList.remove('more-splash');
                document.body.style.overflow = '';
            });

            // Modal in Tabs

            let btns = document.getElementsByClassName('description-btn');
            for (let k = 0; k <= btns.length; k++) {
                btns[k].addEventListener('click', () => {
                    overlay.style.display = 'block';
                    more.classList.add('more-splash');
                    document.body.style.overflow = 'hidden';
                });
            }


            //Form

            let message = {
                loading: "Загрузка...",
                success: "Спасибо! скоро мы с вами свяжемся.",
                failure: "Что-то пошло не так!"
            };


            let form = document.getElementsByClassName('.main-form')[1],
                input = form.getElementsByTagName('input'),
                statusMessage = document.createElement('div');

            statusMessage.classList.add('status');

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                form.appendChild(statusMessage);

                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); php
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                let formData = new FormData(form);
                //request.send(formData); php

                let obj = {};
                formData.forEach(function (value, key) {
                    obj[key] = value;
                });

                let json = JSON.stringify(obj);

                request.send(json);

                request.addEventListener('readystatechange', function () {
                    if (request.readyState < 4) {
                        statusMessage.innerHTML = message.loading;
                    } else if (request.readyState === 4 && request.status == 200) {
                        statusMessage.innerHTML = message.success;
                    } else {
                        statusMessage.innerHTML = message.failure;
                    }
                });

                //e-mail form

                let eform = document.getElementsByClassName('.main-form')[0],
                    eInput = eform.getElementsByTagName('input'),
                    newStatusMessage = document.createElement('div');

                newStatusMessage.classList.add('status');


                eform.addEventListener('submit', function () {
                    event.preventDefault();
                    eform.appendChild(newStatusMessage);

                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                    let formData = new FormData(eform);

                    let obj = {};
                    formData.forEach(function (value, key) {
                        obj[key] = value;
                    });

                    let json = JSON.stringify(obj);

                    request.send(json);

                    request.addEventListener('readystatechange', function () {
                        if (request.readyState < 4) {
                            statusMessage.innerHTML = message.loading;
                        } else if (request.readyState === 4 && request.status == 200) {
                            statusMessage.innerHTML = message.success;
                        } else {
                            statusMessage.innerHTML = message.failure;
                        }
                    });

                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }

                });
            });