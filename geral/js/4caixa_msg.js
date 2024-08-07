//CONSTRUTOR DA CAIXA DE MENSAGENS

//caixa para aviso
function cxAviso(){
	const body = document.body
	const caixaMSG = document.createElement("dialog")
	caixaMSG.setAttribute("id","msgAlert")
	body.append(caixaMSG)

	const caixaMSGfull = 
		"<div class='msgAlert'><img src='#' alt='Logo' id='iconAlert'></div>"+
		"<div class='msgAlert'><h6 id='msgAlertText'>texto de alerta</h6></div>"+
		"<div class='msgAlert'><p id='msgAlertAct'>texto da ação</p></div>"+
		"<div class='msgAlert'>"+
			"<button id='msgAlertBtn'>OK</button>"+
			"<button id='msgAlertBtnY'>SIM</button>"+
			"<button id='msgAlertBtnN'>NÃO</button>"+
		"</div>"
	caixaMSG.innerHTML += caixaMSGfull
}

//_________________________________________________________________________________________________
//-------------------------------------------------------------------------------------------------




// --------------------FUNÇÃO DA CAIXA DE DIALOGO DE ALERTAS E MENSAGENS---------------------------
//instruções para chamar a caixa de mensagens:
//variável modo("yn" para chamada de caixas de "Sim" ou "Não")
//variável modo("conf" para chamada de caixas de aviso com "OK")
//variável reload("reload" para recarregamento da pagina)
//variável reload("" para não recarregar a pagina)
//variável func("func" para chamar a função em caso de resposta sim)

//exemplo para chamar a caixa de mensagem:
//var modo = "yn"
// var reload = ""
// var func = () => {minha_função()}
// var icon = "img/imgInter.png"
// var msg = "Confirme para salvar!"
// var act = "Deseja salvar as configurações?"
// openMSG(icon, msg, act, modo, reload,func);

//abrir caixa de alertas e mensagens
function openMSG(icon, msg, act, modo, reload, func){
	function cxmsg(){
		return new Promise((resolve) =>{
			cxAviso()
			document.getElementById('msgAlertBtnY').style.display = "none";
			document.getElementById('msgAlertBtnN').style.display = "none";
			document.getElementById('msgAlertBtn').style.display = "none";
			if(modo == "yn"){
				document.getElementById('msgAlertBtnY').style.display = "block";
				document.getElementById('msgAlertBtnN').style.display = "block";
			}
			if(modo == "conf"){
				document.getElementById('msgAlertBtn').style.display = "block";
			}
			document.getElementById('iconAlert').src = icon;
			document.getElementById("msgAlertText").innerHTML = msg;
			document.getElementById("msgAlertAct").innerHTML = act;
			resolve()
		})
	}
	(async function ocxmsg(){
		await cxmsg()
		setTimeout(()=>{
			document.getElementById("msgAlert").showModal()
		},500)
		
	})()

	//botão OK
	document.getElementById("msgAlertBtn").addEventListener('click', function () {
		document.getElementById("msgAlert").remove();
		if(reload == "reload"){
			sessionStorage.setItem("reloadUpdate","true")
			location.reload();
		}
	})	

	//botão sim
	document.getElementById("msgAlertBtnY").addEventListener('click', function () {
		func();
		document.getElementById("msgAlert").remove();
		
		//chamamada do reload
		if(reload == "reload"){
			sessionStorage.setItem("reloadUpdate","true")
			location.reload();
		}
	})
	
	//botão não
	document.getElementById("msgAlertBtnN").addEventListener('click', function () {
		document.getElementById("msgAlert").remove();
	})
}
//__________________________________________________________________________________________
//------------------------------------------------------------------------------------------
