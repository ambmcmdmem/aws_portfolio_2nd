// 送信ボタン
const submit_btn_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('new_chat_submit_btn')); 
// チャットリスト
const chat_content_list_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('chat_content_list'));
// 入力した文字の要素
const chat_txt_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('new_chat_txt'));
// 選択した画像の要素
const chat_file_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('new_chat_file'));

// 新しくチャットを追加
const add_new_chat_item = () => {
    // 新しく追加されるチャット内容
    const new_chat_content_item_element:HTMLElement = (<HTMLElement>document.createElement('li'));
    const chat_file_list:FileList = <FileList>chat_file_element.files;

    // 文字の場合
    if(chat_txt_element.value) {
        new_chat_content_item_element.textContent = chat_txt_element.value;
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
const submit_http_request_func = (save_url:string) => {
    const xmlHttpRequest = new XMLHttpRequest();
    // CSRFのトークン
    const token:string = (<HTMLMetaElement>document.getElementsByName('csrf-token')[0]).content;
    const formData = new FormData();
    const chat_file_list:FileList = <FileList>chat_file_element.files;

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
        }
    }

    // HTTPのPOSTメソッドとアクセスする場所を指定
    xmlHttpRequest.open('POST',save_url,true);

    // トークンの指定
    xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token);

    // HTTPリクエストを送信
    xmlHttpRequest.send(formData);
};

console.log('test');
// 送信ボタン押下時
submit_btn_element.addEventListener('click', () => {
    if(chat_txt_element.value || chat_file_element.value) {
        const save_url:string = submit_btn_element.dataset.saveurl!;
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