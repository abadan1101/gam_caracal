//criar linhas da tabela---------------------------

function openTableControlesProd(){
	try{
		//limpar tabela
		document.getElementById("controlesTabelaBodyProd").innerHTML = "";
		
		(async function produtos(){
		
			//baixar banco de dados
			var bdProd = await loadProdutosGeral()//funcção chamada na folha: /db/0banco.js
			
			//carregar TABELA-------------------------------------------------
			bdProd.map((e)=>{
			
				//console.log(e)
				
				//-----------------------------------------------------------------------
				const tb = document.getElementById("controlesTabelaBodyProd");
				var qtdLin = tb.rows.length;
				var linha = tb.insertRow(qtdLin);
				linha.classList.add('trf_tblTbBdy');
				
				//preencher coluna id------------------------------
				var id = linha.insertCell(0);
				id.classList.add('controlesCol01Prod');
				id.innerHTML = e.id;
				//-------------------------------------------------
				
				//preencher coluna nome----------------------------
				var nome = linha.insertCell(1);
				nome.classList.add('controlesCol02Prod');
				nome.innerHTML = e.produto;
				//-------------------------------------------------
				
				//preencher coluna local----------------------------
				var local = linha.insertCell(2);
				local.classList.add('controlesCol03Prod');
				if(!e.local){local.innerHTML = "";}else{local.innerHTML = e.local;}
				//-------------------------------------------------
				
				//preencher coluna observação----------------------------
				var obs = linha.insertCell(3);
				obs.classList.add('controlesCol04Prod');
				if(!e.observacao){obs.innerHTML = "";}else{obs.innerHTML = e.observacao;}
				//-------------------------------------------------
				
				//adicionar botões---------------------------------
				var opcs = linha.insertCell(4);
				opcs.classList.add('controlesCol05Prod');
				opcs.innerHTML = "<i class='bx bx-edit-alt ctrlEditBtnProd'></i><i class='bx bx-message-square-x ctrlDeleteBtnProd'></i>";
				//eventos do botão editar
				opcs.children[0].addEventListener("click", (e)=>{editarProduto(e.target)})
				//eventos do botão excluir
				opcs.children[1].addEventListener("click", (e)=>{excluirProduto(e.target)})
				//-------------------------------------------------
		
			})
			
			//PREENCHER RODAṔE
			document.getElementById("controlesTabelaFootLbProd").innerHTML = bdProd.length + " produtos cadastrados";
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
function formProdutos(){
	
	const body = document.body
	const formProdutos = document.createElement("div")
	formProdutos.setAttribute("id","formProd")
	body.append(formProdutos)

	const formProdutosPNL = 
		"<div id='formProdPNL'>" +
			"<div id='formProdCBCdiv'>" +
				"<h3>Editar Produto</h3>" +
				"<label id='frmProdId'></label>" +
			"</div>" +
			"<div id='formProdPNLdiv'>" +
				"<div>" +
					"<label>Descrição do Produto</label>" +
					"<input id='frmProdNome' type='text' maxLength='100' required/>" +
				"</div>" +
				"<div>" +
					"<label>Local</label>" +
					"<input id='frmProdLocal' type='text' maxLength='40'/>" +
				"</div>" +
				"<div>" +
					"<label>Observação</label>" +
					"<input id='frmProdObs'type='text' maxLength='200'/>" +
				"</div>" +
				"<section>" +
					"<input id='frmProdCncl' type='button' value='cancelar' onClick='fecharFormProduto()'>" +
					"<input id='frmProdSlvr' type='button' value='salvar' onClick='salvarFormProduto()'>" +
				"</section>" +
			"</div>" +
		"</div>"
	
	
		formProdutos.innerHTML += formProdutosPNL
}


//função para criar ferramenta
function criarProduto(){
	
	formProdutos()
	
	document.getElementById('frmProdId').innerHTML = ""
	document.getElementById('frmProdNome').value = ""
	document.getElementById('frmProdLocal').value = ""
	document.getElementById('frmProdObs').value = ""
}

//função para editar a ferramenta
async function editarProduto(e){
	
	const id = parseInt(e.parentElement.parentElement.firstChild.innerHTML)
	const produtoDB = await obterProdutosDB(id);//pertence a folha: /tarefas/js/banco.js
	
	formProdutos()
	
	if(produtoDB.id){document.getElementById('frmProdId').innerHTML = produtoDB.id}
	if(produtoDB.produto){document.getElementById('frmProdNome').value = produtoDB.produto}
	if(produtoDB.local){document.getElementById('frmProdLocal').value = produtoDB.local}
	if(produtoDB.observacao){document.getElementById('frmProdObs').value = produtoDB.observacao}
}


//função para deletar a ferramenta
function excluirProduto(elemento){
	var produto = elemento.parentElement.parentElement
	var id = parseInt(produto.firstChild.innerHTML)
	var icon = "img/imgInter.png"
	var msg = "Excluir"
	var act = "Deseja realmente excluir este produto?"
	var modo = "yn"
	var reload = "false"
	var func = () => {deletarProduto(id, produto)}
	openMSG(icon, msg, act, modo, reload,func);
}
async function deletarProduto(id, produto){

	await excluirProdutoDB(id)//pertence a folha: /tarefas/js/banco.js
	const verificar = await obterProdutosDB(id)//pertence a folha: /tarefas/js/banco.js
	
	if(verificar == "null"){
		produto.remove()
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
		var act = "Erro ao excluir produto"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}
	
	//PREENCHER RODAṔE
	var bdProd = await loadProdutosGeral()//funcção chamada na folha: /db/0banco.js

	document.getElementById("controlesTabelaFootLbProd").innerHTML = bdProd.length + " produtos cadastrados";
}

function fecharFormProduto(){
	document.getElementById('formProd').remove()

}

function salvarFormProduto(){
	if(document.getElementById("frmProdNome").value == ""){
			document.getElementById("frmProdNome").reportValidity()
	}else{
			
		//baixar ferramentas salvos
		(async function salvarProd(){
			const produto = await loadProdutosGeral()

			//procurar ferramenta igual
			var vrfIgual = false
			produto.map((e)=>{
				if(document.getElementById("frmProdNome").value == e.produto){
					vrfIgual = true
				}
			})
			
			const idProdForm = document.getElementById('frmProdId').innerHTML 
			if(idProdForm == ""){
				//salvar nova ferramenta
				if(vrfIgual == true){
					document.getElementById('formProd').remove();
					//mensagem de corfirmado
					var icon = "img/imgAlert.png"
					var msg = "Repetido"
					var act = "Produto já existe!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					const prod = document.getElementById("frmProdNome").value;
					const loc = document.getElementById("frmProdLocal").value;
					const obs = document.getElementById("frmProdObs").value;
					
					addProdutosBd(prod, loc, obs)//banco

					document.getElementById('formProd').remove();

					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "Produto criado com sucesso!"
					var modo = "conf"
					var reload = "true"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}
			}else{
				const prod = document.getElementById("frmProdNome").value;
				const loc = document.getElementById("frmProdLocal").value;
				const obs = document.getElementById("frmProdObs").value;
				
				//criação da classe ferramenta
				class produt {
					constructor(produto, local, observacao) {
						this.produto = produto
						this.local = local
						this.observacao = observacao
					}
				}
				
				//popular ferramenta
				var prd = []
				var pr1 = prod
				var pr2 = loc
				var pr3 = obs
				var prodBd = new produt(pr1, pr2, pr3);
				prd.push(prodBd)	
				
				alterarProdutosDB(parseInt(idProdForm), prd)//banco

				document.getElementById('formProd').remove();

				//mensagem de corfirmado
				var icon = "img/imgOK.png"
				var msg = "Confirmação"
				var act = "Produto editado com sucesso!"
				var modo = "conf"
				var reload = "true"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
			
			}
			

		})()
			
	}

}





