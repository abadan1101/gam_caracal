



//-------------------------------CARREGAR TABELA PRINCIPAL (NORMAL)------------------------------------
//-----------------------------------------------------------------------------------------------------

async function TrfTbl_Load(bdTabela){//função chamada na folha: /tarefas/js/carregamento.js


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
				andamento.classList.add('trfTblCol5');
				const slct = document.createElement("select")
				slct.classList.add('trf_tblSlctTbl');
				slct.classList.add('trf_tblSlctAdmt');
				const n = bdCfg.chave00.length
				for(f=2;f<n;f++){
					const z1 = document.createElement("option");
					var num = bdCfg.chave00[f]
					if(num != ""){
						z1.innerHTML = bdCfg.chave00[f]
						slct.appendChild(z1);
					}
				}
				andamento.appendChild(slct);
				andamento.firstChild.value = bdTabela[i].chave00
				//eventos do select andamento
				slct.addEventListener("focus", (e)=>{trfTbl_configAndamento(e.target)})
				slct.addEventListener("change", (e)=>{trfTbl_altetarAndamento(e.target)})
				//-------------------------------------------------

				//preencher coluna chave 01------------------------
				var ch01 = linha.insertCell(5);
				ch01.classList.add('trfTblCol6');
				const slct1 = document.createElement("select")
				slct1.classList.add('trf_tblSlctTbl');
				const h = document.createElement("option");
				h.innerHTML = ""
				slct1.appendChild(h);
				const n1 = bdCfg.chave02.length
				for(f=2;f<n1;f++){
					const z1 = document.createElement("option");
					var num = bdCfg.chave02[f]
					if(num != ""){
						z1.innerHTML = bdCfg.chave02[f]
						slct1.appendChild(z1);
					}
				}
				ch01.appendChild(slct1);
				ch01.firstChild.value = bdTabela[i].chave02
				//eventos do select chave 01
				slct1.addEventListener("change", (e)=>{trfTbl_altetarChave01(e.target)})
				//-------------------------------------------------
				
				//preencher coluna chave 02------------------------
				var ch02 = linha.insertCell(6);
				ch02.classList.add('trfTblCol7');
				const slct2 = document.createElement("select")
				slct2.classList.add('trf_tblSlctTbl');
				const h1 = document.createElement("option");
				h1.innerHTML = ""
				slct2.appendChild(h1);
				const n2 = bdCfg.chave02.length
				for(f=2;f<n2;f++){
					const z1 = document.createElement("option");
					var num = bdCfg.chave03[f]
					if(num != ""){
						z1.innerHTML = bdCfg.chave03[f]
						slct2.appendChild(z1);
					}
				}
				ch02.appendChild(slct2);
				ch02.firstChild.value = bdTabela[i].chave03
				//eventos do select chave 02
				slct2.addEventListener("change", (e)=>{trfTbl_altetarChave02(e.target)})
				//-------------------------------------------------

				//preencher chave 03-------------------------------
				var ch03 = linha.insertCell(7);
				ch03.classList.add('trfTblCol8');
				const cxText1 = document.createElement("INPUT");
				cxText1.type = "text";
				cxText1.setAttribute("maxLength","30")
				cxText1.classList.add('trfTbl_inputTxt');
				ch03.appendChild(cxText1);
				ch03.firstChild.value = bdTabela[i].chave04
				//eventos do select chave 02
				ch03.firstChild.addEventListener("change", (e)=>{trfTbl_altetarChave03(e.target)})
				//-------------------------------------------------
				
				//preencher chave 04-------------------------------
				var ch04 = linha.insertCell(8);
				ch04.classList.add('trfTblCol9');
				const cxText2 = document.createElement("INPUT");
				cxText2.type = "text";
				cxText2.setAttribute("maxLength","30")
				cxText2.classList.add('trfTbl_inputTxt');
				ch04.appendChild(cxText2);
				ch04.firstChild.value = bdTabela[i].chave05
				//eventos do select chave 02
				ch04.firstChild.addEventListener("change", (e)=>{trfTbl_altetarChave04(e.target)})
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
				serv.classList.add('trfTblCol12');
				const k = document.createElement("TEXTAREA");
				k.classList.add('trfTblCol12txa');
				serv.appendChild(k);
				serv.firstChild.value = bdTabela[i].serviço;
				//altura automática ao digitar
				trfTbl_auturaAutomaticaTXA(serv.firstChild)
				//altura automática ao focar
				serv.firstChild.addEventListener("focus",(e)=>{trfTbl_auturaAutomaticaTXAFoco(e.target)})
				//rotinas para salvar serviço executado
				serv.firstChild.addEventListener("focusout",(e)=>{trfTbl_salvarTarefaTXA(e.target)})
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

				//altura automática das caixas de texto------------
				ch03.firstChild.style.height = linha.clientHeight + "px"
				ch04.firstChild.style.height = linha.clientHeight + "px"
				serv.firstChild.style.height = linha.clientHeight + "px"
				//-------------------------------------------------

				//adicionar cor da linha---------------------------
				trfTbl_CorLinha(andamento.firstChild, linha)
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
						trfTbl_filtro()

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
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------




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
				trfTbl_CorLinha(andamento.innerHTML, linha)
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
						trfTbl_filtro()

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




//---------------------------------CARREGAR FUNÇÕES DA TABELA PRINCIPAL--------------------------------
//-----------------------------------------------------------------------------------------------------

//CARREGAR CORES----------------------------------------------
async function trfTbl_CorLinha(e, linha){
	var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js

	if(tblPrincipal == "estatica"){
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
	}else{
		if(e.value == bdCfg.chave00[2]){
			linha.style.background = "#f77";
		}
		if(e.value == bdCfg.chave00[3]){
			linha.style.background = "#2E8B57";
		}
		if(e.value == bdCfg.chave00[4]){
			linha.style.background = "#FFD700";
		}
		if(e.value == bdCfg.chave00[5]){
			linha.style.background = "#9fcd9f";
		}
		if(e.value == bdCfg.chave00[6]){
			linha.style.background = "#fff";
		}
		if(e.value == bdCfg.chave00[7]){
			linha.style.background = "#e2e1e1";
		}
		if(e.value == bdCfg.chave00[8]){
			linha.style.background = "#599cf3";
		}
		if(e.value == bdCfg.chave00[9]){
			linha.style.background = "#a175f8";
		}
		if(e.value == bdCfg.chave00[10]){
			linha.style.background = "#F00";
		}
		if(e.value == bdCfg.chave00[11]){
			linha.style.background = "#BC8F8F";
		}
	}
}
//--------------------------------------------------------------



//EDITAR TAREFA-----------------------------------------------

//variavel que define se nova tarefa ou id da tarefa que será editada
var idTarefa = ""//esta variável é alterada na folha /tarefas/js/menuSec.js ; também é utilizada na folha /tarefas/js/formulário.js
//variavel que define qual linha será editada na tabela
var trfTbl_EditarLinha = "" //esta variável é alterada na folha /tarefas/js/formulário.js

//função editar tarefa
async function trfTbl_alterarTarefas(elemento){
	var tarefa = elemento.parentElement.parentElement.parentElement
	var id = parseInt(tarefa.firstChild.innerHTML)
	idTarefa = id //id para editar tarefa
	const verificar = await obterTarefas(id)//pertence a folha: /tarefas/js/banco.js
	editarTarefa(verificar)//pertence a folha: /tarefas/js/formulario.js
	trfTbl_EditarLinha = tarefa
}

//função para alterar a tarefa na tabela atual
async function trfTbl_alterarTarefa(tabela){//função chamada na folha: /tarefas/js/formulário.js
	(async ()=>{
		//verifica se foi alterado com sucesso
		const tarefaBD = []
		tarefaBD.push(await obterTarefas(idTarefa))
		if(tarefaBD[0].atualizacao == tabela[0].atualizacao){
			//modifica a linha editada na tabela
			
			if(tblPrincipal == "estatica"){
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
			}else{
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
				trfTbl_EditarLinha.children[4].firstChild.value = tarefaBD[0].chave00;
				//preencher coluna chave 01
				trfTbl_EditarLinha.children[5].firstChild.value = tarefaBD[0].chave02;
				//preencher coluna chave 02
				trfTbl_EditarLinha.children[6].firstChild.value = tarefaBD[0].chave03;
				//preencher coluna chave 03
				trfTbl_EditarLinha.children[7].firstChild.value= tarefaBD[0].chave04;
				//preencher coluna chave 04
				trfTbl_EditarLinha.children[8].firstChild.value = tarefaBD[0].chave05;
				//preencher coluna porcentagem
				trfTbl_EditarLinha.children[9].innerHTML = tarefaBD[0].porcentagem + "%";
				//preencher coluna tarefa
				trfTbl_EditarLinha.children[10].innerHTML = tarefaBD[0].tarefa;
				//preencher coluna serviço
				trfTbl_EditarLinha.children[11].firstChild.value = tarefaBD[0].serviço;
				//trfTbl_EditarLinha.children[11].firstChild.style.height = trfTbl_EditarLinha.clientHeight + "px"

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
			}
			
			//adicionar cor da linha
			if(tblPrincipal == "estatica"){
				trfTbl_CorLinha(trfTbl_EditarLinha.children[4].innerHTML, trfTbl_EditarLinha)
			}else{
				trfTbl_CorLinha(trfTbl_EditarLinha.children[4].firstChild, trfTbl_EditarLinha)
			}
			

			//filtro das tarefas
			trfTbl_filtro()

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



//EXCLUIR TAREFA----------------------------------------------------
function trfTbl_excluirTarefas(elemento){
	var tarefa = elemento.parentElement.parentElement.parentElement
	var id = parseInt(tarefa.firstChild.innerHTML)
	var icon = "img/imgInter.png"
	var msg = "Excluir"
	var act = "Deseja realmente excluir esta tarefa?"
	var modo = "yn"
	var reload = "false"
	var func = () => {trfTbl_exclTarefa(id,tarefa)}
	openMSG(icon, msg, act, modo, reload,func);
}

//função para excluir tarefa
async function trfTbl_exclTarefa(z,y){
	await excluirTarefa(z)//pertence a folha: /tarefas/js/banco.js
	const verificar = await obterTarefas(z)//pertence a folha: /tarefas/js/banco.js
	if(verificar == "null"){
		y.remove()
		var icon = "img/imgOK.png"
		var msg = "Confirmação " + dbLinha + "!"
		var act = "Tarefa excluída com sucesso!"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func)
	}else{
		var icon = "img/imgError.png"
		var msg = "Erro"
		var act = "Erro ao excluir tarefa"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}
	trfTbl_quantidadesRodapé()//rodapé da tabela
}
//---------------------------------------------------------------------




//SALVAR AO ALTERAR ANDAMENTO------------------------------------------

//variável que define andamento
var trfTbl_andamentoAtv = ""
//função para configurar opções de andamento
async function trfTbl_configAndamento(select){
	const tarefa = select.parentElement.parentElement;
	const opcoes = select.children
	const pendente = trTbl_verificarPendencias(tarefa)

	//verificar uso de andamento automático no textarea
	// const vlTXA = select.parentElement.parentElement.children[11].firstChild.value;
	// var usoTXA = false
	// var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js
	// for(i = 0; i < bdCfg.chave00.length; i++){
	// 	if(i != 2 && i != 4 && bdCfg.chave00[i] != "" && vlTXA.includes(bdCfg.chave00[i] + "**")){
	// 		usoTXA = true
	// 	}
	// }

	//caso alguma pendência
	if(pendente == true/* || usoTXA == true*/){
		for(i=0;i<opcoes.length;i++){
			opcoes[i].disabled = true
			opcoes[i].style.color = "#ddd"
		}
	}else{
		//caso caixa de serviço vazia
		const Servico = tarefa.children[11].firstChild
		if(Servico.value == ""){
			for(i=0;i<opcoes.length;i++){
				opcoes[i].disabled = true
				opcoes[i].style.color = "#ddd"
				opcoes[0].disabled = false
				opcoes[0].style.color = "#000"
				opcoes[4].disabled = false
				opcoes[4].style.color = "#000"
			}
		}else{
			for(i=0;i<opcoes.length;i++){
				opcoes[i].disabled = false
				opcoes[i].style.color = "#000"
				opcoes[0].disabled = true
				opcoes[0].style.color = "#ddd"
				opcoes[2].disabled = true
				opcoes[2].style.color = "#ddd"
			}
		}
	}
}

//alterar andamento no banco
async function trfTbl_altetarAndamento(e){

	const j = e.value
	var y = e.parentElement.parentElement
	var z = parseInt(y.children[0].innerHTML)
	
	await AltTarefasBd(z, "chave00", e.value)
	const vlAlt = await obterDados(z, "chave00")
	
	//mensagem de erro!
	if(vlAlt != e.value){
			var icon = "img/imgError.png"
			var msg = "Erro"
			var act = "Erro ao alterar andamento"
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			e.value = j
	}else{
		//atualizar data
		var dataAtlz = new Date().getTime()
		AltTarefasBd(z, "atualizacao", dataAtlz)
		y.children[14].innerHTML = new Date(dataAtlz).toLocaleDateString("pt-BR")

		//cor da linha
		trfTbl_CorLinha(e, y)

		//ajustar porcentagem
		if(e.value == "Fechado" || e.value == "Ag. Virada" || e.value == "Ag. Abrir"){
			trfTbl_autoPorcentagem(e.value, y)
		}else{
			const prtgem = e.parentElement.parentElement.children[9]
			if(prtgem.innerHTML == "100%"){
				trfTbl_autoPorcentagem(e.value, y)
			}
		}	
	}
}

//procurar pendências
function trTbl_verificarPendencias(tarefa){
	var pendenciasAtivas = false
	if(tarefa.children[12].innerHTML == "  "){
		pendenciasAtivas = false
	}else{
		pendenciasAtivas = true
	}
	return(pendenciasAtivas)
}
//---------------------------------------------------------------------




//SALVAR AO ALTERAR CHAVE 01-------------------------------------------
async function trfTbl_altetarChave01(elemento){
	const valorAnterior = elemento.value
	var linha = elemento.parentElement.parentElement
	var id = parseInt(linha.children[0].innerHTML)
	
	await AltTarefasBd(id, "chave02", elemento.value)
	const vlAlt = await obterDados(id, "chave02")
	
	//mensagem de erro!
	if(vlAlt != elemento.value){
			var icon = "img/imgError.png"
			var msg = "Erro"
			var act = "Erro ao alterar andamento"
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			elemento.value = valorAnterior
	}else{
		//atualizar data
		var dataAtlz = new Date().getTime()
		AltTarefasBd(id, "atualizacao", dataAtlz)
		linha.children[14].innerHTML = new Date(dataAtlz).toLocaleDateString("pt-BR")

		//mensagem de confirmação
		document.getElementById('trf_tblmsgSec').style.display = "flex"
		setTimeout(()=>{
			document.getElementById('trf_tblmsgSec').style.display = "none"
		},3000)
	}
}
//---------------------------------------------------------------------




//SALVAR AO ALTERAR CHAVE 02-------------------------------------------
async function trfTbl_altetarChave02(elemento){
	const valorAnterior = elemento.value
	var linha = elemento.parentElement.parentElement
	var id = parseInt(linha.children[0].innerHTML)
	
	await AltTarefasBd(id, "chave03", elemento.value)
	const vlAlt = await obterDados(id, "chave03")
	
	//mensagem de erro!
	if(vlAlt != elemento.value){
			var icon = "img/imgError.png"
			var msg = "Erro"
			var act = "Erro ao alterar andamento"
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			elemento.value = valorAnterior
	}else{
		//atualizar data
		var dataAtlz = new Date().getTime()
		AltTarefasBd(id, "atualizacao", dataAtlz)
		linha.children[14].innerHTML = new Date(dataAtlz).toLocaleDateString("pt-BR")

		//mensagem de confirmação
		document.getElementById('trf_tblmsgSec').style.display = "flex"
		setTimeout(()=>{
			document.getElementById('trf_tblmsgSec').style.display = "none"
		},3000)
	}
}
//---------------------------------------------------------------------




//SALVAR AO ALTERAR CHAVE 03-------------------------------------------
async function trfTbl_altetarChave03(elemento){
	var linha = elemento.parentElement.parentElement
	var id = parseInt(linha.children[0].innerHTML)
	
	await AltTarefasBd(id, "chave04", elemento.value)
	const vlAlt = await obterDados(id, "chave04")
	
	//mensagem de erro!
	if(vlAlt != elemento.value){
			var icon = "img/imgError.png"
			var msg = "Erro"
			var act = "Erro ao alterar andamento"
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
	}else{
		//atualizar data
		var dataAtlz = new Date().getTime()
		AltTarefasBd(id, "atualizacao", dataAtlz)
		linha.children[14].innerHTML = new Date(dataAtlz).toLocaleDateString("pt-BR")

		//mensagem de confirmação
		document.getElementById('trf_tblmsgSec').style.display = "flex"
		setTimeout(()=>{
			document.getElementById('trf_tblmsgSec').style.display = "none"
		},3000)
	}
}
//---------------------------------------------------------------------




//SALVAR AO ALTERAR CHAVE 04-------------------------------------------
async function trfTbl_altetarChave04(elemento){
	var linha = elemento.parentElement.parentElement
	var id = parseInt(linha.children[0].innerHTML)
	
	await AltTarefasBd(id, "chave05", elemento.value)
	const vlAlt = await obterDados(id, "chave05")
	
	//mensagem de erro!
	if(vlAlt != elemento.value){
			var icon = "img/imgError.png"
			var msg = "Erro"
			var act = "Erro ao alterar andamento"
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
	}else{
		//atualizar data
		var dataAtlz = new Date().getTime()
		AltTarefasBd(id, "atualizacao", dataAtlz)
		linha.children[14].innerHTML = new Date(dataAtlz).toLocaleDateString("pt-BR")

		//mensagem de confirmação
		document.getElementById('trf_tblmsgSec').style.display = "flex"
		setTimeout(()=>{
			document.getElementById('trf_tblmsgSec').style.display = "none"
		},3000)
	}
}
//---------------------------------------------------------------------




//FUNÇÕES PARA A CAIXA DE SERVIÇO EXECUTADO----------------------------

var alturaTXA = ""

//altura automática do textarea ao focar
function trfTbl_auturaAutomaticaTXAFoco(elemento){
	alturaTXA = elemento.parentElement.parentElement.clientHeight
	if (elemento.scrollHeight > elemento.offsetHeight){
		elemento.style.height = elemento.scrollHeight + "px"
	}
	
}

//altura automática do textarea ao digitar
function trfTbl_auturaAutomaticaTXA(textarea){
	textarea.style.minHeight = textarea.parentElement.clientHeight + "px";
	function updateHeight(){
		var offset = textarea.offsetHeight - textarea.clientHeight;
		textarea.style.height = "auto";
		textarea.style.height = textarea.scrollHeight + offset + "px";
	}
	textarea.addEventListener("keyup", updateHeight);
	textarea.addEventListener("input", updateHeight);
}

//salvar serviço executado
async function trfTbl_salvarTarefaTXA(e){
	var y = e.parentElement.parentElement
	const u = e.value

	if(alturaTXA != 0){
		e.style.height = alturaTXA + "px"
	}

	var z = parseInt(y.children[0].innerHTML)
		const vlAlt = await obterDados(z, "serviço")
		if(u != vlAlt){
			await AltTarefasBd(z, "serviço", e.value)
			const vlAltx = await obterDados(z, "serviço")
			if(vlAltx != e.value){
				var icon = "img/imgError.png"
				var msg = "Erro"
				var act = "Erro ao alterar serviço executado"
				var modo = "conf"
				var reload = "false"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
			}else{
				//alterar andamento da tarefa ao mudar o serviço executado
				const trfTbl_selectAndamento = y.children[4].firstChild
				var servico = e
				const pendente = trTbl_verificarPendencias(y)

				if(trfTbl_selectAndamento.value != "Aberto"){
					trfTbl_andamentoAtv = trfTbl_selectAndamento.value
				}else{
					trfTbl_andamentoAtv = "Em Exec."
				}

				if(pendente != true){
					if(servico.value == ""){
						if(trfTbl_andamentoAtv != "Ag. Abrir"){
							trfTbl_selectAndamento.value = "Aberto"
						}else{
							trfTbl_selectAndamento.value = "Ag. Abrir"
						}
					}else{
						if(trfTbl_andamentoAtv == "Aberto" || trfTbl_andamentoAtv == ""){
							trfTbl_selectAndamento.value = "Em Exec."
						}else{
							trfTbl_selectAndamento.value = trfTbl_andamentoAtv
							
						}
					}
					var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js
					for(i = 0; i < bdCfg.chave00.length; i++){
						if(i != 2 && i != 4 && bdCfg.chave00[i] != "" && u.includes(bdCfg.chave00[i] + "**")){
							trfTbl_selectAndamento.value = bdCfg.chave00[i]
						}
					}
				}
				
				await AltTarefasBd(z, "chave00", trfTbl_selectAndamento.value)
				const vlAlt = await obterDados(z, "chave00")

				//mensagem de erro!
				if(vlAlt != trfTbl_selectAndamento.value){
					var icon = "img/imgError.png"
					var msg = "Erro"
					var act = "Erro ao alterar andamento"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					//atualizar data
					var dataAtlz = new Date().getTime()
					AltTarefasBd(z, "atualizacao", dataAtlz)
					y.children[14].innerHTML = new Date(dataAtlz).toLocaleDateString("pt-BR")

					//cor da linha
					trfTbl_CorLinha(trfTbl_selectAndamento, y)

					//atualizar porcentagem
					trfTbl_autoPorcentagem(trfTbl_selectAndamento.value, y)
				}
			}
		}
}
//---------------------------------------------------------------------




//FUNÇÕES PARA ALTERAÇÃO DO PERCENTUAL-----------------------------------------
//funcção que define se porcentagem automática ou manual
function trfTbl_autoPorcentagem(andamento, tarefa){
	if(andamento == "Fechado" || andamento == "Ag. Virada" || andamento == "Ag. Abrir" || andamento == "Aberto"){
		if(andamento == "Fechado" || andamento == "Ag. Virada"){porcentagem = "100"}
		if(andamento == "Ag. Abrir" || andamento == "Aberto"){porcentagem = "0"}
		trfTbl_autoPorcentagemDb(porcentagem, tarefa)
		
		//mensagem de confirmação
		document.getElementById('trf_tblmsgSec').style.display = "flex"
		setTimeout(()=>{
			document.getElementById('trf_tblmsgSec').style.display = "none"
		},3000)
	}else{
		trfTbl_tarefaPCT = tarefa
		//chama ca caixa de mensagens de atualização de percentual
		document.getElementById('trfTbl_pnlPercentual').style.display = "flex"
		document.getElementById('trfTbl_novoPercentual').value = ""
		document.getElementById('trfTbl_novoPercentual').focus()
		
		//garante alterar a porcentagem em caso de dechamento da página
		const id = parseInt(tarefa.children[0].innerHTML)
		AltTarefasBd(id, "porcentagem", "50")
	}
}
//caixa de texto de atualização do percentual
document.getElementById("trfTbl_novoPercentual").addEventListener("input", (e)=>{
	//impede colar ou digitar o zero no primeiro caracter
	if(e.target.value.substring(0,1) == 0){
		e.target.value = ""
	}
	//foca no botão salvar
	if(e.target.value.length == 2){
	
		document.getElementById('trfTbl_confirmarPercentual').focus()
	}
})
//botão de confirmar atualização da porcentagem
var trfTbl_tarefaPCT = ""
document.getElementById('trfTbl_confirmarPercentual').addEventListener('click', ()=>{
	if(document.getElementById("trfTbl_novoPercentual").value != ""){
		var porcentagem = document.getElementById('trfTbl_novoPercentual').value
		trfTbl_autoPorcentagemDb(porcentagem, trfTbl_tarefaPCT)
		document.getElementById('trfTbl_pnlPercentual').style.display = "none"
		
		//mensagem de confirmação
		document.getElementById('trf_tblmsgSec').style.display = "flex"
		setTimeout(()=>{
			document.getElementById('trf_tblmsgSec').style.display = "none"
		},3000)
		
		
	}else{
		document.getElementById("trfTbl_novoPercentual").reportValidity()
	}
})
//função para atualizar a porcentagem
async function trfTbl_autoPorcentagemDb(porcentagem, tarefa){
	const id = parseInt(tarefa.children[0].innerHTML)
	await AltTarefasBd(id, "porcentagem", porcentagem)
	const vlAltx = await obterDados(id, "porcentagem")
	if(vlAltx != porcentagem){
		var icon = "img/imgError.png"
		var msg = "Erro"
		var act = "Erro ao alterar percentual"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}else{
		tarefa.children[9].innerHTML = porcentagem + "%"
	}
}
//------------------------------------------------------------------------





//menu do controle de visualização das colunas-------------------
async function trfTbl_menuColunas(){

	//desabilitar checkbox das colunas conforme configurações
	var bdCfg = await loadTBCfgLin(0)
	const bd_chave = [bdCfg.chave02[1],bdCfg.chave03[1],bdCfg.chave04[1],bdCfg.chave05[1]]
	const colunaMunu = ["trfTblCol6","trfTblCol7","trfTblCol8","trfTblCol9"]
	for(i=0;i < bd_chave.length;i++){
		if(bd_chave[i] == false){
			document.getElementById(colunaMunu[i]).disabled = true
			document.getElementById(colunaMunu[i]).checked = false
			localStorage.setItem(colunaMunu[i], false)
			const coluna = [...document.getElementsByClassName(colunaMunu[i])]
			coluna.map((e)=>{
				e.style.display = "none"
			})
		}else{
			document.getElementById(colunaMunu[i]).disabled = false
		}
	}
	//checkbox "Fechados"
	if(localStorage.getItem("trf_tblCBFechadas") == "true"){
		document.getElementById("trf_tblCBFechadas").checked = true
	}else{
		document.getElementById("trf_tblCBFechadas").checked = false
	}
	
	//nomear checkbox do menu de controles das colunas
	document.getElementById('trf_tblCtrllb1').innerHTML = bdCfg.chave01[0]
	document.getElementById('trf_tblCtrllb2').innerHTML = bdCfg.chave00[0]
	document.getElementById('trf_tblCtrllb3').innerHTML = bdCfg.chave02[0]
	document.getElementById('trf_tblCtrllb4').innerHTML = bdCfg.chave03[0]
	document.getElementById('trf_tblCtrllb5').innerHTML = bdCfg.chave04[0]
	document.getElementById('trf_tblCtrllb6').innerHTML = bdCfg.chave05[0]	
	
	
}
//ocultar ou mostrar menu		
const trf_tblCtrlAct = document.getElementById('trf_tblCtrlAct')
const trf_tblCtrl = document.getElementById('trf_tblCtrl')
var trf_tblCtrlClm = false
trf_tblCtrl.style.display = "none"
trf_tblCtrlAct.addEventListener('click', ()=>{
	if(trf_tblCtrl.style.display == "none"){
		trf_tblCtrlClm = true
		trf_tblCtrl.style.display = ""
	}else{
		trf_tblCtrlClm = false
		trf_tblCtrl.style.display = "none"
	}
})
window.addEventListener("click", (e)=>{
	if(trf_tblCtrlClm == true){
		const x = e.target
		const y = e.target.parentNode
		if(!(x.classList.contains("trf_tblCtrl") || y.classList.contains("trf_tblCtrl"))){
			trf_tblCtrlClm = false
			trf_tblCtrl.style.display = "none"
		}
	}
})
//ocultar ou mostrar colunas da tabela
const chbx = [...document.getElementsByClassName('trf_tblcbs')]
chbx.map((e)=>{
	e.addEventListener('change', function(){
		var x = e.id
		if(e.checked == true){
			var y = [...document.getElementsByClassName(x)]
			y.map((c)=>{
				c.style.display = ""
			})
			localStorage.setItem(x, true)
		}else{
			var y = [...document.getElementsByClassName(x)]

			//desativar filtro
			const elmt = y[0].children[1].children[0]
			elmt.value = ""
			localStorage.setItem(elmt.id,"")
			y[0].children[0].style.background = "#555"

			trfTbl_filtro()

			//ocultar coluna
			y.map((c)=>{
				c.style.display = "none"
			})
			localStorage.setItem(x, false)
		}
		
	})
})
//ocultar ou mostrar tarefas fechadas 
if(!localStorage.getItem("trf_tblCBFechadas")){
	localStorage.setItem("trf_tblCBFechadas",true)
}
document.getElementById("trf_tblCBFechadas").addEventListener("change",(e)=>{
	if(document.getElementById("trf_tblCBFechadas").checked == true){
		localStorage.setItem("trf_tblCBFechadas",true)
	}else{
		localStorage.setItem("trf_tblCBFechadas",false)
	}

	trfTbl_filtro()
	trfTbl_quantidadesRodapé()
	
})
//-------------------------------------------------------------------

//quantidade de tarefas mostradas no rodapé-------------------------------
async function trfTbl_quantidadesRodapé(){
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

		if(tblPrincipal == "estatica"){
			tabela.map((tb)=>{
				if(tb.children[4].innerHTML == "Fechado"){
					valFec++
				}
			})
		}else{
			tabela.map((tb)=>{
				if(tb.children[4].firstChild.value == "Fechado"){
					valFec++
				}
			})
		}

		texto.innerText = "mostrando " + qtd + " de " + bdTabela.length + " tarefas cadastradas" +
		" (" + valFec + " tarefas fechadas)";
	}else{
		texto.innerText = "mostrando " + qtd + " de " + bdTabela.length + " tarefas cadastradas"
	}
	
}
//------------------------------------------------------------------------


//filtros do cabeçalho das tarefas----------------------------------------
//chamada dos filtros
document.getElementById("trf_tblTbHd").addEventListener("click",(e)=>{
	const el = e.target.parentElement.parentElement.children[1]
	if(e.target.classList.contains("filt")){
		el.style.display = "flex"
		el.children[0].focus()
	}
})

//evento dos input text dos filtros
const trfTbl_input = [...document.getElementsByClassName("trfTblColInpt")]
trfTbl_input.map((evt)=>{

	evt.addEventListener("input",(e)=>{
		localStorage.setItem(e.target.id,e.target.value)
		trfTbl_filtro()
		//alarme de filtro ativo
		const alarme = e.target.parentElement.parentElement.children[0]
		if(e.target.value == ""){
			alarme.style.background = "#555"
		}else{
			alarme.style.background = "#f00"
		}
	})

	evt.addEventListener("focusout",(e)=>{
		e.target.parentElement.style.display = "none"
	})
})

//função para realizar o filtro
function trfTbl_filtro(){//função chamada na folha: /tarefas/js/carregamento.js
	const tabela = [...document.getElementById("trf_tblTbBdy").children]
	const input = [...document.getElementsByClassName("trfTblColInpt")]
	
	if(tblPrincipal == "estatica"){
		tabela.map((e)=>{

			if(
				e.children[1].innerHTML.toLowerCase().includes(input[0].value.toLowerCase()) == false ||
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
	}else{
		tabela.map((e)=>{

			if(
				e.children[1].innerHTML.toLowerCase().includes(input[0].value.toLowerCase()) == false ||
				e.children[2].innerHTML.includes(input[1].value) == false ||
				e.children[3].innerHTML.toLowerCase().includes(input[2].value.toLowerCase()) == false ||
				e.children[4].firstChild.value.toLowerCase().includes(input[3].value.toLowerCase()) == false ||
				e.children[5].firstChild.value.toLowerCase().includes(input[4].value.toLowerCase()) == false ||
				e.children[6].firstChild.value.toLowerCase().includes(input[5].value.toLowerCase()) == false ||
				e.children[7].firstChild.value.toLowerCase().includes(input[6].value.toLowerCase()) == false ||
				e.children[8].firstChild.value.toLowerCase().includes(input[7].value.toLowerCase()) == false ||
				e.children[9].innerHTML.includes(input[8].value) == false ||
				e.children[10].innerHTML.toLowerCase().includes(input[9].value.toLowerCase()) == false ||
				e.children[11].firstChild.value.toLowerCase().includes(input[10].value.toLowerCase()) == false ||
				e.children[12].innerHTML.toLowerCase().includes(input[11].value.toLowerCase()) == false ||
				e.children[13].innerHTML.toLowerCase().includes(input[12].value.toLowerCase()) == false ||
				e.children[14].innerHTML.includes(input[13].value) == false ||
				(localStorage.getItem("trf_tblCBFechadas") == "false" && e.children[4].firstChild.value == "Fechado")
			){
				e.style.display = "none"
			}else{
				e.style.display = ""
			}
		})
	}
	trfTbl_quantidadesRodapé()
}

//preencher input dos filtros na inicialização
function trfTbl_filtroReload(){//função chamada na folha: /tarefas/js/carregamento.js
	return new Promise((resolve)=>{
		const input = [...document.getElementsByClassName("trfTblColInpt")]

		//preencher input
		input[0].value = localStorage.getItem("filtC2");
		input[1].value = localStorage.getItem("filtC3");
		input[2].value = localStorage.getItem("filtC4");
		input[3].value = localStorage.getItem("filtC5");
		input[4].value = localStorage.getItem("filtC6");
		input[5].value = localStorage.getItem("filtC7");
		input[6].value = localStorage.getItem("filtC8");
		input[7].value = localStorage.getItem("filtC9");
		input[8].value = localStorage.getItem("filtC10");
		input[9].value = localStorage.getItem("filtC11");
		input[10].value = localStorage.getItem("filtC12");
		input[11].value = localStorage.getItem("filtC13");
		input[12].value = localStorage.getItem("filtC14");
		input[13].value = localStorage.getItem("filtC15");

		//alarmes de filtro ativo
		for(i=0;i < input.length;i++){
			var alarme = input[i].parentElement.parentElement.children
			if(input[i].value == ""){
				alarme[0].style.background = "#555"
			}else{
				alarme[0].style.background = "#f00"
			}
		}
		resolve()
	})
}
//------------------------------------------------------------------------
