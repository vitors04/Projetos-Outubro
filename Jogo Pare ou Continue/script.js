const currentLetter = document.getElementById('currentLetter');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const resultDisplay = document.getElementById('result');
const inputs = {
    name: document.getElementById('name'),
    animal: document.getElementById('animal'),
    city: document.getElementById('city'),
    object: document.getElementById('object')
};
let timer;
let timeLeft = 60;
let score = 0;
let usedAnswers = new Set();
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
}
function startGame() {
    timeLeft = 60;
    score = 0;
    usedAnswers.clear();
    Object.values(inputs).forEach(input => {
        input.value = '';
        input.disabled = false;
    });
    currentLetter.textContent = getRandomLetter();
    scoreDisplay.textContent = score;
    resultDisplay.textContent = '';
    timerDisplay.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            Object.values(inputs).forEach(input => input.disabled = true);
            submitAnswers(); 
        }
    }, 1000);
}
function submitAnswers() {
    clearInterval(timer);
    Object.values(inputs).forEach(input => input.disabled = true);
    let points = 0;
    const answers = {};
    for (const [key, input] of Object.entries(inputs)) {
        const value = input.value.trim().toUpperCase();
        if (value && value.startsWith // CORRIGIDO: de 'startsWidth' para 'startsWith'
            (currentLetter.textContent) && !usedAnswers.has(`${key}:${value}`)) {
                points += 10;
                answers[key] = value;
                usedAnswers.add(`${key}:${value}`);
            } else if (value) {
                answers[key] = `<span style="color:red">${value}</span>
                (Inválido ou Repetido)`;
           } else {
            answers[key] = '<span style="color:gray">Sem resposta</span>';
           }
    }
    score += points;
    scoreDisplay.textContent = score;
    resultDisplay.innerHTML =
    `Respostas: Nome: ${answers.name}, Animal: ${answers.animal},
    Cidade: ${answers.city}, Objeto: 
    ${answers.object}<br>Pontos ganhos: ${points}`;
}
function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    score = 0;
    usedAnswers.clear();
    Object.values(inputs).forEach(input => {
        input.value = '';
        input.disabled = true;
    });
    currentLetter.textContent = '';
    timerDisplay.textContent = timeLeft;
    scoreDisplay.textContent = score;
    resultDisplay.textContent = '';
}
Object.values(inputs).forEach(input => input.disabled = true);