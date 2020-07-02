
menuScene();

//aguarda o carregamento da pagina
function onReady(callback){
  var intervalId = window.setInterval(function(){
    if (document.getElementsByTagName('body')[0] !== undefined){
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible){
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function(){
  setVisible('.menu-class', true);
  setVisible('#loading', false);
});


function menuScene(){

  //Start Button
  var startButton = document.createElement("img");
  startButton.setAttribute("id", startButton);
  //startButton.innerHTML = "Start";
  startButton.className = "menu-button";
  startButton.src = "img/isabelle.png";
  startButton.id = "isabelle";
  startButton.setAttribute("width", "300px");
  //startButton.src = "img/play.png";

  // var creditsButton = document.createElement("button");
  // creditsButton.setAttribute("id", creditsButton);
  // creditsButton.innerHTML = "Créditos";
  // creditsButton.className = "menu-button";


  //Menu com botões
  var menuDiv = document.createElement("div");
  menuDiv.appendChild(startButton);
  // menuDiv.appendChild(creditsButton);


  //adiciona div à section
  var menuSection = document.getElementById("menu-section");
  menuSection.appendChild(menuDiv);


  startButton.addEventListener ("click", function() {
    menuSection.remove();
    gameScene();
  });
}


//Inicia o jogo
//gameScene()

//Cena do jogo em si
function gameScene() {

  const num_max = 20; //numero do maior card

  var cardsList = []; //lista de cards
  console.log("cardslist: ", cardsList);

  //Função que gera o número do card a ser adicionado
  function getCardNumber() {

    number = Math.floor((Math.random() * num_max)) + 1; //random de 1 a num_max

    while (cardsList.includes(number)) { //elimina cartas repetidas
      number = Math.floor((Math.random() * num_max)) + 1;
    }

    strNumber = ("00" + number).slice(-3) //transforma no formato "001" - "999"

    cardsList.push(number); //adiciona o card na lista

    return strNumber;
  }

  //adiciona dois cards com um personagem e uma imagem de verso
  function addCard(level) {

    var cardNumber = getCardNumber();

    var newDiv = document.createElement("div"); //cria a nova div
    newDiv.classList.add("memory-card"); //define a classe da div
    newDiv.classList.add(level);
    newDiv.setAttribute("data-name", cardNumber);

    var newDiv2 = document.createElement("div"); //cria a nova div
    newDiv2.classList.add("memory-card"); //define a classe da div
    newDiv2.classList.add(level);
    newDiv2.setAttribute("data-name", cardNumber);

    // CARD 1

    //cria imagem do personagem
    var newImgFront = document.createElement("img");
    newImgFront.className = "front-face";
    newImgFront.src = 'img/' + cardNumber + '.png';

    //cria imagem do verso
    var newImgBack = document.createElement("img");
    newImgBack.className = "back-face";
    newImgBack.src = 'img/back.png';

    //adiciona imagens à div
    newDiv.appendChild(newImgFront);
    newDiv.appendChild(newImgBack);

    // CARD 2

    //cria imagem do personagem
    var newImgFront2 = document.createElement("img");
    newImgFront2.className = "front-face";
    newImgFront2.src = 'img/' + cardNumber + '.png';

    //cria imagem do verso
    var newImgBack2 = document.createElement("img");
    newImgBack2.className = "back-face";
    newImgBack2.src = 'img/back.png';

    newDiv2.appendChild(newImgFront2);
    newDiv2.appendChild(newImgBack2);

    //adiciona div à section
    var section = document.getElementById("section");
    section.appendChild(newDiv);
    section.appendChild(newDiv2);
    console.log(section);
  }

  level = "level1";
  // adiciona 12 pares de cards
  for (i = 0; i < 6; i++) {
    x = addCard(level);
  }

  //clicks counter
  var counter = document.createElement("h2");
  counter.setAttribute("id", "counter");
  counter.setAttribute("value", 99)
  counter.innerHTML = "0";

  var counterDiv = document.createElement("div");

  counterDiv.appendChild(counter);

  document.body.appendChild(counterDiv);


  // quando todas as divs da classe memory-card tiverem flip, todos os cards estarao virados
  // nivel concluído
  function checkLevelEnd(level){
    numCards = document.getElementsByClassName("memory-card").length;
    //console.log(": \n\n " + numCards)

    numFlippedCards = document.getElementsByClassName("flip").length;
    //console.log(numFlippedCards);

    if(numCards == numFlippedCards){
      alert("parabens");
    }
  }

  //seleciona todos os cards
  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  var qtd = 0;

  function flipCard() { //vira card

    //conta quantidade de clicks
    qtd++;
    console.log(qtd);
    counter.innerHTML = qtd.toString();

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;

      return;
    }

    // second click
    secondCard = this;

    checkForMatch(); //verifica se é igual
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() { //quando o card já está correto, é desabilitado
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() { //desvira o card, quando está errado
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    checkLevelEnd(1);
  }

  (function shuffle() { //embaralha os cards no início do jogo
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard));

}

