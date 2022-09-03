const buzzAPI = {
    quizzes: "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
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
            console.log('Erro: ', err.message);
        }
        console.log(err.config);
    });
}

function renderQuizzes(obj) {
    const userQuizzes = document.querySelector(".user-quizzes");
    const numOfQuizzes = buzzAPI.numberOfKeys;
    if(numOfQuizzes !== 0 && numOfQuizzes !== undefined){
        for(const key of numOfQuizzes) {

            const storedKey = buzzAPI.getQuizz(`${Number(key)}`);
            const storedQuizz = getQuizzes(storedKey);
            const quizz = document.createElement("article");
            quizz.id = storedQuizz.id;
            quizz.className = "quizz";
            quizz.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%,
                                        rgba(0, 0, 0, 0.5) 64%, #000000 100%), url(${obj.image})`;
            quizz.style.backgroundSize = "340px 181px";
            quizz.innerHTML = storedQuizz.title;
            userQuizzes.insertAdjacentElement("beforeend", quizz);
            quizz.addEventListener("click", () => {
                document.querySelector(".tela1").style.display = "none";
                document.querySelector(".tela2").style.display = "initial";
                selectedQuizz(quizz.id)
            })

        }
    }

    const buzzQuizzes = document.querySelector(".buzz-quizzes");
    const quizz = document.createElement("article");
    quizz.id = obj.id;
    quizz.className = "quizz";
    quizz.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%,
                                rgba(0, 0, 0, 0.5) 64%, #000000 100%), url(${obj.image})`;
    quizz.style.backgroundSize = "340px 181px";
    quizz.innerHTML = obj.title;
    buzzQuizzes.insertAdjacentElement("beforeend", quizz);
    quizz.addEventListener("click", () => {
        document.querySelector(".tela1").style.display = "none";
        document.querySelector(".tela2").style.display = "initial";
        selectedQuizz(quizz.id)
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

let quizes;
let chosen;
let erros = 0;
let acertos = 0;
let resultado = 0;

function selectedQuizz(quizID) {
    const request = axios.get(`${buzzAPI.quizzes}/${quizID}`);
    request.then(checkQuizz);
    request.catch(errorOpenQuiz);

}

function checkQuizz (answer){
    const status = answer.status;
    chosen = answer.data;
    openQuiz();
}

function errorOpenQuiz(erro) {
    const code = erro.response.status;
    if (code !== 200) {
        alert("Erro ao abrir esse quiz.");
        setTimeout(window.location.reload(), 5000);
    }
}

function openQuiz () {
    erros = 0;
    acertos = 0;
    const page = document.querySelector(".tela2 .caixa-pergunta");
    const tela = document.querySelector(".tela2");

    let qtdPerguntas = chosen.questions.length;
    let perguntas = chosen.questions;

    page.innerHTML = "";
    tela.innerHTML = "";

    tela.innerHTML += `
        <div class="capa-quiz" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${chosen.image})">
            <p>${chosen.title}</p>
        </div>
        `;
    for (let i=0; i < qtdPerguntas; i++) {
<<<<<<< HEAD
=======

>>>>>>> 67cd5d3d7ee5beb2306168e513a227c5eff7156e
        page.innerHTML += `
            <div class="caixa-pergunta">
                <div class="titulo-pergunta" style="background-color: ${perguntas[i].color}">
                    <h2>${perguntas[i].title}</h2>
                </div>
                <div class="respostas">
                    ${renderizarRespostas(perguntas,i)}
                </div>
            </div>
        `;
    }
    tela.innerHTML += page.innerHTML;
    document.querySelector(".capa-quiz").scrollIntoView(true);
}


function renderizarFimQuizz(nivel) {
    let pagina = document.querySelector(".tela2");
    let string = "";
    string = `
        <div class="fim-quizz">
            <div class="titulo-fim-quizz">
                <p>${resultado}% de acertos: ${nivel.title}</p>
            </div>
            <div class="caixa-texto-fim">
                <div class="imagem-fim">
                    <img src="${nivel.image}" alt="">
                </div>
                <div class="texto-fim">
                    <p>${nivel.text}</p>
                </div>
            </div>

        <div class="botao-reiniciar" onclick="restartQuizz()">
            <p>Reiniciar Quizz</p>
        </div>

        <div class="botao-voltar" onclick="backToPage1()">
            <p>Voltar pra home</p>
        </div>
        </div>
        `;
    pagina.innerHTML += string;
}


function restartQuizz() {
    const titulo = document.querySelector(".capa-quiz");
    let fim = document.querySelector(".fim-quizz");
    let respostas = document.querySelectorAll(".resposta");

    fim.innerHTML = "";
    acertos = 0;
    erros = 0;
    resultado = 0;


    for (let i=0; i < respostas.length; i++) {
        if (respostas[i].classList.contains("opaco")) {
            respostas[i].classList.remove("opaco");
        }
        if (respostas[i].classList.contains("acertou")) {
            respostas[i].classList.remove("acertou");
        }
        if (respostas[i].classList.contains("errou")) {
            respostas[i].classList.remove("errou");
        }
    }

    titulo.scrollIntoView({behavior: "smooth", block:"start"});
    openQuiz();
}

function backToPage1 () {
    window.location.reload();
}


function calcularAcertos() {
    let niveis = chosen.levels;
    let perguntas = chosen.questions.length;
    let respondidas = acertos + erros;
    let nivel;
    let aux = 0;

    if (respondidas < perguntas) {
        return;
    } else {
        resultado = Math.round((acertos/perguntas) * 100);
        for (let i=0; i < niveis.length; i++) {
            if (resultado >= niveis[i].minValue) {
                if (niveis[i].minValue >= aux) {
                    nivel = niveis[i];
                    aux = nivel.minValue;
                }
            }
        }

    }
    renderizarFimQuizz(nivel);
    mostrarFimQuizz();
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



function renderizarRespostas (perguntas,i) {
    let respostas = "";
    let qtdRespostas = perguntas[i].answers.length;

    perguntas[i].answers.sort(shuffleArray(perguntas[i].answers));

    for (let j=0; j < qtdRespostas; j++) {

        respostas += `
            <div class="resposta" onclick="selecionarResposta(this)">
                <p class="escondido">${perguntas[i].answers[j].isCorrectAnswer}</p>
                <img src="${perguntas[i].answers[j].image}" alt="">
                <p>${perguntas[i].answers[j].text}</p>
            </div>
        `;
    }
    return respostas;
}



function selecionarResposta(elemento) {
    const outras = document.querySelectorAll(".respostas")
<<<<<<< HEAD
    
=======
    console.log(outras);

>>>>>>> 67cd5d3d7ee5beb2306168e513a227c5eff7156e
    let ehCorreta = elemento.querySelector(".escondido").innerHTML;
    let anterior = elemento.previousElementSibling;
    let proxima = elemento.nextElementSibling;

    if (anterior === null) {
        if (proxima.classList.contains("opaco") || proxima.classList.contains("clicado")) {
            return;
        }
    } else if (proxima === null) {
        
        if (anterior.classList.contains("opaco") || anterior.classList.contains("clicado")) {
            return;
        }
    } else if (proxima.classList.contains("opaco") || anterior.classList.contains("opaco")) {
        return;
    }

<<<<<<< HEAD
    
    if (ehCorreta === "true") {
=======

    if (ehCorreta === "true") { //se ele acertou
>>>>>>> 67cd5d3d7ee5beb2306168e513a227c5eff7156e
        acertos += 1;
        elemento.classList.add("acertou");
        elemento.classList.add("clicado");

        if (proxima !== null) {
            while (proxima !== null)  {
                if(!proxima.classList.contains("opaco")) {
                    proxima.classList.add("opaco");
                }
                if(!proxima.classList.contains("errou")) {
                    proxima.classList.add("errou");
                }
                proxima = proxima.nextElementSibling;
            }
        }
        if (anterior !== null) {
            while(anterior !== null) {
                if (!anterior.classList.contains("opaco")) {
                    anterior.classList.add("opaco");
                }
                if (!anterior.classList.contains("errou")) {
                    anterior.classList.add("errou");
                }
                anterior = anterior.previousElementSibling;
            }
        }

    } else {
        erros += 1;
        elemento.classList.add("errou");
        elemento.classList.add("clicado");
        if (proxima !== null) {
            while (proxima !== null)  {
                if(!proxima.classList.contains("opaco")) {
                    proxima.classList.add("opaco");
<<<<<<< HEAD
=======

>>>>>>> 67cd5d3d7ee5beb2306168e513a227c5eff7156e
                    ehCorreta = proxima.querySelector(".escondido").innerHTML;
                    if(ehCorreta === "true") {
                        proxima.classList.add("acertou");
                    } else {
                        proxima.classList.add("errou");
                    }
                }
                proxima = proxima.nextElementSibling;
            }
        }
        if (anterior !== null) {
            while(anterior !== null) {
                if (!anterior.classList.contains("opaco")) {
                    anterior.classList.add("opaco");
<<<<<<< HEAD
=======

>>>>>>> 67cd5d3d7ee5beb2306168e513a227c5eff7156e
                    ehCorreta = anterior.querySelector(".escondido").innerHTML;
                    if (ehCorreta === "true") {
                        anterior.classList.add("acertou");
                    } else {
                        anterior.classList.add("errou");
                    }
                }
                anterior = anterior.previousElementSibling;
            }
        }
    }

    setTimeout(function () {
                            elementoPai = elemento.parentElement;
                            elementoVo = elementoPai.parentElement;
                            proxima = elementoVo.nextElementSibling;

                            if (proxima === null) {
                                console.log("função scroll: não tem mais pergunta");
                                return;
                            } else {
                                console.log("tem próxima");
                                proxima.scrollIntoView({block:"start", behavior:"smooth", inline:"center"});
                            }
                        },2000);
    calcularAcertos();
}




function mostrarFimQuizz() {
    setTimeout(() => {
        fim = document.querySelector(".fim-quizz");
        fim.scrollIntoView({block:"start", behavior:"smooth", inline:"nearest"});
    },2000);
}