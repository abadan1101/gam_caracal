//---------------------------------CHAMADA DA LINHA 01----------------------------
//--------------------------------------------------------------------------------
//funcção para abertura da linha 01
function openL1(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo
	const mAtv = "tarefas"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js
	
	//configura sub-painel ativo
	document.getElementById("trf_conf").style.display = "none";
	document.getElementById("trf_menu").classList.remove('ocultPainel')
	document.getElementById("trf_tbl").style.display = "block";
	document.getElementById("trf_form").style.display = "none";
	document.getElementById("trf_titulo").innerHTML = "AERONAVE ";
	document.getElementById("trfANV").innerHTML = "7108 ";
	document.getElementById("trfEq").innerHTML =  "S/N 2969 " + "(VN)";
	dbLinha = "linha01"
	
	//configurações para reload
	if(sessionStorage.getItem("index") == 1){
		setTimeout(novaTarefa,100)//funcção pertence a folha: /tarefas/js/5formulário.js
        }
        sessionStorage.setItem("reload", "TrfLin1")
        sessionStorage.setItem("index",0)
        
        //configurações em caso de reload com update
        if(sessionStorage.getItem("reloadUpdate") == "true"){
		var modo = "conf"
		var rld = ""
		var func = ""
		var icon = "img/imgOK.png"
		var msg = "Confirmado!"
		var act = "Tarefa salva com sucesso!"
		openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false")
};

//reload linha1
(function reloadL1() {
    if(sessionStorage.getItem("reload") == "TrfLin1"){
        openL1();
    }
})();

//botão de chamada da linha 01
document.getElementById("linha1").addEventListener('click',()=>{
	openL1();
});
//----------------------------------------------------------------------------------




//---------------------------------CHAMADA DA LINHA 02----------------------------
//--------------------------------------------------------------------------------
//chamada da linha 02
function openL2(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo
	const mAtv = "tarefas"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js
	
	//configura sub-painel ativo
	document.getElementById("trf_conf").style.display = "none";
	document.getElementById("trf_menu").classList.remove('ocultPainel')
	document.getElementById("trf_tbl").style.display = "block";
	document.getElementById("trf_form").style.display = "none";
	document.getElementById("trf_titulo").innerHTML = "AERONAVE ";
	document.getElementById("trfANV").innerHTML = "4201 ";
	document.getElementById("trfEq").innerHTML =  "S/N 2385 " + "(VN)";
	dbLinha = "linha02"
	
	//configurações para reload
	if(sessionStorage.getItem("index") == 1){
        	setTimeout(novaTarefa,100)//funcção pertence a folha: /tarefas/js/5formulário.js
        }
        sessionStorage.setItem("reload", "TrfLin2")
        sessionStorage.setItem("index",0)
        
        //configurações em caso de reload com update
        if(sessionStorage.getItem("reloadUpdate") == "true"){
            var modo = "conf"
            var rld = ""
            var func = ""
            var icon = "img/imgOK.png"
            var msg = "Confirmado!"
            var act = "Tarefa salva com sucesso!"
            openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false") 
};

//reload linha2
(function reloadL2() {
    if(sessionStorage.getItem("reload") == "TrfLin2"){
    	openL2();
    }
})();

//botão de chamada da linha 02
document.getElementById("linha2").addEventListener('click',()=>{
	openL2();
});
//------------------------------------------------------------------------------




//---------------------------------CHAMADA DA LINHA 03----------------------------
//--------------------------------------------------------------------------------
//chamada da linha 03
function openL3(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo
	const mAtv = "tarefas"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js
	
	//configura sub-painel ativo
	document.getElementById("trf_conf").style.display = "none";
	document.getElementById("trf_menu").classList.remove('ocultPainel')
	document.getElementById("trf_tbl").style.display = "block";
	document.getElementById("trf_form").style.display = "none";
	document.getElementById("trf_titulo").innerHTML = " ";
	document.getElementById("trfANV").innerHTML = "VAGO ";
	document.getElementById("trfEq").innerHTML =  " " + "(VN)";
	dbLinha = "linha03"
	
	//configurações para reload
	if(sessionStorage.getItem("index") == 1){
        	setTimeout(novaTarefa,100)//funcção pertence a folha: /tarefas/js/5formulário.js
        }
        sessionStorage.setItem("reload", "TrfLin3")
        sessionStorage.setItem("index",0)
        
        //configurações em caso de reload com update
        if(sessionStorage.getItem("reloadUpdate") == "true"){
            var modo = "conf"
            var rld = ""
            var func = ""
            var icon = "img/imgOK.png"
            var msg = "Confirmado!"
            var act = "Tarefa salva com sucesso!"
            openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false")  	
}

//reload linha3
(function reloadL3() {
    if(sessionStorage.getItem("reload") == "TrfLin3"){
    	openL3();
    }
})();

//botão de chamada da linha 03
document.getElementById("linha3").addEventListener('click',()=>{
	openL3()
});
//------------------------------------------------------------------------------------




//------------------------CHAMADA DAS CONFIGURAÇÕES DAS TAREFAS-------------------
//--------------------------------------------------------------------------------
//chamada das configurações das tarefas
function openCnf(){

	//configura painel secundário ativo
	document.getElementById("trf_conf").style.display = "block";
	document.getElementById("trf_menu").classList.add('ocultPainel')
	document.getElementById("trf_tbl").style.display = "none";
	document.getElementById("trf_form").style.display = "none";
	
	//configura cabeçalho
	document.getElementById("trf_titulo").innerHTML = "CONFIGURAÇÕES DAS TAREFAS ";
	document.getElementById("trfANV").innerHTML = " ";
	document.getElementById("trfEq").innerHTML = " " + "(VN)";
	dbLinha = "configTaref";
	
	//oculta paineis principais dos modulos
	const modulo = [...document.getElementsByClassName("modulo")]
	modulo.map((el)=>{
		el.classList.add('ocultPainel')
	})
	document.getElementById("tarefas").classList.remove('ocultPainel')
	
	//define painel da aba ativa no reload	
	if(sessionStorage.getItem("reload") == "trf_conf"){
		const trf_confTabs = [...document.getElementById("trf_confTabs").children]
		const trf_confPnl = [...document.getElementById("trf_confPnl").children]
		const pnAtv = sessionStorage.getItem("index")		
		trf_confTabs.map((x) => {
			x.classList.remove('trf_confTabAtv')
			x.classList.add('trf_confTabInt')
		})
		trf_confPnl.map((k) => {
			k.classList.add('ocultPainel')
		})
		trf_confPnl[pnAtv].classList.remove('ocultPainel')
		trf_confTabs[pnAtv].classList.add('trf_confTabAtv')
		trf_confTabs[pnAtv].classList.remove('trf_confTabInt')
	}

	//configuração para reload
	sessionStorage.setItem("reload", "trf_conf")
	sessionStorage.setItem("index","0")
	
	//configurações em caso de reload com update
	if(sessionStorage.getItem("reloadUpdate") == "true"){
            var modo = "conf"
            var rld = ""
            var func = ""
            var icon = "img/imgOK.png"
            var msg = "Confirmado!"
            var act = "Configurações salvas com sucesso!"
            openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false")  
}

//reload configurações das tarefas
(function reloadTrfConf() {
    if(sessionStorage.getItem("reload") == "trf_conf"){
        openCnf()
    }
})();

//botão de chamada das configurações das tarefas
document.getElementById("cfgTarf").addEventListener('click',()=>{
	openCnf()
});
//--------------------------------------------------------------------------------





