

//--------------------------ABRIR E FECHAR MENU SECUNDÁRIO------------------------------
//--------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//------------------------------BOTÃO NOVA TAREFA---------------------------------------
//--------------------------------------------------------------------------------------
const tmAf = document.getElementById("trf_menu_afNew")	
tmAf.addEventListener("click",(evt)=>{
	novaTarefa()//função pertence a folha: /tarefas/js/5formulário.js
	//id para inserir nova tarefa
	idTarefa = "novo"//variável pertence a folha: /tarefas/js/tabela.js
})
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//------------------------------BOTÃO ADD EM LOTE---------------------------------------
//--------------------------------------------------------------------------------------
const trfTbl_AddLote = document.getElementById("trf_menu_afLote")	
trfTbl_AddLote.addEventListener("click",(evt)=>{
	//mensagem
	var icon = "img/imgOK.png"
	var msg = "Em Desenvolvimento"
	var act = "Aguarde, rotina em desenvolvimento!"
	var modo = "conf"
	var reload = "false"
	var func = ""
	openMSG(icon, msg, act, modo, reload,func);
})
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//------------------------------BOTÃO IMPORTAR TAREFAS----------------------------------
//--------------------------------------------------------------------------------------
let fileInput = document.getElementById('trf_menu_afImp')
fileInput.addEventListener('change', () => {
	const file = fileInput.files[0]
	const reader = new FileReader()
	const docSelect = file.name;
	
	//baixar planilha de ordens de serviço abertas ou pendentes
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
				var descricao = e.__EMPTY_5
				
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
			addTarefasBd(tabela, "true")//função pertence a folha: /tarefas/js/banco.js
			
		}
	}
	
	//baixar planilha "baixar cartões"
	if(docSelect.includes("baixar cartões")){
		reader.onload = (event) => {
			const data = event.target.result
			const workbook = XLSX.read(data, {type:'array'})
			const firstSheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[firstSheetName]
			const rows = XLSX.utils.sheet_to_json(worksheet)
			var tabela = []
			
			//data da tarefa
			var timestamp = ((rows[0].DATA - 25569)*86400000)+86400000
				if(!timestamp){
					try{
						var hj = rows[0].DATA
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
			
			for(i = 1; i < rows.length; i++){
				tabela.push({
					numero: rows[0].NUMERO,
					data: timestamp,
					chave00: "Aberto",
					chave01: rows[0].TIPO,
					chave02: "",
					chave03: "",
					chave04: "",
					chave05: "",
					porcentagem: "0",
					tarefa: rows[i].CARTÕES,
					serviço: "",
					pedidos: [],
					ferramentas: [],
					produtos: [],
					equipe: [],
					atualizacao: new Date().getTime()
				})
				
			}
			addTarefasBd(tabela, "true")//função pertence a folha: /tarefas/js/banco.js
							
		}				
	}
	reader.readAsArrayBuffer(file)	
})
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//------------------------------BOTÃO EXPORTAR TAREFAS----------------------------------
//--------------------------------------------------------------------------------------
//chamada do botão exportar tarefas
document.getElementById("exportarLinha").addEventListener("click", ()=>{
	exportarTarefas()
})

