//----------------------------------CRIAÇÃO DO BANCO DE DADOS---------------------------------
//-------------------------------------------------------------------------------------------
var db;
var dbLinha = "linha01";
var bancoOK = ""
//reqisição de criação do banco de dados
var DBRequest = window.indexedDB.open("geralDB", 1);

DBRequest.onsuccess = function(event) {
	db = event.target.result
	bancoOK = "carregado"
	console.log('Sucesso na conexão com o banco de dados!');
}

DBRequest.onerror = function(event) {
	console.log("Erro na criação do banco de dados: " + event.target.errorCode)
}

//aviso de requisição do banco completa
function bdOK(){
	return new Promise((resolve)=>{
		var x = 0
		const y = setInterval(()=>{
			if(bancoOK == "carregado"){
				clearInterval(y)
				resolve()
			}
			x++
			if(x > 50){
				clearInterval(y)
				console.log('Erro no setInterval "folha /tarefas/js/banco"')
			}
		},10)
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//----------------------------------CRIAÇÃO DAS TABELAS DO BANCO DE DADOS---------------------
//--------------------------------------------------------------------------------------------
DBRequest.onupgradeneeded = function(event) {
	db = event.target.result
	//----------------------------CRIAÇÃO DAS TABELAS DO BANCO DE DADOS---------------------

	//------------------------------tabelas das linhas--------------------------------------
	//-------------------------------------------------------------------------------------
	var objectStore = db.createObjectStore("linha01", {keyPath: 'id', autoIncrement: true})
	objectStore = db.createObjectStore("linha02", {keyPath: 'id', autoIncrement: true})
	objectStore = db.createObjectStore("linha03", {keyPath: 'id', autoIncrement: true})
	//-------------------------------------------------------------------------------------
	
	
	//-------------------tabela das configurações das tarefas-------------------------------
	//-------------------------------------------------------------------------------------
	objectStore = db.createObjectStore("configTaref", {keyPath: 'id', autoIncrement: true})
	objectStore.transaction.oncomplete = function (event) {
	    var objectStore = db
		.transaction("configTaref", "readwrite")
		.objectStore("configTaref");
		//tabela das configurações gerais das tarefas
		objectStore.put({
			chave00: ["Andamento",true,"Aberto","Fechado","Pendente","Ag. Virada","Ag. Abrir","","","","",""],
			chave01: ["Disp.",true,"Indisponível","Disponível","Restrito","","","","","","",""],
			chave02: ["Chave 01",false,"","","","","","","","","",""],
			chave03: ["Chave 02",false,"","","","","","","","","",""],
			chave04: ["Chave 03",false],
			chave05: ["Chave 04",false],
			baixar: ["Baixar",true]
		})
		//tabela das configurações da linha 01 das tarefas
		objectStore.put({
			nANV: "VAGO",
			snANV: "",
			snMGB: "",
			snGTM1: "",
			snGTM2: "",
			inicio: "",
			fim: "",
			status: "inativo"
		})
		//tabela das configurações da linha 02 das tarefas
		objectStore.put({
			nANV: "VAGO",
			snANV: "",
			snMGB: "",
			snGTM1: "",
			snGTM2: "",
			inicio: "",
			fim: "",
			status: "inativo"
		})
		//tabela das configurações da linha 03 das tarefas
		objectStore.put({
			nANV: "VAGO",
			snANV: "",
			snMGB: "",
			snGTM1: "",
			snGTM2: "",
			inicio: "",
			fim: "",
			status: "inativo"
		})
	};
	//------------------------------------------------------------------------------------
	console.log('Upgrade do banco de dados realizado com sucesso!');
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//----------------------------------BAIXAR TABELAS DO BANCO DE DADOS--------------------------
//--------------------------------------------------------------------------------------------
//baixar tabelas das tarefas das linhas
async function loadTBLin(){
	await bdOK()
	return new Promise((resolve)=>{
		const tabela =  []
		var transaction1 = db.transaction(dbLinha, "readonly");
		var store1 = transaction1.objectStore(dbLinha);
		var request1 = store1.openCursor();
		request1.onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				tabela.push(cursor.value)
				cursor.continue();
			}else{
				resolve(tabela)
			}
		}
	})
}

//baixar tabelas das configurações das tarefas
async function loadTBCfgLin(n){
	await bdOK()
	return new Promise((resolve)=>{
		var tabela = []
		var transaction = db.transaction('configTaref', "readonly");
		var store = transaction.objectStore('configTaref');
		var request = store.openCursor();
		request.onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				tabela.push(cursor.value)
				cursor.continue();
				
			}else{
				tabela = tabela[n]
				resolve(tabela)
			}
		}
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//------------------------FUNÇÕES PARA OBTER DADOS NO BANCO-----------------------------------
//--------------------------------------------------------------------------------------------

//obter tarefas(linhas)
function obterTarefas(z){
	return new Promise((resolve)=>{
		var transaction = db.transaction(dbLinha, "readwrite");
		var store = transaction.objectStore(dbLinha);
		var request = store.get(z)
		request.onsuccess = function () {
			var find = event.target.result;
			if(!find){find = "null"}
			resolve(find)
		}
	})
}
	
//obter dados das tarefas(colunas)
function obterDados(n, col){
	return new Promise((resolve)=>{
		var getValBd_taref = ""
		var transaction = db.transaction(dbLinha,"readwrite");
		var objectStore = transaction.objectStore(dbLinha);
		var request = objectStore.get(n);
		request.onsuccess = function(){
			var valor = request.result[col];
			getValBd_taref = valor
			resolve(getValBd_taref)
		}
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//------------------------FUNÇÕES PARA INSERIR DADOS NO BANCO---------------------------------
//--------------------------------------------------------------------------------------------

//inserir tarefas
function addTarefasBd(tabela){
	const qtd = tabela.length
	var transaction = db.transaction(dbLinha, "readwrite"); 
	var tarefTable = transaction.objectStore(dbLinha)
	tabela.map((e)=>{
		tarefTable.put({
			numero: e.numero,
			data: e.data,
			chave00: e.chave00,
			chave01: e.chave01,
			chave02: e.chave02,
			chave03: e.chave03,
			chave04: e.chave04,
			chave05: e.chave05,
			tarefa: e.tarefa,
			serviço: e.serviço,
			pedidos: e.pedidos,
			ferramentas: e.ferramentas,
			produtos: e.produtos,
			equipe: e.equipe,
			atualizacao: e.atualizacao,
			porcentagem: e.porcentagem
		})
	})
	
	//se a transação for concluída
	transaction.oncomplete = (event) => {
		//mensagem de corfirmado
		var txt = "tarefa adicionada"
		if(qtd > 1){txt = "tarefas adicionadas"}
		var icon = "img/imgOK.png"
		var msg = "Confirmação " + dbLinha + "!"
		var act = qtd + " " + txt + " com sucesso!"
		var modo = "conf"
		var reload = "true"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}
	
	//se hover erro na transação
	transaction.onerror = (event) => {
		//mensagem de rejeitado
		var icon = "img/imgAlert.png"
		var msg = "Erro!"
		var act = event
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
		console.log("Erro ao inserir tarefa na " + dbLinha);
	}
	
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//------------------------FUNÇÕES PARA ALTERAR DADOS NO BANCO---------------------------------
//--------------------------------------------------------------------------------------------
//alterar tarefas das linhas
function AltTarefasBd(n, col, val){
	return new Promise((resolve)=>{
		var transaction = db.transaction(dbLinha,"readwrite");
		var objectStore = transaction.objectStore(dbLinha);
		var request = objectStore.get(n);
		request.onsuccess = function(){
			request.result[col] = val
			objectStore.put(request.result);
			resolve()
		}
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//------------------------FUNÇÕES PARA EXCLUIR DADOS NO BANCO---------------------------------
//--------------------------------------------------------------------------------------------
//excluir tarefas das linhas
function excluirTarefa(z){
	var transaction = db.transaction(dbLinha, "readwrite");
	var store = transaction.objectStore(dbLinha);
	var request = store.delete(z)	
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------









