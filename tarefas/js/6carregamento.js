//---------------------------------CONFIGURAÇÕES GERAIS----------------------------
//-------------------------------------------------------------------------------
async function cnfgFormTrf(n){

	//configurar cabeçalho do formulário
	var nl = ""
	if(dbLinha == "linha01"){
		nl = 1
	}
	if(dbLinha == "linha02"){
		nl = 2
	}
	if(dbLinha == "linha03"){
		nl = 3
	}
	var getLin = await loadTBCfgLin(nl) //pertence a folha: /tarefas/js/banco.js
	
	
	
	if(getLin.nANV != "VAGO"){
		document.getElementById("trf_titulo").innerHTML = "AERONAVE ";
		document.getElementById("trfANV").innerHTML = getLin.nANV;
		document.getElementById("trfSn").innerHTML =  " S/N " + getLin.snANV;
		document.getElementById("trf_menu").classList.remove('ocultPainel')
	}else{
		document.getElementById("trf_titulo").innerHTML = "VAGO";
		document.getElementById("trfANV").innerHTML = "";
		document.getElementById("trfSn").innerHTML =  "";
		document.getElementById("trf_menu").classList.add('ocultPainel')
	}
	
	//configurar dados da ANV
	const x = document.getElementById('dadosANV').children
	x[0].innerHTML = "MGB S/N: " + getLin.snMGB
	x[1].innerHTML = "GTM #1 S/N: " + getLin.snGTM1
	x[2].innerHTML = "GTM #2 S/N: " + getLin.snGTM2

	
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo
	const mAtv = "tarefas"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js
	
	//configura sub-painel ativo
	document.getElementById("trf_conf").style.display = "none";
	document.getElementById("trf_tbl").style.display = "block";
	document.getElementById("trf_form").style.display = "none";

	//chamadas da tabela principal
	document.getElementById("trf_tblTbBdy").innerHTML = ""//limpar tabela
	setTimeout(()=>{
		async function retardar(){
			const body = document.getElementById("tarefas") 
			const div = document.createElement("div")
			div.setAttribute("id","pnlMunu1")
			div.setAttribute("style","position: absolute;width: 100%;" +
			"height: 100%;z-index: 99999;background: rgba(0,0,0,0.2);" +
			"display: flex;justify-content: center;align-items:center;font-size: 20px;")
			div.innerHTML = "<div style='background: #fff;width:200px;height: 50px; display: flex; justify-content: center;align-items:center; border-radius:10px;'>carregando...</div>"
			body.prepend(div)
			
			//preenche a tabela principal
			var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js

			if(tblPrincipal == "estatica"){
				await TrfTbl_LoadStatic(bdTabela)//funções chamadas da folha: /tarefas/js/tabela.js
				//filtrar tarefas
				await trfTbl_filtroReload();//pertence a folha: /tarefas/js/tabela.js
				trfTbl_filtro()//pertence a folha: /tarefas/js/tabela.js
			}else{
				await TrfTbl_Load(bdTabela)//funções chamadas da folha: /tarefas/js/tabela.js
				//filtrar tarefas
				await trfTbl_filtroReload();//pertence a folha: /tarefas/js/tabela.js
				trfTbl_filtro()//pertence a folha: /tarefas/js/tabela.js
			}
			

			pnlMunu1.remove()
		}retardar()
		
	},500)
}
//----------------------------------------------------------------------------------




//---------------------------------CHAMADA DA LINHA 01----------------------------
//--------------------------------------------------------------------------------
function openL1(){
	//ativa banco de dados da linha 01
	dbLinha = "linha01"

	//configurar cabeçalho
	cnfgFormTrf(2)

	//ativa linha 01 para reload
	sessionStorage.setItem("reload", "TrfLin1")
};

//reload linha1
(function reloadL1() {
    if(sessionStorage.getItem("reload") == "TrfLin1"){
        openL1();//abre o painel da linha 01
    }
})();

//botão de chamada da linha 01
document.getElementById("linha1").addEventListener('click',()=>{
	openL1();//abre o painel da linha 01
});
//----------------------------------------------------------------------------------




