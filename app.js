const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");



const url_api = "http://localhost/controleponto-api/api/v1";
// const url_api = "https://projetopontoapi.000webhostapp.com/api/v1";

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


$("#btnLogin").click(function(){
 
 var p_userName = "";
 var p_userPassword = "";
 
 //verificando se usuario e senha estão preenchidos
 if($("#txtUserName").val() == '' || $("#txtUserName").length == 0)
 {
	 alert("Informe o nome do usuário.");
	 return;
 }
 else
 {
	  //Setando o nome do usuario em uma variavel para passar no post
	  p_userName= $("#txtUserName").val();
 }
 
 if($("#txtPassword").val() == '' || $("#txtPassword").length == 0)
 {
	 alert("Informe a senha.");
	 return;
 } 
 else
 {
	p_userPassword = $("#txtPassword").val();
 }
 

$.ajax({
        url : `${url_api}/user/search/index.php`,
        type: "POST",
        data: JSON.stringify( {username: p_userName, password : p_userPassword}),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(obj){
			try{
				var parse = obj[0];
				localStorage.setItem('token', parse.authToken);
				localStorage.setItem('name', parse.name);
			
				window.location.href = "initiallogged.html";
		}catch(ex){
			alert("Erro ao Logar");
		}
    }
    });




//botão cadastrar
$("#btnCadastrar").click(function(){
 
 var p_userName = "";
 var p_Name = "";
 var p_userPassword = "";
 var p_email = "";
 
 // //verificando se usuario e senha estão preenchidos
 if($("#txtUserNameCad").val() == '' || $("#txtUserNameCad").length == 0)
 {
	  alert("Informe o nome.");
	  return;
  }
  else
  {
	  // //Setando o nome do usuario em uma variavel para passar no post
	   p_userName= $("#txtUserNameCad").val();
 }
 
 if($("#txtNameCad").val() == '' || $("#txtNameCad").length == 0)
 {
	  alert("Informe o nome do usuário.");
	  return;
  }
  else
  {
	  // //Setando o nome do usuario em uma variavel para passar no post
	   p_Name= $("#txtNameCad").val();
 }
 
 console.log($("#txtPasswordCad").val());
 if($("#txtPasswordCad").val() == '' || $("#txtPasswordCad").length == 0)
  {
	  alert("Informe a senha.");
	  return;
  } 
 else
 {
	p_userPassword = $("#txtPasswordCad").val();
  }
  
  if($("#txtEmailCad").val() == '' || $("#txtEmailCad").length == 0)
  {
	  alert("Informe o email.");
	  return;
  } 
 else
 {
	p_email = $("#txtEmailCad").val();
  }
 
 
$.post('https://projetopontoapi.000webhostapp.com/api/v1/user/new/index.php', {username: p_userName, password : p_userPassword, name : p_Name, email:p_email})
    .done(function(msg){  
		
		alert("usuario cadastrado com sucesso. Faça seu login.")
		window.location.href = "login.html";
	})
    .fail(function(xhr, status, error) {
	
	if(xhr.status == 400)
	{
		alert("Erro na requisição");
	}
	
	if(xhr.status == 500)
	{
		alert("Erro interno do servidor");
	}
	
    });
});



function setcookie(name, value, days)
{
  if (days)
  {
    var date = new Date();
    date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  }
  else
    var expires = "";
  document.cookie = name+"=" + value+expires + ";path=/"; // + and " added
}
});