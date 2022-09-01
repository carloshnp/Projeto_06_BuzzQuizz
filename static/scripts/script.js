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
    if(numOfQuizzes !== 0 || numOfQuizzes !== undefined){
        for(const key in numOfQuizzes) {

            const storedKey = buzzAPI.getQuizz(`${key}`);
            const storedQuizz = getQuizzes(storedKey);
            const quizz = document.createElement("article");
            quizz.className = "quizz";
            quizz.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64%, #000000 100%), url(${obj.image})`;
            quizz.style.backgroundSize = "340px 181px";
            quizz.innerHTML = storedQuizz.title;
            userQuizzes.insertAdjacentElement("beforeend", quizz);

        }
    }

    const buzzQuizzes = document.querySelector(".buzz-quizzes");
    const quizz = document.createElement("article");
    quizz.className = "quizz";
    quizz.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64%, #000000 100%), url(${obj.image})`;
    quizz.style.backgroundSize = "340px 181px";
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

