import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ChatReact extends Component {
    render() {
        return (
            <div>ChatReact</div>
        );
    }
}

ReactDOM.render(<ChatReact />, document.getElementById('chat_app_container'));