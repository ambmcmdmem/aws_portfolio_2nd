
// チャットのリンク部分の要素たち
const chat_room_link_item_elements:HTMLCollection = document.getElementsByClassName('chat_room_link_item');

// チャットリンククリック時の関数
const chat_room_link_item_func = (e:Event) => {
    // セーブ先のURLを指定
    const target:HTMLInputElement = (<HTMLInputElement>e.currentTarget);
    const event_url:string = target.dataset.posturl!;
    submit_http_request_func(event_url);

    // 2回目以降はNG（仮）
    target.removeEventListener('click', chat_room_link_item_func);
}

for(let i:number = 0; i < chat_room_link_item_elements.length; i++) {
    // チャットのリンクをクリックすると
    chat_room_link_item_elements[i].addEventListener('click', chat_room_link_item_func);
}

// xmlHttpRequestを用いて非同期処理
const submit_http_request_func = (url:string) => {
    const xmlHttpRequest:XMLHttpRequest = new XMLHttpRequest();
    // CSRFのトークン
    const token:string = (<HTMLMetaElement>document.getElementsByName('csrf-token')[0]).content;
    const formData:FormData = new FormData();

    // 通信後の処理
    xmlHttpRequest.onreadystatechange = function(){
        // 通信成功時
        if(this.readyState == 4 && this.status == 200){
            // チャットのHTMLを追加
            const tmp_element:Element = document.createElement('div');
            const users_container_element:HTMLElement = (<HTMLMetaElement>document.getElementById('users_container'));
            tmp_element.innerHTML = xmlHttpRequest.responseText;
            users_container_element.appendChild(tmp_element);

            // チャット用のスクリプトを追加
            const script = document.createElement( 'script' );

            script.type = 'text/javascript';
            script.src = 'http://127.0.0.1:8000/js/chat.js';

            const firstScript = document.getElementsByTagName( 'script' )[ 0 ];
            (<Document>firstScript.parentNode).insertBefore( script, firstScript );
        }
    }

    // HTTPのPOSTメソッドとアクセスする場所を指定
    xmlHttpRequest.open('POST',url,true);

    // トークンの指定
    xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token);

    // HTTPリクエストを送信
    xmlHttpRequest.send(formData);
};