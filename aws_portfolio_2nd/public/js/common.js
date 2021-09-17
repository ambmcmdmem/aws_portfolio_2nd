/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/ts/common.ts ***!
  \********************************/
 // 確認メッセージの呼び出し

var confirm_alert = function confirm_alert(form_id) {
  var alert_message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '本当によろしいでしょうか？';
  var form_element = document.getElementById(form_id); // 送信フォームがない

  if (form_element === null) {
    alert('form is none');
    return;
  } else {
    var result = window.confirm(alert_message);

    if (result) {
      form_element.submit();
    }
  }
};

var confirm_elements = document.querySelectorAll('[data-confirm="1"]');
console.log(confirm_elements);

for (var i = 0; i < confirm_elements.length; i++) {
  var confirm_element = confirm_elements[i];
  confirm_element.addEventListener('click', function () {
    confirm_alert('user_delete_form');
  });
}
/******/ })()
;