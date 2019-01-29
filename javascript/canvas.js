
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
      .add("images/boat.png")
      .add("images/boat_valid.png")
      .load(setup);

  document.body.appendChild(radar.view);  // On lance



var container = new PIXI.Container();
radar.stage.addChild(container);

var bounds = new PIXI.RoundedRectangle(
    470,
    480,
    300,
    200,
    100
);


var count = 0;
var bateaux = [];


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
      radarI.position.set(400, 300);
      radarI.width = 479;
      radarI.height = 470;

      radar.stage.addChild(radarI);

      for (var i = 0; i < 5; i++)
      {
          var bateau =  PIXI.Sprite.fromImage('images/boat.png');
          bateau.anchor.set(0.5);
          //bateau.rotation = getRandomArbitrary(Math.PI, (11*Math.PI)/6 );
          radar.stage.addChild(bateau);

          bateau.direction = getRandomArbitrary(Math.PI, (11*Math.PI)/6 );
          bateau.speed = 0.05;
          bateau.turnSpeed = 0.05;

          bateau.x = Math.random() * bounds.width;
          bateau.y = Math.random() * bounds.height;

          bateau.scale.set(1 + Math.random() * 0.3);
          bateau.original = new PIXI.Point();
      	  bateau.original.copy(bateau.scale);

          bateau.gravite = Math.round(getRandomArbitrary(0, 2));
          bateaux.push(bateau);

      }
      /*

            BATEAU DE BASE ROUGE
      */

      let boat = new PIXI.Sprite(PIXI.loader.resources["images/boat.png"].texture);
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

    count += 0.05;

        for (var i = 0; i < bateaux.length; i++) {
            var bateau = bateaux[i];

            bateau.direction += bateau.turnSpeed * 0.01;
            bateau.x += Math.sin(bateau.direction) * bateau.speed;
            bateau.y += Math.cos(bateau.direction) * bateau.speed;

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
