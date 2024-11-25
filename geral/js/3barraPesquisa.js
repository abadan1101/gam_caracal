//------------------------------------------BARRA DE PESQUISA----------------------------------------
//-------------------------------------------------------------------------------------------------
//PROFILE DROPDOWN
const profile1 = document.querySelector('nav .profile');
const imgProfile1 = profile1.querySelector('img');
const dropdownProfile1 = profile1.querySelector('.profile-link');

imgProfile1.addEventListener('click', function () {
	dropdownProfile1.classList.toggle('show');
})

// PROFILE MENU
const allMenu1 = document.querySelectorAll('main .content-data .head .menu');
allMenu1.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})

window.addEventListener('click', function (e) {
	if(e.target !== imgProfile1) {
		if(e.target !== dropdownProfile1) {
			if(dropdownProfile1.classList.contains('show')) {
				dropdownProfile1.classList.remove('show');
			}
		}
	}

	allMenu1.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})
//_________________________________________________________________________________________________
//-------------------------------------------------------------------------------------------------




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
							ferramenta: e.ferramentas,
						})
					});

					var tabela7 = [];
					rows7.map((e)=>{
						console.log(e)
						tabela7.push({
							produto: e.produtos,
						})
					});

					var tabela8 = [];
					rows8.map((e)=>{
						console.log(e)
						tabela8.push({
							membro: e.equipe,
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
