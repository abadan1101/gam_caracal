//-----------------------------CARREGAR TABELA PRINCIPAL--------------------------------
//--------------------------------------------------------------------------------------
async function TrfTbl_Load(){//função chamada na folha: /tarefas/js/carregamento.js
	//carregar banco de dados------------------------------------------------
	var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js

	return new Promise((resolve)=>{
		try{
			//cabeçalho da tabela-------------------------------------------
			const cabecalho = document.getElementById('trf_tblTbHd').children
			cabecalho[3].innerHTML = bdCfg.chave01[0]
			cabecalho[4].innerHTML = bdCfg.chave00[0]
			cabecalho[5].innerHTML = bdCfg.chave02[0]
			cabecalho[6].innerHTML = bdCfg.chave03[0]
			cabecalho[7].innerHTML = bdCfg.chave04[0]
			cabecalho[8].innerHTML = bdCfg.chave05[0]
			//--------------------------------------------------------------

			//corpo da tabela-----------------------------------------------
			for(i=0;i<bdTabela.length;i++){
				//criar linhas da tabela
				const tb = document.getElementById("trf_tblTbBdy");
				var qtdLin = tb.rows.length;
				var linha = tb.insertRow(qtdLin);
				linha.classList.add('trf_tblTbBdy');
				
				//preencher coluna id
				var id = linha.insertCell(0);
				id.classList.add('trfTblCol1');
				id.innerHTML = bdTabela[i].id;

				//preencher coluna número
				var numero = linha.insertCell(1);
				numero.innerHTML = bdTabela[i].numero;
				numero.classList.add('trfTblCol2');

				//preencher coluna data da tarefa
				var data = linha.insertCell(2);
				data.classList.add('trfTblCol3');
				if(bdTabela[i].data != ""){
					data.innerHTML = new Date(bdTabela[i].data).toLocaleDateString("pt-BR");
				}
				
				//preencher coluna disponibilidade
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
				
				//preencher coluna andamento
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

				//preencher coluna chave 01
				var ch01 = linha.insertCell(5);
				ch01.classList.add('trfTblCol6');
				const slct1 = document.createElement("select")
				slct1.classList.add('trf_tblSlctTbl');
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
				
				//preencher coluna chave 02
				var ch02 = linha.insertCell(6);
				ch02.classList.add('trfTblCol7');
				const slct2 = document.createElement("select")
				slct2.classList.add('trf_tblSlctTbl');
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

				//preencher chave 03
				var ch03 = linha.insertCell(7);
				ch03.classList.add('trfTblCol8');
				const cxText1 = document.createElement("INPUT");
				cxText1.type = "text";
				cxText1.setAttribute("maxLength","18")
				cxText1.classList.add('trfTbl_inputTxt');
				ch03.appendChild(cxText1);
				ch03.firstChild.value = bdTabela[i].chave04
				
				//preencher chave 04
				var ch04 = linha.insertCell(8);
				ch04.classList.add('trfTblCol9');
				const cxText2 = document.createElement("INPUT");
				cxText2.type = "text";
				cxText2.setAttribute("maxLength","18")
				cxText2.classList.add('trfTbl_inputTxt');
				ch04.appendChild(cxText2);
				ch04.firstChild.value = bdTabela[i].chave05
				
				//preencher porcentagem
				var prct = linha.insertCell(9);
				prct.classList.add('trfTblCol10');
				prct.innerHTML = bdTabela[i].porcentagem + "%";
				
				//preencher descrição
				var desc = linha.insertCell(10);
				desc.classList.add('trfTblCol11');
				desc.innerHTML = bdTabela[i].tarefa;
				
				//preencher serviços executados da tarefa
				var serv = linha.insertCell(11);
				serv.classList.add('trfTblCol12');
				const k = document.createElement("TEXTAREA");
				k.classList.add('trfTblCol12txa');
				serv.appendChild(k);
				serv.firstChild.value = bdTabela[i].serviço;
				
				//preencher coluna das pendencias	
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
				
				//preencher equipe
				var eqp = linha.insertCell(13);
				eqp.classList.add('trfTblCol14');
				var membros = bdTabela[i].equipe
				eqp.innerHTML = ""
				membros.map((e)=>{eqp.innerHTML = eqp.innerHTML + " " + e});

				//preencher data de atualização
				var atlz = linha.insertCell(14);
				atlz.classList.add('trfTblCol15');
				if(bdTabela[i].atualizacao != ""){
					atlz.innerHTML = new Date(bdTabela[i].atualizacao).toLocaleDateString("pt-BR");
				}

				//adicionar botões
				var opcs = linha.insertCell(15);
				opcs.classList.add('trfTblCol16');
				opcs.innerHTML = "<div><i class='bx bx-edit-alt btnEditTst'></i><i class='bx bx-message-square-x btnexcTst'></i></div>";
				
				//altura automática das caixas de texto
				ch03.firstChild.style.height = ch03.clientHeight + "px"
				ch04.firstChild.style.height = ch03.clientHeight + "px"
				serv.firstChild.style.height = serv.clientHeight + "px"

				//adicionar cor da linha
				trfTbl_CorLinha(andamento.firstChild, linha)
			}
			//-------------------------------------------------------------------------

			//mostrar ou ocultar colunas na inicialização------------------------------
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
						y.map((c)=>{
							c.style.display = "none"
						})
					}
			})
			//------------------------------------------------------------------------

			//controles da tabela------------------------------------------------------
			TrfTbl_EditarTarefas()//editar tarefas
			trfTbl_deletarLinhas()//rotina botão excluir tarefa
			trfTbl_altetarAndamento()//rotina de mudança no andamento da tarefa
			trfTbl_altetarServiço()//teste alterar serviço executado
			trfTbl_quantidadesRodapé()//rodapé da tabela
			//--------------------------------------------------------------------------

			resolve()
		}catch (error){
			var icon = "img/imgError.png"
			var msg = "Erro ao carregar tabela principal!"
			var act = error
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao carregar tabela principal! " + error)
		}
	})
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//----------------------CARREGAR FUNÇÕES DA TABELA PRINCIPAL----------------------------
//--------------------------------------------------------------------------------------
//carregar cores das tarefas----------------------------------------------
async function trfTbl_CorLinha(e, linha){
	var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js

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
//--------------------------------------------------------------

//botão editar tarefas-----------------------------------------------
//variavel que define se nova tarefa ou id da tarefa que será editada
var idTarefa = ""//esta variável é alterada na folha /tarefas/js/menuSec.js ; também é utilizada na folha /tarefas/js/formulário.js
//variavel que define qual linha será editada na tabela
var trfTbl_EditarLinha = "" //esta variável é alterada na folha /tarefas/js/formulário.js
//adicionar função no botão
function TrfTbl_EditarTarefas(){
	const x = [...document.getElementsByClassName("btnEditTst")]
	x.map((e)=>{
		var y = e.parentElement.parentElement.parentElement
		var z = parseInt(y.firstChild.innerHTML)
		e.addEventListener("click", ()=>{
			//id para editar tarefa
			idTarefa = z
			async function editar(){
				const verificar = await obterTarefas(z)//pertence a folha: /tarefas/js/banco.js
				editarTarefa(verificar)//pertence a folha: /tarefas/js/formulario.js
				trfTbl_EditarLinha = y
			}editar()
		})
	})
}
//função para alterar a tarefa na tabela atual
async function trfTbl_alterarTarefa(tabela){//função chamada na folha: /tarefas/js/formulário.js
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
			trfTbl_EditarLinha.children[11].firstChild.style.height = trfTbl_EditarLinha.clientHeight + "px"
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
			trfTbl_CorLinha(trfTbl_EditarLinha.children[4].firstChild, trfTbl_EditarLinha)

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

//botão excluir tarefas-----------------------------------------------
function trfTbl_deletarLinhas(){
	const x = [...document.getElementsByClassName("btnexcTst")]
	x.map((e)=>{
		var y = e.parentElement.parentElement.parentElement
		var z = parseInt(y.firstChild.innerHTML)
		e.addEventListener("click", ()=>{
			var icon = "img/imgInter.png"
			var msg = "Excluir"
			var act = "Deseja realmente excluir esta tarefa?"
			var modo = "yn"
			var reload = "false"
			var func = () => {trfTbl_exclTarefa(z,y)}
			openMSG(icon, msg, act, modo, reload,func);
		})
	})
}
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

//salvar ao alterar andamento------------------------------------------
function trfTbl_altetarAndamento(){
	const x = [...document.getElementsByClassName("trf_tblSlctAdmt")]
	x.map((e)=>{
		const j = e.value
		var y = e.parentElement.parentElement
		var z = parseInt(y.children[0].innerHTML)
		e.addEventListener("change", ()=>{
			async function alterar(){
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
					//cor da linha
					trfTbl_CorLinha(e, y)
					
					//mensagem de sucesso!
					document.getElementById('trf_tblmsgSec').style.display = "flex"
					setTimeout(()=>{
						document.getElementById('trf_tblmsgSec').style.display = "none"
					},3000)
				}	
			}alterar()
		})
	})
}
//-----------------------------------------------------------------------------

//alterar serviço executado----------------------------------------------
function trfTbl_altetarServiço(){
	//configurar textarea para altura automática
	(function () {
		"use strict";

		function addEvent(textarea) {
			textarea.style.minHeight = textarea.parentElement.clientHeight + "px";
			function updateHeight() {
				var offset = textarea.offsetHeight - textarea.clientHeight;
				textarea.style.height = "auto";
				textarea.style.height = textarea.scrollHeight + offset + "px";
			}
			textarea.addEventListener("keyup", updateHeight);
			textarea.addEventListener("input", updateHeight);
		}

		document
		.querySelectorAll(".trfTblCol12txa")
		.forEach(addEvent);
	})();
	//alterar serviço executado
	const z = [...document.getElementsByClassName('trfTblCol12txa')]
	z.map((e)=>{
		
		var p = ""
		e.addEventListener("focus",()=>{
			p = e.value
			if (e.scrollHeight > e.offsetHeight){
				e.style.height = e.scrollHeight + "px"	
			}
		})
		
		const elmnt = e.parentElement.clientHeight
		e.addEventListener("focusout",()=>{
			const u = e.value
			if(elmnt != 0){
				e.style.height = elmnt + "px"
			}
			
			async function alterar(){
				var y = e.parentElement.parentElement
				var z = parseInt(y.children[0].innerHTML)
				const vlAlt = await obterDados(z, "serviço")
				if(u != vlAlt){
					await AltTarefasBd(z, "serviço", e.value)
					const vlAltx = await obterDados(z, "serviço")
					if(vlAltx != e.value){
						var icon = "img/imgError.png"
						var msg = "Erro"
						var act = "Erro ao alterar andamento"
						var modo = "conf"
						var reload = "false"
						var func = ""
						openMSG(icon, msg, act, modo, reload,func);
					}else{
						document.getElementById('trf_tblmsgSec').style.display = "flex"
						setTimeout(()=>{
							document.getElementById('trf_tblmsgSec').style.display = "none"
						},3000)
					}
				}
				
				
				
			}alterar()
			
		})
	})	
}
//--------------------------------------------------------------

//menu do controle de visualização das colunas-------------------
async function xt(){
	var bdCfg = await loadTBCfgLin(0)
	//nomear checkbox do menu de controles das colunas
	document.getElementById('trf_tblCtrllb1').innerHTML = bdCfg.chave01[0]
	document.getElementById('trf_tblCtrllb2').innerHTML = bdCfg.chave00[0]
	document.getElementById('trf_tblCtrllb3').innerHTML = bdCfg.chave02[0]
	document.getElementById('trf_tblCtrllb4').innerHTML = bdCfg.chave03[0]
	document.getElementById('trf_tblCtrllb5').innerHTML = bdCfg.chave04[0]
	document.getElementById('trf_tblCtrllb6').innerHTML = bdCfg.chave05[0]		
}xt()
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
			y.map((c)=>{
				c.style.display = "none"
			})
			localStorage.setItem(x, false)
		}
		
	})
})
//-------------------------------------------------------------------

