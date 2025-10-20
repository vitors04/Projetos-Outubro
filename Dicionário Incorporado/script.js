const searchButton = document.getElementById('searchButton');
const wordInput = document.getElementById('word');
const dicionarioIframe = document.getElementById('dicionarioIframe');

searchButton.addEventListener('click', () => {
    const word = wordInput.value;
    const url = `https://www.dicio.com.br/${word}`;
    dicionarioIframe.src = url;
});