// チャット開いた後の処理を主に記載

// 送信ボタン
const submit_btn_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('new_chat_submit_btn')); 
// チャットリスト
const chat_content_list_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('chat_content_list'));
// 入力した文字の要素
const chat_txt_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('new_chat_txt'));
// 選択した画像の要素
const chat_file_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('new_chat_file'));

// 日時用
// 現在の日時を返す
const returnDate = (now:Date):string => {
    const Year:string = String(now.getFullYear());
    // 0埋めするため
    const Month:string = ("0" + String(now.getMonth()+1)).slice(-2);
    const Date:string =  ("0" + String(now.getDate())).slice(-2);
    const Hour:string =  ("0" + String(now.getHours())).slice(-2);
    const Min:string =  ("0" + String(now.getMinutes())).slice(-2);
    // なぜか1秒ずれるため-1する <- なし
    const Sec:string =  ("0" + String(now.getSeconds())).slice(-2);

    return Year + '-' + Month + '-' + Date + ' ' + Hour + ':' + Min + ':' + Sec;
}


// 新しくチャットを追加
const add_new_chat_item = () => {
    // 新しく追加されるチャット内容
    const new_chat_content_item_element:HTMLElement = (<HTMLElement>document.createElement('li'));
    new_chat_content_item_element.classList.add('my_chat_content');

    // 投稿時間
    const new_chat_time_element:HTMLElement = (<HTMLElement>document.createElement('time'));


    new_chat_time_element.textContent = returnDate(new Date());
    new_chat_time_element.classList.add('d-block');
    new_chat_content_item_element.appendChild(new_chat_time_element);


    const chat_file_list:FileList = <FileList>chat_file_element.files;

    // 文字の場合
    if(chat_txt_element.value) {
        const new_chat_txt_element:HTMLElement = (<HTMLElement>document.createElement('p'));
        new_chat_txt_element.textContent = chat_txt_element.value;
        new_chat_content_item_element.appendChild(new_chat_txt_element);
    // 画像の場合
    } else if(chat_file_list) {
        const fr:FileReader = new FileReader();
        const new_chat_file_element:HTMLElement = (<HTMLElement>document.createElement('img'));
        new_chat_file_element.setAttribute('width', '200');
        
        fr.onload = () => {
            if(typeof fr.result === 'string')
                new_chat_file_element.setAttribute('src', fr.result);
        };
        fr.readAsDataURL(chat_file_list[0]);

        new_chat_content_item_element.appendChild(new_chat_file_element);
    }
    
    // チャットリストにくっつける
    chat_content_list_element.appendChild(new_chat_content_item_element);
    
};

// xmlHttpRequestを用いて非同期処理
// const submit_http_request_func = (save_url:string) => {
const submit_http_request_func = () => {
    const xmlHttpRequest = new XMLHttpRequest();
    // CSRFのトークン
    const token:string = (<HTMLMetaElement>document.getElementsByName('csrf-token')[0]).content;
    const formData = new FormData();
    const chat_file_list:FileList = <FileList>chat_file_element.files;

    // チャットルームのIDを付加
    if(typeof chat_content_list_element.dataset.roomid === 'string')
        formData.append('chat_room_id', chat_content_list_element.dataset.roomid);

    console.log(String(chat_content_list_element.dataset.roomid));
    
    // 文字の場合
    if(chat_txt_element.value) {
        formData.append('body', chat_txt_element.value);
    // 画像の場合
    } else if(chat_file_element.value) {
        const fileData = chat_file_list[0];
        formData.append('post_image', fileData);
    }

    // 通信後の処理
    xmlHttpRequest.onreadystatechange = function(){
        // 通信成功時
        if(this.readyState == 4 && this.status == 200){
            // チャット追加の処理
            add_new_chat_item();
            console.log(xmlHttpRequest.responseText);
        }
    }

    // HTTPのPOSTメソッドとアクセスする場所を指定
    xmlHttpRequest.open('POST', location.origin + '/chatcontents/create/', true);

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