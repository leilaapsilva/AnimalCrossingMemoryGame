//TODO: Adicionar novos cards aleatoriamente no início do jogo

//TODO: Adicionar dois cards com o mesmo numero


//criar logica para ser um numero que ainda nao foi
function getCardNumber(){

  number = Math.floor(Math.random() * 20) + 1; //random from 1 to 100
  strNumber = ("00" + number).slice(-3)

  console.log(strNumber);

  cardsList.push(strNumber);

  return strNumber;
}

var cardsList = [];
console.log("cardslist: ", cardsList);


//adiciona dois cards com um personagem e uma imagem de verso
function addCard() { 

    var cardNumber = getCardNumber();

    var newDiv = document.createElement("div"); //cria a nova div
    newDiv.className = "memory-card"; //define a classe da div
    newDiv.setAttribute("data-name", cardNumber);

    var newDiv2 = document.createElement("div"); //cria a nova div
    newDiv2.className = "memory-card"; //define a classe da div
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

for(i = 0; i<6; i++){
  addCard()

}

//seleciona todos os cards
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() { //vira card
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
}

(function shuffle() { //embaralha os cards no início do jogo
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));