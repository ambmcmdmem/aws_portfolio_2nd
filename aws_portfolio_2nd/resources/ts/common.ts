// 確認メッセージの呼び出し
const confirm_alert = (form_id:string, alert_message:string='本当によろしいでしょうか？'): void => {
    const form_element:HTMLFormElement|null = <HTMLFormElement>document.getElementById(form_id);
    // 送信フォームがない
    if(form_element === null) {
        alert('form is none');
        return;
    } else {
        const result = window.confirm(alert_message);
        if(result) {
            form_element.submit();
        }
    }
}

const confirm_elements:NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('[data-confirm="1"]')

console.log(confirm_elements);

for(let i:number = 0; i < confirm_elements.length; i++) {
    const confirm_element:HTMLInputElement = confirm_elements[i];
    confirm_element.addEventListener('click', function() {
        confirm_alert('user_delete_form');
    });
}