const buzzAPI = {
    quizzes: "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
}

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
    // Quando tivermos o armazenamento vai ser algo assim o codigo
    // const userQuizzes = document.querySelector(".user-quizzes");
    // for(const key in user.keys) {
    //     if(obj.key === user.key) {
    //         const quizz = document.createElement("article");
    //         quizz.className = "quizz";
    //         quizz.style.backgroundImage = `url(${obj.image})`;
    //         quizz.innerHTML = obj.title;
    //         userQuizzes.insertAdjacentElement("beforeend", quizz);
    //     }
    // }
    const buzzQuizzes = document.querySelector(".buzz-quizzes");
    const quizz = document.createElement("article");
    quizz.className = "quizz";
    quizz.style.backgroundImage = `url(${obj.image})`;
    quizz.innerHTML = obj.title;
    buzzQuizzes.insertAdjacentElement("beforeend", quizz);
    quizz.addEventListener("click", () => {
        document.querySelector(".tela1").style.display = "none";
        document.querySelector(".tela2").style.display = "initial";
        // depois tem que mudar pra abrir o quizz especifico!!
    })
}

function createQuizz() {
    const button = document.querySelector(".create");
    button.addEventListener("click", () => {
        document.querySelector(".tela1").style.display = "none";
        document.querySelector(".tela3").style.display = "initial";
    })
}

getQuizzes();
createQuizz();