const chat_room_link_item_elements:HTMLCollection = document.getElementsByClassName('chat_room_link_item');

for(let i:number = 0; i < chat_room_link_item_elements.length; i++) {
    chat_room_link_item_elements[i].addEventListener('click', function(e) {
        const event_id:string = (<HTMLInputElement>e.currentTarget).id;
        const event_id_num:number = Number(event_id.replace(/[^0-9]+/g,""));

        console.log(event_id_num);
    });
}