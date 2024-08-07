//--------------------CONFIGURAÇÃO COMUM DAS FOLHAS-------------------
//--------------------------------------------------------------------

//chamada das folhas das linhas
const trf_confTabs = [...document.getElementById("trf_confTabs").children]
const trf_confPnl = [...document.getElementById("trf_confPnl").children]

//ativar as folhas de configuração
trf_confTabs.map((e,i) => {
	e.addEventListener('click', (a) => {
		trf_confTabs.map((x) => {
			x.classList.remove('trf_confTabAtv')
			x.classList.add('trf_confTabInt')
		})
		trf_confPnl.map((k) => {
			k.classList.add('ocultPainel')
		})
		trf_confPnl[i].classList.remove('ocultPainel')
		e.classList.add('trf_confTabAtv')
		e.classList.remove('trf_confTabInt')
		
		//configurações do reload
		sessionStorage.setItem("index",i)
	})
})
//--------------------------------------------------------------------




//-----------------CONFIGURAÇÃO GERAL DAS TAREFAS---------------------
//--------------------------------------------------------------------

//salvar configurações gerais das tarefas
document.getElementById("trf_confSlv").addEventListener('click', (e)=>{
	e.preventDefault();
	
	//chamada da caixa de mensagem
	var modo = "yn"
	var reload = "reload"
	var func = () => {salvConfigTrf()}// função pertence a folha: /tarefas/js/0banco.js
	var icon = "img/imgInter.png"
	var msg = "Confirme para salvar!"
	var act = "Deseja salvar as configurações?"
	openMSG(icon, msg, act, modo, reload, func);
})

//carregar configurações gerais das tarefas
var loadCnfTrf = setInterval(()=>{
	try{
		if(getCT){
			try{
				//popular configurações na tabela
				const trfGerTbl = document.getElementById('trf_confPnlTbl')
				const x = trfGerTbl.rows
				const nRow = trfGerTbl.rows.length;
				for(let contador = 1; contador < nRow; contador++) {	
					if(contador == 1){
						//a variável "getCT" é definido na folha: /tarefas/js/2banco.js
						x[contador].cells[0].children[0].value = getCT.chave00[0]
						x[contador].cells[1].firstChild.checked = getCT.chave00[1]
						x[contador].cells[2].children[0].value = getCT.chave00[2]
						x[contador].cells[3].children[0].value = getCT.chave00[3]
						x[contador].cells[4].children[0].value = getCT.chave00[4]
						x[contador].cells[5].children[0].value = getCT.chave00[5]
						x[contador].cells[6].children[0].value = getCT.chave00[6]
						x[contador].cells[7].children[0].value = getCT.chave00[7]
						x[contador].cells[8].children[0].value = getCT.chave00[8]
						x[contador].cells[9].children[0].value = getCT.chave00[9]
						x[contador].cells[10].children[0].value = getCT.chave00[10]
						x[contador].cells[11].children[0].value = getCT.chave00[11]
					}
					if(contador == 2){
						x[contador].cells[0].children[0].value = getCT.chave01[0]
						x[contador].cells[1].firstChild.checked = getCT.chave01[1]
						x[contador].cells[2].children[0].value = getCT.chave01[2]
						x[contador].cells[3].children[0].value = getCT.chave01[3]
						x[contador].cells[4].children[0].value = getCT.chave01[4]
						x[contador].cells[5].children[0].value = getCT.chave01[5]
						x[contador].cells[6].children[0].value = getCT.chave01[6]
						x[contador].cells[7].children[0].value = getCT.chave01[7]
						x[contador].cells[8].children[0].value = getCT.chave01[8]
						x[contador].cells[9].children[0].value = getCT.chave01[9]
						x[contador].cells[10].children[0].value = getCT.chave01[10]
						x[contador].cells[11].children[0].value = getCT.chave01[11]
					}
					if(contador == 3){
						x[contador].cells[0].children[0].value = getCT.chave02[0]
						x[contador].cells[1].firstChild.checked = getCT.chave02[1]
						x[contador].cells[2].children[0].value = getCT.chave02[2]
						x[contador].cells[3].children[0].value = getCT.chave02[3]
						x[contador].cells[4].children[0].value = getCT.chave02[4]
						x[contador].cells[5].children[0].value = getCT.chave02[5]
						x[contador].cells[6].children[0].value = getCT.chave02[6]
						x[contador].cells[7].children[0].value = getCT.chave02[7]
						x[contador].cells[8].children[0].value = getCT.chave02[8]
						x[contador].cells[9].children[0].value = getCT.chave02[9]
						x[contador].cells[10].children[0].value = getCT.chave02[10]
						x[contador].cells[11].children[0].value = getCT.chave02[11]
					}
					if(contador == 4){
						x[contador].cells[0].children[0].value = getCT.chave03[0]
						x[contador].cells[1].firstChild.checked = getCT.chave03[1]
						x[contador].cells[2].children[0].value = getCT.chave03[2]
						x[contador].cells[3].children[0].value = getCT.chave03[3]
						x[contador].cells[4].children[0].value = getCT.chave03[4]
						x[contador].cells[5].children[0].value = getCT.chave03[5]
						x[contador].cells[6].children[0].value = getCT.chave03[6]
						x[contador].cells[7].children[0].value = getCT.chave03[7]
						x[contador].cells[8].children[0].value = getCT.chave03[8]
						x[contador].cells[9].children[0].value = getCT.chave03[9]
						x[contador].cells[10].children[0].value = getCT.chave03[10]
						x[contador].cells[11].children[0].value = getCT.chave03[11]
					}
					if(contador == 5){
						x[contador].cells[0].children[0].value = getCT.chave04[0]
						x[contador].cells[1].firstChild.checked = getCT.chave04[1]
					}
					if(contador == 6){
						x[contador].cells[0].children[0].value = getCT.chave05[0]
						x[contador].cells[1].firstChild.checked = getCT.chave05[1]
					}
					if(contador == 7){
						x[contador].cells[0].children[0].value = getCT.baixar[0]
						x[contador].cells[1].firstChild.checked = getCT.baixar[1]
					}	
				}
				console.log("Configurações gerais das tarefas carregadas com sucesso!");
				
				//configurações dos CheckBox
				const trf_confCb = [...document.getElementsByClassName("trf_confCb")]
				const trf_confCbx = [...document.getElementsByClassName("trf_confCbx")]
				trf_confCb.map((e,index)=>{
					if(e.value == ""){
						trf_confCbx[index].disabled = true
						trf_confCbx[index].checked = false
					}else{
						trf_confCbx[index].disabled = false
					}
					e.addEventListener("change", ()=>{
						if(e.value == ""){
							trf_confCbx[index].disabled = true
							trf_confCbx[index].checked = false
						}else{
							trf_confCbx[index].disabled = false
						}
					})
				})
			}catch{
				var modo = "conf"
				var reload = ""
				var func = ""
				var icon = "img/imgError.png"
				var msg = "Erro!"
				var act = "Erro ao carregar dados!"
				openMSG(icon, msg, act, modo, reload,func);
			}
			//parar setInterval
			clearInterval(loadCnfTrf)
		}else{
			console.log("falha ao carregar configurações gerais das tarefas!")
		}
	}catch{
		console.log("carregando configurações gerais das tarefas!")
	}
	
},10)
//--------------------------------------------------------------------










