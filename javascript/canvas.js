
  // CANVAS DU RADAR
  let radar = new PIXI.Application({
    width: $( window ).width(),
    height: $( window ).height(),
    antialias: true,
    transparent: true,
    resolution: 1
  });

  /*

    Position du radar toujours centrer

  */
  radar.view.style.position = 'absolute';
  radar.view.style.left = '0px';
  radar.view.style.top = '0px';

  /*
      Chargement des images
  */
  PIXI.loader
      .add("images/fond.png")
      .add("images/radar.png")
      .add("images/navigation.png")
      .add("images/boat_valid.png")
      .add("images/navigation0.png")
      .add("images/navigation1.png")
      .add("images/navigation2.png")

      .load(setup);

  document.body.appendChild(radar.view);  // On lance




var bounds = new PIXI.RoundedRectangle(
    725,
    580,
    300,
    200,
    100
);


var count = 0;
var bateaux = [];
var tempsSeconde = 0;
var tempsTemp = 0;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

  /*

    Méthode calibrée à 60 fps

  */
  function setup() {


      // BACKGROUND
      let fond = new PIXI.Sprite(PIXI.loader.resources["images/fond.png"].texture);
      fond.position.set(0, 0);
      fond.width = $( window ).width();
      fond.height = $( window ).height();

      radar.stage.addChild(fond);

      // RADAR
      let radarI = new PIXI.Sprite(PIXI.loader.resources["images/radar.png"].texture);
      radarI.position.set(650, 400);
      radarI.width = 479;
      radarI.height = 470;

      radar.stage.addChild(radarI);

      /*

            BATEAU DE BASE ROUGE
      */

      let boat = new PIXI.Sprite(PIXI.loader.resources["images/navigation1.png"].texture);
      boat.position.set(420, 310);
      boat.rotation = 0.2;
      boat.alpha = 0;

      // GESTION DU CLIQUE SUR LE BATEAU
      boat.interactive = true;
      boat.on('click', (event) => {
          // ICI LE CODE POUR AFFICHER LES INFOS LIEE AU BATEAU
          alert("coucou");
      });

      radar.stage.addChild(boat);



      requestAnimationFrame( animate );

  }

  function animate() {

    tempsTemp++;
    if(tempsTemp > 60){
      tempsSeconde++;
      tempsTemp = 0;
      temps();
    }

    count += 0.05;

       for (var i = 0; i < bateaux.length; i++) {
            var bateau = bateaux[i];

            bateau.direction += bateau.turnSpeed * 0.01;
            bateau.position.x += Math.sin(bateau.direction) * bateau.speed;
            bateau.position.y += Math.cos(bateau.direction) * bateau.speed;

            bateau.rotation = -bateau.direction - Math.PI/2;

            // wrap the maggots around as the crawl
            if (bateau.x < bounds.x) {
                bateau.x += bounds.width;
            }
            else if (bateau.x > bounds.x + bounds.width) {
                bateau.x -= bounds.width;
            }

            if (bateau.y < bounds.y) {
                bateau.y += bounds.height;
            }
            else if (bateau.y > bounds.y + bounds.height) {
                bateau.y -= bounds.height;
            }
        }

    requestAnimationFrame( animate );


  }




  /*

      METHODE GESTION DE LA LIGNE DE tempsSeconde

      3s - Bateau (0)
      5s - Bateau (0)
      10s - Bateau (1)
      15s - Bateau (0)
      20s - Bateau (2)

      tempsSeconde retourne les secondes

*/

function temps(){

      switch (tempsSeconde) {
        case 3:
          var gravite = 0;
        break;
        case 5:
          var gravite = 0;
        break;
        case 10:
          var gravite = 1;
        break;
        default:
      }

      if (typeof gravite !== 'undefined') {


      var bateau =  PIXI.Sprite.fromImage('images/navigation' + gravite + '.png');
      bateau.anchor.set(0.5);
      //bateau.rotation = Math.PI;
      radar.stage.addChild(bateau);

      bateau.direction = getRandomArbitrary(Math.PI, (11*Math.PI)/6 );
      bateau.speed = 0.03;
      bateau.turnSpeed = 0.03;

      bateau.position.x = Math.random() * bounds.width + 725;
      bateau.position.y = Math.random() * bounds.height + 580;

      bateau.scale.set(1 + Math.random() * 0.3);
      bateau.original = new PIXI.Point();
      bateau.original.copy(bateau.scale);

      bateau.gravite = gravite;

      bateaux.push(bateau);

}
}
