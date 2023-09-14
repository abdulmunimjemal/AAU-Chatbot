const API = "http://localhost:5000/api/v1.0/";
const errorMessage = "Sorry, I am not able to understand you. Please try again. I am still learning.";

const textarea = document.querySelector('.input');
const chatMessages = document.querySelector('.chatbot-container__messages');

// Automatically adjust the number of rows based on content
textarea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

function sendOnEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.querySelector('.send-btn').click();
  }
}

function createMessageElement(msg, classes) {
  const message = document.createElement('div');
  message.classList.add('message-box', ...classes);
  const content = document.createElement('p');
  content.classList.add('message-box__content');
  content.innerHTML = msg;
  message.appendChild(content);
  return message;
}

// Function to simulate typing effect for the p element's text content
function typeMessage(targetElement, message, callback) {
    const delay = 30; // Adjust the typing speed as needed (milliseconds)
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < message.length) {
        const char = message.charAt(index);
        targetElement.textContent += char; // Append one character at a time
        index++;
      } else {
        clearInterval(typeInterval);
        // Call the callback function when typing is complete
        if (typeof callback === 'function') {
          callback();
        }
      }
    }, delay);
  }

  function appendMessage(msg, type, typingEffect=true) {
    const userClasses = ['message-box--accent', 'message-box--right'];
    const botClasses = ['message-box--primary', 'message-box--left'];
    const classes = type === 'user' ? userClasses : botClasses;
    const message = createMessageElement(type==='bot' ? '' : msg, classes);
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  
    if (typingEffect && type === 'bot') {
      const pElement = message.querySelector('.message-box__content');
      typeMessage(pElement, msg, () => {
        // Typing is complete, you can add additional logic here if needed
      });
    }
  }

const form = document.querySelector('.send-btn');
form.addEventListener('click', () => {
  const msg = textarea.value.trim();
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
      .finally(() => {
        textarea.value = '';
      });
  }
});