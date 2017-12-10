'use strict';
/*
начало данных для задания
 */

// аватары пользователей
var AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png'
];

// заголовки объявлений
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

// используем для: type - тип дома
var typeHouse = [
  'flat',
  'house',
  'bungalo'
];

// используем для: checkin, checkout - время 12:00, 13:00 или 14:00
var numCheckin = [
  '12:00',
  '13:00',
  '14:00'
];

// количество комнат в доме
var numRooms = [1, 2, 3, 4, 5];

// удобства дома
var differentFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

/*
конец данных для задания
 */

// используем для: features - случайное количество чего-либо
var randomNumberArray = function (array) {
  var randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
};

// используем для: price, guests - случайное число от min до max
var randomNumber = function (min, max) {
  var num = Math.random() * (max - min) + min;
  return num.toFixed(0);
};

// пустой массив
var emptyArray = [];

// функция добавления новых изображений в массив
var imageAVATARS = [];
var pushImage = function (array) {
  for (var i = 0; i < array.length; i++) {
    var pushed = imageAVATARS.push(array[i]);
  }
  return pushed;
};
pushImage(AVATARS);

// сортируем массив случайным образом
var compareRandom = function () {
  return Math.random() - 0.5;
};

var featuresRandom = differentFeatures.sort(compareRandom).splice(randomNumber(0, 3), randomNumber(3, 5));

// 2 задание - создание массива из 8 сгенерированных JS - объектов
for (var j = 0; j < 7; j++) {
  var data = {
    'author': {
      'avatar': imageAVATARS
    },
    'offer': {
      'title': TITLES[j],
      'address': location.x + ' ' + location.y,
      'price': randomNumber(1000, 1000000),
      'type': randomNumberArray(typeHouse),
      'rooms': randomNumberArray(numRooms),
      'guests': randomNumber(1, 15),
      'checkin': randomNumberArray(numCheckin),
      'checkout': randomNumberArray(numCheckin),
      'features': featuresRandom,
      'description': '',
      'photos': emptyArray
    },
    'location': {
      'x': randomNumber(300, 900),
      'y': randomNumber(100, 500)
    }
  };
}

/*
начало заполнения блока DOM элементами на основе JS-объектов
*/

var blockMap = document.querySelector('.map'); // поиск селектора
blockMap.classList.remove('.map--faded'); // через classList удаляем класс map--faded

// 3 задание - генерируем метки на карте
var generatePins = function (pin) {
  return '<button style="left:' + (pin.location.x - 20) + 'px; top: ' + (pin.location.y - 40) + 'px;" class="map__pin">' +
    '<img src="' + pin.author.avatar + '" width="40" height="40" draggable="false"></button>';
};

// 4 задание - отрисовка сгенерированных DOM-элементов в блок ".map__pins"
var pinsContainer = document.querySelector('.map-pins');
for (var q = 0; q < data.length; q++) {
  pinsContainer.insertAdjacentHTML('beforeEnd', generatePins(data[q]));
}

// 5 здание - генерируем объявление
// находим содержимое шаблона template
var copyTemplate = document.querySelector('.article').content;
var fragmentCard = document.createDocumentFragment();

var generatePoster = function (card) {
  var cardElement = copyTemplate.cloneNode(true); // копируем содержимое шаблона template

  // заголовок объвления
  cardElement.querySelector('h3').textContent = card.offer.title;

  // вывод адреса
  cardElement.querySelector('p small').textContent = card.offer.address;

  // цена / innerHTML - вставляет весь текстовый блок
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + '&#x20bd;/ночь';

  // тип жилья
  if (card.offer.type === 'flat') {
    cardElement.querySelector('h4').textContent = 'Квартира';
  } else if (card.offer.type === 'bungalo') {
    cardElement.querySelector('h4').textContent = 'Бунгало';
  } else {
    cardElement.querySelector('h4').textContent = 'Дом';
  }

  // количество гостей
  cardElement.querySelector('h4 + p').innerHTML = card.offer.rooms +
    ' комнаты для ' + card.offer.guests + ' гостей';

  // время заезда и выезда / :nth-child() - находит номер потомка
  cardElement.querySelector('p:nth-child(7)').innerHTML = 'Заезд после '
    + card.offer.checkin + ', выезд до '
    + card.offer.checkout;

  // доступные удобства в квартире
  for (var i = 0; i < featuresRandom.length; i++) {
    var nodes = '<li class="feature feature--"' + featuresRandom[i] + '></li>';
    cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeEnd', nodes);
  }
  // описание объекта недвижимости
  cardElement.querySelector('ul + p').innerHTML = card.offer.description;

  // замена аватарки пользователя
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

for (var b = 0; b < data.length; b++) {
  fragmentCard.appendChild(generatePoster(data[b]));
}

// вставка полученного DOM-элемента в блок
blockMap.insertBefore(fragmentCard, document.querySelector('.map__filters-container'));

/*
конец заполнения блока DOM элементами на основе JS-объектов
*/