//---------------------------------CHAMADA DA LINHA 02----------------------------
//--------------------------------------------------------------------------------
function openL2(){
	//ativa banco de dados da linha 02
	dbLinha = "linha02"
	
	//configurar cabeçalho
	cnfgFormTrf(3)
	
	//ativa linha 02 para reload
	sessionStorage.setItem("reload", "TrfLin2")
};

//reload linha2
(function reloadL2() {
    if(sessionStorage.getItem("reload") == "TrfLin2"){
        openL2();//abre o painel da linha 02
    }
})();

//botão de chamada da linha 02
document.getElementById("linha2").addEventListener('click',()=>{
	openL2();//abre o painel da linha 02
});
//----------------------------------------------------------------------------------




//---------------------------------CHAMADA DA LINHA 03----------------------------
//--------------------------------------------------------------------------------
function openL3(){
	//ativa banco de dados da linha 03
	dbLinha = "linha03"

	//configurar cabeçalho
	cnfgFormTrf(4)
	
	//ativa linha 03 para reload
	sessionStorage.setItem("reload", "TrfLin3")
};

//reload linha3
(function reloadL3() {
    if(sessionStorage.getItem("reload") == "TrfLin3"){
        openL3();//abre o painel da linha 03
    }
})();

//botão de chamada da linha 03
document.getElementById("linha3").addEventListener('click',()=>{
	openL3();//abre o painel da linha 03
});
//----------------------------------------------------------------------------------




//------------------------CHAMADA DAS CONFIGURAÇÕES DAS TAREFAS-------------------
//--------------------------------------------------------------------------------
//chamada das configurações das tarefas
function openCnf(index){

	//configura painel secundário ativo
	document.getElementById("trf_conf").style.display = "block";
	document.getElementById("trf_menu").classList.add('ocultPainel')
	document.getElementById("trf_tbl").style.display = "none";
	document.getElementById("trf_form").style.display = "none";
	
	//configura cabeçalho
	document.getElementById("trf_titulo").innerHTML = "DEFINIÇÕES DAS LINHAS";
	document.getElementById("trfANV").innerHTML = " ";
	document.getElementById("trfSn").innerHTML = " ";
	dbLinha = "configTaref";
	
	//oculta paineis principais dos modulos
	const modulo = [...document.getElementsByClassName("modulo")]
	modulo.map((el)=>{
		el.classList.add('ocultPainel')
	})
	document.getElementById("tarefas").classList.remove('ocultPainel')
	
	//define painel da aba ativa no reload	
	const trf_confTabs = [...document.getElementById("trf_confTabs").children]
	const trf_confPnl = [...document.getElementById("trf_confPnl").children]		
	trf_confTabs.map((x) => {
		x.classList.remove('trf_confTabAtv')
		x.classList.add('trf_confTabInt')
	})
	trf_confPnl.map((k) => {
		k.classList.add('ocultPainel')
	})
	trf_confPnl[index].classList.remove('ocultPainel')
	trf_confTabs[index].classList.add('trf_confTabAtv')
	trf_confTabs[index].classList.remove('trf_confTabInt')

	//configuração para reload
	sessionStorage.setItem("reload", "trf_conf")

	//funções chamadas da folha: /tarefas/js/configTarefas.js
	loadCnfTrf()//carrega configurações gerais das tarefas
	loadCnfTrfLin(2,1)//carrega configurações da linha 01
	loadCnfTrfLin(3,2)//carrega configurações da linha 02
	loadCnfTrfLin(4,3)//carrega configurações da linha 03
}

//reload configurações das tarefas
(function reloadTrfConf() {
	if(sessionStorage.getItem("reload") == "trf_conf"){
		const index = sessionStorage.getItem("index_Conf") 
		openCnf(index)//abre o formulário de configurações gerais das tarefas
	}
})();

//botão de chamada das configurações das tarefas
document.getElementById("cfgTarf").addEventListener('click',()=>{
	sessionStorage.setItem("index_Conf",0) 
	const index = 0
	openCnf(index)//abre o formulário de configurações gerais das tarefas
});
//--------------------------------------------------------------------------------



