//CONSTRUTOR DA CAIXA DE MENSAGENS

//caixa para aviso
function cxAviso(){
	const body = document.body
	const caixaMSG = document.createElement("div")
	caixaMSG.setAttribute("id","PnlmsgAlert")
	body.append(caixaMSG)

	const caixaMSGfull = 
		"<div id='msgAlert'>"+
			"<div class='msgAlert'><img src='#' alt='Logo' id='iconAlert'></div>"+
			"<div class='msgAlert'><h4 id='msgAlertText'>texto de alerta</h4></div>"+
			"<div class='msgAlert'><p id='msgAlertAct'>texto da ação</p></div>"+
			"<div class='msgAlert' id='msgAlertSenhaDv'>"+
				"<input type='password' id='msgAlertSenha' placeholder='digite a senha...'>"+
				"<label id='msgAlertSenhaLb'>senha incorreta</label>"+
			"</div>"+
			"<div class='msgAlertBtn'>"+
				"<button id='msgAlertBtn'>OK</button>"+
				"<button id='msgAlertBtnY'>SIM</button>"+
				"<button id='msgAlertBtnN'>NÃO</button>"+
			"</div>"+
		"</div>"

		
	caixaMSG.innerHTML += caixaMSGfull
}

//_________________________________________________________________________________________________
//-------------------------------------------------------------------------------------------------




// --------------------FUNÇÃO DA CAIXA DE DIALOGO DE ALERTAS E MENSAGENS---------------------------
//instruções para chamar a caixa de mensagens:
//variável modo("yn" para chamada de caixas de "Sim" ou "Não")
//variável modo("conf" para chamada de caixas de aviso com "OK")
//variável reload("true" para recarregamento da pagina ou "false")
//variável func("func" para chamar a função em caso de resposta sim).
//variável senha("true" para chamar a caixa de senha ou "false" para ocultar)

//exemplo para chamar a caixa de mensagem:
// var icon = "img/imgInter.png"
// var msg = "Confirme para salvar!"
// var act = "Deseja salvar as configurações?"
// var modo = "yn"
// var reload = ""
// var func = () => {minha_função()}
// var senha = false 
// openMSG(icon, msg, act, modo, reload,func,senha);

//abrir caixa de alertas e mensagens
function openMSG(icon, msg, act, modo, reload,func,senha){
	cxAviso()
	if(modo == "yn"){
		document.getElementById('msgAlertBtnY').style.display = "block";
		document.getElementById('msgAlertBtnN').style.display = "block";
	}
	if(modo == "conf"){
		document.getElementById('msgAlertBtn').style.display = "block";
	}
	if(senha == true){
		document.getElementById('msgAlertSenhaDv').style.display = "flex"
	}
	
	document.getElementById('iconAlert').src = icon;
	document.getElementById("msgAlertText").innerHTML = msg;
	document.getElementById("msgAlertAct").innerHTML = act;
	setTimeout(()=>{
		document.getElementById("PnlmsgAlert").style.display = "flex"
	},200)

	//botão OK
	document.getElementById("msgAlertBtn").addEventListener('click', function () {
		document.getElementById("PnlmsgAlert").remove();
		if(reload == "true"){
			location.reload();
		}
	})	

	//botão sim
	document.getElementById("msgAlertBtnY").addEventListener('click', function () {
		if(senha == true){
			if(document.getElementById("msgAlertSenha").value == senhaAltAvancado){
				document.getElementById("PnlmsgAlert").remove();
				func();
				if(reload == "true"){
					location.reload();
				}
			}else{
				document.getElementById('msgAlertSenhaLb').style.display = "block"
			}
			
		}else{
			document.getElementById("PnlmsgAlert").remove();
			func();
			if(reload == "true"){
				location.reload();
			}
		}	
	})
	
	//botão não
	document.getElementById("msgAlertBtnN").addEventListener('click', function () {
		document.getElementById("PnlmsgAlert").remove();
	})
}
//__________________________________________________________________________________________
//------------------------------------------------------------------------------------------
