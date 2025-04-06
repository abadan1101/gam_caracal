//criar linhas da tabela---------------------------

function openTableControlesEqu(){
	try{
		//limpar tabela
		document.getElementById("controlesTabelaBodyEqu").innerHTML = "";
		
		(async function equipes(){
		
			//baixar banco de dados
			var bdEqu = await loadEquipeGeral()//funcção chamada na folha: /db/0banco.js
			
			//carregar TABELA-------------------------------------------------
			bdEqu.map((e)=>{
			
				//console.log(e)
				
				//-----------------------------------------------------------------------
				const tb = document.getElementById("controlesTabelaBodyEqu");
				var qtdLin = tb.rows.length;
				var linha = tb.insertRow(qtdLin);
				linha.classList.add('trf_tblTbBdy');
				
				//preencher coluna id------------------------------
				var id = linha.insertCell(0);
				id.classList.add('controlesCol01Equ');
				id.innerHTML = e.id;
				//-------------------------------------------------
				
				//preencher coluna nome----------------------------
				var membro = linha.insertCell(1);
				membro.classList.add('controlesCol02Equ');
				membro.innerHTML = e.membro;
				//-------------------------------------------------
				
				//preencher coluna local----------------------------
				var funcao = linha.insertCell(2);
				funcao.classList.add('controlesCol03Equ');
				if(!e.funcao){funcao.innerHTML = "";}else{funcao.innerHTML = e.funcao;}
				//-------------------------------------------------
				
				//preencher coluna observação----------------------------
				var obs = linha.insertCell(3);
				obs.classList.add('controlesCol04Equ');
				if(!e.observacao){obs.innerHTML = "";}else{obs.innerHTML = e.observacao;}
				//-------------------------------------------------
				
				//adicionar botões---------------------------------
				var opcs = linha.insertCell(4);
				opcs.classList.add('controlesCol05Equ');
				opcs.innerHTML = "<i class='bx bx-edit-alt ctrlEditBtnEqu'></i><i class='bx bx-message-square-x ctrlDeleteBtnEqu'></i>";
				//eventos do botão editar
				opcs.children[0].addEventListener("click", (e)=>{editarEquipe(e.target)})
				//eventos do botão excluir
				opcs.children[1].addEventListener("click", (e)=>{excluirEquipe(e.target)})
				//-------------------------------------------------
		
			})
			
			//PREENCHER RODAṔE
			document.getElementById("controlesTabelaFootLbEqu").innerHTML = bdEqu.length + " membros cadastrados";
		})();
		
	}catch (error){
		//mensagem em caso de erro---------------------------------------
		var icon = "img/imgError.png"
		var msg = "Erro ao carregar tabela!"
		var act = error
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
		console.log("Erro ao carregar tabela! " + error)
		//---------------------------------------------------------------
	}
		
	
}

//formulŕio
function formEquipes(){
	
	const body = document.body
	const formEquipes = document.createElement("div")
	formEquipes.setAttribute("id","formEqu")
	body.append(formEquipes)

	const formEquipesPNL = 
		"<div id='formEquPNL'>" +
			"<div id='formEquCBCdiv'>" +
				"<h3>Editar Membro</h3>" +
				"<label id='frmEquId'></label>" +
			"</div>" +
			"<div id='formEquPNLdiv'>" +
				"<div>" +
					"<label>Membro da equipe</label>" +
					"<input id='frmEquNome' type='text' maxLength='100' required/>" +
				"</div>" +
				"<div>" +
					"<label>Função</label>" +
					"<input id='frmEquLocal' type='text' maxLength='40'/>" +
				"</div>" +
				"<div>" +
					"<label>Observação</label>" +
					"<input id='frmEquObs'type='text' maxLength='200'/>" +
				"</div>" +
				"<section>" +
					"<input id='frmEquCncl' type='button' value='cancelar' onClick='fecharFormEquipe()'>" +
					"<input id='frmEquSlvr' type='button' value='salvar' onClick='salvarFormEquipe()'>" +
				"</section>" +
			"</div>" +
		"</div>"
	
	
		formEquipes.innerHTML += formEquipesPNL
}


//função para criar ferramenta
function criarEquipe(){
	
	formEquipes()
	
	document.getElementById('frmEquId').innerHTML = ""
	document.getElementById('frmEquNome').value = ""
	document.getElementById('frmEquLocal').value = ""
	document.getElementById('frmEquObs').value = ""
}

