$(function() {

  function Bateau (posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  var bateau = new Bateau(1, 1);
  console.log(bateau.posX);

});
