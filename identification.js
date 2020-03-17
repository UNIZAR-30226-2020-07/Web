var path = "https://ps-20-server-django-app.herokuapp.com/api/v1/rest-auth/registration/";


function validacion() {
    var User = document.getElementById("username"); 
    var Email = document.getElementById("email"); 
    var Password1 = document.getElementById("password1"); 
    var Password2 = document.getElementById("password2");

    if (User.value.trim() == ""){
        //alert("Username empty");
        User.style.border="solid 3px red"
        document.getElementById("userError").style.visibility="visible";
        return false;
    }else if((Password1.value.trim() != Password2.value.trim()) || Password1.value.trim() == "" || Password2.value.trim() == ""){
        alert("Error en las passwords");
        return false;
    }else{
        return true;
    }
}