//função para editar a ferramenta
async function editarEquipe(e){
	
	const id = parseInt(e.parentElement.parentElement.firstChild.innerHTML)
	const equipeDB = await obterEquipesDB(id);//pertence a folha: /tarefas/js/banco.js
	
	formEquipes()
	
	if(equipeDB.id){document.getElementById('frmEquId').innerHTML = equipeDB.id}
	if(equipeDB.membro){document.getElementById('frmEquNome').value = equipeDB.membro}
	if(equipeDB.funcao){document.getElementById('frmEquLocal').value = equipeDB.funcao}
	if(equipeDB.observacao){document.getElementById('frmEquObs').value = equipeDB.observacao}
}


//função para deletar a ferramenta
function excluirEquipe(elemento){
	var equipe = elemento.parentElement.parentElement
	var id = parseInt(equipe.firstChild.innerHTML)
	var icon = "img/imgInter.png"
	var msg = "Excluir"
	var act = "Deseja realmente excluir este membro?"
	var modo = "yn"
	var reload = "false"
	var func = () => {deletarEquipe(id, equipe)}
	openMSG(icon, msg, act, modo, reload,func);
}
async function deletarEquipe(id, equipe){

	await excluirEquipeDB(id)//pertence a folha: /tarefas/js/banco.js
	const verificar = await obterEquipesDB(id)//pertence a folha: /tarefas/js/banco.js
	
	if(verificar == "null"){
		equipe.remove()
		var icon = "img/imgOK.png"
		var msg = "Confirmação!"
		var act = "Produto excluído com sucesso!"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func)
	}else{
		var icon = "img/imgError.png"
		var msg = "Erro"
		var act = "Erro ao excluir membro"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}
	
	//PREENCHER RODAṔE
	var bdEqu = await loadEquipeGeral()//funcção chamada na folha: /db/0banco.js

	document.getElementById("controlesTabelaFootLbEqu").innerHTML = bdEqu.length + " membros cadastrados";
}

function fecharFormEquipe(){
	document.getElementById('formEqu').remove()

}

function salvarFormEquipe(){
	if(document.getElementById("frmEquNome").value == ""){
			document.getElementById("frmEquNome").reportValidity()
	}else{
			
		//baixar ferramentas salvos
		(async function salvarEqu(){
			const equipe = await loadEquipeGeral()

			//procurar ferramenta igual
			var vrfIgual = false
			equipe.map((e)=>{
				if(document.getElementById("frmEquNome").value == e.equipe){
					vrfIgual = true
				}
			})
			
			const idEquForm = document.getElementById('frmEquId').innerHTML 
			if(idEquForm == ""){
				console.log(idEquForm)
				//salvar nova ferramenta
				if(vrfIgual == true){
					console.log("id vazio")
					document.getElementById('formEqu').remove();
					//mensagem de corfirmado
					var icon = "img/imgAlert.png"
					var msg = "Repetido"
					var act = "Membro já existe!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					const mem = document.getElementById("frmEquNome").value;
					const fun = document.getElementById("frmEquLocal").value;
					const obs = document.getElementById("frmEquObs").value;
					
					addEquipeBd(mem, fun, obs)//banco

					document.getElementById('formEqu').remove();

					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "Membro adicionado com sucesso!"
					var modo = "conf"
					var reload = "true"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}
			}else{
				const mem = document.getElementById("frmEquNome").value;
				const fun = document.getElementById("frmEquLocal").value;
				const obs = document.getElementById("frmEquObs").value;
				
				//criação da classe ferramenta
				class membr {
					constructor(membro, funcao, observacao) {
						this.membro = membro
						this.funcao = funcao
						this.observacao = observacao
					}
				}
				
				//popular ferramenta
				var mbr = []
				var pr1 = mem
				var pr2 = fun
				var pr3 = obs
				var memBd = new membr(pr1, pr2, pr3);
				mbr.push(memBd)	
				
				alterarEquipesDB(parseInt(idEquForm), mbr)//banco

				document.getElementById('formEqu').remove();

				//mensagem de corfirmado
				var icon = "img/imgOK.png"
				var msg = "Confirmação"
				var act = "Membro editado com sucesso!"
				var modo = "conf"
				var reload = "true"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
			
			}
			

		})()
			
	}

}