//função para exportar tarefas
async function exportarTarefas(){

	//variáveis
	const nomeAba1 = "CARTÕES VN"
	const nomeAba2 = "backup da " + dbLinha
	const nomePlanilha = "vn.ods"
	var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js




	
	//array da aba tarefas da linha (pasta do planejamento)
	
	var tarefas = [
		[""],
		[
			"origem","data","tipo","número","descrição","status","pim","obs"
		]
	];
	var tarefasAdd = []
	//montar arrays das tarefas da linha
	bdTabela.map((e)=>{
		//origem
		tarefasAdd.push("A/T")

		//data
		tarefasAdd.push(new Date(e.data).toLocaleDateString("pt-BR"))

		//disponibilidade
		var disp = ""
		if(e.chave01 == "Disponível"){disp="D"}
		if(e.chave01 == "Indisponível"){disp="I"}
		if(e.chave01 == "Restrito"){disp="R"}
		tarefasAdd.push(disp)

		//numero
		tarefasAdd.push(e.numero)

		//descrição da tarefa
		tarefasAdd.push(e.tarefa)

		//status
		var status = "EM EXEC. +60%"
		if(e.chave00 == "Aberto"){status="ABERTA"}
		if(e.chave00 == "Fechado"){status="FECHADA"}
		if(e.chave00 == "Pendente"){status="PENDENTE + 60%"}
		if(e.chave00 == "Ag. Virada"){status="AG. VIRADA"}
		if(e.chave00 == "Ag. Abrir"){status="AG. ABRIR"}
		if(e.chave00 == "Em Exec."){status="EM EXEC. + 60%"}

		tarefasAdd.push(status)

		//pim
		var pim = e.pedidos
		var pimCell = ""
		pim.map((e)=>{
			pimCell = e.pim + " " + pimCell
		})
		tarefasAdd.push(pimCell)

		//observação
		tarefasAdd.push(e.serviço)

		//popular array
		tarefas.push(tarefasAdd)

		//limpar array
		tarefasAdd = []
	})






	//array do backup da linha
	var tarefasBK = [
		[
			"numero","data","andamento","disp","chave01","chave02","chave03",
			"chave04","tarefa","servico","pedidos","ferramentas","produtos",
			"equipe","atualizacao","porcentagem"
		]
	];
	var tarefasBKAdd = []

	//montar arrays do backup da linha
	bdTabela.map((e)=>{
		//numero
		tarefasBKAdd.push(e.numero)
		//data
		tarefasBKAdd.push(e.data)
		//andamento
		tarefasBKAdd.push(e.chave00)
		//disponibilidade
		tarefasBKAdd.push(e.chave01)
		//chave01
		tarefasBKAdd.push(e.chave02)
		//chave02
		tarefasBKAdd.push(e.chave03)
		//chave03
		tarefasBKAdd.push(e.chave04)
		//chave04
		tarefasBKAdd.push(e.chave05)
		//descrição da tarefa
		tarefasBKAdd.push(e.tarefa)
		//serviço
		tarefasBKAdd.push(e.serviço)
		//pedidos
		tarefasBKAdd.push(JSON.stringify(e.pedidos))
		//ferramentas
		tarefasBKAdd.push(JSON.stringify(e.ferramentas))
		//produtos
		tarefasBKAdd.push(JSON.stringify(e.produtos))
		//equipe
		tarefasBKAdd.push(JSON.stringify(e.equipe))
		//atualização
		tarefasBKAdd.push(e.atualizacao)
		//porcentagem
		tarefasBKAdd.push(e.porcentagem)
		//popular array
		tarefasBK.push(tarefasBKAdd)
		//limpar array
		tarefasBKAdd = []
	})

	//gravar planilha
	var workbook = XLSX.utils.book_new();
	var worksheet = XLSX.utils.aoa_to_sheet(tarefas);
	var worksheet1 = XLSX.utils.aoa_to_sheet(tarefasBK);
	XLSX.utils.book_append_sheet(workbook, worksheet, nomeAba1);
	XLSX.utils.book_append_sheet(workbook, worksheet1, nomeAba2);
	XLSX.writeFile(workbook, nomePlanilha);
	
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//------------------------------BOTÃO RESTAURAR---------------------------------------
//--------------------------------------------------------------------------------------
let fileInput1 = document.getElementById('trf_menu_afRest')
fileInput1.addEventListener('change', () => {
	const file = fileInput1.files[0]
	const reader = new FileReader()
	const docSelect = file.name;
	
	if(docSelect == "vn.ods"){
		//mensagem
		var icon = "img/imgAlert.png"
		var msg = "Atenção!"
		var act = "Todas as tarefas atuais serão perdidas. Deseja continuar?"
		var modo = "yn"
		var reload = ""
		var func = () => {minha_função()}
		var senha = true 
		openMSG(icon, msg, act, modo, reload,func,senha);
		
		function minha_função(){
			reader.onload = (event) => {
					const data = event.target.result
					const workbook = XLSX.read(data, {type:'array'})
					const firstSheetName = workbook.SheetNames[1]
					const worksheet = workbook.Sheets[firstSheetName]
					const rows = XLSX.utils.sheet_to_json(worksheet)
					var tabela = [];
					
					console.log(rows);
					
					rows.map((e)=>{
						tabela.push({
							numero: e.numero,
							data: e.data,
							chave00: e.andamento,
							chave01: e.disp,
							chave02: e.chave01,
							chave03: e.chave02,
							chave04: e.chave03,
							chave05: e.chave04,
							porcentagem: e.porcentagem,
							tarefa: e.tarefa,
							serviço: e.servico,
							pedidos: JSON.parse(e.pedidos),
							ferramentas: JSON.parse(e.ferramentas),
							produtos: JSON.parse(e.produtos),
							equipe: JSON.parse(e.equipe),
							atualizacao: e.atualizacao
						})
					});
					
					(async function restaurar(){
						await limparBD();
						await restaurarBD(tabela)
						
						//mensagem
						var icon = "img/imgOK.png"
						var msg = "Restaurado"
						var act = "Tarefas restauradas com sucesso!"
						var modo = "conf"
						var reload = "true"
						var func = ""
						openMSG(icon, msg, act, modo, reload,func);
					})()
							
			}
			reader.readAsArrayBuffer(file)	
		}		
	}else{
		//mensagem
		var icon = "img/imgAlert.png"
		var msg = "Arquivo inválido"
		var act = "selecione o arquivo correto!"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}
})


//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------



//------------------------------BOTÃO RELATÓRIOS---------------------------------------
//--------------------------------------------------------------------------------------
const trfTbl_Restaurar = document.getElementById("trf_menu_afRelatorios")	
trfTbl_Restaurar.addEventListener("click",(evt)=>{
	//mensagem
	var icon = "img/imgOK.png"
	var msg = "Em Desenvolvimento"
	var act = "Aguarde, rotina em desenvolvimento!"
	var modo = "conf"
	var reload = "false"
	var func = ""
	openMSG(icon, msg, act, modo, reload,func);
})
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
