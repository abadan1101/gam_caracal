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
	objectStore = db.createObjectStore("cartoes", {keyPath: 'id', autoIncrement: true})
	objectStore = db.createObjectStore("ferramentas", {keyPath: 'id', autoIncrement: true})
	objectStore = db.createObjectStore("produtos", {keyPath: 'id', autoIncrement: true})
	objectStore = db.createObjectStore("equipe", {keyPath: 'id', autoIncrement: true})
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
			chave00: ["Andamento",true,"Aberto","Fechado","Pendente","Ag. Virada","Ag. Abrir","Em Exec.","","","",""],
			chave01: ["Disp.",true,"Indisponível","Disponível","Restrito","","","","","","",""],
			chave02: ["Chave 01",false,"","","","","","","","","",""],
			chave03: ["Chave 02",false,"","","","","","","","","",""],
			chave04: ["Chave 03",false],
			chave05: ["Chave 04",false],
			baixar: ["Baixar",false]
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
			status: "inativo",
			relatorio: ""
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
			status: "inativo",
			relatorio: ""
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
			status: "inativo",
			relatorio: ""
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

//baixar tabelas completas das configurações das tarefas
async function loadTBCfgGeral(){
	await bdOK()
	return new Promise((resolve)=>{
		const tabela =  []
		var transaction1 = db.transaction('configTaref', "readonly");
		var store1 = transaction1.objectStore('configTaref');
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
function obterTarefas(z){ //variável z se refere ao "id" da tarefa
	return new Promise((resolve)=>{
		var transaction = db.transaction(dbLinha, "readwrite");
		var store = transaction.objectStore(dbLinha);
		var request = store.get(z)
		request.onsuccess = function (event) {
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

//inserir nova tarefa
function addTarefasBd(tabela, reiniciar){
	const qtd = tabela.length
	var transaction = db.transaction(dbLinha, "readwrite"); 
	var tarefTable = transaction.objectStore(dbLinha)
	tabela.map((e)=>{
		tarefTable.put({
			numero: e.numero.toString().toUpperCase(),
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
		var reload = reiniciar
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
//editar a tarefa completa--------------------------------
function editarTarefasBD(n,tabela){
	return new Promise((resolve)=>{
		var transaction = db.transaction(dbLinha,"readwrite");
		var objectStore = transaction.objectStore(dbLinha);
		var request = objectStore.get(n);
		request.onsuccess = function(){
			request.result.numero = tabela[0].numero.toString().toUpperCase(),
			request.result.data = tabela[0].data
			request.result.chave00 = tabela[0].chave00,
			request.result.chave01 = tabela[0].chave01,
			request.result.chave02 = tabela[0].chave02,
			request.result.chave03 = tabela[0].chave03,
			request.result.chave04 = tabela[0].chave04,
			request.result.chave05 = tabela[0].chave05,
			request.result.tarefa = tabela[0].tarefa,
			request.result.serviço = tabela[0].serviço,
			request.result.pedidos = tabela[0].pedidos,
			request.result.ferramentas = tabela[0].ferramentas,
			request.result.produtos = tabela[0].produtos,
			request.result.equipe = tabela[0].equipe,
			request.result.atualizacao = tabela[0].atualizacao,
			request.result.porcentagem = tabela[0].porcentagem

			objectStore.put(request.result);
			
		}
		//se a transação for concluída
		transaction.oncomplete = (event) => {
			resolve()
		}
		
		//se hover erro na transação
		transaction.onerror = (event) => {
			//mensagem de rejeitado
			console.log("Erro na transação com o banco de dados alterar tarefa na " + dbLinha);
		}	
	})
}//----------------------------------------------------

//alterar algum valor da tarefa------------------------
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

//alterar algum valor da configuração das tarefas------------------------
function AltTarefasConfBd(n, col, val){
	return new Promise((resolve)=>{
		var transaction = db.transaction("configTaref","readwrite");
		var objectStore = transaction.objectStore("configTaref");
		var request = objectStore.get(n);
		request.onsuccess = function(){
			request.result[col] = val
			objectStore.put(request.result);
			resolve()
		}
		request.onerror = (event) => {
			//mensagem de rejeitado
			var icon = "img/imgAlert.png"
			var msg = "Erro ao salvar relatório!"
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro na transação com o banco de dados");
		}
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//------------------------FUNÇÕES PARA EXCLUIR DADOS NO BANCO---------------------------------
//--------------------------------------------------------------------------------------------
//excluir tarefas das linhas
function excluirTarefa(z){
	return new Promise((resolve)=>{
		var transaction = db.transaction(dbLinha, "readwrite");
		var store = transaction.objectStore(dbLinha);
		var request = store.delete(z)
		resolve()
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------



//------------------------FUNÇÕES PARA REALIZAÇÃO DO BACKUP E RESTAURAÇÃO---------------------
//--------------------------------------------------------------------------------------------
//limprar banco de dados
function limparBD(){
	return new Promise((resolve)=>{
		var transaction = db.transaction(dbLinha, "readwrite");
		var store = transaction.objectStore(dbLinha);
		var request = store.openCursor();
		request.onsuccess = function (event) {
			var cursor = event.target.result;
			if (cursor) {
				cursor.delete()
				cursor.continue();
			}
		}
		resolve();

		//se hover erro
		request.onerror = (event) => {
			//mensagem de rejeitado
			var icon = "img/imgAlert.png"
			var msg = "Erro ao limpar banco de dados!"
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao limpar o banco de dados da " + dbLinha);
		}
	})
}

//restaurar banco de dados
function restaurarBD(bancoBackup){
	return new Promise((resolve)=>{
		var transaction = db.transaction(dbLinha, "readwrite"); 
		var tarefTable = transaction.objectStore(dbLinha)
		bancoBackup.map((e)=>{
			tarefTable.put(e)
		})
		resolve();

		//se hover erro
		transaction.onerror = (event) => {
			//mensagem de rejeitado
			var icon = "img/imgAlert.png"
			var msg = "Erro em restaurar!"
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao restaurar a " + dbLinha);
		}
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------





//----------------------FUNÇÕES ESPECIAIS DO FORMULÁRIO  DAS TAREFAS--------------------------
//--------------------------------------------------------------------------------------------

//inserir cartão de trabalho--------------------------------
function addCartaoBd(e){
	var transaction = db.transaction("cartoes", "readwrite"); 
	var tarefTable = transaction.objectStore("cartoes")
	tarefTable.put({
			nome: e[0].nome,
			serviço: e[0].serviço,
			pedidos: e[0].pedidos,
			ferramentas: e[0].ferramentas,
			produtos: e[0].produtos,
		})
	
	//se hover erro na transação
	transaction.onerror = (event) => {
		//mensagem de rejeitado
		var icon = "img/imgError.png"
		var msg = "Erro ao salvar cartão!"
		var act = error
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
		console.log("Erro ao salvar cartão! " + error)
	}
	
};

//alterar cartão de trabalho--------------------------------
function AltCartoesBd(n, e){
	return new Promise((resolve)=>{
		var transaction = db.transaction("cartoes","readwrite");
		var objectStore = transaction.objectStore("cartoes");
		var request = objectStore.get(n);
		request.onsuccess = function(){
			request.result["serviço"] = e[0].serviço;
			request.result["pedidos"] = e[0].pedidos;
			request.result["ferramentas"] = e[0].ferramentas;
			request.result["produtos"] = e[0].produtos;
			objectStore.put(request.result);
			resolve()
		}
		request.onerror = (event) => {
			//mensagem de rejeitado
			var icon = "img/imgAlert.png"
			var msg = "Erro ao alterar cartão!"
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro na transação com o banco de dados");
		}
	})
}

//baixar tabelas dos cartões
async function loadCartaoGeral(){
	await bdOK()
	return new Promise((resolve)=>{
		const tabela =  []
		var transaction1 = db.transaction('cartoes', "readonly");
		var store1 = transaction1.objectStore('cartoes');
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

//excluir cartão
function excluirCartao(id){
	return new Promise((resolve)=>{
		var transaction = db.transaction('cartoes', "readwrite");
		var store = transaction.objectStore('cartoes');
		var request = store.delete(id)
		resolve()
	})
}


//inserir nova ferramenta--------------------------------
function addFerramentaoBd(fer, loc, obs){
	var transaction = db.transaction("ferramentas", "readwrite"); 
	var tarefTable = transaction.objectStore("ferramentas")
	tarefTable.put({
			ferramenta: fer,
			local: loc,
			observacao: obs,
	})
	
	//se hover erro na transação
	transaction.onerror = (event) => {
		//mensagem de rejeitado
		var icon = "img/imgError.png"
		var msg = "Erro ao salvar ferramenta!"
		var act = error
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
		console.log("Erro ao salvar ferramenta! " + error)
	}
	
};

//baixar tabelas das ferramentas
async function loadFerramentasGeral(){
	await bdOK()
	return new Promise((resolve)=>{
		const tabela =  []
		var transaction1 = db.transaction('ferramentas', "readonly");
		var store1 = transaction1.objectStore('ferramentas');
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


//inserir novo produto--------------------------------
function addProdutosBd(prd, loc, obs){
	var transaction = db.transaction("produtos", "readwrite"); 
	var tarefTable = transaction.objectStore("produtos")
	tarefTable.put({
		produto: prd,
		local: loc,
		observacao: obs,
	})
	
	//se hover erro na transação
	transaction.onerror = (event) => {
		//mensagem de rejeitado
		var icon = "img/imgError.png"
		var msg = "Erro ao salvar produto!"
		var act = error
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
		console.log("Erro ao salvar produto! " + error)
	}
	
};

//baixar tabelas dos produtos
async function loadProdutosGeral(){
	await bdOK()
	return new Promise((resolve)=>{
		const tabela =  []
		var transaction1 = db.transaction('produtos', "readonly");
		var store1 = transaction1.objectStore('produtos');
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



//inserir novo membro da equipe--------------------------------
function addEquipeBd(mem){
	var transaction = db.transaction("equipe", "readwrite"); 
	var tarefTable = transaction.objectStore("equipe")
	tarefTable.put({
			membro: mem,
	})
	
	//se hover erro na transação
	transaction.onerror = (event) => {
		//mensagem de rejeitado
		var icon = "img/imgError.png"
		var msg = "Erro ao salvar membro da equipe!"
		var act = error
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
		console.log("Erro ao salvar membro da equipe! " + error)
	}
	
};

//baixar tabelas dos produtos
async function loadEquipeGeral(){
	await bdOK()
	return new Promise((resolve)=>{
		const tabela =  []
		var transaction1 = db.transaction('equipe', "readonly");
		var store1 = transaction1.objectStore('equipe');
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
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------





//------------------FUNÇÕES ESPECIAIS DA TABELA DE CONTROLE DAS FERRAMENTAS-------------------
//--------------------------------------------------------------------------------------------
//excluir ferramenta
function excluirFerramentaDB(z){
	
	return new Promise((resolve)=>{
		var transaction = db.transaction('ferramentas', "readwrite");
		var store = transaction.objectStore('ferramentas');
		var request = store.delete(z)
		resolve()
	})
}

//obter ferramenta
function obterFerramentasDB(id){
	return new Promise((resolve)=>{
		var transaction = db.transaction('ferramentas', "readwrite");
		var store = transaction.objectStore('ferramentas');
		var request = store.get(id)
		request.onsuccess = function (event) {
			var find = event.target.result;
			if(!find){find = "null"}
			resolve(find)
		}
	})
}

//alterar ferramenta

function alterarFerramentasDB(n, e){
	return new Promise((resolve)=>{
		var transaction = db.transaction("ferramentas","readwrite");
		var objectStore = transaction.objectStore("ferramentas");
		var request = objectStore.get(n);
		request.onsuccess = function(){
			request.result["ferramenta"] = e[0].ferramenta;
			request.result["local"] = e[0].local;
			request.result["observacao"] = e[0].observacao;
			objectStore.put(request.result);
			resolve()
		}
		request.onerror = (event) => {
			//mensagem de rejeitado
			var icon = "img/imgAlert.png"
			var msg = "Erro ao alterar ferramenta!"
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro na transação com o banco de dados");
		}
	})
}


//------------------FUNÇÕES ESPECIAIS DA TABELA DE CONTROLE DOS PRODUTOS-------------------
//--------------------------------------------------------------------------------------------
//excluir ferramenta
function excluirProdutoDB(z){
	
	return new Promise((resolve)=>{
		var transaction = db.transaction('produtos', "readwrite");
		var store = transaction.objectStore('produtos');
		var request = store.delete(z)
		resolve()
	})
}

//obter ferramenta
function obterProdutosDB(id){
	return new Promise((resolve)=>{
		var transaction = db.transaction('produtos', "readwrite");
		var store = transaction.objectStore('produtos');
		var request = store.get(id)
		request.onsuccess = function (event) {
			var find = event.target.result;
			if(!find){find = "null"}
			resolve(find)
		}
	})
}

//alterar ferramenta

function alterarProdutosDB(n, e){
	return new Promise((resolve)=>{
		var transaction = db.transaction("produtos","readwrite");
		var objectStore = transaction.objectStore("produtos");
		var request = objectStore.get(n);
		request.onsuccess = function(){
			request.result["produtos"] = e[0].produtos;
			request.result["local"] = e[0].local;
			request.result["observacao"] = e[0].observacao;
			objectStore.put(request.result);
			resolve()
		}
		request.onerror = (event) => {
			//mensagem de rejeitado
			var icon = "img/imgAlert.png"
			var msg = "Erro ao alterar produto!"
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro na transação com o banco de dados");
		}
	})
}


//------------------FUNÇÕES ESPECIAIS DA TABELA DE CONTROLE DA EQUIPE-------------------
//--------------------------------------------------------------------------------------------
//excluir ferramenta
function excluirEquipeDB(z){
	
	return new Promise((resolve)=>{
		var transaction = db.transaction('equipe', "readwrite");
		var store = transaction.objectStore('equipe');
		var request = store.delete(z)
		resolve()
	})
}

//obter ferramenta
function obterEquipesDB(id){
	return new Promise((resolve)=>{
		var transaction = db.transaction('equipe', "readwrite");
		var store = transaction.objectStore('equipe');
		var request = store.get(id)
		request.onsuccess = function (event) {
			var find = event.target.result;
			if(!find){find = "null"}
			resolve(find)
		}
	})
}

//alterar ferramenta

function alterarEquipesDB(n, e){
	return new Promise((resolve)=>{
		var transaction = db.transaction("equipe","readwrite");
		var objectStore = transaction.objectStore("equipe");
		var request = objectStore.get(n);
		request.onsuccess = function(){
			request.result["membro"] = e[0].membro;
			request.result["funcao"] = e[0].funcao;
			request.result["observacao"] = e[0].observacao;
			objectStore.put(request.result);
			resolve()
		}
		request.onerror = (event) => {
			//mensagem de rejeitado
			var icon = "img/imgAlert.png"
			var msg = "Erro ao alterar membro da equipe!"
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro na transação com o banco de dados");
		}
	})
}





