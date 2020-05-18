const register_path = 'https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/registration/';
const login_path = 'https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/login/';
const resetPass_path = 'https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/password/reset/';


//Comprueba mediante una expresión regular que el mensaje por parámetro sea un email
function ValidateEmail(inputText)
{
   // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   var mailformat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(inputText.value.match(mailformat))
    {
        return true;
    }
    else
    {
        return false;
    }
}


//Función para comprobar que todos los campos del formulario son válidos, y para el registro del usuario
function validacionRegister() {
    document.getElementById("userRError").style.visibility="hidden";
    document.getElementById("emailError").style.visibility="hidden";
    document.getElementById("pass1Error").style.visibility="hidden"; 
    var User = document.getElementById("username"); 
    var Email = document.getElementById("email"); 
    var Password1 = document.getElementById("password1"); 
    var Password2 = document.getElementById("password2");
    User.style.border="solid black 3px"
    Email.style.border="solid black 3px"
    Password1.style.border="solid black 3px"
    Password2.style.border="solid black 3px"

    if(User.value.trim() == ""){
        User.style.border="solid 2px red";
        document.getElementById("userRError").innerHTML="Username can't be an empty string";
        document.getElementById("userRError").style.visibility="visible";
        return false;
    }else if(ValidateEmail(Email)===false){
        Email.style.border="solid 2px red";
        document.getElementById("emailError").innerHTML="Invalid email";
        document.getElementById("emailError").style.visibility="visible";
        return false;
    }else if(Password1.value.trim() == "" || Password2.value.trim() == ""){
        Password1.style.border="solid 2px red";
        Password2.style.border="solid 2px red";
        document.getElementById("pass1Error").innerHTML="Passwords can't be an empty value";
        document.getElementById("pass1Error").style.visibility="visible";
        return false;
    }else if(Password1.value.trim() != Password2.value.trim()){
        Password1.style.border="solid 2px red";
        Password2.style.border="solid 2px red";
        document.getElementById("pass1Error").innerHTML="Passwords must be the same";
        document.getElementById("pass1Error").style.visibility="visible";
        return false;
    }else{
        fetch(register_path, {
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify ({
                "username": User.value,
                "email": Email.value,
                "password1": Password1.value,
                "password2": Password2.value
            })  
        })
        .then(res => res.json())
        .then(response => {
            if (response.key) {
                window.localStorage.setItem('keyMusicApp',response.key);
                window.localStorage.setItem('rememberMusicApp',true);
                window.location.replace("/"); //redirige sin permitir retroceder
                //window.location.href="home.html"; //redirige permitiendo retroceder
            }else{
                if(response.username){
                    User.style.border="solid 2px red";
                    document.getElementById("userRError").innerHTML=response.username;
                    document.getElementById("userRError").style.visibility="visible";
                }
                if(response.email){
                    Email.style.border="solid 2px red";
                    document.getElementById("emailError").innerHTML=response.email;
                    document.getElementById("emailError").style.visibility="visible";
                }
                if(response.password1){
                    Password1.style.border="solid 2px red";
                    Password2.style.border="solid 2px red";
                    document.getElementById("pass1Error").innerHTML=response.password1;
                    document.getElementById("pass1Error").style.visibility="visible";
                }
            }
        })
        .catch(error => console.error('Error:', error));
        return false;
    }
}


//Función para comprobar que todos los campos del formulario son válidos, y para el login del usuario
function validacionLogin() {
    var checked = document.getElementById("checkbox").checked;
    var exito=0;
    document.getElementById("userError").style.visibility="hidden";
    document.getElementById("passLoginError").style.visibility="hidden";
    var UserEmail = document.getElementById("usernameEmail"); 
    var Password = document.getElementById("passwordLogin");
    UserEmail.style.border="solid black 3px";
    Password.style.border="solid black 3px";

    if (UserEmail.value.trim() == ""){
        UserEmail.style.border="solid 3px red";
        document.getElementById("userError").innerHTML="This field can't be an empty parameter";
        document.getElementById("userError").style.visibility="visible";
        return false;
    }else if(Password.value.trim()  == ""){
        Password.style.border="solid 3px red";
        document.getElementById("passLoginError").innerHTML="The password can't be empty";
        document.getElementById("passLoginError").style.visibility="visible";
        return false;
    }else if(ValidateEmail(UserEmail)){
        fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/login/', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify ({
                "username": '',
                "email": UserEmail.value,
                "password": Password.value
            })     
        })
        .then(res => res.json())
        .then(response => {
            if (response.key) {
                window.localStorage.setItem('keyMusicApp',response.key);
                if(checked){
                    window.localStorage.setItem('rememberMusicApp',true);
                }else{
                    window.localStorage.setItem('rememberMusicApp',false);
                }
                window.location.replace("/"); //redirige sin permitir retroceder
                //window.location.href="home.html"; //redirige permitiendo retroceder
            }else{
                Password.style.border="solid 2px red";
                document.getElementById("passLoginError").innerHTML="Email or password invalid.";
                document.getElementById("passLoginError").style.visibility="visible";
            }
        })
        .catch(error => console.error('Error:', error));
        return false;
    }else{
        fetch('https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/login/', {
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify ({
                "username": UserEmail.value,
                "email": '',
                "password": Password.value
            })     
        })
        .then(res => res.json())
        .then(response => {
            if (response.key) {
                if (typeof(localStorage) !== "undefined") {
                    window.localStorage.setItem('keyMusicApp',response.key);
                    if(checked){
                        window.localStorage.setItem('rememberMusicApp',true);
                    }else{
                        window.localStorage.setItem('rememberMusicApp',false);
                    }
                    window.location.replace("/"); //redirige sin permitir retroceder
                    //window.location.href="home.html"; //redirige permitiendo retroceder
                } else {
                    alert("El navegador no permite la funcionalidad");
                }
            }else{
                Password.style.border="solid 2px red";
                document.getElementById("passLoginError").innerHTML="Username or password invalid.";
                document.getElementById("passLoginError").style.visibility="visible";
            }
        })
        .catch(error => console.error('Error:', error));
        return false;
    }    
}


function recover(){
    document.getElementById("recover-feedback").style.visibility="hidden";
    var recEmail=document.getElementById("emailRecu");
    recEmail.style.border="solid black 3px";
    if (ValidateEmail(recEmail)===false){
        recEmail.style.border="solid 3px red";
        document.getElementById("recover-feedback").innerHTML="Please insert a valir email";
        document.getElementById("recover-feedback").style.visibility="visible";
        return false;
    }else{

        fetch(resetPass_path, {
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify ({
                "email": recEmail.value
            })     
        })


        //Funcion de recuperacion de email
        document.getElementById("recover-feedback").innerHTML="A recovery email has been successfully sent to the given email address";
        document.getElementById("recover-feedback").style.visibility="visible";
        return false;
    }
}