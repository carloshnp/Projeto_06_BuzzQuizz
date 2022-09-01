let valores = [];
let quizz = {};
let numeroPerguntas;
let numeroNiveis;


// transforma valores do input numa array
function pegarValue(i) {
    const valor = i.value;
    valores.push(valor);
}


// cria o quizz a partir das informações básicas
// cada condicional verifica os requisitos de cada input
function criarQuizz() {
    // pega todos os inputs para usar a função pegarValue
    let element = document.querySelectorAll('.formulario-inicio input');
    element.forEach(i => pegarValue(i))

    // verifica se o título possui entre 20 e 65 caracteres
    if (valores[0].length >= 20 && valores[0].length <= 65){
        quizz['title'] = `${valores[0]}`;
    }
    else {
        alert('Insira um título entre 20 e 65 caracteres!')
        valores.length = 0;
    }

    // verifica se a imagem possui formato URL (usar API URL?? perguntar pro tutor)
    quizz['image'] = `${valores[1]}`;

    // verifica se o número de perguntas é, no mínimo, 3
    const nPerguntas = parseInt(valores[2]);
    if (nPerguntas >= 3) {
        numeroPerguntas = nPerguntas;
    }
    else {
        alert('O seu quizz deve ter no mínimo 3 perguntas!')
        valores.length = 0;
    }
    // verifica se o número de níveis é, no mínimo, 2
    const nNiveis = parseInt(valores[3]);
    if (nNiveis >= 2) {
        numeroNiveis = nNiveis;
    }
    else {
        alert('O seu quizz deve ter no mínimo 2 níveis!')
        valores.length = 0;
    }

    if (valores.length = 4) {
        renderizarPerguntasNiveis();

        const parte1 = document.querySelector('.criar-quizz');
        parte1.classList.toggle('hidden');
    }
}

// cria os inputs de perguntas e níveis baseados na quantidade digitada pelo usuário
function renderizarPerguntasNiveis() {
    return '';

    // criar os inputs das perguntas de acordo com o layout

    // criar a pergunta escondida (com botão de revelar pergunta)

    // criar os inputs dos níveis de acordo com o layout

    // criar o nível escondida (com botão de revelar nível)

    // dar toggle('hidden') na class 'criar-perguntas-quizz'
}
