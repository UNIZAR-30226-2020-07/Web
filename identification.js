var register_path = "https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/registration/";

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


function validacionRegister() {
    document.getElementById("userError").style.visibility="hidden";
    document.getElementById("emailError").style.visibility="hidden";
    var User = document.getElementById("username"); 
    var Email = document.getElementById("email"); 
    var Password1 = document.getElementById("password1"); 
    var Password2 = document.getElementById("password2");
    User.style.border="none"
    Email.style.border="none"
    Password1.style.border="none"

    if(User.value.trim() == ""){
        User.style.border="solid 2px red"
        document.getElementById("userError").innerHTML="Username can't be an empty value";
        document.getElementById("userError").style.visibility="visible";
        return false;
    }else if(ValidateEmail(Email)===false){
        Email.style.border="solid 2px red"
        document.getElementById("emailError").innerHTML="Invalid email";
        document.getElementById("emailError").style.visibility="visible";
        return false;
    }else if(Password1.value.trim() == "" || Password2.value.trim() == ""){
        Password1.style.border="solid 2px red"
        document.getElementById("passError").innerHTML="Passwords can't be an empty value";
        document.getElementById("passError").style.visibility="visible";
        return false;
    }else if(Password1.value.trim() != Password2.value.trim()){
        Password1.style.border="solid 2px red"
        document.getElementById("passError").innerHTML="Passwords must be the same";
        document.getElementById("passError").style.visibility="visible";
        return false;
    }else{
        return true;
    }
}

function validacionLogin() {
    var UserEmail = document.getElementById("username"); 
    var Email = document.getElementById("email"); 
    var Password1 = document.getElementById("password1");

    if (User.value.trim() == ""){
        User.style.border="solid 3px red"
        document.getElementById("userError").style.visibility="visible";
        return false;
    }else if(ValidateEmail(Email)){
        Email.style.border="solid 3px red"
        document.getElementById("emailError").style.visibility="visible";
        return false;
    }else if((Password1.value.trim() != Password2.value.trim()) || Password1.value.trim() == "" || Password2.value.trim() == ""){
        alert("Error en las passwords");
        return false;
    }else if((Password1.value.trim() != Password2.value.trim()) || Password1.value.trim() == "" || Password2.value.trim() == ""){
        alert("Error en las passwords");
        return false;
    }else{
        return true;
    }
}