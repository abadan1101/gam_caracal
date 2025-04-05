//---------------------CONFIGURAÇÕES DO LOGIN--------------------------------




//PROVISÓRIO----------------------------------------------------------


//variáveis que serão definidas durante o login do usuário
var tipoAcess = "supervisão" // supervisão, planejamento
var profAcess = "VN" // VN, SV, MV, APO, PLN

//personalização do perfil ativo
document.getElementById("imgPerf").src = "./img/logo"+profAcess+".png";
document.getElementById("nomePerf").innerHTML = profAcess;

//bloqueia aplicações dependendo do tipo de acesso
const tipAcs = [...document.querySelectorAll(".tipAcs")]
if(tipoAcess == "planejamento"){
	tipAcs.map((el)=>{
		el.style.display = "none";
	})
}else{
	tipAcs.map((el)=>{
		el.style.display = "block";
	})
}
//-------------------------------------------------------------------
