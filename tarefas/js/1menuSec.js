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
	//id para inserir nova tarefa
	idTarefa = "novo"//variável pertence a folha: /tarefas/js/tabela.js
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
				var andamento = "Aberto"
				
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
				
				//ajustar porcentagem
				var porcentagem = ""
				if(andamento == "Pendente"){
					porcentagem = "50"
				}else{
					porcentagem = "0"
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
						porcentagem: porcentagem,
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
					porcentagem: "0",
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
