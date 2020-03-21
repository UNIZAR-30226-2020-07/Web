var register_path = "https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/registration";

//Comprueba mediante una expresión regular que el mensaje por parámetro sea un email
function ValidateEmail(inputText)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        return false;
    }
}

//Función para comprobar que todos los campos del formulario son válidos, y para el login del usuario
function validacionLogin() {
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
        //El usuario introduce un email
        return false;
    }else{
        //El usuario introduce un nombre de usuario
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
        //Funcion de recuperacion de email
        document.getElementById("recover-feedback").innerHTML="A recovery email has been successfully sent to the given email address";
        document.getElementById("recover-feedback").style.visibility="visible";
        return false;
    }
}
