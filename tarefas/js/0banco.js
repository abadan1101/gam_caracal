//----------------------------------CRIAÇÃO DO BANCO DE DADOS--------------------------------
//--------------------------------------------------------------------------------------------
var db;
var dbLinha = "linha01"
//reqisição de criação do banco de dados
var DBRequest = window.indexedDB.open("geralDB", 3);
//evento onerror
DBRequest.onerror = function(event) {
	console.log("Erro na criação do banco de dados: " + event.target.errorCode)
}
//--------------------------------------------------------------------------------------------




//----------------------------CRIAÇÃO DAS TABELAS DO BANCO DE DADOS---------------------------
//--------------------------------------------------------------------------------------------
DBRequest.onupgradeneeded = function(event) {
	db = event.target.result

	//tabelas das linhas
	var objectStore = db.createObjectStore("linha01", {keyPath: 'id', autoIncrement: true})
	objectStore = db.createObjectStore("linha02", {keyPath: 'id', autoIncrement: true})
	objectStore = db.createObjectStore("linha03", {keyPath: 'id', autoIncrement: true})
	
	//tabela das configurações das tarefas
	objectStore = db.createObjectStore("configTaref", {keyPath: 'id', autoIncrement: true})
	objectStore.transaction.oncomplete = function (event) {
	    // Armazenando valores no novo objectStore.
	    var objectStore = db
		.transaction("configTaref", "readwrite")
		.objectStore("configTaref");
		objectStore.put({
			chave00: ["Andamento",true,"Aberto","Fechado","","","","","","","",""],
			chave01: ["Tipo",true,"Indisponível","Disponível","Restrito","","","","","","",""],
			chave02: ["Chave",false,"","","","","","","","","",""],
			chave03: ["Chave",false,"","","","","","","","","",""],
			chave04: ["Chave",false],
			chave05: ["Chave",false],
			baixar: ["Baixar",true]
		})
	  };	
	console.log('Upgrade do banco de dados realizado com sucesso!');
}
//--------------------------------------------------------------------------------------------




//----------------------------OBTENÇÃO DAS TABELAS DO BANCO DE DADOS--------------------------
//--------------------------------------------------------------------------------------------
//evento onsucces
DBRequest.onsuccess = function(event) {
	db = event.target.result
	console.log('Sucesso na requisição do banco de dados!');
	
	//obtenção da tabela das configurações gerais das tarefas
	try{
		var transaction = db.transaction('configTaref', "readonly");
		var store = transaction.objectStore('configTaref');
		var request = store.openCursor();
		request.onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {;
			cursor.continue();
			getCT = cursor.value
			console.log('Configurações gerais das tarefas obtidas com sucesso!');
			}	
		}
	}catch{
		console.log("Erro ao obter configurações gerais das tarefas");
	}
	//----------------------------------------------------------


	//obtenção da tabela das linhas de manutenção

}
//--------------------------------------------------------------------------




//---------------------ALTERAÇÕES DAS TABELAS DAS LINHAS DE MANUTENÇÃO-------------------------
//---------------------------------------------------------------------------------------------
//INSERIR TAREFAS NO BANCO DE DADOS
function addTarefa(){//função chamada na folha: /tarefas/js/5formulario.js

	//criação da classe pedido
	function pedido(pim, nome, tipo, quantidade, PN, PNA, manual, observacao, status) {
		this.pim = pim;
		this.nome = nome;
		this.tipo = tipo;
		this.quantidade = quantidade;
		this.PN = PN;
		this.PNA = PNA;
		this.manual = manual;
		this.observacao = observacao;
		this.status = status;
	}

	//popular pedidos no banco
	var pdd = []
	const tbPed = document.getElementById('trf_form_tblPed')
	const x = tbPed.rows
	const nRow = tbPed.rows.length;
	for(let contador = 1; contador < nRow; contador++) {
		var p1 = x[contador].cells[0].innerHTML
		var p2 = x[contador].cells[1].innerHTML
		var p3 = x[contador].cells[2].innerHTML
		var p4 = x[contador].cells[3].innerHTML
		var p5 = x[contador].cells[4].innerHTML
		var p6 = x[contador].cells[5].innerHTML
		var p7 = x[contador].cells[6].innerHTML
		var p8 = x[contador].cells[7].innerHTML
		var p9 = x[contador].cells[8].firstChild.checked
		var pedBd = new pedido(p1, p2, p3, p4, p5, p6, p7, p8, p9);
		pdd.push(pedBd)
	}

	//criação da classe ferramentas
	function ferramenta(ferramenta, status) {
		this.ferramenta = ferramenta;
		this.status = status;
	}

	//popular ferramentas no banco
	var fer = []
	const tbFer = document.getElementById('trf_form_tblFer')
	const f = tbFer.rows
	const fRow = tbFer.rows.length;
	for(let contador = 1; contador < fRow; contador++) {
		var f1 = f[contador].cells[0].innerHTML
		var f2 = f[contador].cells[1].firstChild.checked
		var ferBd = new ferramenta(f1, f2);
		fer.push(ferBd)
	}
		
	//criação da classe produtos
	function produto(produto, status) {
		this.produto = produto;
		this.status = status;
	}
	
	//popular produtos no banco
	var prd = []
	const tbPrd = document.getElementById('trf_form_tblPrd')
	const pr = tbPrd.rows
	const prRow = tbPrd.rows.length;
	for(let contador = 1; contador < prRow; contador++) {
		var pr1 = pr[contador].cells[0].innerHTML
		var pr2 = pr[contador].cells[1].firstChild.checked
		var prodBd = new produto(pr1, pr2);
		prd.push(prodBd)
	}
	
	//popular equipe no banco
	var eqp = []
	const tbEqp = document.getElementById('trf_form_tblEqp')
	const eq = tbEqp.rows
	const eqRow = tbEqp.rows.length;
	for(let contador = 1; contador < eqRow; contador++) {
		var eq1 = eq[contador].cells[0].innerHTML
		eqp.push(eq1)
	}
	
	//transação na tabela do banco
	var transaction = db.transaction(dbLinha, "readwrite"); 
	var tarefTable = transaction.objectStore(dbLinha)
	
	var request = tarefTable.put({
		numero: document.getElementById('trf_form_num').value,
		data: document.getElementById('trf_form_dat').value,
		chave00: document.getElementById('trf_form_Ch00').value,
		chave01: document.getElementById('trf_form_Ch01').value,
		chave02: document.getElementById('trf_form_Ch02').value,
		chave03: document.getElementById('trf_form_Ch03').value,
		chave04: document.getElementById('trf_form_Ch04').value,
		chave05: document.getElementById('trf_form_Ch05').value,
		tarefa: document.getElementById('trf_form_txa1').value,
		serviço: document.getElementById('trf_form_txa2').value,
		pedidos: pdd,
		ferramentas: fer,
		produtos: prd,
		equipe: eqp,
		atualizacao: new Date()
	})
	transaction.oncomplete = (event) => {
		console.log("Tarefa inserida na " + dbLinha + " com sucesso!");
	}
}
//-------------------------------------------------------------------------------------------------------




