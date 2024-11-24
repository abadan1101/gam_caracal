



//----------------------------CARREGAR TABELA PRINCIPAL (STATICA)--------------------------------------
//-----------------------------------------------------------------------------------------------------

async function TrfTbl_LoadStatic(bdTabela){//função chamada na folha: /tarefas/js/carregamento.js

	//carregar configurações-------------------------------------------------
	var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js
	//-----------------------------------------------------------------------
	
	
	//preencher tabela-----------------------------------------------------------------------------
	return new Promise((resolve)=>{
		try{
		
			//cabeçalho da tabela--------------------------------------------
			const cabecalho = document.getElementById('trf_tblTbHd').children
			cabecalho[3].children[0].children[0].innerHTML = bdCfg.chave01[0]
			cabecalho[4].children[0].children[0].innerHTML = bdCfg.chave00[0]
			cabecalho[5].children[0].children[0].innerHTML = bdCfg.chave02[0]
			cabecalho[6].children[0].children[0].innerHTML = bdCfg.chave03[0]
			cabecalho[7].children[0].children[0].innerHTML = bdCfg.chave04[0]
			cabecalho[8].children[0].children[0].innerHTML = bdCfg.chave05[0]
			//---------------------------------------------------------------
			

			//corpo da tabela------------------------------------------------
			for(i=0;i<bdTabela.length;i++){
			
				//criar linhas da tabela---------------------------
				const tb = document.getElementById("trf_tblTbBdy");
				var qtdLin = tb.rows.length;
				var linha = tb.insertRow(qtdLin);
				linha.classList.add('trf_tblTbBdy');
				//-------------------------------------------------
				
				//preencher coluna id------------------------------
				var id = linha.insertCell(0);
				id.classList.add('trfTblCol1');
				id.innerHTML = bdTabela[i].id;
				//-------------------------------------------------
				
				//preencher coluna número--------------------------
				var numero = linha.insertCell(1);
				numero.innerHTML = bdTabela[i].numero;
				numero.classList.add('trfTblCol2');
				//-------------------------------------------------

				//preencher coluna data da tarefa------------------
				var data = linha.insertCell(2);
				data.classList.add('trfTblCol3');
				if(bdTabela[i].data != ""){
					data.innerHTML = new Date(bdTabela[i].data).toLocaleDateString("pt-BR");
				}
				//-------------------------------------------------
				
				//preencher coluna disponibilidade-----------------
				var disponibilidade = linha.insertCell(3);
				disponibilidade.classList.add('trfTblCol4');
				if(bdTabela[i].chave01 == "Indisponível"){
					bdTabela[i].chave01 = "I"
				}
				if(bdTabela[i].chave01 == "Disponível"){
					bdTabela[i].chave01 = "D"
				}
				if(bdTabela[i].chave01 == "Restrito"){
					bdTabela[i].chave01 = "R"
				}
				disponibilidade.innerHTML = bdTabela[i].chave01;
				//-------------------------------------------------
				
				//preencher coluna andamento-----------------------
				var andamento = linha.insertCell(4);
				andamento.innerHTML = bdTabela[i].chave00;
				andamento.classList.add('trfTblCol5');
				//-------------------------------------------------

				//preencher coluna chave 01------------------------
				var ch01 = linha.insertCell(5);
				ch01.innerHTML = bdTabela[i].chave02;
				ch01.classList.add('trfTblCol6');
				//-------------------------------------------------
				
				//preencher coluna chave 02------------------------
				var ch02 = linha.insertCell(6);
				ch02.innerHTML = bdTabela[i].chave03;
				ch02.classList.add('trfTblCol7');
				//-------------------------------------------------

				//preencher chave 03-------------------------------
				var ch03 = linha.insertCell(7);
				ch03.innerHTML = bdTabela[i].chave04;
				ch03.classList.add('trfTblCol8');
				//-------------------------------------------------
				
				//preencher chave 04-------------------------------
				var ch04 = linha.insertCell(8);
				ch04.innerHTML = bdTabela[i].chave05;
				ch04.classList.add('trfTblCol9');
				//-------------------------------------------------
				
				//preencher porcentagem----------------------------
				var prct = linha.insertCell(9);
				prct.classList.add('trfTblCol10');
				prct.innerHTML = bdTabela[i].porcentagem + "%";
				//-------------------------------------------------
				
				//preencher descrição------------------------------
				var desc = linha.insertCell(10);
				desc.classList.add('trfTblCol11');
				desc.innerHTML = bdTabela[i].tarefa;
				//-------------------------------------------------
				
				//preencher serviços executados da tarefa----------
				var serv = linha.insertCell(11);
				serv.innerHTML = bdTabela[i].serviço;
				serv.classList.add('trfTblCol12');
				//-------------------------------------------------
				
				//preencher coluna das pendencias------------------	
				var pend = linha.insertCell(12);
				pend.classList.add('trfTblCol13');		
				var t="";u="";v=""
				var vrfPdd = bdTabela[i].pedidos;
				var vrfFer = bdTabela[i].ferramentas;
				var vrfPrd = bdTabela[i].produtos;
				vrfPdd.map((e)=>{if(e.status == true){t = "pedidos"}})
				vrfFer.map((e)=>{if(e.status == true){u = "ferramentas"}})
				vrfPrd.map((e)=>{if(e.status == true){v = "produtos"}})
				pend.innerHTML = t + " " + u + " " + v
				//-------------------------------------------------
				
				//preencher equipe---------------------------------
				var eqp = linha.insertCell(13);
				eqp.classList.add('trfTblCol14');
				var membros = bdTabela[i].equipe
				eqp.innerHTML = ""
				membros.map((e)=>{eqp.innerHTML = eqp.innerHTML + " " + e});
				//-------------------------------------------------

				//preencher data de atualização--------------------
				var atlz = linha.insertCell(14);
				atlz.classList.add('trfTblCol15');
				if(bdTabela[i].atualizacao != ""){
					atlz.innerHTML = new Date(bdTabela[i].atualizacao).toLocaleDateString("pt-BR");
				}
				//-------------------------------------------------

				//adicionar botões---------------------------------
				var opcs = linha.insertCell(15);
				opcs.classList.add('trfTblCol16');
				opcs.innerHTML = "<div><i class='bx bx-edit-alt btnEditTst'></i><i class='bx bx-message-square-x btnexcTst'></i></div>";
				//eventos do botão editar
				opcs.firstChild.children[0].addEventListener("click", (e)=>{trfTbl_alterarTarefas(e.target)})
				//eventos do botão excluir
				opcs.firstChild.children[1].addEventListener("click", (e)=>{trfTbl_excluirTarefas(e.target)})
				//-------------------------------------------------

				//adicionar cor da linha---------------------------
				trfTbl_CorLinhaStatic(andamento.innerHTML, linha)
				//-------------------------------------------------
			}
			//---------------------------------------------------------------


			//mostrar ou ocultar colunas na inicialização--------------------
			const chbx = [...document.getElementsByClassName('trf_tblcbs')]
			chbx.map((e)=>{
				var x = e.id
					if(localStorage.getItem(x) == "true"){
						e.checked = true
						var y = [...document.getElementsByClassName(x)]
						y.map((c)=>{
							c.style.display = ""
						})
					}
					if(localStorage.getItem(x) == "false"){
						e.checked = false
						var y = [...document.getElementsByClassName(x)]

						//desativar filtro
						const elmt = y[0].children[1].children[0]
						elmt.value = ""
						localStorage.setItem(elmt.id,"")
						y[0].children[0].style.background = "#555"
						trfTbl_filtroStatic()

						y.map((c)=>{
							c.style.display = "none"
						})
					}
			})
			trfTbl_menuColunas();//configuração do menu de contole das colunas
			

			//fim da promisse------------------------------------------------
			resolve()
			//---------------------------------------------------------------
			
			
		}catch (error){
			//mensagem em caso de erro---------------------------------------
			var icon = "img/imgError.png"
			var msg = "Erro ao carregar tabela principal!"
			var act = error
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao carregar tabela principal! " + error)
			//---------------------------------------------------------------
		}
	})
	//---------------------------------------------------------------------------------------------
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//-----------------------CARREGAR FUNÇÕES DA TABELA PRINCIPAL (STATICA)--------------------------------
//-----------------------------------------------------------------------------------------------------

//CARREGAR CORES----------------------------------------------
async function trfTbl_CorLinhaStatic(e, linha){
	var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js

	if(e == bdCfg.chave00[2]){
		linha.style.background = "#f77";
	}
	if(e == bdCfg.chave00[3]){
		linha.style.background = "#2E8B57";
	}
	if(e == bdCfg.chave00[4]){
		linha.style.background = "#FFD700";
	}
	if(e == bdCfg.chave00[5]){
		linha.style.background = "#9fcd9f";
	}
	if(e == bdCfg.chave00[6]){
		linha.style.background = "#fff";
	}
	if(e == bdCfg.chave00[7]){
		linha.style.background = "#e2e1e1";
	}
	if(e == bdCfg.chave00[8]){
		linha.style.background = "#599cf3";
	}
	if(e == bdCfg.chave00[9]){
		linha.style.background = "#a175f8";
	}
	if(e == bdCfg.chave00[10]){
		linha.style.background = "#F00";
	}
	if(e == bdCfg.chave00[11]){
		linha.style.background = "#BC8F8F";
	}
}
//--------------------------------------------------------------



//EDITAR TAREFA-----------------------------------------------
//função para alterar a tarefa na tabela atual
async function trfTbl_alterarTarefaStatic(tabela){//função chamada na folha: /tarefas/js/formulário.js
	(async ()=>{
		//verifica se foi alterado com sucesso
		const tarefaBD = []
		tarefaBD.push(await obterTarefas(idTarefa))
		if(tarefaBD[0].atualizacao == tabela[0].atualizacao){
			//modifica a linha editada na tabela
			
			//preencher coluna numero
			trfTbl_EditarLinha.children[1].innerHTML = tarefaBD[0].numero
			//preencher coluna data
			trfTbl_EditarLinha.children[2].innerHTML = new Date(tarefaBD[0].data).toLocaleDateString("pt-BR");
			//preencher coluna disponibilidade
			if(tarefaBD[0].chave01 == "Indisponível"){
				tarefaBD[0].chave01 = "I"
			}
			if(tarefaBD[0].chave01 == "Disponível"){
				tarefaBD[0].chave01 = "D"
			}
			if(tarefaBD[0].chave01 == "Restrito"){
				tarefaBD[0].chave01 = "R"
			}
			trfTbl_EditarLinha.children[3].innerHTML = tarefaBD[0].chave01;
			//preencher coluna andamento
			trfTbl_EditarLinha.children[4].innerHTML = tarefaBD[0].chave00;
			//preencher coluna chave 01
			trfTbl_EditarLinha.children[5].innerHTML = tarefaBD[0].chave02;
			//preencher coluna chave 02
			trfTbl_EditarLinha.children[6].innerHTML = tarefaBD[0].chave03;
			//preencher coluna chave 03
			trfTbl_EditarLinha.children[7].innerHTML = tarefaBD[0].chave04;
			//preencher coluna chave 04
			trfTbl_EditarLinha.children[8].innerHTML = tarefaBD[0].chave05;
			//preencher coluna porcentagem
			trfTbl_EditarLinha.children[9].innerHTML = tarefaBD[0].porcentagem + "%";
			//preencher coluna tarefa
			trfTbl_EditarLinha.children[10].innerHTML = tarefaBD[0].tarefa;
			//preencher coluna serviço
			trfTbl_EditarLinha.children[11].innerHTML = tarefaBD[0].serviço;
			
			//preencher coluna das pendencias			
			var t="";u="";v=""
			var vrfPdd = tarefaBD[0].pedidos;
			var vrfFer = tarefaBD[0].ferramentas;
			var vrfPrd = tarefaBD[0].produtos;
			vrfPdd.map((e)=>{if(e.status == true){t = "pedidos"}})
			vrfFer.map((e)=>{if(e.status == true){u = "ferramentas"}})
			vrfPrd.map((e)=>{if(e.status == true){v = "produtos"}})
			trfTbl_EditarLinha.children[12].innerHTML = t + " " + u + " " + v
			//preencher equipe
			var membros = tarefaBD[0].equipe
			trfTbl_EditarLinha.children[13].innerHTML = ""
			membros.map((e)=>{trfTbl_EditarLinha.children[13].innerHTML = trfTbl_EditarLinha.children[13].innerHTML + " " + e});
			//preencher data de atualização
			if(tarefaBD[0].atualizacao != ""){
				trfTbl_EditarLinha.children[14].innerHTML = new Date(tarefaBD[0].atualizacao).toLocaleDateString("pt-BR");
			}

			//adicionar cor da linha
			trfTbl_CorLinhaStatic(trfTbl_EditarLinha.children[4].innerHTML, trfTbl_EditarLinha)

			//filtro das tarefas
			trfTbl_filtroStatic()

			//reiniciar variáveis
			idTarefa = ""
			trfTbl_EditarLinha = ""
			
			//configura sub-painel ativo
			document.getElementById("trf_conf").style.display = "none";
			document.getElementById("trf_tbl").style.display = "block";
			document.getElementById("trf_form").style.display = "none";

			//mensagem de corfirmado
			var icon = "img/imgOK.png"
			var msg = "Confirmação " + dbLinha + "!"
			var act = "Tarefa alterada com sucesso!"
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
		}else{
			//mensagem de erro na alteração
			var icon = "img/imgAlert.png"
			var msg = "Erro!"
			var act = ""
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao alterar tarefa na " + dbLinha);
		}
	})()
}
//------------------------------------------------------------------------


//quantidade de tarefas mostradas no rodapé-------------------------------
async function trfTbl_quantidadesRodapeStatic(){
	const texto = document.getElementById("trfTblQtd")
	var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var qtdTabela = [...document.getElementById("trf_tblTbBdy").children]
	var qtd = 0
	qtdTabela.map((e)=>{
		if(e.style.display != "none"){
			qtd ++
		}
	})

	//PROVISÓRIO
	if(localStorage.getItem("trf_tblCBFechadas") != "true"){
		const tabela = [...document.getElementById("trf_tblTbBdy").children];
		var valFec = 0
		tabela.map((tb)=>{
			if(tb.children[4].innerHTML == "Fechado"){
				valFec++
			}
		})
		texto.innerText = "mostrando " + qtd + " de " + bdTabela.length + " tarefas cadastradas" +
		" (" + valFec + " tarefas fechadas)";
	}else{
		texto.innerText = "mostrando " + qtd + " de " + bdTabela.length + " tarefas cadastradas"
	}
	
}
//------------------------------------------------------------------------



//função para realizar o filtro
function trfTbl_filtroStatic(){//função chamada na folha: /tarefas/js/carregamento.js
	const tabela = [...document.getElementById("trf_tblTbBdy").children]
	const input = [...document.getElementsByClassName("trfTblColInpt")]
	
	tabela.map((e)=>{

		if(
			e.children[1].innerHTML.includes(input[0].value) == false ||
			e.children[2].innerHTML.includes(input[1].value) == false ||
			e.children[3].innerHTML.toLowerCase().includes(input[2].value.toLowerCase()) == false ||
			e.children[4].innerHTML.toLowerCase().includes(input[3].value.toLowerCase()) == false ||
			e.children[5].innerHTML.toLowerCase().includes(input[4].value.toLowerCase()) == false ||
			e.children[6].innerHTML.toLowerCase().includes(input[5].value.toLowerCase()) == false ||
			e.children[7].innerHTML.toLowerCase().includes(input[6].value.toLowerCase()) == false ||
			e.children[8].innerHTML.toLowerCase().includes(input[7].value.toLowerCase()) == false ||
			e.children[9].innerHTML.includes(input[8].value) == false ||
			e.children[10].innerHTML.toLowerCase().includes(input[9].value.toLowerCase()) == false ||
			e.children[11].innerHTML.toLowerCase().includes(input[10].value.toLowerCase()) == false ||
			e.children[12].innerHTML.toLowerCase().includes(input[11].value.toLowerCase()) == false ||
			e.children[13].innerHTML.toLowerCase().includes(input[12].value.toLowerCase()) == false ||
			e.children[14].innerHTML.includes(input[13].value) == false ||
			(localStorage.getItem("trf_tblCBFechadas") == "false" && e.children[4].innerHTML == "Fechado")
		){
			e.style.display = "none"
		}else{
			e.style.display = ""
		}
	})
	trfTbl_quantidadesRodapeStatic()
}