const questions = document.querySelectorAll('.question');
const submitButton = document.querySelector('#submit');
const resultContainer = document.querySelector('#resultContainer');
let score = 0;

// Load previously selected answers from localStorage on page load
window.addEventListener('load', () => {
    questions.forEach((question, index) => {
        const storedAnswerIndex = localStorage.getItem(`question_${index}`);
        if (storedAnswerIndex !== null) {
            const storedAnswer = question.querySelector(`.answer:nth-child(${parseInt(storedAnswerIndex) + 1})`);
            storedAnswer.checked = true;
        }
    });
});

questions.forEach((question, index) => {
    const answers = question.querySelectorAll('.answer');
    const correctAnswer = question.querySelector('.answer[data-correct="true"]');

    answers.forEach(answer => {
        answer.addEventListener('click', () => handleAnswerClick(answer, correctAnswer, answers, index));
    });
});

submitButton.addEventListener('click', () => showResult());

function handleAnswerClick(answer, correctAnswer, allAnswers, questionIndex) {
    allAnswers.forEach(a => a.disabled = true);

    // Save selected answer to localStorage
    const selectedAnswerIndex = Array.from(allAnswers).indexOf(answer);
    localStorage.setItem(`question_${questionIndex}`, selectedAnswerIndex.toString());

    if (answer === correctAnswer) {
        answer.classList.add('correct');
        score++;
    } else {
        answer.classList.add('incorrect');
        correctAnswer.classList.add('correct');
    }
}

function showResult() {
    let errorMessage = '';

    if (errorMessage) {
        resultContainer.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
    } else {
        const percentage = (score / questions.length) * 100;
        resultContainer.innerHTML = `
            <p>Правильных ответов: ${score}</p>
            <p>Процент правильных ответов: ${percentage.toFixed(2)}%</p>
        `;
    }
}
