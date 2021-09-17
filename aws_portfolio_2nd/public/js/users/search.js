/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./resources/ts/users/search.ts ***!
  \**************************************/
 // コンテナ

var search_container_element = document.getElementById('search_container'); // 検索ボタン

var user_search_btn_element = document.getElementById('user_search_btn'); // 検索したユーザーをモーダルで返す

var return_search_user = function return_search_user() {
  var xmlHttpRequest = new XMLHttpRequest(); // CSRFのトークン

  var token = document.getElementsByName('csrf-token')[0].content; // input情報

  var username_input_element = document.getElementById('username_search_input');
  var username = username_input_element.value;
  var formData = new FormData(); // 通信後の処理

  xmlHttpRequest.onreadystatechange = function () {
    // 通信成功時
    if (this.readyState == 4 && this.status == 200) {
      // ユーザーが見つからなかった場合
      if (xmlHttpRequest.responseText === '') {
        username_input_element.classList.add('is-invalid', 'alert-danger');
        username_input_element.setAttribute('role', 'alert'); // ユーザーが見つかった場合
      } else {
        var tmp_element_id = 'user_search_modal_wrap';
        var already_tmp_element = document.getElementById(tmp_element_id); // 既存のモーダルは削除する

        if (already_tmp_element !== null) already_tmp_element.remove();
        var tmp_element = document.createElement('div');
        tmp_element.innerHTML = xmlHttpRequest.responseText;
        tmp_element.id = tmp_element_id;

        if (search_container_element !== null) {
          search_container_element.appendChild(tmp_element);
          var user_search_modal_element = document.getElementById('user_search_modal');
          if (user_search_modal_element !== null) $('#user_search_modal').modal();else alert('search_modal is none!');
        } else alert('search_container is none!');
      }
    }
  }; // HTTPのPOSTメソッドとアクセスする場所を指定


  xmlHttpRequest.open('POST', location.origin + '/users/search/', true); // トークンの指定

  if (token === null) {
    alert('token is None');
    return;
  } else {
    xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token);
  } // input情報のアペンド


  formData.append('username', username_input_element.value); // HTTPリクエストを送信

  xmlHttpRequest.send(formData);
};

if (user_search_btn_element === null) alert('user_search_btn is Null !!');else user_search_btn_element.addEventListener('click', return_search_user);
/******/ })()
;