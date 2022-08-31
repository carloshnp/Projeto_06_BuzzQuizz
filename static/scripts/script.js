const buzzAPI = {
    quizzes: "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
}

const quizzesList = [];

function getQuizzes() {
    const promise = axios.get(buzzAPI.quizzes)
    .then((response) => {
        response.data.forEach(quizz => {
            renderQuizzes(quizz);
        });
    }).catch((err) => {
        if(err.response) {
            console.log(err.response.status);
        } else if(err.request) {
            console.log(err.request);
        } else {
            console.log('Erro', err.message);
        }
        console.log(err.config);
    });
}

function renderQuizzes(obj) {
    const buzzQuizzes = document.querySelector(".buzz-quizzes");
    const quizz = document.createElement("article");
    quizz.className = "quizz";
    quizz.style.backgroundImage = `url(${obj.image})`;
    quizz.innerHTML = obj.title;
    buzzQuizzes.insertAdjacentElement("beforeend", quizz);
}

getQuizzes();