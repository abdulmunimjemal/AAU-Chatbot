const API = "http://localhost:5000/api/v1.0/";
const errorMessage = "Sorry, I am not able to understand you. Please try again. I am still learning.";

// JavaScript to automatically adjust the number of rows based on content
const textarea = document.querySelector('.input');

textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

function sendOnEnter(event) {
    let key = event.key;
    if (key === 'Enter') {
        event.preventDefault();
        document.querySelector('.send-btn').click();
    } 
}


function appendMessage(msg, type) {
    user = ['message-box--accent', 'message-box--right'];
    bot = ['message-box--primary', 'message-box--left'];
    classes = type === 'user' ? user : bot;
    // Create the box
    const message = document.createElement('div');
    message.classList.add('message-box');
    message.classList.add(classes[0]);
    message.classList.add(classes[1]);
    // Create the content
    const content = document.createElement('p');
    content.classList.add('message-box__content');
    content.innerHTML = msg;
    message.innerHTML = content.outerHTML;
    // Append to chat
    const chat = document.querySelector('.chatbot-container__messages');
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

const form = document.querySelector('.send-btn');
form.addEventListener('click', function () {
    let msg = textarea.value;
    textarea.value = '';
    msg = msg.trim();
    if (msg.length > 0) {
        appendMessage(msg, 'user');
        fetch(API + 'chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*' // CORS
            },
            body: JSON.stringify({ 'message': msg })
        })
            .then(response => response.json())
            .then(data => {
                appendMessage(data.message, 'bot');
            })
            .catch((error) => {
                console.error('Error:', error);
                appendMessage(errorMessage, 'bot');
            })
    }
});

/* 
<div class="message-box message-box--primary message-box--left">
    <p class="message-box__content">Hey, I am a bot</p>  
</div>
*/