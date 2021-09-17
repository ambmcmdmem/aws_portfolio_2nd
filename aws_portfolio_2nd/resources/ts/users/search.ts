// コンテナ
const search_container_element:HTMLElement|null = document.getElementById('search_container');
// 検索ボタン
const user_search_btn_element:HTMLElement|null = document.getElementById('user_search_btn');

// 検索したユーザーをモーダルで返す
const return_search_user = () => {
    const xmlHttpRequest:XMLHttpRequest = new XMLHttpRequest();
    // CSRFのトークン
    const token:string = (<HTMLMetaElement>document.getElementsByName('csrf-token')[0]).content;
    // input情報
    const username_input_element:HTMLInputElement = (<HTMLInputElement>document.getElementById('username_search_input'));
    const username = username_input_element.value;

    const formData:FormData = new FormData();

    // 通信後の処理
    xmlHttpRequest.onreadystatechange = function(){
        // 通信成功時
        if(this.readyState == 4 && this.status == 200){
            // ユーザーが見つからなかった場合
            if(xmlHttpRequest.responseText === '') {
                username_input_element.classList.add('is-invalid', 'alert-danger');
                username_input_element.setAttribute('role', 'alert');
            // ユーザーが見つかった場合
            } else {
                const tmp_element_id:string = 'user_search_modal_wrap';
                const already_tmp_element:HTMLElement|null = document.getElementById(tmp_element_id);

                // 既存のモーダルは削除する
                if(already_tmp_element !== null)
                    already_tmp_element.remove();

                const tmp_element:Element = document.createElement('div');
                tmp_element.innerHTML = xmlHttpRequest.responseText;
                tmp_element.id = tmp_element_id;
                if(search_container_element !== null) {
                    search_container_element.appendChild(tmp_element);
                    const user_search_modal_element = document.getElementById('user_search_modal');
                    if(user_search_modal_element !== null)
                        $('#user_search_modal').modal();
                    else
                        alert('search_modal is none!');
                } else
                    alert('search_container is none!');
                
            }
        }
    }

    // HTTPのPOSTメソッドとアクセスする場所を指定
    xmlHttpRequest.open('POST',location.origin + '/users/search/',true);

    // トークンの指定
    if(token === null) {
        alert('token is None');
        return;
    } else {
        xmlHttpRequest.setRequestHeader('X-CSRF-TOKEN', token);
    }

    // input情報のアペンド
    formData.append('username', username_input_element.value);

    // HTTPリクエストを送信
    xmlHttpRequest.send(formData);
}


if(user_search_btn_element === null) 
    alert('user_search_btn is Null !!');
else
    user_search_btn_element.addEventListener('click', return_search_user);

