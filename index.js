const startGameButton = document.querySelector(".start-quiz")
const menu = document.querySelector(".menu")
const gameContainer = document.querySelector(".game-container")
const respostas = document.querySelector(".respostas")
const questionText = document.querySelector(".pergunta")
const nextQuestionButton = document.querySelector(".next-question")
const temporizadorElement = document.querySelector(".temporizador span")


startGameButton.addEventListener("click", startGame)
nextQuestionButton.addEventListener("click", displayNextQuestion)


let currentQuestionIndex =  0
let perguntasUtilizadas = []
let totalCorrect = 0
let temporizador;



function startGame(){
  startGameButton.classList.add("hide")
  menu.classList.add("hide")
  gameContainer.classList.remove("hide")
  displayNextQuestion()
}



function displayNextQuestion(){
  resetState()
  resetTemporizador()
  startTemporizador()
  
  const ramdomIndex = obterPerguntaNaoUtilizadaAleatoria()

  if(currentQuestionIndex == 10){
    return finishGame()
  }


  questionText.textContent = questions[ramdomIndex].question
  
  const shuffledAnswers = shuffleAnswers(questions[ramdomIndex].answers);

  shuffledAnswers.forEach((answer, index) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "alternativa");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    respostas.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}


function finishGame(){
  const totalQuestion = 10
  const performance = Math.floor(totalCorrect * 100 / totalQuestion) 

  let message = ""

  switch(true){
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito Bom :)"
      break
    case (performance >= 50):
      message = "Bom"
    default:
      message = "Pode Melhorar :("
  }

  gameContainer.innerHTML = 
  `
  <div class="end-game">
    <h3 class="message">
      Você Acertou ${totalCorrect} de ${totalQuestion} questões! <br>
      <span>Resultado: ${message}</span>
    </h3>
    <button onclick=window.location.reload() class="refazer button">
      Refazer Teste
    </button>
  </div>
  `

}

function obterPerguntaNaoUtilizadaAleatoria() {
  
  let indiceAleatorio = 0
  do {
    indiceAleatorio = Math.floor(Math.random() * questions.length)
  } while (perguntasUtilizadas.includes(indiceAleatorio))

  perguntasUtilizadas.push(indiceAleatorio)
  return indiceAleatorio
}


function resetState(){
  while(respostas.firstChild){
    respostas.removeChild(respostas.firstChild)
  }

  nextQuestionButton.classList.add("hide")
}


function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    totalCorrect++;
  }

  mostrarRespostas(); // Mostrar respostas após clicar em uma alternativa
  resetTemporizador(); // Reiniciar o temporizador após selecionar uma resposta
  enableNextButton(); // Habilitar o botão de próxima pergunta após selecionar uma resposta
  currentQuestionIndex++;
}


function mostrarRespostas() {
  document.querySelectorAll(".alternativa").forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });
}


function enableNextButton() {
  nextQuestionButton.classList.remove("hide");
}


function startTemporizador() {
  let segundos = 20;

  temporizador = setInterval(function () {
    segundos--;
    temporizadorElement.textContent = segundos;

    if (segundos <= 0) {
      clearInterval(temporizador);
      mostrarRespostas(); // Adicione esta linha para mostrar respostas ao terminar o tempo
      enableNextButton(); // Adicione esta linha para habilitar o botão de próxima pergunta
    }
  }, 1000);
}

function resetTemporizador() {
  clearInterval(temporizador);
  temporizadorElement.textContent = "20";
}

function shuffleAnswers(answers) {
  // Cria uma cópia das respostas e as embaralha
  const shuffled = [...answers].sort(() => Math.random() - 0.5);
  return shuffled;
}




