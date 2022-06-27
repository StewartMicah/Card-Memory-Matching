// const cardAmmountEl = document.getElementById('cardCount');
const testButtonEl = document.getElementById('test');
const cardAmmountEl = 20;

// var cardAmmount = cardAmmountEl.value;
var cardFaces = [];
function test(){
    for (var x = 0; x < cardAmmount/2; x++){
    cardFaces.push(`${x}`);
    cardFaces.push(`${x}`);
    console.log(cardFaces);
    }
}

testButtonEl.addEventListener("click" ,test);