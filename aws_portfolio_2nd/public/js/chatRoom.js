/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./resources/ts/chatRoom.ts ***!
  \**********************************/
 // 送信ボタン

var submit_btn_element = document.getElementById('new_chat_submit_btn'); // チャットリスト

var chat_content_list_element = document.getElementById('chat_content_list'); // 入力した文字の要素

var chat_txt_element = document.getElementById('new_chat_txt'); // 選択した画像の要素

var chat_file_element = document.getElementById('new_chat_file'); // 新しくチャットを追加

var add_new_chat_item = function add_new_chat_item() {
  // 新しく追加されるチャット内容
  var new_chat_content_item_element = document.createElement('li');
  var chat_file_list = chat_file_element.files; // 文字の場合

  if (chat_txt_element.value) {
    new_chat_content_item_element.textContent = chat_txt_element.value; // 画像の場合
  } else if (chat_file_list) {
    var fr = new FileReader();
    var new_chat_file_element = document.createElement('img');
    new_chat_file_element.setAttribute('width', '200');

    fr.onload = function () {
      if (typeof fr.result === 'string') new_chat_file_element.setAttribute('src', fr.result);
    };

    fr.readAsDataURL(chat_file_list[0]);
    new_chat_content_item_element.appendChild(new_chat_file_element);
  } // チャットリストにくっつける


  chat_content_list_element.appendChild(new_chat_content_item_element);
}; // xmlHttpRequestを用いて非同期処理


var submit_http_request_func = function submit_http_request_func(save_url) {
  var xmlHttpRequest = new XMLHttpRequest(); // CSRFのトークン

  var token = document.getElementsByName('csrf-token')[0].content;
  var formData = new FormData();
  var chat_file_list = chat_file_element.files; // 文字の場合

  if (chat_txt_element.value) {
    formData.append('body', chat_txt_element.value); // 画像の場合
  } else if (chat_file_element.value) {
    var fileData = chat_file_list[0];
    formData.append('post_image', fileData);
  } // 通信後の処理


  xmlHttpRequest.onreadystatechange = function () {
    // 通信成功時
    if (this.readyState == 4 && this.status == 200) {
      // チャット追加の処理
      add_new_chat_item();
    }
  }; // HTTPのPOSTメソッドとアクセスする場所を指定


  xmlHttpRequest.open('POST', save_url, true); // トークンの指定

  xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token); // HTTPリクエストを送信

  xmlHttpRequest.send(formData);
};

console.log('test'); // 送信ボタン押下時

submit_btn_element.addEventListener('click', function () {
  if (chat_txt_element.value || chat_file_element.value) {
    var save_url = submit_btn_element.dataset.saveurl;
    submit_http_request_func(save_url);
  }
}, false);
/*
|--------------------------------------------------------------------------
| ここからjQuery(Ajax)での処理
|--------------------------------------------------------------------------
|
*/
// // 送信ボタン押下時
// submit_btn_element.addEventListener('click', () => {
//     console.log(chat_file_element.files[0]);
//     FileUpload(chat_file_element.files[0]);
// }, false);
// // ファイルアップロード
// function FileUpload(f) {
//     console.log('uuuu');
//     var formData = new FormData();
//     formData.append('post_image', f);
//     console.log(formData);
//     $.ajax({
//         type: 'POST',
//         dataType : "text",
//         contentType: false,
//         processData: false,
//         url: location.href,//ここを変更
//         data: formData,
//         headers: {
//             'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].content
//         }
//     }).done(function(json) {
//         add_new_chat_item();
//     }).fail(function(jqXHR, textStatus, errorThrown) {
//     });
// }

/**
 * Ajaxの処理ここまで
 */
/******/ })()
;