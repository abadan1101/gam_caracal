

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
	if(docSelect.includes("baixar ordens de serviço")){
		reader.onload = (event) => {
			const data = event.target.result
			const workbook = XLSX.read(data, {type:'array'})
			const firstSheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[firstSheetName]
			const rows = XLSX.utils.sheet_to_json(worksheet)
			var tabela = []
		
			rows.map((e)=>{

				//ajustar numero da tarefa
				if(!e.numero){
					e.numero = ""
				}
				
				//ajustar data da tarefa
				var timestamp = ((e.data - 25569)*86400000)+86400000
				if(!timestamp){
					timestamp = new Date().getTime()
				}
				
				//ajustar tipo da tarefa
				if(e.tipo == "i" || e.tipo == "I"){
					e.tipo = "Indisponível"
				}
				if(e.tipo == "d" || e.tipo == "D"){
					e.tipo = "Disponível"
				}
				if(e.tipo == "r" || e.tipo == "R"){
					e.tipo = "Restrito"
				}
				if(e.tipo != "Indisponível" && e.tipo != "Disponível" && e.tipo != "Restrito"){
					e.tipo = "Indisponível"
				}
				
				//ajustar descrição da tarefa
				if(!e.descricao){
					e.descricao = ""
				}
				
				tabela.push({
						numero: e.numero,
						data: timestamp,
						chave00: "Aberto",
						chave01: e.tipo,
						chave02: "",
						chave03: "",
						chave04: "",
						chave05: "",
						porcentagem: "0",
						tarefa: e.descricao,
						serviço: "",
						pedidos: [],
						ferramentas: [],
						produtos: [],
						equipe: [],
						atualizacao: new Date().getTime()
					})
						
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

			//ajustar tipo da tarefa
			var tipoDisp = ""
			if(rows[0].TIPO == "i" || rows[0].TIPO == "I"){
				tipoDisp = "Indisponível"
			}
			if(rows[0].TIPO == "d" || rows[0].TIPO == "D"){
				tipoDisp = "Disponível"
			}
			if(rows[0].TIPO == "r" || rows[0].TIPO == "R"){
				tipoDisp = "Restrito"
			}

			for(i = 1; i < rows.length; i++){
				tabela.push({
					numero: rows[0].NUMERO,
					data: timestamp,
					chave00: "Aberto",
					chave01: tipoDisp,
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
	const bdAtivo = dbLinha;
	const nomeAba1 = "CARTÕES VN"
	const nomeAba2 = "backup da linha 01"
	const nomeAba3 = "backup da linha 02"
	const nomeAba4 = "backup da linha 03"
	const nomeAba5 = "backup das configurações"
	const nomeAba6 = "backup dos cartões"
	const nomeAba7 = "backup das ferramentas"
	const nomeAba8 = "backup dos produtos"
	const nomeAba9 = "backup da equipe"
	const nomePlanilha = "vn.xlsx"

	//array da aba tarefas da linha (pasta do planejamento)
	var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
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
		var status = "EM EXEC. + 60%"
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
	//----------------------------------------------





	//array do backup da linha 01
	dbLinha = "linha01"
	var bdTabelaL1 = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var tarefasBK = [
		[
			"numero","data","andamento","disp","chave01","chave02","chave03",
			"chave04","tarefa","servico","pedidos","ferramentas","produtos",
			"equipe","atualizacao","porcentagem"
		]
	];
	var tarefasBKAdd = []

	//montar arrays do backup da linha
	bdTabelaL1.map((e)=>{
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
	//---------------------------------------------------------




	//array do backup da linha 02
	dbLinha = "linha02"
	var bdTabelaL2 = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var tarefasBK2 = [
		[
			"numero","data","andamento","disp","chave01","chave02","chave03",
			"chave04","tarefa","servico","pedidos","ferramentas","produtos",
			"equipe","atualizacao","porcentagem"
		]
	];
	var tarefasBK2Add = []

	//montar arrays do backup da linha
	bdTabelaL2.map((e)=>{
		//numero
		tarefasBK2Add.push(e.numero)
		//data
		tarefasBK2Add.push(e.data)
		//andamento
		tarefasBK2Add.push(e.chave00)
		//disponibilidade
		tarefasBK2Add.push(e.chave01)
		//chave01
		tarefasBK2Add.push(e.chave02)
		//chave02
		tarefasBK2Add.push(e.chave03)
		//chave03
		tarefasBK2Add.push(e.chave04)
		//chave04
		tarefasBK2Add.push(e.chave05)
		//descrição da tarefa
		tarefasBK2Add.push(e.tarefa)
		//serviço
		tarefasBK2Add.push(e.serviço)
		//pedidos
		tarefasBK2Add.push(JSON.stringify(e.pedidos))
		//ferramentas
		tarefasBK2Add.push(JSON.stringify(e.ferramentas))
		//produtos
		tarefasBK2Add.push(JSON.stringify(e.produtos))
		//equipe
		tarefasBK2Add.push(JSON.stringify(e.equipe))
		//atualização
		tarefasBK2Add.push(e.atualizacao)
		//porcentagem
		tarefasBK2Add.push(e.porcentagem)
		//popular array
		tarefasBK2.push(tarefasBK2Add)
		//limpar array
		tarefasBK2Add = []
	})
	//----------------------------------------------------------





	//array do backup da linha 03
	dbLinha = "linha03"
	var bdTabelaL3 = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var tarefasBK3 = [
		[
			"numero","data","andamento","disp","chave01","chave02","chave03",
			"chave04","tarefa","servico","pedidos","ferramentas","produtos",
			"equipe","atualizacao","porcentagem"
		]
	];
	var tarefasBK3Add = []

	//montar arrays do backup da linha
	bdTabelaL3.map((e)=>{
		//numero
		tarefasBK3Add.push(e.numero)
		//data
		tarefasBK3Add.push(e.data)
		//andamento
		tarefasBK3Add.push(e.chave00)
		//disponibilidade
		tarefasBK3Add.push(e.chave01)
		//chave01
		tarefasBK3Add.push(e.chave02)
		//chave02
		tarefasBK3Add.push(e.chave03)
		//chave03
		tarefasBK3Add.push(e.chave04)
		//chave04
		tarefasBK3Add.push(e.chave05)
		//descrição da tarefa
		tarefasBK3Add.push(e.tarefa)
		//serviço
		tarefasBK3Add.push(e.serviço)
		//pedidos
		tarefasBK3Add.push(JSON.stringify(e.pedidos))
		//ferramentas
		tarefasBK3Add.push(JSON.stringify(e.ferramentas))
		//produtos
		tarefasBK3Add.push(JSON.stringify(e.produtos))
		//equipe
		tarefasBK3Add.push(JSON.stringify(e.equipe))
		//atualização
		tarefasBK3Add.push(e.atualizacao)
		//porcentagem
		tarefasBK3Add.push(e.porcentagem)
		//popular array
		tarefasBK3.push(tarefasBK3Add)
		//limpar array
		tarefasBK3Add = []
	})
	//---------------------------------------------------




	//array do backup das configurações
	var bdTabelaConf = await loadTBCfgGeral()//pertence a folha: /tarefas/js/banco.js
	var tarefasBK4 = [["configuracoes"]];
	tarefasBK4.push([JSON.stringify(bdTabelaConf)])
	//---------------------------------------------------
	
	
	
	//array do backup cartoes
	var bdTabelaCartoes = await loadCartaoGeral()
	var cartoesBK = [
		[
			"nome", "servico","pedidos","ferramentas","produtos",
		]
	];
	var cartoesBKAdd = []

	//montar arrays do backup da linha
	bdTabelaCartoes.map((e)=>{
		//nome
		cartoesBKAdd.push(e.nome)
		//serviço
		cartoesBKAdd.push(e.serviço)
		//pedidos
		cartoesBKAdd.push(JSON.stringify(e.pedidos))
		//ferramentas
		cartoesBKAdd.push(JSON.stringify(e.ferramentas))
		//produtos
		cartoesBKAdd.push(JSON.stringify(e.produtos))
		//popular array
		cartoesBK.push(cartoesBKAdd)
		//limpar array
		cartoesBKAdd = []
	})


	//array do backup ferramentas
	var bdTabelaFerramentas = await loadFerramentasGeral()
	var ferramentasBK = [["ferramentas"]];
	var ferramentasBKAdd = []

	//montar arrays do backup ferramentas
	bdTabelaFerramentas.map((e)=>{
		//ferramenta
		ferramentasBKAdd.push(e.ferramenta)
		//popular array
		ferramentasBK.push(ferramentasBKAdd)
		//limpar array
		ferramentasBKAdd = []
	})


	//array do backup produtos
	var bdTabelaProdutos = await loadProdutosGeral()
	var ProdutosBK = [["produtos"]];
	var produtosBKAdd = []

	//montar arrays do backup produtos
	bdTabelaProdutos.map((e)=>{
		//ferramenta
		produtosBKAdd.push(e.produto)
		//popular array
		ProdutosBK.push(produtosBKAdd)
		//limpar array
		produtosBKAdd = []
	})


	//array do backup equipe
	var bdTabelaEquipe = await loadEquipeGeral()
	var EquipeBK = [["equipe"]];
	var equipeBKAdd = []

	//montar arrays do backup equipe
	bdTabelaEquipe.map((e)=>{
		//ferramenta
		equipeBKAdd.push(e.membro)
		//popular array
		EquipeBK.push(equipeBKAdd)
		//limpar array
		equipeBKAdd = []
	})
	//---------------------------------------------------
	
	
	

	//gravar planilha
	var workbook = XLSX.utils.book_new();
	var worksheet = XLSX.utils.aoa_to_sheet(tarefas);
	var worksheet1 = XLSX.utils.aoa_to_sheet(tarefasBK);
	var worksheet2 = XLSX.utils.aoa_to_sheet(tarefasBK2);
	var worksheet3 = XLSX.utils.aoa_to_sheet(tarefasBK3);
	var worksheet4 = XLSX.utils.aoa_to_sheet(tarefasBK4);
	var worksheet5 = XLSX.utils.aoa_to_sheet(cartoesBK);
	var worksheet6 = XLSX.utils.aoa_to_sheet(ferramentasBK);
	var worksheet7 = XLSX.utils.aoa_to_sheet(ProdutosBK);
	var worksheet8 = XLSX.utils.aoa_to_sheet(EquipeBK);
	XLSX.utils.book_append_sheet(workbook, worksheet, nomeAba1);
	XLSX.utils.book_append_sheet(workbook, worksheet1, nomeAba2);
	XLSX.utils.book_append_sheet(workbook, worksheet2, nomeAba3);
	XLSX.utils.book_append_sheet(workbook, worksheet3, nomeAba4);
	XLSX.utils.book_append_sheet(workbook, worksheet4, nomeAba5);
	XLSX.utils.book_append_sheet(workbook, worksheet5, nomeAba6);
	XLSX.utils.book_append_sheet(workbook, worksheet6, nomeAba7);
	XLSX.utils.book_append_sheet(workbook, worksheet7, nomeAba8);
	XLSX.utils.book_append_sheet(workbook, worksheet8, nomeAba9);
	XLSX.writeFile(workbook, nomePlanilha);


	//retornar banco ativo
	dbLinha = bdAtivo;
	
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------



//------------------------------BOTÃO RELATÓRIOS---------------------------------------
//--------------------------------------------------------------------------------------
const trfTbl_Restaurar = document.getElementById("trf_menu_afRelatorios")	
trfTbl_Restaurar.addEventListener("click",(evt)=>{
	(async function exportarRelatorio(){

		//variáveis
		const bdAtivo = dbLinha;
		const nomeAba1 = "pedidos"
		const nomeAba2 = "ferramentas"
		const nomeAba3 = "produtos"
		const nomePlanilha = "relatorio.xlsx"
	
		var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
		var pedidos = [
			[
				"número","tipo","qtd","P/N","P/N ALT","pim","nome","manual","observação"
			]
		];
		var ferramentas = [
			[
				"número","Ferramenta", "observação"
			]
		];
		var produtos = [
			[
				"número","produto", "observação"
			]
		];


		var pedidosAdd = []
		var ferramentasAdd = []
		var produtosAdd = []
		
		//montar arrays
		bdTabela.map((evt)=>{

			//pedidos
			var pim = evt.pedidos
			pim.map((e)=>{
				if(e.status == true){
					pedidosAdd.push(evt.numero)
					pedidosAdd.push(e.tipo)
					pedidosAdd.push(e.quantidade)
					pedidosAdd.push(e.PN)
					pedidosAdd.push(e.PNA)
					pedidosAdd.push(e.pim)
					pedidosAdd.push(e.nome)
					pedidosAdd.push(e.manual)
					pedidosAdd.push(e.observacao)
	
					pedidos.push(pedidosAdd)
					//limpar array
					pedidosAdd = []
				}
				
			})

			//ferramentas
			var ferr = evt.ferramentas
			ferr.map((e)=>{
				if(e.status == true){
					ferramentasAdd.push(evt.numero)
					ferramentasAdd.push(e.ferramenta)
					ferramentasAdd.push("")

					ferramentas.push(ferramentasAdd)
					//limpar array
					ferramentasAdd = []
				}
			})

			//produtos
			var prod = evt.produtos
			prod.map((e)=>{
				if(e.status == true){
					produtosAdd.push(evt.numero)
					produtosAdd.push(e.produto)
					produtosAdd.push("")

					produtos.push(produtosAdd)
					//limpar array
					produtosAdd = []
				}
			})
		})
		//----------------------------------------------
	
		//gravar planilha
		var workbook = XLSX.utils.book_new();
		var worksheet = XLSX.utils.aoa_to_sheet(pedidos);
		var worksheet1 = XLSX.utils.aoa_to_sheet(ferramentas);
		var worksheet2 = XLSX.utils.aoa_to_sheet(produtos);
		XLSX.utils.book_append_sheet(workbook, worksheet, nomeAba1);
		XLSX.utils.book_append_sheet(workbook, worksheet1, nomeAba2);
		XLSX.utils.book_append_sheet(workbook, worksheet2, nomeAba3);
		XLSX.writeFile(workbook, nomePlanilha);
		
	})()
})
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
