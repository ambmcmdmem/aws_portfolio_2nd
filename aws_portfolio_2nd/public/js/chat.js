// 送信ボタン
const submit_btn_element = document.getElementById('new_chat_submit_btn'); 
// チャットリスト
const chat_content_list_element = document.getElementById('chat_content_list');
// 入力した文字の要素
const chat_txt_element = document.getElementById('new_chat_txt');
// 選択した画像の要素
const chat_file_element = document.getElementById('new_chat_file');


// dataをHTTPRequest用に解析
const EncodeHTMLForm = (data) => {
    var params = [];
    for(var name in data){
      var value = data[name];
      var param = encodeURIComponent(name).replace(/%20/g, '+')
        + '=' + encodeURIComponent(value).replace(/%20/g, '+');
      params.push(param);
    }
    return params.join('&');
};

// 新しくチャットを追加
const add_new_chat_item = () => {
    // 新しく追加されるチャット内容
    const new_chat_content_item_element = document.createElement('li');

    // 文字の場合
    if(chat_txt_element.value) {
        new_chat_content_item_element.textContent = chat_txt_element.value;
    // 画像の場合
    } else if(chat_file_element.value) {
        const fr = new FileReader();
        const new_chat_file_element = document.createElement('img');
        new_chat_file_element.setAttribute('width', '200');
        
        fr.onload = () => {
            new_chat_file_element.setAttribute('src', fr.result);
        };
        fr.readAsDataURL(chat_file_element.files[0]);

        new_chat_content_item_element.appendChild(new_chat_file_element);
    }
    
    // チャットリストにくっつける
    chat_content_list_element.appendChild(new_chat_content_item_element);
    
};

// xmlHttpRequestを用いて非同期処理
const submit_http_request_func = () => {
    const xmlHttpRequest = new XMLHttpRequest();
    // CSRFのトークン
    const token = document.getElementsByName('csrf-token')[0].content;
    const formData = new FormData();

    // 文字の場合
    if(chat_txt_element.value) {
        formData.append('body', chat_txt_element.value);
    // 画像の場合
    } else if(chat_file_element.value) {
        const fileData = chat_file_element.files[0];
        formData.append('post_image', fileData);
    }

    // 通信後の処理
    xmlHttpRequest.onreadystatechange = function(){
        // 通信成功時
        if(this.readyState == 4 && this.status == 200){
            // チャット追加の処理
            add_new_chat_item();
        }
    }

    // HTTPのPOSTメソッドとアクセスする場所を指定
    xmlHttpRequest.open('POST',location.href,true);

    // トークンの指定
    xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token);

    // HTTPリクエストを送信
    xmlHttpRequest.send(formData);
};


// 送信ボタン押下時
submit_btn_element.addEventListener('click', () => {
    if(chat_txt_element.value || chat_file_element.value) {
        submit_http_request_func();
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