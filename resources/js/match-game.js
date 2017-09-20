$(document).ready(function(){
  MatchGame.renderCards(MatchGame.generateCardValues(),$('#game'));
});
var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var orderedArray = [];
  for(var i=1; i<9; i++){
    orderedArray.push(i);
    orderedArray.push(i);
  }
  console.log("orderedArray: "+ orderedArray);
  var randomArray = [];
  var l = orderedArray.length;
  console.log("orderedArray.length: "+ l);
  while(l > 0) {
    var randomIndex = Math.floor(Math.random() * l);
    console.log("randomIndex: "+randomIndex);
    randomArray[l-1] = orderedArray[randomIndex];
    orderedArray.splice(randomIndex,1);
    l--;
  }
  console.log("randomArray: " + randomArray);
  return randomArray;
};

/*
  Converts card values to jQuery card objects and datas them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedCards',[]);
  var colorArray = [
    'hsl(25,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'];
  $game.empty();
  for(var i=0; i<cardValues.length; i++){
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colorArray[cardValues[i]-1]);
    $game.append($card);
  }
  $('.card').on('click', function() { MatchGame.flipCard($(this), $('#game'));});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($card.data('flipped')) return;
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('flipped', true);
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);
  if(flippedCards.length === 2){
    if(flippedCards[0].data('value') === flippedCards[1].data('value')){
      flippedCards[0].css('color', 'rgb(204, 204, 204)');
      flippedCards[0].css('background-color', 'rgb(153, 153, 153)');
      flippedCards[1].css('color', 'rgb(204, 204, 204)');
      flippedCards[1].css('background-color', 'rgb(153, 153, 153)');
    }
    else {
      setTimeout(function(){
        flippedCards[0].css('background-color', 'rgb(32, 64, 86)');
        flippedCards[0].text('');
        flippedCards[0].data('flipped', false);
        flippedCards[1].css('background-color', 'rgb(32, 64, 86)');
        flippedCards[1].text('');
        flippedCards[1].data('flipped', false);
      },500);
    }
    $game.data('flippedCards', []);
  }
};
