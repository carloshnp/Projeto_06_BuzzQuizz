let quizes;
let chosen;
let erros = 0;
let acertos = 0;
let resultado = 0;
let numberQuestions;
let numberLevels;
let titleInput;
let colorInput;
let textInput;
let imageInput;
let textWrongInput;
let imageWrongInput;
let levelTitleInput;
let levelImageInput;
let percentageInput;
let descriptionInput;
let stopQuestions = true;
let stopLevels = true;
const values = [];
const quizz = {};
const regExHex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");

const buzzAPI = {
    quizzes: "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes",
    storeQuizz: (id, key) => {
        // ID tem que ser passado como string!!
        localStorage.setItem(id, key);
    },
    getQuizz: (id) => {
        // Aqui também...
        localStorage.getItem(id);
    },
    numberOfKeys: localStorage.getItem("quizzes").length,
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
    const noQuizz = document.querySelector(".noquizz");
    const userContainer = document.querySelector(".user-container");
    const numOfQuizzes = buzzAPI.numberOfKeys;
    if(numOfQuizzes !== 0 && numOfQuizzes !== undefined && numOfQuizzes !== null){
        for(const key of buzzAPI.getQuizz("quizzes")) {

            const storedQuizz = getQuizzes(key);
            const quizz = document.createElement("article");
            quizz.id = storedQuizz.id;
            quizz.className = "quizz";
            quizz.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%,
                                        rgba(0, 0, 0, 0.5) 64%, #000000 100%), url(${obj.image})`;
            quizz.style.backgroundSize = "340px 181px";
            quizz.innerHTML = storedQuizz.title;
            noQuizz.style.display = "none";
            userContainer.style.display = "flex";
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

    if (ehCorreta === "true") { //se ele acertou
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
                                return;
                            } else {
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

// transforma values do input numa array
function getValue(i) {
    const valor = i.value;
    values.push(valor);
}

// cria o quizz a partir das informações básicas
// cada condicional verifica os requisitos de cada input
function criarQuizz() {
    // pega todos os inputs para usar a função getValue
    let element = document.querySelectorAll('.formulario-inicio input');
    element.forEach(i => getValue(i))

    // verifica se o título possui entre 20 e 65 caracteres
    if (values[0].length >= 20 && values[0].length <= 65){
        quizz['title'] = `${values[0]}`;
    }
    else {
        alert('Insira um título entre 20 e 65 caracteres!')
        values.length = 0;
    }

    // verifica se a imagem possui formato URL (usar API URL?? perguntar pro tutor)
    quizz['image'] = `${values[1]}`;

    // verifica se o número de perguntas é, no mínimo, 3
    const nQuestions = parseInt(values[2]);
    if (nQuestions >= 3) {
        numberQuestions = nQuestions;
    }
    else {
        alert('O seu quizz deve ter no mínimo 3 perguntas!')
        values.length = 0;
    }
    // verifica se o número de níveis é, no mínimo, 2
    const nLevels = parseInt(values[3]);
    if (nLevels >= 2) {
        numberLevels = nLevels;
    }
    else {
        alert('O seu quizz deve ter no mínimo 2 níveis!')
        values.length = 0;
    }

    if (values.length == 4) {
        quizz['questions'] = '';
        quizz['levels'] = '';
        // renderiza os formulários de perguntas e níveis
        renderQuestions();
        // adicionar renderLevels(); aqui

        // esconde a tela de informações básicas do quizz
        const parte1 = document.querySelector('.criar-quizz');
        parte1.classList.toggle('hidden');
        // mostra a tela de criação de perguntas do quizz
        const parte2 = document.querySelector('.criar-perguntas-quizz');
        parte2.classList.toggle('hidden');
    }
}

// cria os inputs de perguntas e níveis baseados na quantidade digitada pelo usuário

    // criar os inputs das perguntas de acordo com o layout
    // criar a pergunta escondida (com botão de revelar pergunta)
    /*
    1) pegar o número de perguntas digitado pelo usuário
    2) gerar formulário de perguntas:
    2.1) pergunta completa:
        - h2: 'Pergunta 1'
        - 2 inputs: texto da pergunta, cor de fundo da pergunta

        - h2: 'Resposta correta'
        - 2 inputs: resposta correta, url da imagem

        - h2: respostas incorretas
        - 6 inputs em grupos de 2 inputs (espaçados): reposta incorreta (i), url da imagem (i)

        - repetir esse formato para as N perguntas digitadas pelo usuário

        - cada bloco possui espaçamento de 28px

    2.2) pergunta escondida:
        - apenas uma pergunta vai estar 'aberta', todas as outras estarão escondidas

        - o bloco possui espaçamento de 28px, e apenas o 'h2: 'Pergunta (i)'' é exibido
        - o bloco possui um ícone à direita para edição da pergunta
        - ao clicar no ícone:
            - a pergunta (do respectivo ícone) deve ser exibida com todos os inputs
            - todas as outras perguntas devem ser escondidas
            - o ícone deve ser escondido
            - as informações colocadas nos inputs não pode ser perdida ao esconder as perguntas

    2.3) ao gerar o formulário, apenas a primeira pergunta deve estar 'aberta', e todas as outras devem estar escondidas
    */

    // criar os inputs dos níveis de acordo com o layout
    // criar o nível escondida (com botão de revelar nível)
    /*
    1) pegar o número de níveis digitado pelo usuário
    2) gerar formulário de níveis:
    2.1) nível completo:
        - h2: 'Nível 1'
        - 4 inputs: título do nível, % de acerto mínima, URL da imagem do nível, descrição do nível

        - o input da descrição do nível possui height maior que os outros inputs (criar classe CSS específica para ele)

        - repetir esse formato para os N níveis digitados pelo usuário

        - cada bloco (nível) possui padding-bottom de 28px

    2.2) nível escondido:
        - apenas um nível vai estar 'aberto', todos os outros estarão escondidos

        - cada bloco possui espaçamento de 28px, e apenas o 'h2: 'Nível (i)' é exibido
        - o bloco possui um ícone à direita para edição do nível
        - ao clicar no ícone:
            - o nível (do respectivo ícone) deve ser exibido com todos os inputs
            - todos os outros níveis devem ser escondidos
            - o ícone deve ser escondido
            - as informações colocadas nos inputs não pode ser perdida ao esconder os níveis

    2.3) ao gerar o formulário, apenas o primeiro nível deve estar 'aberto', e todas os outros devem estar escondidos
    */

    // dar toggle('hidden') na class 'criar-perguntas-quizz'

    // dividir essa função em várias funções
function renderQuestions() {
    const element = document.querySelector('.perguntas');

    for (let i = 1; i <= numberQuestions; i++) {
        element.innerHTML += `
            <section class="pergunta hidden-edit">
                <h2>Pergunta ${i}</h2>
                <img class="teste" src="static/img/Vector.png" onclick="showQuestion(this)">
                <section class="pergunta-titulo">
                    <input type="text" class="texto" placeholder="Texto da pergunta" minlength="20" required>
                    <input type="text" class="cor-fundo" placeholder="Cor de fundo da pergunta" pattern="${regExHex}" required>
                </section>
                <section class="resposta-correta">
                    <h2>Resposta correta</h2>
                    <section class="correta">
                        <input type="text" class="resposta" placeholder="Resposta correta" required>
                        <input type="url" class="imagem" placeholder="URL da imagem" required>
                </section>
                <section class="respostas-incorretas">
                    <h2>Respostas incorretas</h2>
                    <section class="incorreta">
                        <input type="text" class="resposta" placeholder="Resposta incorreta 1" required>
                        <input type="url" class="imagem" placeholder="URL da imagem 1" required>
                    </section>
                    <section class="incorreta">
                        <input type="text" class="resposta" placeholder="Resposta incorreta 2">
                        <input type="url" class="imagem" placeholder="URL da imagem 2">
                    </section>
                    <section class="incorreta">
                        <input type="text" class="resposta" placeholder="Resposta incorreta 3">
                        <input type="url" class="imagem" placeholder="URL da imagem 3">
                    </section>
                </section>
            </section>
        `
    }

    const questionOne = document.querySelector('.pergunta')
    questionOne.classList.remove('hidden-edit');
    questionOne.classList.add('open');
}

function showQuestion(teste) {
    const element = document.querySelector('.pergunta.open');
    element.classList.remove('open');
    element.classList.add('hidden-edit');

    const questionOpen = teste.parentElement;
    questionOpen.classList.remove('hidden-edit');
    questionOpen.classList.add('open');
}

function renderLevels() {
    const element = document.querySelector('.niveis');
    const pattern = "^[0-1]([0-9]{2})"

    for (let i = 1; i <= numberLevels; i++) {
        element.innerHTML += `
            <section class="level hidden-edit">
                <h2>Nivel ${i}</h2>
                <img class="teste" src="static/img/Vector.png" onclick="showLevel(this)">
                <section class="level-inputs">
                    <input type="text" class="level-title" placeholder="Título do nível" minlength="10" required>
                    <input type="text" class="level-percentage" placeholder="% de acerto mínima" pattern="${pattern}" required>
                    <input type="url" class="level-image" placeholder="URL da imagem do nível" required>
                    <input type="text" class="level-description" placeholder="Descrição do nível" minlength="30" required>
                </section>
            </section>
        `
    }

    const levelOne = document.querySelector(".level");
    levelOne.classList.remove('hidden-edit');
    levelOne.classList.add('open');
}

function showLevel(teste) {
    const element = document.querySelector('.level.open');
    element.classList.remove('open');
    element.classList.add('hidden-edit');

    const questionOpen = teste.parentElement;
    questionOpen.classList.remove('hidden-edit');
    questionOpen.classList.add('open');
}

// essa função deve verificar os inputs das perguntas para atender os requisitos de cada input da pergunta; se todos os requisitos forem cumpridos, as perguntas devem ser guardadas no objeto 'quizz{}' na key 'questions'
let checkQCounter = 0;
let checkWQCounter = 0;
let checkWQCounter1 = 0;

function storeQuestions() {

    const questions = document.querySelectorAll(".pergunta");
    const questionsObj = [];
    for(const question of questions) {
        const questionSection = question.querySelector(".pergunta-titulo");
        const answerSection = question.querySelector(".resposta-correta");
        const correctAnswer = answerSection.querySelector(".correta");
        const incorrectAnswers = answerSection.querySelectorAll(".respostas-incorretas > .incorreta");

        titleInput = questionSection.querySelector(".texto").value;
        colorInput = questionSection.querySelector(".cor-fundo").value;
        textInput = correctAnswer.querySelector(".resposta").value;
        imageInput = correctAnswer.querySelector(".imagem").value;
        const answersArray = [];

        const questionObj = {
            title: titleInput,
            color: colorInput,
            answers: answersArray
        }

        const correctAnswerObj = {
            text: textInput,
            image: imageInput,
            isCorrectAnswer: true
        }
        answersArray.push(correctAnswerObj);
        checkQuestion();
        // requisitos input: texto 20 caracteres min, cor hexadecimal, texto das respostas n pode estar vazio, URL da imagem deve ser url, obrigatória resposta correta + pelo menos 1 resposta incorreta
        for(const incorrectAnswer of incorrectAnswers) {

            textWrongInput = incorrectAnswer.querySelector(".resposta").value;
            imageWrongInput = incorrectAnswer.querySelector(".imagem").value;
            if(textWrongInput === "" || imageWrongInput === "") {
                break;
            }
            const incorrectAnswerObj = {
                text: incorrectAnswer.querySelector(".resposta").value,
                image: incorrectAnswer.querySelector(".imagem").value,
                isCorrectAnswer: false
            }
            answersArray.push(incorrectAnswerObj);
            checkIncorrectAnswers();
            if (checkWQCounter1 == 1) {
                checkQCounter = 0;
                checkWQCounter1 = 0;
                return;
            }
        }
        checkWQCounter = 0;
        questionsObj.push(questionObj);
    }
    // fazer condição para que o stop se torne false (questões preenchidas corretamente)
    if (checkQCounter == numberQuestions) {
        stopQuestions = false;
    }
    if (stopQuestions == true) {
        checkQCounter = 0;
        return;
    }
    quizz['questions'] = questionsObj;
    renderLevels();
    // esconde a tela de criação de perguntas do quizz
    const parte2 = document.querySelector('.criar-perguntas-quizz');
    parte2.classList.toggle('hidden');
    // mostra a tela de criação de níveis do quizz
    const parte3 = document.querySelector('.criar-niveis-quizz');
    parte3.classList.toggle('hidden');
    console.log('mudou de tela');
    /*
    - key: questions
    - value: array de objetos (perguntas)
        - title: titulo da pergunta(i)
        - color: cor de fundo da pergunta(i)
        - answers: array de objetos (respostas)
            - text: texto da resposta(i)
            - image: imagem da resposta(i)
            - isCorrectAnswer: false ou true
    */
}

function checkQuestion() {
    if (titleInput.length <= 20) {
        alert('Insira ao menos 20 caracteres no título!');
        return;
    }
    else if (regExHex.test(colorInput) == false) {
        alert('Insira uma cor no formato hexadecimal!');
        return;
    }
    else if(!isValidURL(imageInput)) {
        alert("A URL da imagem é inválida!")
        return;
    }
    else if (textInput == '') {
        alert('O texto da resposta não pode estar vazio!');
        return;
    }
    else {
        checkQCounter++;
    }
}

function isValidURL(str) {
    try {
        new URL(str)
        return true;
    } catch (error) {
        return false;
    }
}

function checkIncorrectAnswers() {
    if (checkWQCounter < 1) {
        if (textWrongInput == '') {
            alert('Deve haver pelo menos uma resposta incorreta!');
            checkWQCounter1++;
            return;
        }
        else {
            checkWQCounter++;
        }
    }
    // escrever condicional da URL da imagem
}

// essa função deve verificar os inputs dos níveis para atender os requisitos de cada input do nível; se todos os requisitos forem cumpridos, os níveis devem ser guardadas no objeto 'quizz{}' na key 'levels'

let checkLCounter = 0;

function storeLevels() {
    const levels = document.querySelectorAll(".level");
    const levelsObj = [];
    for(const level of levels) {
        const levelSection = level.querySelector(".level-inputs");

        levelTitleInput = levelSection.querySelector(".level-title").value;
        percentageInput = parseInt(levelSection.querySelector(".level-percentage").value);
        levelImageInput = levelSection.querySelector(".level-image").value;
        descriptionInput = levelSection.querySelector(".level-description").value;

        const levelObj = {
                    title: levelTitleInput,
                    image: levelImageInput,
                    text: descriptionInput,
                    minValue: percentageInput
                }

        checkLevels();
        levelsObj.push(levelObj);
    }
    checkNumberLevels();
    if (stopLevels == true) {
        checkLCounter = 0;
        return;
    }
    quizz['levels'] = levelsObj;
    // esconde a tela de criação de níveis do quizz
    const parte3 = document.querySelector('.criar-niveis-quizz');
    parte3.classList.toggle('hidden');
    // mostra a tela de criação de níveis do quizz
    const parte4 = document.querySelector('.quizz-criado');
    parte4.classList.toggle('hidden');
    enviarQuizz();
    /*
    - key: levels
    - value: array de objetos (níveis)
        - title: titulo do nível(i)
        - image: imagem do nível(i)
        - text: descrição do nível(i)
        - minValue: % mínima do nível(i) (entre 0 e 100)
     */
}

function checkLevels() {
    if(levelTitleInput.length < 10){
        alert("Insira ao menos 10 caracteres título do nível!");
        return;
    }
    else if((percentageInput < 0) || (percentageInput > 100)){
        alert("% de acerto mínima do quizz deve ser um número entre 0 e 100!");
        return;
    }
    else if(descriptionInput.length < 30){
        alert("Insira ao menso 30 caracteres na descrição do nível!");
        return;
    }
    else {
        checkLCounter++;
    }
    // fazer verificador de URL
}

function checkNumberLevels() {
    if(checkLCounter != numberLevels){
        alert("Termine de preencher os Niveis do seu Quizz!");
        return;
    }
    else {
        stopLevels = false;
    }
}

// envia o quizz para a API
function enviarQuizz() {
    const storedQuizzes = []
    for(const id of buzzAPI.getQuizz("quizzes")) {
        storedQuizzes.push(id);
    }
    const prom = axios.post(buzzAPI.quizzes, quizz);
    prom.then(response => {
        storedQuizz.push(response.data.id)
        buzzAPI.storeQuizz("quizzes", storedQuizzes);
    }).catch(error => console.log(error));
}

getQuizzes();
createQuizz();


