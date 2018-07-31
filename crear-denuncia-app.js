setDate();
denunciasList();

function setDate() {
    date = document.getElementById('inputFecha');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    //today = dd+'/'+mm+'/'+yyyy;     
    today = yyyy + '-' + mm + '-' + dd;
    $(date).attr('value', today);
    z = $(date).attr('value');
    return today;
}
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
function submitDenuncia() {
    var formvalues = $("formDenuncia").serialize();
    const elDenuncia = document.getElementById('inputTipoDenuncia').value;
    const elFecha = document.getElementById('inputFecha').value;
    const elDireccion = document.getElementById('inputAddres').value;
    const elComentario = document.getElementById('inputComentarios').value;
    let dataDenuncia = {
        "idDenuncia": guid(),
        "user": 'cristy2',
        "tipo": elDenuncia,
        "fecha": elFecha,
        "direccion": elDireccion,
        "comentario": elComentario,
        "estado": 'pendiente',
    }
    const db = conectarAFirebase();
    db.ref('denuncias/').push(dataDenuncia);
}
function denunciasList() {
    let divDenunciasList = $("#denuncias");
    divDenunciasList.InnerHTML = '';
    let elDenunciasList = $("#listadeDeDenuncias");

    const db = conectarAFirebase();
    let dbDenuncias = db.ref('denuncias');
    let lineaDivisoria= '</td> <td>|</td"> <td>' 
    dbDenuncias.on("value", function (denuncias) {
        elDenunciasList.append("<li>  FECHA       TIPO      COMENTARIO </li>");
        let linea = 0;
        elDenunciasList.empty();
        elDenunciasList.append(
            " <tr> <td>" 
            + lineaDivisoria
            + "<strong> Fecha </strong>"
            + lineaDivisoria
            + "<strong> Tipo </strong>"
            + lineaDivisoria
            + "<strong> Comentario </strong>"
            + lineaDivisoria
            + "<strong> Estado </strong>"
            + " </td> </tr>"
        );
        denuncias.forEach(function (denunciaItem) {
            linea++;
            elDenunciasList.append(
                    " <tr> <td>" 
                    //+ "<a href="+"# onclick="+"ShowDenunciaById("+denunciaItem.val().idDenuncia+')"'+">" +denunciaItem.val().idDenuncia+" </a>"
                    + lineaDivisoria
                    + denunciaItem.val().fecha 
                    + lineaDivisoria
                    + denunciaItem.val().tipo 
                    + lineaDivisoria
                    + denunciaItem.val().comentario 
                    + lineaDivisoria
                    + denunciaItem.val().estado 
        )});
    });
}
function ShowDenunciaById(idDenuncia) {
    alert("showDenuncia");
    let denuncia = getDenuncia(idDenuncia);
    const elDenuncia = document.getElementById('inputTipoDenuncia').value;
    const elFecha = document.getElementById('inputFecha').value;
    const elDireccion = document.getElementById('inputAddres').value;
    const elComentario = document.getElementById('inputComentarios').value;
    $("#inputTipoDenuncia").val(denuncia.val().tipo)
    $("#inputFecha").val(denuncia.val().fecha)    
    $("#inputComentarios").val(denuncia.val().comentario)    
}
function getDenuncia(idDenuncia) {
    const db = conectarAFirebase();
    let dbDenuncias = db.ref('denuncias');  
    dbDenuncias.orderByChild("idDenuncia").equalTo(idDenuncia).on("child_added", function (denuncia) {
        return denuncia;
    });
}
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

//Mapa denuncia
var complaintMap = L.map('complaintMap').setView([18.471629, -69.892037], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(complaintMap);
function onMapClick(e) {
    var actualLocation = e.latlng;
    $('#inputAddres').val(actualLocation.lat + ', ' + actualLocation.lng);
}
complaintMap.on('click', onMapClick);



