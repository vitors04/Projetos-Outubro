const generateButton = document.getElementById('generate-button');
const robotDisplayDiv = document.getElementById('robot-display');
const robohashApiUrl = 'https://robohash.org/';

generateButton.addEventListener('click', () => {
    const randomText = generateRandomText(10);
    const imageUrl = `${robohashApiUrl}${encodeURIComponent(randomText)}`;
    robotDisplayDiv.innerHTML = `<img src="${imageUrl}" alt="Robô">`;
});
function generateRandomText(length) {
    const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}