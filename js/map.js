"use strict";

/*
начало данных для задания
 */

// аватары пользователей
var AVATARS = [
  "img/avatars/user01.png",
  "img/avatars/user02.png",
  "img/avatars/user03.png",
  "img/avatars/user04.png",
  "img/avatars/user05.png",
  "img/avatars/user06.png",
  "img/avatars/user07.png"
];

// заголовки объявлений
var TITLES = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

// используем для: type - тип дома
var typeHouse = [
  "flat",
  "house",
  "bungalo"
];

// используем для: checkin, checkout - время 12:00, 13:00 или 14:00
var numCheckin = [
  "12:00",
  "13:00",
  "14:00"
];

// количество комнат в доме
var numRooms = [1, 2, 3, 4, 5];

// удобства дома
var differentFeatures = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];

/*
конец данных для задания
 */

// используем для: features - случайное количество чего-либо
var randomNumberArray = function (array) {
  var randomNumber = Math.floor(Math.random() * numRooms.length);
  return numRooms[randomNumber];
}

// используем для: price, guests - случайное число от min до max
var randomNumber = function (min, max) {
  var num = Math.random() * (max - min) + min;
  return num.toFixed(0);
}

// пустой массив
var emptyArray = [

];

// добавление аватаров в массив
var image = [];
var enterImage = function () {
  for (var i = 0; i < AVATARS[i]; i++) {
    var pushed = image.push(AVATARS[i])
  }
}

for (var i = 0; i < 7; i++) {
var dataOccupant = [
  author: {
  avatar: image[i],
},

offer: {
  title: TITLES[i],
  address: location.x + " " + location.y,
  price: randomNumber(1000, 1000000),
  type: randomNumberArray(typeHouse),
  rooms: randomNumberArray(numRooms),
  guests: randomNumber(1, 15),
  checkin: randomNumberArray(numCheckin),
  checkout: randomNumberArray(numCheckin),
  features: randomNumberArray(differentFeatures),
  description: "",
  photos: emptyArray
},

// случайная координата на карте
location: {
  x: randomNumber(300, 900),
  y: randomNumber(100, 500)
  }
];
}

/*
начало заполнения блока DOM элементами на основе JS-объектов
*/

var blockMap = document.querySelector(".map"); // поиск селектора
blockMap.classList.remove(".map--faded"); // через classList удаляем класс map--faded

var pinsContainer = document.querySelector(".map-pins");

// копируем содержимое шаблона template
var copyTemplate = document.querySelector(".map__card popup").content;
var cardElement = copyTemplate.cloneNode(true);

// вставка полученного DOM элемента в блок
var elementMapCard = document.querySelector(".map");

// генерируем метки на карте
var generatePins = function (pin) {
  var elementPin =
  <button style=
	"left: "" + (pin.location.x - 20)"" + px;
	top: "" + (pin.location.y - 40)"" + px;
	class="map__pin"><img src=""img/avatars/user01.png""
	width="40" height="40" draggable="false">
  </button>";
  return elementPin;
};

// генерируем объявление
var generatePoster = function (dataOccupant) {

  // заголовок объвления
  cardElement.querySelector("h3").textContent = dataOccupant.offer.title;

  // вывод адреса
  cardElement.querySelector("p small").textContent = dataOccupant.offer.address;

  // цена / innerHTML - вставляет весь текстовый блок
  cardElement.querySelector(".popup__price").innerHTML = dataOccupant.offer.price + "&#x20bd;/ночь";

  // тип жилья
  if (dataOccupant.offer.type === "flat") {
    cardElement.querySelector("h4").textContent = "Квартира";
  } else if (dataOccupant.offer.type === "bungalo") {
    cardElement.querySelector("h4").textContent = "Бунгало";
  } else {
    cardElement.querySelector("h4").textContent = "Дом";
  }

  // количество гостей
  cardElement.querySelector("h4 + p").innerHTML = dataOccupant.offer.rooms +
    " комнаты для " + dataOccupant.offer.guests + " гостей";

  // время заезда и выезда / :nth-child() - находит номер потомка
  cardElement.querySelector("p:nth-child(8)").innerHTML = "Заезд после "
    + dataOccupant.offer.checkin + ", выезд до "
    + dataOccupant.offer.checkout;

  // доступные удобства в квартире
  /*В список .popup__features выведите все доступные удобства в квартире из массива {{offer.features}}
  пустыми элементами списка (<li>) с классом feature feature--{{название удобства}}*/
  for (var i = 0; i < differentFeatures.length; i++) {
  var nodes = "<li class = "feature feature--" + randomNumberArray(differentFeatures) + ""></li>";

  cardElement.querySelector(".popup__features").insertAdjacentHTML("beforeend", nodes);
  }

  cardElement.querySelector("ul + p").innerHTML = dataOccupant.offer.descriptions;

  return cardElement;
};

var fragment = document.createDocumentFragment(); // контейнер, временная группировка элементов в document
                                                // после вставки элементов, контейнер createDocumentFragment удаляется
// заполнение DOM через js объекты
for (var i = 0; i < dataOccupant.length; i++) {
  fragment.appendChild(generatePoster(dataOccupant[i]));
}

/*
конец заполнения блока DOM элементами на основе JS-объектов
*/
