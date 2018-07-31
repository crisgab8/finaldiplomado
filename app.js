//capturando los elementos//
var usuario= '';

const txtEmail = document.getElementById('inputEmail');
const txtPass = document.getElementById('inputPassword');
const btnIngresar = document.getElementById('btnIngresar');
const btnCrearCuenta = document.getElementById('btnCrearCuenta');

if(btnCrearCuenta!= null){
  //function crearCuenta() 
  btnCrearCuenta.addEventListener('click',e => {
    //obteniendo el email y el password//
  
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    //Creando cuenta//
    const promesa = auth.createUserWithEmailAndPassword(email, pass);
      promesa.then(user => {
        alert("Usuario Creado exitosamente, gracias, reingrese de nuevo");
      location.href = "log-in-ingresar.html";}
    )
      .catch(e => setMensajesDeError(e) );
  });
}


  function setusuario() {
    usuario = firebase.auth().currentUser;
  }

  function getUsuario(){
    usuario = JSON.parse(localStorage.getItem("usuario"));	
   
  }
  
  function redirigirLogin(){
    location.href = "log-in-ingresar.html";
  }  

   //Añadiendo el log in//
if(btnIngresar!= null){
btnIngresar.addEventListener('click', e => {
  //obteniendo el email y el password//
  const email = txtEmail.value;
  const pass = txtPass.value;
  const auth = firebase.auth();

  //Ingresando a cuenta//
  const promesa = auth.signInWithEmailAndPassword(email, pass);
  promesa.then((respuesta) => {
    setusuario();
    localStorage.setItem("usuario", JSON.stringify(usuario));	
    location.href = "crear-denuncia.html";}   

).catch(errormsg => {
      alert("te logueaste mal "+errormsg);
    });
});
}

    //Añadiendo el boton de crear cuenta
    
      
function setMensajesDeError(mensaje)
{
  var element = document.getElementById("mensajesDeError");
  element.innerHTML=mensaje;

}    

function Desloguear(){

  firebase.auth().signOut().then(function() {
    localStorage.removeItem("usuario");
    location.href = "index.html";   
    }).catch(function(error) {
      // An error happened.
    }); 

}
