$(function() {

  var ETAT_BANDEAU_NOTIFICATION = 0; // 0 etat petit - 1 etat grand



  /*addNotification(1);
  addNotification(2);
  addNotification(3);
  addNotification(3);*/



  // Gestion affichage des notifications
  $( "#controle_notification" ).click(function() {
    if(ETAT_BANDEAU_NOTIFICATION == 0){
      $('#controle_notification').css({ WebkitTransform: 'rotate(180deg)'});
      $('#controle_notification').css('left', '17vw');
      $('#notifications').width('15vw');
      ETAT_BANDEAU_NOTIFICATION = 1;
    }else{
      $('#controle_notification').css({ WebkitTransform: 'rotate(0deg)'});
      $('#controle_notification').css('left', '7vw');
      $('#notifications').width('5vw');
      ETAT_BANDEAU_NOTIFICATION = 0;
    }
  });

});
