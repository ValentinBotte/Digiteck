
var notifications_1 = [];
var notifications_2 = [];
var notifications_3 = [];

function addNotification(etat){

  if(etat == 1){  //Grave
     var notification = $("<div class='rouge'></div>"); // Element
     notifications_1.push(notification);
  }else if(etat == 2){ // Moyen
     var notification = $("<div class='orange'></div>"); // Element
     notifications_2.push(notification);
  }else{  // Non grave
     var notification = $("<div class='vert'></div>"); // Element
     notifications_3.push(notification);
  }

  refreshNotifications();

}

function refreshNotifications(){
  //$("#notifications").children().remove(); //Supprime les notifications affichées

  notifications_1.forEach(function(notification){
    $("#notifications").append(notification);
  });

  notifications_2.forEach(function(notification){
    $("#notifications").append(notification);
  });

  notifications_3.forEach(function(notification){
    $("#notifications").append(notification);
  });
}