const questions = [
  {
    question: "QUAL PRATO DA CULINÁRIA BRASILEIRA TEM ORIGEM AFRICANA?",
    answers: [
      {text: "MUNGUZÁ", correct: true},
      {text: "MANIÇOBA", correct: false},
      {text: "TACACÁ", correct: false},
      {text: "FEIJOADA", correct: false}
    ]
  },
  {
    question: "O QUE SIGNIFICA O TERMO “AXÉ”?",
    answers: [
      {text: "BOA SORTE", correct: true},
      {text: "AMÉM", correct: false},
      {text: "PAZ", correct: false},
      {text: "AMOR", correct: false}
    ]
  },
  {
    question: "O QUE SIGNIFICA O TERMO “CACIMBA”?",
    answers: [
      {text: "POÇO OU CISTERNA", correct: true},
      {text: "RECIPIENTE PARA TRANSPORTE DE COMIDA", correct: false},
      {text: "CABAÇA", correct: false},
      {text: "CAÇAMBA", correct: false}
    ]
  },
  {
    question: "Qual cantora, também atriz, foi uma das primeiras mulheres negras a fazer sucesso na TV brasileira",
    answers: [
      {text: "Zezé Motta", correct: true},
      {text: "Preta Gil", correct: false},
      {text: "Elza Soares", correct: false},
      {text: "Daniela Mercury", correct: false},
    ]
  },
  {
    question: "Quem é a cantora e compositora brasileira que se destacou por suas músicas que abordam questões sociais e raciais, como A Carne?",
    answers: [
      {text: "Elza Soares", correct: true},
      {text: "Vanessa da Mata", correct: false},
      {text: "Karol Conká", correct: false},
      {text: "Céu", correct: false},
    ]
  },
  {
    question: "QUAL FOI O PRIMEIRO PRESIDENTE PRETO DOS ESTADOS UNIDOS?",
    answers: [
      {text: "BARACK OBAMA", correct: true},
      {text: "RICHARD NIXON", correct: false},
      {text: "ABRAHAM LINCOLN", correct: false},
      {text: "MARTIN LUTHER KING JR", correct: false}
    ]
  },
  {
    question: "QUAL O PRIMEIRO JURISTA PRETO A PRESIDIR O SUPREMO TRIBUNAL FEDERAL?",
    answers: [
      {text: "JOAQUIM BENEDITO BARBOSA GOMES", correct: true},
      {text: "PEDRO AUGUSTO CARNEIRO LESSA", correct: false},
      {text: "RUI BARBOSA", correct: false},
      {text: "PONTES DE MIRANDA", correct: false}
    ]
  },
  {
    question: "POR QUANTOS ANOS NELSON MANDELA FOI MANTIDO PRESO PELO REGIME DO APARTHEID?",
    answers: [
      {text: "27 ANOS", correct: true},
      {text: "17 ANOS", correct: false},
      {text: "25 ANOS", correct: false},
      {text: "22 ANOS", correct: false}
    ]
  },
  {
    question: "QUAL O FUNDADOR DO MOVIMENTO “PANTERAS NEGRAS”?",
    answers: [
      {text: "MALCOLM X", correct: true},
      {text: "MARTIN LUTHER KING JR", correct: false},
      {text: "ROSA PARKS", correct: false},
      {text: "BAYARD RUSTIN", correct: false}
    ]
  },
  {
    question: "QUAL O NOME DO PATRONO DA ABOLIÇÃO DA ESCRAVIDÃO NO BRASIL?",
    answers: [
      {text: "LUIZ GAMA", correct: true},
      {text: "ZUMBI DOS PALMARES", correct: false},
      {text: "ALEIJADINHO", correct: false},
      {text: "DANDARA", correct: false}
    ]
  },
  {
    question: "QUAL DESTES PAÍSES FOI COLÔNIA PORTUGUESA NO CONTINENTE AFRICANO?",
    answers: [
      {text: "MOÇAMBIQUE", correct: true},
      {text: "SENEGAL", correct: false},
      {text: "MARROCOS", correct: false},
      {text: "ANGOLA", correct: false}
    ]
  },
  {
    question: "QUAL LUTA POPULAR ECLODIU NO MARANHÃO EM 1838 CONTRA A MISÉRIA E OPRESSÃO?",
    answers: [
      {text: "BALAIADA", correct: true},
      {text: "CABANAGEM", correct: false},
      {text: "INCONFIDÊNCIA MINEIRA", correct: false},
      {text: "GUERRA DE CANUDOS", correct: false}
    ]
  },
  {
    question: "QUAL O MOVIMENTO ARMADO POPULAR REIVINDICAVA MELHORIA NA QUALIDADE DE VIDA NA PROVÍNCIA DO GRÃO-PARÁ?",
    answers: [
      {text: "CABANAGEM", correct: true},
      {text: "SABINADA", correct: false},
      {text: "INCONFIDÊNCIA MINEIRA", correct: false},
      {text: "CONJURAÇÃO BAIANA", correct: false}
    ]
  },
  {
    question: "QUAL PINTOR RETRATOU O COTIDIANO DOS ESCRAVOS DURANTE PERÍODO COLONIAL E IMPERIAL NO BRASIL?",
    answers: [
      {text: "JEAN-BAPTISTE DEBRET", correct: true},
      {text: "JEAN-MICHEL BASQUIAT", correct: false},
      {text: "ESTEVÃO SILVA", correct: false},
      {text: "FIRMINO MONTEIRO", correct: false}
    ]
  },
  {
    question: "QUAL O SIGNIFICADO DE “QUILOMBO”?",
    answers: [
      {text: "REFÚGIO PARA ESCRAVOS FUGITIVOS", correct: true},
      {text: "LOCAL DE AÇOITE", correct: false},
      {text: "LUGAR SEGURO", correct: false},
      {text: "AGLOMERADO", correct: false}
    ]
  },
  {
    question: "Quem foi o líder quilombola que fundou o Quilombo dos Palmares?",
    answers: [
      {text: "Zumbi", correct: true},
      {text: "Chico Rei", correct: false},
      {text: "Dandara", correct: false},
      {text: "João Cândido", correct: false}
    ]
  },
  {
    question: "Qual evento histórico marcou a abolição da escravidão no Brasil?",
    answers: [
      {text: "Lei Áurea", correct: true},
      {text: "Proclamação da República", correct: false},
      {text: "Independência do Brasil", correct: false},
      {text: "Descobrimento do Brasil", correct: false}
    ]
  },
  {
    question: "Quem foi a primeira mulher negra a se tornar senadora no Brasil?",
    answers: [
      {text: "Laélia de Alcântara", correct: true},
      {text: "Benedita da Silva", correct: false},
      {text: "Marielle Franco", correct: false},
      {text: "Jovelina Pérola Negra", correct: false}
    ]
  },
  {
    question: "Qual das alternativas abaixo não é considerada uma religião afro-brasileira?",
    answers: [
      {text: "Kardecismo", correct: true},
      {text: "Candomblé", correct: false},
      {text: "Umbanda", correct: false},
      {text: "Tambor de Mina", correct: false}
    ]
  },
  {
    question: "Qual foi a primeira deputada negra do Brasil que em 2023 foi reconhecida como heroína da pátria?",
    answers: [
      {text: "Antonieta de Barros", correct: true},
      {text: "Benedida da Silva", correct: false},
      {text: "Rosângela dos Santos", correct: false},
      {text: "Alcione", correct: false}
    ]
  },
  {
    question: "Quem foi o autor da obra O QUILOMBISMO que discute a formação de uma nação afrodescendente no Brasil?",
    answers: [
      {text: "Abdias Nascimento", correct: true},
      {text: "Machado de Assis", correct: false},
      {text: "Lima Barreto", correct: false},
      {text: "Gilberto Freyre", correct: false}
    ]
  },
  {
    question: "Qual país, assim como o Brasil, foi um dos últimos países da América a abolir a escravidão?",
    answers: [
      {text: "Cuba", correct: true},
      {text: "Argentina", correct: false},
      {text: "Estados Unidos", correct: false},
      {text: "Haiti", correct: false}
    ]
  },
  {
    question: "O que foi o movimento conhecido como REVOLTA DOS MALÊS",
    answers: [
      {text: "Uma revolta de escravizados, na maioria muçulmanos, na Bahia", correct: true},
      {text: "Um levante de quilombolas no Maranhão", correct: false},
      {text: "Um protesto de negros nas Minas Gerais", correct: false},
      {text: "Uma insurreição de escravizados no Rio de Janeiro", correct: false}
    ]
  },
  {
    question: "Qual é o tipo de embarcação que ficou historicamente associada ao tráfico de escravizados africanos durante o período da escravidão?",
    answers: [
      {text: "Navio Negreiro", correct: true},
      {text: "Caravela", correct: false},
      {text: "Galeão", correct: false},
      {text: "Escuna", correct: false}
    ]
  },
  {
    question: "Qual era o nome dado ao documento que uma pessoa escravizada recebia quando passava a ser considerada livre",
    answers: [
      {text: "Carta de Alforria", correct: true},
      {text: "Quilombismo", correct: false},
      {text: "Lei Áurea", correct: false},
      {text: "Catecismo", correct: false}
    ]
  },
  {
    question: "“Toda a habitação de negros fugidos, que passem de cinco, em parte despovoada, ainda que não tenham ranchos levantados e nem se achem pilões nele.” O trecho anterior se refere a:",
    answers: [
      {text: "Quilombos", correct: true},
      {text: "Senzalas", correct: false},
      {text: "Casas-grande", correct: false},
      {text: "Espaço de comércio escravizado", correct: false}
    ]
  },
  {
    question: "Além das fugas e revoltas, a resistência dos escravizados contra a escravidão ocorreu também por meio de:",
    answers: [
      {text: "Manifestações culturais e religiosas", correct: true},
      {text: "Busca por formação universitária", correct: false},
      {text: "Guerra aos indígenas", correct: false},
      {text: "Aceitar ser catequizados pelos jesuítas", correct: false}
    ]
  },
  {
    question: "QUAL O PAÍS MAIS POPULOSO DA ÁFRICA?",
    answers: [
      {text: "NIGÉRIA", correct: true},
      {text: "ANGOLA", correct: false},
      {text: "MARROCOS", correct: false},
      {text: "GANA", correct: false}
    ]
  },
  {
    question: "NA FRONTEIRA DE QUAIS PAÍSES FICA O MONTE KILIMANJARO?",
    answers: [
      {text: "TANZÂNIA E QUÊNIA", correct: true},
      {text: "ZÂMBIA E TUNÍSIA", correct: false},
      {text: "MARROCOS ÁFRICA DO SUL", correct: false},
      {text: "GANA E NIGÉRIA", correct: false}
    ]
  },
  {
    question: "QUAL DESTES PAÍSES AFRICANOS NÃO TÊM MAIORIA PRETA?",
    answers: [
      {text: "ARGÉLIA", correct: true},
      {text: "MALI", correct: false},
      {text: "ZÂMBIA", correct: false},
      {text: "NIGÉRIA", correct: false}
    ]
  },
  {
    question: "QUAL A MAIOR REGIÃO METROPOLITANA DA ÁFRICA?",
    answers: [
      {text: "LAGOS, NIGÉRIA", correct: true},
      {text: "CAIRO, EGITO", correct: false},
      {text: "ANGOLA, MARROCOS", correct: false},
      {text: "NÍGER, GANA", correct: false}
    ]
  },
  {
    question: "QUAL O NOME DA MANSÃO DE MICHAEL JACKSON?",
    answers: [
      {text: "NEVERLAND", correct: true},
      {text: "TOMORROWLAND", correct: false},
      {text: "TOWNHOUSE", correct: false},
      {text: "LAVENDER TOWN", correct: false}
    ]
  },
  {
    question: "QUAL FOI O VENCEDOR DO OSCAR DE MELHOR FILME EM 2017?",
    answers: [
      {text: "MOONLIGHT: SOB A LUZ DO LUAR", correct: true},
      {text: "12 ANOS DE ESCRAVIDÃO", correct: false},
      {text: "LION", correct: false},
      {text: "A CHEGADA", correct: false}
    ]
  },
  {
    question: "EM QUAL CATEGORIA VIOLA DAVIS FOI PREMIADA COM UM OSCAR?",
    answers: [
      {text: "MELHOR ATRIZ COADJUVANTE, FENCES", correct: true},
      {text: "MELHOR ATRIZ, HISTÓRIAS CRUZADAS", correct: false},
      {text: "MELHOR ATRIZ COADJUVANTE, ESQUADRÃO SUICIDA ", correct: false},
      {text: "MELHOR ATRIZ COADJUVANTE, HACKER", correct: false}
    ]
  },
  {
    question: "Qual foi a primeira medalhista olímpica feminina da ginástica artística brasileira?",
    answers: [
      {text: "Rebeca Andrade", correct: true},
      {text: "Daiane dos Santos", correct: false},
      {text: "Jade Barbosa", correct: false},
      {text: "Laís Souza", correct: false}
    ]
  },
  {
    question: "Qual atleta foi a primeira campeã mundial de ginástica artística do Brasil?",
    answers: [
      {text: "Daiane dos Santos", correct: true},
      {text: "Rebeca Andrade", correct: false},
      {text: "Jade Barbosa", correct: false},
      {text: "Laís Souza", correct: false}
    ]
  },
  {
    question: "Qual atleta brasileiro de MMA, conhecido como SPIDER, foi campeão do UFC por um longo período e é considerado um dos melhores lutadores da história?",
    answers: [
      {text: "Anderson Silva", correct: true},
      {text: "José Aldo", correct: false},
      {text: "Vitor Belfort", correct: false},
      {text: "Lyoto Machida", correct: false}
    ]
  },
  {
    question: "Qual atleta negro brasileiro quebrou o recorde olímpico da prova dos 800m em Los Angeles 1984, quando se sagrou campeão olímpico?",
    answers: [
      {text: "Joaquim Cruz", correct: true},
      {text: "Taison", correct: false},
      {text: "Dani Alves", correct: false},
      {text: "Jorge Ben", correct: false}
    ]
  },
  {
    question: "Qual jogador brasileiro tem sido vítima de atos de racismo em jogos de futebol na Espanha?",
    answers: [
      {text: "Vinicius Junior", correct: true},
      {text: "Neymar", correct: false},
      {text: "Casemiro", correct: false},
      {text: "Taison", correct: false}
    ]
  },
]



