//-------------------------MENU SECUNDÁRIO DAS TAREFAS----------------------------------
//--------------------------------------------------------------------------------------

//ABRIR E FECHAR MENU SECUNDÁRIO
const trf_menu = document.getElementById("trf_menu")
const trf_mn = document.getElementById("trf_mn")
trf_menu.addEventListener('click', function () {
	trf_mn.classList.toggle('menuModulos_mst');
})
window.addEventListener('click', function (e) {
	if(e.target !== trf_menu) {
		if(e.target !== trf_mn) {
			if(trf_mn.classList.contains('menuModulos_mst')) {
				trf_mn.classList.remove('menuModulos_mst');
			}
		}
	}
})

//BOTÃO NOVA TAREFA
const tmAf = document.getElementById("trf_menu_afNew")	
tmAf.addEventListener("click",(evt)=>{
	novaTarefa()//função pertence a folha: /tarefas/js/5formulário.js
})

//BOTÃO IMPORTAR
let fileInput = document.getElementById('trf_menu_afImp')
fileInput.addEventListener('change', () => {
	const file = fileInput.files[0]
	const reader = new FileReader()
	const docSelect = file.name;
	
	//baixar planilha de ordens de serviço abertas
	if(docSelect.includes("OSVirtualAbertaAeronave") || docSelect.includes("OSVirtualPendenteAeronave")){
		reader.onload = (event) => {
			const data = event.target.result
			const workbook = XLSX.read(data, {type:'array'})
			const firstSheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[firstSheetName]
			const rows = XLSX.utils.sheet_to_json(worksheet)
			var tabela = []
		
			rows.map((e)=>{
				//ajustar numero da tarefa
				if(!e.__EMPTY){
					e.__EMPTY = ""
				}
				
				//ajustar data da tarefa
				var timestamp = ((e.__EMPTY_1 - 25569)*86400000)+86400000
				if(!timestamp){
					timestamp = ""
				}
				
				//ajustar andamento da tarefa
				var andamento = ""
				if(docSelect.includes("OSVirtualAbertaAeronave")){andamento = "Aberto"}else{andamento = "Pendente"}
				
				//ajustar tipo da tarefa
				if(e.__EMPTY_3 == "i" || e.__EMPTY_3 == "I"){
					e.__EMPTY_3 = "Indisponível"
				}
				if(e.__EMPTY_3 == "d" || e.__EMPTY_3 == "D"){
					e.__EMPTY_3 = "Disponível"
				}
				if(e.__EMPTY_3 == "r" || e.__EMPTY_3 == "R"){
					e.__EMPTY_3 = "Restrito"
				}
				if(!e.__EMPTY_3){
					e.__EMPTY_3 = ""
				}
				
				//ajustar descrição da tarefa
				var descricao = ""
				if(docSelect.includes("OSVirtualAbertaAeronave")){descricao = e.__EMPTY_4}else{descricao = e.__EMPTY_5}
				
				//ajuste para pular linhas não desejaveis da planilha baixada
				if(e.__EMPTY == "" || e.__EMPTY == "NÚMERO" || e.__EMPTY == "Ordens de Serviço Pendentes - (Processamento Virtual)"){
					console.log("linha " + e.__rowNum__ + " da planilha, não adicionada")
				}else{
					tabela.push({
						numero: e.__EMPTY,
						data: timestamp,
						chave00: andamento,
						chave01: e.__EMPTY_3,
						chave02: "",
						chave03: "",
						chave04: "",
						chave05: "",
						porcentagem: "0%",
						tarefa: descricao,
						serviço: "",
						pedidos: [],
						ferramentas: [],
						produtos: [],
						equipe: [],
						atualizacao: new Date().getTime()
					})
				}		
			})		
			addTarefasBd(tabela)//função pertence a folha: /tarefas/js/banco.js
		}
	}
	
	//PROVISÓRIO
	//baixar planilha do backup da planilha antiga
	if(docSelect.includes("backup planilha antiga")){
		reader.onload = (event) => {
			const data = event.target.result
			const workbook = XLSX.read(data, {type:'array'})
			const firstSheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[firstSheetName]
			const rows = XLSX.utils.sheet_to_json(worksheet)
			const row = rows[0]
			var tabela = []
			
			rows.map((e)=>{
				var timestamp = ((e.DATA - 25569)*86400000)+86400000
				
				if(!timestamp){
					try{
						var hj = e.DATA
						var array = hj.split('');
						var dth = array[6] + array[7] + array[8] + array[9] + "/" + array[3] + array[4] + "/" + array[0] + array[1]
						timestamp = new Date(dth).getTime()
						if(!timestamp){
							timestamp = ""
						}
					}catch{
						timestamp = ""
					}
					
				}

				if(e.TP == "i" || e.TP == "I"){
					e.TP = "Indisponível"
				}
				
				if(e.TP == "d" || e.TP == "D"){
					e.TP = "Disponível"
				}
				
				if(e.TP == "r" || e.TP == "R"){
					e.TP = "Restrito"
				}
				if(!e.TP){
					e.TP = ""
				}

				if(!e["NÚMERO"]){
					e.NUMERO = ""
				}
				
				if(!e.STATUS){
					e.STATUS = ""
				}
				if(e.STATUS == "AG. ABRIR"){
					e.STATUS = "Ag. Abrir"
				}
				if(e.STATUS == "ABERTA"){
					e.STATUS = "Aberto"
				}
				if(e.STATUS == "PRIORIDADE"){
					e.STATUS = "Prioridade"
				}
				if(e.STATUS == "PENDENTE + 30%" || e.STATUS == "PENDENTE + 60%" || e.STATUS == "PENDENTE + 90%" || e.STATUS == "PENDENTE"){
					e.STATUS = "Pendente"
				}
				if(e.STATUS == "EM EXEC. + 30%" || e.STATUS == "EM EXEC. + 60%" || e.STATUS == "EM EXEC. + 90%"){
					e.STATUS = "Em Exec."
				}
				if(e.STATUS == "AG. TESTE" || e.STATUS == "AG. TESTE FUN."){
					e.STATUS = "Ag. Teste"
				}
				if(e.STATUS == "AG. VIRADA" || e.STATUS == "AG. VIRADA/VOO"){
					e.STATUS = "Ag. Virada"
				}
				if(e.STATUS == "AG. SUP/CQ"){
					e.STATUS = "Ag. Sup/CQ"
				}
				if(e.STATUS == "FECHADA"){
					e.STATUS = "Fechado"
				}
				
				if(!e["OBSERVAÇÃO"]){
					e["OBSERVAÇÃO"] = ""
				}
				
				
				
				let num = e["NÚMERO"];
				let date = timestamp;
				let admt = e.STATUS
				let tip = e.TP			
				let desc = e["DESCRIÇÃO DO SERVIÇO"]
				let serv = e["OBSERVAÇÃO"]
							
				
				tabela.push({
					numero: num,
					data: date,
					chave00: admt,
					chave01: tip,
					chave02: "",
					chave03: "",
					chave04: "",
					chave05: "",
					porcentagem: "0%",
					tarefa: desc,
					serviço: serv,
					pedidos: [],
					ferramentas: [],
					produtos: [],
					equipe: [],
					atualizacao: new Date().getTime()
				})
			})
			addTarefasBd(tabela)//função pertence a folha: /tarefas/js/banco.js				
		}				
	}
	reader.readAsArrayBuffer(file)	
})
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//------------------------------CORES DAS LINHAS DA TABELA------------------------------
//--------------------------------------------------------------------------------------
//cores das linhas
async function trf_tblClr(e, linha){
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
		linha.style.background = "#C0C0C0";
	}
	if(e.value == bdCfg.chave00[8]){
		linha.style.background = "#B0C4DE";
	}
	if(e.value == bdCfg.chave00[9]){
		linha.style.background = "#b592fd";
	}
	if(e.value == bdCfg.chave00[10]){
		linha.style.background = "#F00";
	}
	if(e.value == bdCfg.chave00[11]){
		linha.style.background = "#BC8F8F";
	}
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//-----------------------------CARREGAR TABELA PRINCIPAL--------------------------------
//--------------------------------------------------------------------------------------
//carregar tabela principal
async function loadTrfTbl(){//função chamada na folha: /tarefas/js/carregamento.js
	var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js

	return new Promise((resolve)=>{
		try{
			for(i=0;i<bdTabela.length;i++){

				//criar linhas da tabela
				const tb = document.getElementById("trf_tblTbBdy");
				var qtdLin = tb.rows.length;
				var linha = tb.insertRow(qtdLin);
				var id = linha.insertCell(0);
				var numero = linha.insertCell(1);
				var data = linha.insertCell(2);
				var ch00 = linha.insertCell(3);
				var ch01 = linha.insertCell(4);
				var ch02 = linha.insertCell(5);
				var ch03 = linha.insertCell(6);
				var ch04 = linha.insertCell(7);
				var ch05 = linha.insertCell(8);
				var prct = linha.insertCell(9);
				var desc = linha.insertCell(10);
				var serv = linha.insertCell(11);
				var pend = linha.insertCell(12);
				var eqp = linha.insertCell(13);
				var atlz = linha.insertCell(14);
				var opcs = linha.insertCell(15);

				//preencher id da tarefa
				id.innerHTML = bdTabela[i].id;
				
				//preencher número
				numero.innerHTML = bdTabela[i].numero;
				
				//preencher data da data
				if(bdTabela[i].data != ""){
					data.innerHTML = new Date(bdTabela[i].data).toLocaleDateString("pt-BR");
				}
				
				//preencher andamento
				const slct = document.createElement("select")
				slct.classList.add('trf_tblSlctTbl');
				const n = bdCfg.chave00.length
				for(f=2;f<n;f++){
					const z1 = document.createElement("option");
					var num = bdCfg.chave00[f]
					if(num != ""){
						z1.innerHTML = bdCfg.chave00[f]
						slct.appendChild(z1);
					}
				}
				ch00.appendChild(slct);
				ch00.firstChild.value = bdTabela[i].chave00
				
				//preencher disponibilidade
				if(bdTabela[i].chave01 == "Indisponível"){
					bdTabela[i].chave01 = "I"
				}
				if(bdTabela[i].chave01 == "Disponível"){
					bdTabela[i].chave01 = "D"
				}
				if(bdTabela[i].chave01 == "Restrito"){
					bdTabela[i].chave01 = "R"
				}
				ch01.innerHTML = bdTabela[i].chave01;
				
				if(bdTabela[i].atualizacao != ""){
					atlz.innerHTML = new Date(bdTabela[i].atualizacao).toLocaleDateString("pt-BR");
				}
				
				//preencher chave 02
				ch02.innerHTML = bdTabela[i].chave02;
				
				//preencher chave 03
				ch03.innerHTML = bdTabela[i].chave03;
				
				//preencher chave 04
				ch04.innerHTML = bdTabela[i].chave04;
				
				//preencher chave 05
				ch05.innerHTML = bdTabela[i].chave05;
				
				//preencher porcentagem
				prct.innerHTML = bdTabela[i].porcentagem;
				
				//preencher descrição
				desc.innerHTML = bdTabela[i].tarefa;
				
				//preencher serviços executados da tarefa
				const k = document.createElement("TEXTAREA");
				k.classList.add('trfTblCol12txa');
				serv.appendChild(k);
				serv.firstChild.value = bdTabela[i].serviço;
				serv.firstChild.style.height = serv.clientHeight + "px"
				
				//preencher coluna das pendencias			
				var t="";u="";v=""
				var vrfPdd = bdTabela[i].pedidos;
				var vrfFer = bdTabela[i].ferramentas;
				var vrfPrd = bdTabela[i].produtos;
				vrfPdd.map((e)=>{if(e.status == true){t = "pedidos"}})
				vrfFer.map((e)=>{if(e.status == true){u = "ferramentas"}})
				vrfPrd.map((e)=>{if(e.status == true){v = "produtos"}})
				pend.innerHTML = t + " " + u + " " + v

				//preencher equipe
				var membros = bdTabela[i].equipe
				eqp.innerHTML = ""
				membros.map((e)=>{eqp.innerHTML = eqp.innerHTML + " " + e});
				
				//adicionar botões
				opcs.innerHTML = "opções";

				//adicionar classes
				linha.classList.add('trf_tblTbBdy');
				id.classList.add('trfTblCol1');
				numero.classList.add('trfTblCol2');
				data.classList.add('trfTblCol3');
				ch00.classList.add('trfTblCol4');
				ch01.classList.add('trfTblCol5');
				ch02.classList.add('trfTblCol6');
				ch03.classList.add('trfTblCol7');
				ch04.classList.add('trfTblCol8');
				ch05.classList.add('trfTblCol9');
				prct.classList.add('trfTblCol10');
				desc.classList.add('trfTblCol11');
				serv.classList.add('trfTblCol12');
				pend.classList.add('trfTblCol13');
				eqp.classList.add('trfTblCol14');
				atlz.classList.add('trfTblCol15');
				opcs.classList.add('trfTblCol16');
				opcs.classList.add('btnexcTst');
				
				//cores das linhas
				trf_tblClr(ch00.firstChild, linha)
			}
			
			//provisório
			document.getElementById("trfTblQtd").innerText = bdTabela.length + " tarefas cadastradas";
			
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




//---------------------CARREGAR CONFIGURAÇÕES DOS CONTROLES DA TABELA PRINCIPAL---------------
//--------------------------------------------------------------------------------------------

async function loadTrfTblConf(n){//função chamada na folha: /tarefas/js/carregamento.js

	//buscar indices para criar os filtros das linhas da tabela principal
	const x = document.getElementsByClassName("trf_tblTbBdy")
	var y0 = []
	var y1 = []
	var y2 = []
	var y3 = []
	for(i=0;i < x.length;i++){
		let a0 = y0.includes(x[i].children[3].firstChild.value)
		if(a0 == false){
			y0.push(x[i].children[3].firstChild.value)
		}
		let a1 = y1.includes(x[i].children[4].innerHTML)
		if(a1 == false){
			y1.push(x[i].children[4].innerHTML)
		}
		let a2 = y2.includes(x[i].children[5].innerHTML)
		if(a2 == false){
			y2.push(x[i].children[5].innerHTML)
		}
		let a3 = y3.includes(x[i].children[6].innerHTML)
		if(a3 == false){
			y3.push(x[i].children[6].innerHTML)
		}	
	}
	try{
		var transaction = db.transaction('configTaref', "readonly");
		var store = transaction.objectStore('configTaref');
		const objectStoreRequest = store.get(1)
		objectStoreRequest.onsuccess = () => {
			var getCT = objectStoreRequest.result 
			
			//popular as caixas de seleção dos filtros das linhas da tabela principal
			const p = document.querySelectorAll('#trf_tblTbHd .trf_tblSlct')
			p[0].innerHTML = ""
			p[1].innerHTML = ""
			p[2].innerHTML = ""
			p[3].innerHTML = ""
			var c0 = p[0]
			var c1 = p[1]
			var c2 = p[2]
			var c3 = p[3]
			const d0 = document.createElement("option");
			const d1 = document.createElement("option");
			const d2 = document.createElement("option");
			const d3 = document.createElement("option");
			d0.innerHTML = getCT.chave00[0]
			d1.innerHTML = getCT.chave01[0]
			d2.innerHTML = getCT.chave02[0]
			d3.innerHTML = getCT.chave03[0]
			c0.appendChild(d0);
			c1.appendChild(d1);
			c2.appendChild(d2);
			c3.appendChild(d3);
			for(i=0;i<y0.length;i++){
				const z0 = document.createElement("option");
				var num = y0[i]
				if(num != ""){
					z0.innerHTML = y0[i]
					c0.appendChild(z0);
				}
			}
			for(i=0;i<y1.length;i++){
				const z1 = document.createElement("option");
				var num = y1[i]
				if(num != ""){
					z1.innerHTML = y1[i]
					c1.appendChild(z1);
				}
			}
			for(i=0;i<y2.length;i++){
				const z2 = document.createElement("option");
				var num = y2[i]
				if(num != ""){
					z2.innerHTML = y2[i]
					c2.appendChild(z2);
				}
			}
			for(i=0;i<y3.length;i++){
				const z3 = document.createElement("option");
				var num = y3[i]
				if(num != ""){
					z3.innerHTML = y3[i]
					c3.appendChild(z3);
				}
			}
			const q = document.getElementById('trf_tblTbHd').children
			q[7].innerHTML = getCT.chave04[0]
			q[8].innerHTML = getCT.chave05[0]
			
			//nomear checkbox do menu de controles das colunas
			document.getElementById('trf_tblCtrllb1').innerHTML = getCT.chave00[0]
			document.getElementById('trf_tblCtrllb2').innerHTML = getCT.chave01[0]
			document.getElementById('trf_tblCtrllb3').innerHTML = getCT.chave02[0]
			document.getElementById('trf_tblCtrllb4').innerHTML = getCT.chave03[0]
			document.getElementById('trf_tblCtrllb5').innerHTML = getCT.chave04[0]
			document.getElementById('trf_tblCtrllb6').innerHTML = getCT.chave05[0]			
		}
		
		//configurar dados da ANV
		var objectStoreRequest1 = store.get(n)
		objectStoreRequest1.onsuccess = () => {
		    var getLin = objectStoreRequest1.result
		    const x = document.getElementById('dadosANV').children
		    x[0].innerHTML = "MGB S/N: " + getLin.snMGB
		    x[1].innerHTML = "GTM #1 S/N: " + getLin.snGTM1
		    x[2].innerHTML = "GTM #2 S/N: " + getLin.snGTM2
		}

		//mostrar ou ocultar colunas
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

		//baixar rotina botão excluir linha
		trf_tblDeletRow()
		//baixar rotina de mudança no andamento da tarefa
		altAndamento()

		testez()
		
	}catch (erro){
		var icon = "img/imgError.png"
		var msg = "Erro!"
		var act = erro
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
		console.log("Erro ao carregar configurações dos controles da tabela principal! " + erro)	
	}
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//-----------------------ROTINAS DOS CONTROLES DA TABELA PRINCIPAL--------------------------
//-----------------------------------------------------------------------------------------
//ocultar ou mostrar menu dos controles de colunas da tabela			
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

//botão excluir linhas
function trf_tblDeletRow(){
	const x = [...document.getElementsByClassName("btnexcTst")]
	x.map((e)=>{
		var y = e.parentElement
		var z = parseInt(y.firstChild.innerHTML)
		e.addEventListener("click", ()=>{
			async function excluir(){
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
			}excluir()	
		})
	})
}

//salvar ao alterar andamento
function altAndamento(){
	const x = [...document.getElementsByClassName("trf_tblSlctTbl")]
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
					trf_tblClr(e, y)
					
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



//teste alterar serviço executado
function testez(){
	
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
			e.style.height = elmnt + "px"
			
			if(u != p){
				var y = e.parentElement.parentElement
				var z = parseInt(y.children[0].innerHTML)
				var transaction = db.transaction(dbLinha,"readwrite");
				var objectStore = transaction.objectStore(dbLinha);
				var request = objectStore.get(z);
				request.onsuccess = function(){
					request.result.serviço = e.value;
					objectStore.put(request.result);
					request = objectStore.get(z);
					request.onsuccess = function(){
						if(request.result.serviço != e.value){
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
				}
			}
		})
	})
	
}














