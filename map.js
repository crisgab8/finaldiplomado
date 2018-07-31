$(document).ready(()=>{
    $('#btnSalir').on("click", ()=>{       
      Desloguear();     
      });

    getUsuario();
    console.log(usuario);
    if ( usuario!= null) {
      $('#usarioAnonimo').addClass("d-none");
     
    }
     else {
      $('#usuarioLogueado').addClass("d-none");

     }           
})  

function conectarAFirebase() {
    if (database === undefined) {
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyDDcNih7sDqnCMqX3a-ezcnQIGZpunNUdY",
            authDomain: "final-diplomado-cristy.firebaseapp.com",
            databaseURL: "https://final-diplomado-cristy.firebaseio.com",
            projectId: "final-diplomado-cristy",
            storageBucket: "final-diplomado-cristy.appspot.com",
            messagingSenderId: "366100902159"
        };
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        var database = firebase.database();
    }
    return database;
}
conectarAFirebase();
var internalMap = L.map('internalMap').setView([18.471629, -69.892037], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(internalMap); 
  

denunciasDb = firebase.database().ref('denuncias');
denunciasDb.on('value', sucess, error);
var markers = [];
function sucess(data) {
    var denunciasCompletas = data.val();
    var denunciasKeys = Object.keys(denunciasCompletas);
    for (var i = 0; i < denunciasKeys.length; i++){
        var denunciaActual = denunciasKeys[i];
        var denunciaDireccion = denunciasCompletas[denunciaActual].direccion;
        var denunciaTipo = denunciasCompletas[denunciaActual].tipo;
        markers[i] = [denunciaDireccion, denunciaTipo];
    }
    for (var a = 0; a < markers.length; a++) {
        var longitudLatitud = markers[a][0]; 
        longitudLatitud = longitudLatitud.split(",");
        var lat = longitudLatitud[0];
        var lon = longitudLatitud[1];
        var popupText = markers[a][1];
        var markerLocation = new L.LatLng(lat, lon);
        var marker = new L.Marker(markerLocation);
        internalMap.addLayer(marker);
        marker.bindPopup(popupText);
    }
}

function error(e) {
    console.log(e);
}