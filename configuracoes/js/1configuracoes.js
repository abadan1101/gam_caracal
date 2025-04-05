//------------------------------BOTÃO CONFIGURAÇÕES-------------------------------------
//--------------------------------------------------------------------------------------

	//carregar caixas
	//variável da senha para configurações gerais
	document.getElementById("cGeralSenha").value = localStorage.getItem("senhaConfig"); 

	//variavel do tamanho da tela padrão em px
	document.getElementById("cGeralMenu").value = localStorage.getItem("tipoMenu"); 

	//variavel que difine tipo de tabela principal
	document.getElementById("cGeralTabela").value = localStorage.getItem("tipoTabela") 
	
	
	//botão salvar
	document.getElementById("ConfigGeraladdEspSlv").addEventListener('click', function () {
		if(document.getElementById("cGeralSenha").value != ""){
		
		function minha_função(){
			localStorage.setItem("senhaConfig", document.getElementById("cGeralSenha").value)
			localStorage.setItem("tipoMenu", document.getElementById("cGeralMenu").value)
			localStorage.setItem("tipoTabela", document.getElementById("cGeralTabela").value)
			//mensagem
			var icon = "img/imgOK.png"
			var msg = "Confirmado"
			var act = "A página será recarregada para efetivar as alterações!"
			var modo = "conf"
			var reload = "true"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
		}
			
			//mensagem
			var icon = "img/imgAlert.png"
			var msg = "Atenção!"
			var act = "Deseja salver as alterações?"
			var modo = "yn"
			var reload = ""
			var func = () => {minha_função()}
			var senha = true 
			openMSG(icon, msg, act, modo, reload,func,senha);
			
			
		}else{
			document.getElementById("cGeralSenha").reportValidity();
		}
	})

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




//------------------------------BOTÃO RESTAURAR---------------------------------------
//--------------------------------------------------------------------------------------
let fileInput1 = document.getElementById('trf_menu_afRest')
fileInput1.addEventListener('change', () => {
	const file = fileInput1.files[0]
	const reader = new FileReader()
	const docSelect = file.name;
	const bdAtivo = dbLinha;

	
	if(docSelect == "vn.xlsx" || docSelect == "vn.ods"){
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
					const worksheet = workbook.Sheets[workbook.SheetNames[1]]
					const worksheet2 = workbook.Sheets[workbook.SheetNames[2]]
					const worksheet3 = workbook.Sheets[workbook.SheetNames[3]]
					const worksheet4 = workbook.Sheets[workbook.SheetNames[4]]
					const worksheet5 = workbook.Sheets[workbook.SheetNames[5]]
					const worksheet6 = workbook.Sheets[workbook.SheetNames[6]]
					const worksheet7 = workbook.Sheets[workbook.SheetNames[7]]
					const worksheet8 = workbook.Sheets[workbook.SheetNames[8]]
					const rows = XLSX.utils.sheet_to_json(worksheet)
					const rows2 = XLSX.utils.sheet_to_json(worksheet2)
					const rows3 = XLSX.utils.sheet_to_json(worksheet3)
					const rows4 = XLSX.utils.sheet_to_json(worksheet4)
					const rows5 = XLSX.utils.sheet_to_json(worksheet5)
					const rows6 = XLSX.utils.sheet_to_json(worksheet6)
					const rows7 = XLSX.utils.sheet_to_json(worksheet7)
					const rows8 = XLSX.utils.sheet_to_json(worksheet8)

					var tabela = [];
					rows.map((e)=>{
						if(e.chave01 == undefined){e.chave01 = ""}
						if(e.chave02 == undefined){e.chave02 = ""}
						if(e.chave03 == undefined){e.chave03 = ""}
						if(e.chave04 == undefined){e.chave04 = ""}
						if(e.servico == undefined){e.servico = ""}

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

					var tabela2 = [];
					rows2.map((e)=>{
						tabela2.push({
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

					var tabela3 = [];
					rows3.map((e)=>{
						tabela3.push({
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
					
					var tabela4 = JSON.parse(rows4[0].configuracoes);

					var tabela5 = [];
					rows5.map((e)=>{
						tabela5.push({
							nome: e.nome,
							serviço: e.serviço,
							pedidos: JSON.parse(e.pedidos),
							ferramentas: JSON.parse(e.ferramentas),
							produtos: JSON.parse(e.produtos),
						})
					});

					var tabela6 = [];
					rows6.map((e)=>{
						tabela6.push({
							ferramenta: JSON.parse(e.ferramentas).ferramenta,
							local: JSON.parse(e.ferramentas).local,
							observacao: JSON.parse(e.ferramentas).observacao
						})
					});

					var tabela7 = [];
					rows7.map((e)=>{
						tabela7.push({
							produto: JSON.parse(e.produtos).produto,
							local: JSON.parse(e.produtos).local,
							observacao: JSON.parse(e.produtos).observacao
						})
					});

					var tabela8 = [];
					rows8.map((e)=>{
						tabela8.push({
							membro: JSON.parse(e.equipe).membro,
							funcao: JSON.parse(e.equipe).funcao,
							observacao: JSON.parse(e.equipe).observacao
						})
					});
					
					(async function restaurar(){
						dbLinha = "linha01";
						await limparBD();
						await restaurarBD(tabela)

						dbLinha = "linha02";
						await limparBD();
						await restaurarBD(tabela2)

						dbLinha = "linha03";
						await limparBD();
						await restaurarBD(tabela3)

						dbLinha = "configTaref";
						await limparBD();
						await restaurarBD(tabela4)

						dbLinha = "cartoes";
						await limparBD();
						await restaurarBD(tabela5)

						dbLinha = "ferramentas";
						await limparBD();
						await restaurarBD(tabela6)

						dbLinha = "produtos";
						await limparBD();
						await restaurarBD(tabela7)

						dbLinha = "equipe";
						await limparBD();
						await restaurarBD(tabela8)

						//retornar banco ativo
						dbLinha = bdAtivo
						
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
