//Quando a página é carregada completamente
window.onload = function(){ 
  //document.getElementById("loading").style.display = "none"
  setVisible('.menu-class', true);
  setVisible('#loading', false);

  this.menuScene();
}


//inicia a página apenas com o menu
//menuScene();

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

// onReady(function(){
//   setVisible('.menu-class', true);
//   setVisible('#loading', false);
// });


function menuScene(){

  //Start Button
  var startButton = document.createElement("img");
  startButton.setAttribute("id", startButton);
  //startButton.innerHTML = "Start";
  startButton.className = "menu-button";
  startButton.src = "img/isabelle-start.png";
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
    gameScene(1);
  });
}

//Inicia o jogo
//gameScene()

//Cena do jogo em si
function gameScene(level) {

  

   //Cria section do jogo
   var gameSection = document.createElement("section");
   gameSection.id = "section";
   gameSection.className = "memory-game";
   document.body.appendChild(gameSection);


  //Barra de navegação superior
  var topNav = document.createElement("div");
  topNav.className = "topnav";
  var test1 = document.createElement("a");
  test1.className = "active";
  test1.innerHTML = "Home";

  //Botão música
  var musicButton = document.createElement("audio");
  musicButton.id = "background-music";
  musicButton.src = "sounds/acnh-theme.mp3";
  musicButton.type = "audio/mpeg";

  var musicButtonImg = document.createElement("img");
  musicButtonImg.id = "playAudio";
  musicButtonImg.src = "img/play.png";
  //musicButtonImg.width = "50px";
  //musicButtonImg.height = "50px";

  topNav.appendChild(musicButtonImg);

  //<audio id="background-music" hidden src="sounds/acnh-theme.mp3" autoplay type="audio/mpeg"></audio>
  //<img id="playAudio" src="img/play.png" width="50px" height="50px">


  //topNav.appendChild(test1);
  gameSection.appendChild(topNav); 

  document.getElementById("playAudio").addEventListener("click", function () {
    var audio =musicButton;

    audio.play(); //autoplay
    if (this.className == 'is-playing') {
      this.className = "";
      this.src = "img/mute.png"
      audio.pause();
    } else {
      this.className = "is-playing";
      this.src = "img/play.png"
      audio.play();
    }

  });

  //id="section" class="memory-game"


  //converte o nível para string
  strLevel = "level" + level.toString();
  //alert(strLevel);

  const num_max = 50; //numero do maior card

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
  function addCard(strLevel) {

    var cardNumber = getCardNumber();

    var newDiv = document.createElement("div"); //cria a nova div
    newDiv.classList.add("memory-card"); //define a classe da div
    newDiv.classList.add(strLevel);
    newDiv.setAttribute("data-name", cardNumber);

    var newDiv2 = document.createElement("div"); //cria a nova div
    newDiv2.classList.add("memory-card"); //define a classe da div
    newDiv2.classList.add(strLevel);
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
    //var section = document.getElementById("section");
    gameSection.appendChild(newDiv);
    gameSection.appendChild(newDiv2);
    //console.log(section);
  }

  //strLevel = "level" + level.toString();

  num_pares = 0;
  switch(level){
    case (1): 
      num_pares = 6;
      break;
    case (2): 
      num_pares = 8;
      break;
    case (3):
      num_pares = 10;
      break;
    case (4):
      num_pares = 12;   
      break;
  }

  strLevel = "level" + level.toString();

  // adiciona os pares de cards de acordo com o nível
  for (i = 0; i < num_pares; i++) {
    x = addCard(strLevel);
  }

  //clicks counter
  var counterLabel = document.createElement("h2");
  counterLabel.setAttribute("id", "counterLabel");
  counterLabel.innerHTML = "Cliques: ";

  var counter = document.createElement("h2");
  counter.setAttribute("id", "counter");
  counter.setAttribute("value", 99)
  counter.innerHTML = "0";

  var counterDiv = document.createElement("div");

  counterDiv.appendChild(counterLabel);
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
      //alert("Nível " + level.toString() + " concluído :)");

      //remove cartas do nível atual
      const elements = document.getElementsByClassName(strLevel);
      while (elements.length > 0) elements[0].remove();

      counterDiv.remove();

      //inicia tela do próximo nível
      level = level+1;
      gameScene(level);
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
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    checkLevelEnd(level);
  }

  (function shuffle() { //embaralha os cards no início do jogo
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard));

}

