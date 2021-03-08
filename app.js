let cardsArray = new Array;
let drawCardsButton = document.getElementById("draw-button");
let sortCardsButton = document.getElementById("sort-button");
let suitsCard = ["♠","♦","♥","♣"];
let numsCard = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

//Class card
class Card {
  constructor(suit, num) {
    this.suit = suit;
    this.num = num;
  }
}

drawCardsButton.addEventListener("click", function (){
    clearSortContainer();
    let numCards = document.getElementById("inputCards").value;
    cardsArray = generateCardsArray(numCards); //cardsArray
    addDOMCards(cardsArray, false, 0) //add cards to the document
});

sortCardsButton.addEventListener("click", function (){
    clearSortContainer();
    bubbleSort(cardsArray);
});

function clearSortContainer(){
    let cardsContainerSort = document.getElementById("cardsContainerSort");
    while (cardsContainerSort.firstChild) {
    cardsContainerSort.removeChild(cardsContainerSort.firstChild);
    }
}

function addDOMCards(cardsArray, sort, numIteration){
    let cardsContainer = document.getElementById("cardsContainer");
    let cardsContainerSort = document.getElementById("cardsContainerSort");
    let cardsDOM = ""
    for (let i = 0; i < cardsArray.length; i++) {
        cardsDOM += generateDOMCard(cardsArray[i]);
    }
    if(!sort){
        cardsContainer.innerHTML =  '<div class="cards-container-row">' + cardsDOM + '</div>';
    }else{
        cardsContainerSort.innerHTML += '<div class="cards-container-sort-row"> <div class="iteration-num-container"> <p class="iteration-num">'+numIteration+'</p> </div> ' + cardsDOM + ' </div>'
    }
}

function generateDOMCard(card){
    let classColor = "";
    if(["♦","♥"].includes(card.suit)){
        return '<div class="card"> <div class="container-suit-top suit"> <p class="redColor">'+card.suit+'</p> </div> <div class="container-number"> <p>'+card.num+'</p> </div> <div class="container-suit-button suit"> <p class="redColor">'+card.suit+'</p> </div> </div>'
    }else{
        return '<div class="card"> <div class="container-suit-top suit"> <p class="blackColor">'+card.suit+'</p> </div> <div class="container-number"> <p>'+card.num+'</p> </div> <div class="container-suit-button suit"> <p class="blackColor">'+card.suit+'</p> </div> </div>'
    }
}

function generateCardsArray(numCards){
    let cardsArray = new Array;

    for (let i = 0; i < numCards; i++) {
        let card = new Card;
        card.suit = suitsCard[getRndInteger(0, suitsCard.length-1)];
        card.num = numsCard[getRndInteger(0, numsCard.length-1)];
        cardsArray.push(card);
    }
    return cardsArray;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const bubbleSort = (cardsArray) => {
    let newCardArray = cardsArray.slice();
    let wall = newCardArray.length - 1; 
    let numIteration = -1;
    while (wall > 0){
        let index = 0;
        while (index < wall) {

          if (numsCard.indexOf(newCardArray[index].num) > numsCard.indexOf(newCardArray[index + 1].num)) { 
            let aux = newCardArray[index]; 
            newCardArray[index] = newCardArray[index + 1];
            newCardArray[index + 1] = aux;
            numIteration++;
            addDOMCards(newCardArray, true, numIteration);
          }
          index++;
        }
        wall--; 
    }
    if(numIteration == -1){
         addDOMCards(newCardArray, true, 0);
    }
};
