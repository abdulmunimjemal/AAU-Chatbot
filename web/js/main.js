// JavaScript to automatically adjust the number of rows based on content
const textarea = document.querySelector('.input');

textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

function appendMessage(msg, type) {
    user = ['message-box-accent', 'message-box-right'];
    bot = ['message-box-primary', 'message-box-left'];
    classes = type === 'user' ? user : bot;

    // Create the box
    const message = document.createElement('div');
    message.classList.add('message-box');
    message.classList.add('message-box--accent');
    message.classList.add('message-box--right');
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
    }
});

/* 
<div class="message-box message-box--primary message-box--left">
    <p class="message-box__content">Hey, I am a bot</p>  
</div>
*/