const gameview = require('./controllers/game-view.js');
const logger = require('../utils/logger');

function checkRating(){
  const rating = document.forms["addGameForm"]["rating"].value;
  
  if(rating > 0 && rating <= 5){
    return true;
  }else {
    alert("Please enter a rating between 0 to 5");
    return false;
  }
}
