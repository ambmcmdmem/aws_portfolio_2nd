/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/ts/test.ts ***!
  \******************************/


var chat_room_link_item_elements = document.getElementsByClassName('chat_room_link_item');

for (var i = 0; i < chat_room_link_item_elements.length; i++) {
  chat_room_link_item_elements[i].addEventListener('click', function (e) {
    var event_id = e.currentTarget.id;
    var event_id_num = Number(event_id.replace(/[^0-9]+/g, ""));
    console.log(event_id_num);
  });
}
/******/ })()
;