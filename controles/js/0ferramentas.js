//criar linhas da tabela---------------------------

function openTableControles(){
	try{
		//limpar tabela
		document.getElementById("controlesTabelaBody").innerHTML = "";
		
		(async function ferramentas(){
		
			//baixar banco de dados
			var bdFer = await loadFerramentasGeral()//funcção chamada na folha: /db/0banco.js
			
			//carregar TABELA-------------------------------------------------
			bdFer.map((e)=>{
			
				//console.log(e)
				
				//-----------------------------------------------------------------------
				const tb = document.getElementById("controlesTabelaBody");
				var qtdLin = tb.rows.length;
				var linha = tb.insertRow(qtdLin);
				linha.classList.add('trf_tblTbBdy');
				
				//preencher coluna id------------------------------
				var id = linha.insertCell(0);
				id.classList.add('controlesCol01');
				id.innerHTML = e.id;
				//-------------------------------------------------
				
				//preencher coluna nome----------------------------
				var nome = linha.insertCell(1);
				nome.classList.add('controlesCol02');
				nome.innerHTML = e.ferramenta;
				//-------------------------------------------------
				
				//preencher coluna local----------------------------
				var local = linha.insertCell(2);
				local.classList.add('controlesCol03');
				if(!e.local){local.innerHTML = "";}else{local.innerHTML = e.local;}
				//-------------------------------------------------
				
				//preencher coluna observação----------------------------
				var obs = linha.insertCell(3);
				obs.classList.add('controlesCol04');
				if(!e.observacao){obs.innerHTML = "";}else{obs.innerHTML = e.observacao;}
				//-------------------------------------------------
				
				//adicionar botões---------------------------------
				var opcs = linha.insertCell(4);
				opcs.classList.add('controlesCol05');
				opcs.innerHTML = "<i class='bx bx-edit-alt ctrlEditBtn'></i><i class='bx bx-message-square-x ctrlDeleteBtn'></i>";
				//eventos do botão editar
				opcs.children[0].addEventListener("click", (e)=>{editarFerramenta(e.target)})
				//eventos do botão excluir
				opcs.children[1].addEventListener("click", (e)=>{excluirFerramenta(e.target)})
				//-------------------------------------------------
		
			})
			
			//PREENCHER RODAṔE
			document.getElementById("controlesTabelaFootLb").innerHTML = bdFer.length + " ferramentas cadastradas";
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
function formFerramentas(){
	
	const body = document.body
	const formFerramentas = document.createElement("div")
	formFerramentas.setAttribute("id","formFerr")
	body.append(formFerramentas)

	const formFerramentasPNL = 
		"<div id='formFerrPNL'>" +
			"<div id='formFerrCBCdiv'>" +
				"<h3>Editar Ferramenta</h3>" +
				"<label id='frmFerId'></label>" +
			"</div>" +
			"<div id='formFerrPNLdiv'>" +
				"<div>" +
					"<label>Descrição da Ferramenta</label>" +
					"<input id='frmFerNome' type='text' maxLength='100' required/>" +
				"</div>" +
				"<div>" +
					"<label>Local</label>" +
					"<input id='frmFerLocal' type='text' maxLength='40'/>" +
				"</div>" +
				"<div>" +
					"<label>Observação</label>" +
					"<input id='frmFerObs'type='text' maxLength='200'/>" +
				"</div>" +
				"<section>" +
					"<input id='frmFerCncl' type='button' value='cancelar' onClick='fecharFormFerramenta()'>" +
					"<input id='frmFerSlvr' type='button' value='salvar' onClick='salvarFormFerramenta()'>" +
				"</section>" +
			"</div>" +
		"</div>"
	
	
	formFerramentas.innerHTML += formFerramentasPNL
}


//função para criar ferramenta
function criarFerramenta(){
	
	formFerramentas()
	
	document.getElementById('frmFerId').innerHTML = ""
	document.getElementById('frmFerNome').value = ""
	document.getElementById('frmFerLocal').value = ""
	document.getElementById('frmFerObs').value = ""
}

//função para editar a ferramenta
async function editarFerramenta(e){
	
	const id = parseInt(e.parentElement.parentElement.firstChild.innerHTML)
	const ferramentaDB = await obterFerramentasDB(id);//pertence a folha: /tarefas/js/banco.js
	
	formFerramentas()
	
	if(ferramentaDB.id){document.getElementById('frmFerId').innerHTML = ferramentaDB.id}
	if(ferramentaDB.ferramenta){document.getElementById('frmFerNome').value = ferramentaDB.ferramenta}
	if(ferramentaDB.local){document.getElementById('frmFerLocal').value = ferramentaDB.local}
	if(ferramentaDB.observacao){document.getElementById('frmFerObs').value = ferramentaDB.observacao}
}


//função para deletar a ferramenta
function excluirFerramenta(elemento){
	var ferramenta = elemento.parentElement.parentElement
	var id = parseInt(ferramenta.firstChild.innerHTML)
	var icon = "img/imgInter.png"
	var msg = "Excluir"
	var act = "Deseja realmente excluir esta ferramenta?"
	var modo = "yn"
	var reload = "false"
	var func = () => {deletarFerramenta(id,ferramenta)}
	openMSG(icon, msg, act, modo, reload,func);
}
async function deletarFerramenta(id, ferramenta){

	await excluirFerramentaDB(id)//pertence a folha: /tarefas/js/banco.js
	const verificar = await obterFerramentasDB(id)//pertence a folha: /tarefas/js/banco.js
	
	if(verificar == "null"){
		ferramenta.remove()
		var icon = "img/imgOK.png"
		var msg = "Confirmação!"
		var act = "Ferramenta excluída com sucesso!"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func)
	}else{
		var icon = "img/imgError.png"
		var msg = "Erro"
		var act = "Erro ao excluir ferramenta"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}
	
	//PREENCHER RODAṔE
	var bdFer = await loadFerramentasGeral()//funcção chamada na folha: /db/0banco.js

	document.getElementById("controlesTabelaFootLb").innerHTML = bdFer.length + " ferramentas cadastradas";
}

function fecharFormFerramenta(){
	document.getElementById('formFerr').remove()

}

function salvarFormFerramenta(){
	if(document.getElementById("frmFerNome").value == ""){
			document.getElementById("frmFerNome").reportValidity()
	}else{
			
		//baixar ferramentas salvos
		(async function salvarFer(){
			const ferramenta = await loadFerramentasGeral()

			//procurar ferramenta igual
			var vrfIgual = false
			ferramenta.map((e)=>{
				if(document.getElementById("frmFerNome").value == e.ferramenta){
					vrfIgual = true
				}
			})
			
			const idFerForm = document.getElementById('frmFerId').innerHTML 
			if(idFerForm == ""){
				//salvar nova ferramenta
				if(vrfIgual == true){
					document.getElementById('formFerr').remove();
					//mensagem de corfirmado
					var icon = "img/imgAlert.png"
					var msg = "Repetido"
					var act = "Ferramenta já existe!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					const fer = document.getElementById("frmFerNome").value;
					const loc = document.getElementById("frmFerLocal").value;
					const obs = document.getElementById("frmFerObs").value;
					
					addFerramentaoBd(fer, loc, obs)//banco

					document.getElementById('formFerr').remove();

					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "Ferramenta criada com sucesso!"
					var modo = "conf"
					var reload = "true"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}
			}else{
				const fer = document.getElementById("frmFerNome").value;
				const loc = document.getElementById("frmFerLocal").value;
				const obs = document.getElementById("frmFerObs").value;
				
				//criação da classe ferramenta
				class ferrmt {
					constructor(ferramenta, local, observacao) {
						this.ferramenta = ferramenta
						this.local = local
						this.observacao = observacao
					}
				}
				
				//popular ferramenta
				var frm = []
				var pr1 = fer
				var pr2 = loc
				var pr3 = obs
				var prodBd = new ferrmt(pr1, pr2, pr3);
				frm.push(prodBd)	
				
				alterarFerramentasDB(parseInt(idFerForm), frm)//banco

				document.getElementById('formFerr').remove();

				//mensagem de corfirmado
				var icon = "img/imgOK.png"
				var msg = "Confirmação"
				var act = "Ferramenta editada com sucesso!"
				var modo = "conf"
				var reload = "true"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
			
			}
			

		})()
			
	}

}



//------------------------------BOTÃO RELATÓRIOS---------------------------------------
//--------------------------------------------------------------------------------------
const relatorioFer = document.getElementById("ctrlFerramentasRelatorio")	
relatorioFer.addEventListener("click",()=>{
	(async function exportarRelatorio(){

		//variáveis
		const nomeAba1 = "ferramentas"
		const nomePlanilha = "relatorio.xlsx"
	
		var bdTabela = await loadFerramentasGeral()//pertence a folha: /tarefas/js/banco.js
		var ferramenta = [
			[
				"ferramenta","local","observação"
			]
		];

		var ferramentaAdd = []
		
		//montar arrays
		bdTabela.map((evt)=>{

			ferramentaAdd.push(evt.ferramenta)
			ferramentaAdd.push(evt.local)
			ferramentaAdd.push(evt.observacao)

			ferramenta.push(ferramentaAdd)
			//limpar array
			ferramentaAdd = []
		})
		//----------------------------------------------
	
		//gravar planilha
		var workbook = XLSX.utils.book_new();
		var worksheet = XLSX.utils.aoa_to_sheet(ferramenta);
		XLSX.utils.book_append_sheet(workbook, worksheet, nomeAba1);
		XLSX.writeFile(workbook, nomePlanilha);
		
	})()
})
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------


