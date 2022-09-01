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
}

function guardarPerguntas() {
    return '';

    // essa função deve verificar os inputs das perguntas para atender os requisitos de cada input da pergunta; se todos os requisitos forem cumpridos, as perguntas devem ser guardadas no objeto 'quizz{}' no formato a seguir
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

function guardarNiveis() {
    return '';
    // essa função deve verificar os inputs dos níveis para atender os requisitos de cada input do nível; se todos os requisitos forem cumpridos, os níveis devem ser guardadas no objeto 'quizz{}' no formato a seguir
    /*
    - key: levels
    - value: array de objetos (níveis)
        - title: titulo do nível(i)
        - image: imagem do nível(i)
        - text: descrição do nível(i)
        - minValue: % mínima do nível(i) (entre 0 e 100)
     */ 

}