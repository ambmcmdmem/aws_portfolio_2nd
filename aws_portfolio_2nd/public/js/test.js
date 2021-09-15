/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/ts/test.ts ***!
  \******************************/
 // チャットのリンク部分の要素たち

var chat_room_link_item_elements = document.getElementsByClassName('chat_room_link_item'); // チャットリンククリック時の関数

var chat_room_link_item_func = function chat_room_link_item_func(e) {
  // セーブ先のURLを指定
  var target = e.currentTarget;
  var event_url = target.dataset.posturl;
  submit_http_request_func(event_url); // 2回目以降はNG（仮）

  target.removeEventListener('click', chat_room_link_item_func);
};

for (var i = 0; i < chat_room_link_item_elements.length; i++) {
  // チャットのリンクをクリックすると
  chat_room_link_item_elements[i].addEventListener('click', chat_room_link_item_func);
} // xmlHttpRequestを用いて非同期処理


var submit_http_request_func = function submit_http_request_func(url) {
  var xmlHttpRequest = new XMLHttpRequest(); // CSRFのトークン

  var token = document.getElementsByName('csrf-token')[0].content;
  var formData = new FormData(); // 通信後の処理

  xmlHttpRequest.onreadystatechange = function () {
    // 通信成功時
    if (this.readyState == 4 && this.status == 200) {
      // チャットのHTMLを追加
      var tmp_element = document.createElement('div');
      var users_container_element = document.getElementById('users_container');
      tmp_element.innerHTML = xmlHttpRequest.responseText;
      users_container_element.appendChild(tmp_element); // チャット用のスクリプトを追加

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://127.0.0.1:8000/js/chat.js';
      var firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }
  }; // HTTPのPOSTメソッドとアクセスする場所を指定


  xmlHttpRequest.open('POST', url, true); // トークンの指定

  xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token); // HTTPリクエストを送信

  xmlHttpRequest.send(formData);
};
/******/ })()
;