//quantidade de tarefas mostradas no rodapé-------------------------------
async function trfTbl_quantidadesRodapé(){
	const texto = document.getElementById("trfTblQtd")
	var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var qtdTabela = document.getElementById("trf_tblTbBdy").children.length
	//PROVISÓRIO
	texto.innerText = "mostrando " + qtdTabela + " de " + bdTabela.length + " tarefas cadastradas";
}
//------------------------------------------------------------------------

//carregar caixas de seleção dos filtros das colunas da tabela principal
function trfTbl_carregarCabecalho(){
	// //buscar indices para criar os filtros
	// const x = document.getElementsByClassName("trf_tblTbBdy")
	// var y0=[], y1=[], y2=[], y3=[]
	// for(i=0;i < x.length;i++){
	// 	let a0 = y0.includes(x[i].children[4].firstChild.value)
	// 	if(a0 == false){
	// 		y0.push(x[i].children[4].firstChild.value)
	// 	}
	// 	let a1 = y1.includes(x[i].children[3].innerHTML)
	// 	if(a1 == false){
	// 		y1.push(x[i].children[3].innerHTML)
	// 	}
	// 	let a2 = y2.includes(x[i].children[5].firstChild.value)
	// 	if(a2 == false){
	// 		y2.push(x[i].children[5].firstChild.value)
	// 	}
	// 	let a3 = y3.includes(x[i].children[6].firstChild.value)
	// 	if(a3 == false){
	// 		y3.push(x[i].children[6].firstChild.value)
	// 	}	
	// }
	// //popular a caixa de seleção
	// const caixaSlct = [...document.querySelectorAll('#trf_tblTbHd .trf_tblSlct')]
	// //popular a caixa de seleção tipo
	// caixaSlct[0].addEventListener('focus',(e)=>{
	// 	const cx0 = caixaSlct[0].firstChild
	// 	caixaSlct[0].innerHTML = ""
	// 	caixaSlct[0].appendChild(cx0)
	// 	for(i=0;i<y1.length;i++){
	// 		const z0 = document.createElement("option");
	// 		var num = y1[i]
	// 		if(num != ""){
	// 			z0.innerHTML = y1[i]
	// 			caixaSlct[0].appendChild(z0);
	// 		}
	// 	}
	// })
	// //popular a caixa de seleção andamento
	// caixaSlct[1].addEventListener('focus',(e)=>{
	// 	const cx0 = caixaSlct[1].firstChild
	// 	caixaSlct[1].innerHTML = ""
	// 	caixaSlct[1].appendChild(cx0)
	// 	for(i=0;i<y0.length;i++){
	// 		const z0 = document.createElement("option");
	// 		var num = y0[i]
	// 		if(num != ""){
	// 			z0.innerHTML = y0[i]
	// 			caixaSlct[1].appendChild(z0);
	// 		}
	// 	}
	// })
	// //popular a caixa de seleção chave 01
	// caixaSlct[2].addEventListener('focus',(e)=>{
	// 	const cx0 = caixaSlct[2].firstChild
	// 	caixaSlct[2].innerHTML = ""
	// 	caixaSlct[2].appendChild(cx0)
	// 	for(i=0;i<y2.length;i++){
	// 		const z0 = document.createElement("option");
	// 		var num = y2[i]
	// 		if(num != ""){
	// 			z0.innerHTML = y2[i]
	// 			caixaSlct[2].appendChild(z0);
	// 		}
	// 	}
	// })
	// //popular a caixa de seleção chave 02
	// caixaSlct[3].addEventListener('focus',(e)=>{
	// 	const cx0 = caixaSlct[3].firstChild
	// 	caixaSlct[3].innerHTML = ""
	// 	caixaSlct[3].appendChild(cx0)
	// 	for(i=0;i<y3.length;i++){
	// 		const z0 = document.createElement("option");
	// 		var num = y3[i]
	// 		if(num != ""){
	// 			z0.innerHTML = y3[i]
	// 			caixaSlct[3].appendChild(z0);
	// 		}
	// 	}
	// })
}
//------------------------------------------------------------------------