//------------------------ALTERAÇÕES DAS TABELAS DAS CONFIGURAÇÕES DAS TAREFAS-------------------------
//------------------------------------------------------------------------------------------------------
//ALTERAR CONFIGURAÇÕES DAS TAREFAS
function salvConfigTrf(){//função chamada na folha: /tarefas/js/4configTarefas.js
	//popular configurações no array de objetos
	const trfGerTbl = document.getElementById('trf_confPnlTbl')
	const x = trfGerTbl.rows
	const nRow = trfGerTbl.rows.length;
	for(let contador = 1; contador < nRow; contador++) {
		var ctrl = x[contador].cells[0].children[0].value
		var atv = x[contador].cells[1].firstChild.checked
		var ch1 = x[contador].cells[2].children[0].value
		var ch2 = x[contador].cells[3].children[0].value
		var ch3 = x[contador].cells[4].children[0].value
		var ch4 = x[contador].cells[5].children[0].value
		var ch5 = x[contador].cells[6].children[0].value
		var ch6 = x[contador].cells[7].children[0].value
		var ch7 = x[contador].cells[8].children[0].value
		var ch8 = x[contador].cells[9].children[0].value
		var ch9 = x[contador].cells[10].children[0].value
		var ch10 = x[contador].cells[11].children[0].value
		
		if(contador == 1){
			var t1 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 2){
			var t2 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 3){
			var t3 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 4){
			var t4 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 5){
			var t5 = [ctrl, atv]
		}
		if(contador == 6){
			var t6 = [ctrl, atv]
		}
		if(contador == 7){
			var t7 = [ctrl, atv]
		}	
	}	
	
	//Abrindo a transação com a object store "contato"
	var transaction = db.transaction('configTaref', "readwrite");
	//Recuperando a object store para alterar o registro
	var store = transaction.objectStore('configTaref');
	//Recuperando um contato pela chave primaria
	var request = store.get(1);
	
	//quando ocorrer um erro ao buscar o registro
	request.onerror = function (event) {
	    console.log('Ocorreu um erro ao buscar as configurações gerais das tarefas.');
	};
	//quando o registro for encontrado com sucesso
	request.onsuccess = function (event) {
	    var configTaref = event.target.result;
	    configTaref.chave00 = t1;
	    configTaref.chave01 = t2;
	    configTaref.chave02 = t3;
	    configTaref.chave03 = t4;
	    configTaref.chave04 = t5;
	    configTaref.chave05 = t6;
	    configTaref.baixar = t7;
	    //Atualizando o registro no banco
	    var requestUpdate = store.put(configTaref);
	    //quando ocorrer erro ao atualizar o registro
	    requestUpdate.onerror = function (event) {
		console.log('Ocorreu um erro ao salvar os configurações gerais das tarefas.');
	    };
	    //quando o registro for atualizado com sucesso
	    requestUpdate.onsuccess = function (event) {
			console.log('Configurações gerais das tarefas salvas com sucesso.');
	    };
	};
}
//-------------------------------------------------------------------------------------------------------








