// チャット部分


// チャットのリンク部分の要素たち
const chat_room_link_item_elements:HTMLCollection = document.getElementsByClassName('chat_room_link_item');

// クリックイベント（チャットの表示）の許可を割り当て
const chat_room_event_allocate = (target:HTMLInputElement|null) => {
    for(let i:number = 0; i < chat_room_link_item_elements.length; i++) {
        chat_room_link_item_elements[i].addEventListener('click', chat_room_link_item_func);
    }
    // 現在表示させているものはクリックイベント削除
    if(target !== null) 
        target.removeEventListener('click', chat_room_link_item_func);    
}

// チャットリンククリック時の関数
const chat_room_link_item_func = (e:Event) => {
    
    if(e.currentTarget === null) {
        alert('event is none!');
        return;
    }
    
    // セーブ先のURLを指定
    const target:HTMLInputElement = <HTMLInputElement>e.currentTarget;
    
    if(target.dataset.posturl !== undefined) {
        const event_url:string = target.dataset.posturl;
        event_request_func(event_url);

        // 現在表示させているルームのリンクのクリックイベントをremove
        chat_room_event_allocate(target);
    } else
        alert('event_url is undefined!');
}

// クリックイベント付加
chat_room_event_allocate(null);

// xmlHttpRequestを用いて非同期処理
const event_request_func = (url:string) => {
    const xmlHttpRequest:XMLHttpRequest = new XMLHttpRequest();
    // CSRFのトークン
    const token:string = (<HTMLMetaElement>document.getElementsByName('csrf-token')[0]).content;
    if(token === null) {
        alert('token is None');
        return;
    }

    const formData:FormData = new FormData();

    // 通信後の処理
    xmlHttpRequest.onreadystatechange = function(){
        // 通信成功時
        if(this.readyState == 4 && this.status == 200){
            // チャットのHTMLを追加
            const chat_content_container_element:Element|null = document.getElementById('chat_content_container');

            // すでにチャットルームのHTMLがあればそれを削除
            if(chat_content_container_element) 
                chat_content_container_element.remove();

            const tmp_element:Element = document.createElement('div');
            tmp_element.id = 'chat_content_container';
            const users_container_element:HTMLElement = (<HTMLMetaElement>document.getElementById('users_container'));
            tmp_element.innerHTML = xmlHttpRequest.responseText;            
            users_container_element.appendChild(tmp_element);

            // 通知の削除
            const chat_content_list_element:HTMLElement = (<HTMLElement>document.getElementById('chat_content_list'));
            const chat_room_id:number = Number(chat_content_list_element.dataset.roomid);
            const chat_notification_element:HTMLElement|null = document.getElementById('chat_notification_' + chat_room_id);
            console.log(chat_notification_element);
            // 通知あれば消す
            if(chat_notification_element !== null)
                chat_notification_element.remove();

            // チャット用のスクリプトを追加
            const script = document.createElement( 'script' );
            script.type = 'text/javascript';
            script.src = location.origin + '/js/chatRoom.js';
            // 読み込んでいるスクリプトの前にインサートするよ
            const firstScript = document.getElementsByTagName( 'script' )[ 0 ];
            if(firstScript.parentNode !== null)
                firstScript.parentNode.insertBefore( script, firstScript );
            else
                alert('script is none!');
        }
    }

    // HTTPのPOSTメソッドとアクセスする場所を指定
    xmlHttpRequest.open('POST',url,true);

    // トークンの指定
    xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token);

    // HTTPリクエストを送信
    xmlHttpRequest.send(formData);
};