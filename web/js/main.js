// JavaScript to automatically adjust the number of rows based on content
const textarea = document.querySelector('.input');

textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});
