// 送信ボタン
const submit_btn = document.getElementById('new_chat_submit_btn'); 
// チャットリスト
const chat_content_list = document.getElementById('chat_content_list');

// 送信ボタン押下時
submit_btn.addEventListener('click', function(e) {
    // 新しく追加されるチャット内容
    const new_chat_content_item = document.createElement('li');
    // 新しく追加されるチャットの文言
    new_chat_content_item.textContent = document.getElementById('new_chat_txt').value;

    // チャットリストにくっつける
    chat_content_list.appendChild(new_chat_content_item);
}, false);
