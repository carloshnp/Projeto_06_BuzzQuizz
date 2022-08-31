const buzzAPI = {
    quizzes: "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    storeQuizz: (id, key) => {
        // ID é um número a partir de 1, não zero!!
        // ID tem que ser passado como string!!
        localStorage.setItem(id, key);
    },
    getQuizz: (id) => {
        // Aqui também...
        localStorage.getItem(id);
    },
    numberOfKeys: localStorage.length
}

function getQuizzes(id="") {
    const promise = axios.get(`${buzzAPI.quizzes}/${id}`)
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

    const userQuizzes = document.querySelector(".user-quizzes");
    const numOfQuizzes = buzzAPI.numberOfKeys;
    if(!numOfQuizzes){
        for(const key in numberOfKeys) {

            const storedKey = buzzAPI.getQuizz(`${key}`);
            const storedQuizz = getQuizzes(storedKey);
            const quizz = document.createElement("article");
            quizz.className = "quizz";
            quizz.style.backgroundImage = `url(${storedQuizz.image})`;
            quizz.innerHTML = storedQuizz.title;
            userQuizzes.insertAdjacentElement("beforeend", quizz);

        }
    }

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

