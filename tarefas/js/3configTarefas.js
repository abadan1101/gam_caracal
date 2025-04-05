//--------------------CONFIGURAÇÃO COMUM DAS FOLHAS------------------
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
		sessionStorage.setItem("index_Conf",i)
	})
})
//--------------------------------------------------------------------




//-----------------CONFIGURAÇÃO GERAL DAS TAREFAS---------------------
//--------------------------------------------------------------------

//botão salvar configurações gerais das tarefas
document.getElementById("trf_confSlv").addEventListener('click', (e)=>{
	e.preventDefault();
	var icon = "img/imgInter.png"
	var msg = "Confirme para salvar!"
	var act = "Deseja salvar as configurações?"
	var modo = "yn"
	var reload = "false"
	var func = () => {SalvCnfTrf()}
	openMSG(icon, msg, act, modo, reload,func);
})

//salvar configurações gerais das tarefas
function SalvCnfTrf(){
	//popular configurações no array de objetos
	const trfGerTbl = document.getElementById('trf_confPnlTbl')
	const x = trfGerTbl.rows
	const nRow = trfGerTbl.rows.length;
	for(let contador = 1; contador < nRow; contador++) {
		var ctrl = x[contador].cells[0].children[0].value
		var atv = x[contador].cells[1].firstChild.checked
		var ch1 = x[contador].cells[2].children[0].value
		var ch2 = x[contador].cells[3].children[0].value
		var ch3 = x[contador].cells[4].children[0].value
		var ch4 = x[contador].cells[5].children[0].value
		var ch5 = x[contador].cells[6].children[0].value
		var ch6 = x[contador].cells[7].children[0].value
		var ch7 = x[contador].cells[8].children[0].value
		var ch8 = x[contador].cells[9].children[0].value
		var ch9 = x[contador].cells[10].children[0].value
		var ch10 = x[contador].cells[11].children[0].value
		
		if(contador == 1){
			var t1 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 2){
			var t2 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 3){
			var t3 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 4){
			var t4 = [ctrl, atv, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]
		}
		if(contador == 5){
			var t5 = [ctrl, atv]
		}
		if(contador == 6){
			var t6 = [ctrl, atv]
		}
		if(contador == 7){
			var t7 = [ctrl, atv]
		}	
	}	
	
	//Abrindo a transação com o banco de dados"
	var transaction = db.transaction('configTaref', "readwrite");
	var store = transaction.objectStore('configTaref');
	var request = store.get(1);

	//quando ocorrer um erro ao buscar o registro
	request.onerror = function (event) {
	    console.log('Ocorreu um erro ao buscar as configurações gerais das tarefas.');
	};
	
	//quando o registro for encontrado com sucesso
	request.onsuccess = function (event) {
	    var configTaref = event.target.result;
	    configTaref.chave00 = t1;
	    configTaref.chave01 = t2;
	    configTaref.chave02 = t3;
	    configTaref.chave03 = t4;
	    configTaref.chave04 = t5;
	    configTaref.chave05 = t6;
	    configTaref.baixar = t7;
	    //Atualizando o registro no banco
	    var requestUpdate = store.put(configTaref);
	    //quando o registro for atualizado com sucesso
	    requestUpdate.onsuccess = function (event) {
			console.log('Configurações gerais das tarefas salvas com sucesso.') ;
			var icon = "img/imgOK.png"
			var msg = "Confirmado!"
			var act = "Configurações salvas com sucesso!"
			var modo = "conf"
			var reload = "true"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
	    };
	    //quando ocorrer erro ao atualizar o registro
	    requestUpdate.onerror = function (event) {
		console.log('Ocorreu um erro ao salvar os configurações gerais das tarefas. ' + event);
		var icon = "img/imgError.png"
		var msg = "Erro ao salvas configurações!"
		var act = event
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	    };
	};	
}

//carregar configurações gerais das tarefas
async function loadCnfTrf(){//função chamada na folha: /tarefas/js/carregamento.js
	//obtenção da tabela das configurações gerais das tarefas
	await bdOK()
	var transaction = db.transaction('configTaref', "readonly");
	var store = transaction.objectStore('configTaref');
	const objectStoreRequest = store.get(1)
	objectStoreRequest.onsuccess = () => {
		try{
			var getCT = objectStoreRequest.result
			//popular configurações na tabela
			const trfGerTbl = document.getElementById('trf_confPnlTbl')
			const x = trfGerTbl.rows
			const nRow = trfGerTbl.rows.length;
			for(let contador = 1; contador < nRow; contador++) {	
				if(contador == 1){
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
			//configurações dos CheckBox
			const trf_confCb = [...document.getElementsByClassName("trf_confCb")]
			const trf_confCbx = [...document.getElementsByClassName("trf_confCbx")]
			trf_confCb.map((e,index)=>{
				e.addEventListener("change", ()=>{
					if(e.value == ""){
						e.value = "Chave 0"+(index+1)
					}
				})
			})
		}catch (erro){
			var icon = "img/imgError.png"
			var msg = "Erro!"
			var act = erro
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao carregar configurações gerais das tarefas! " + erro)	
		}
	}

	//carregar relatórios das linhas
	trfConf_relatorioCarregar()
}
//--------------------------------------------------------------------




//------------------------CONFIGURAÇÕES DAS LINHAS----------------------
//----------------------------------------------------------------------

//textarea avançado (TINYMCE)
tinymce.init({
	selector: '.textoAvancado',
	width: 880,
	height: 445,
	menubar: '',
	toolbar: 'print undo redo bold italic alignleft aligncenter alignright alignjustify indent outdent',
	setup: (editor) => {

		//SALVAR TEXTO AUTOMATICAMENTE
         editor.on('change', (e) => {
			const val = tinymce.activeEditor.getContent()
			var id = tinymce.activeEditor.id
			if(id == "editor1"){id = 2}
			if(id == "editor2"){id = 3}
			if(id == "editor3"){id = 4}
			AltTarefasConfBd(id, "relatorio", val)
         })
       },
});
//carregar texto do relatório
function trfConf_relatorioCarregar(){
	(async function obter(){
		const rel1 = await obterTarefas(2)
		const rel2 = await obterTarefas(3)
		const rel3 = await obterTarefas(4)
		const relPadrao = "<p style='text-align: center;'><strong>RELAT&Oacute;RIO DE ANDAMENTO DE INPE&Ccedil;&Atilde;O A/T (AVI&Ocirc;NICA)<br></strong></p>"+
		"<p style='text-align: justify;'>AERONAVE: <strong>XXXX</strong></p>"+
		"<p style='text-align: justify;'>ENTRADA DA ANV: <strong>XX/XX/XXXX</strong></p>"+
		"<p style='text-align: justify;'>INSPE&Ccedil;&Atilde;O DE RECEBIMENTO: <strong>XX/XX/XXXX</strong></p>"+
		"<p style='text-align: justify;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A aeronave entrou no Hangar do GAERNAVMAN parcialmente desmontada, sem cumprir o voo de recebimento, e sem possibilidade de cumprir os testes iniciais de recebimento e identificar quais itens est&atilde;o faltando nos diversos sistemas.</p>"+
		"<p style='text-align: justify;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No dia XX/XX/XXXX foi iniciado a inspe&ccedil;&atilde;o de recebimento e verificado as seguintes discrep&acirc;ncias:</p>"+
		"<p style='text-align: justify;'>1- Faltando ...;</p>"+
		"<p style='text-align: justify;'>2- Faltando ...;</p>";
		
		if(rel1.relatorio != ""){
				tinymce.get("editor1").setContent(rel1.relatorio);
		}else{
			tinymce.get("editor1").setContent(relPadrao);
		}

		if(rel2.relatorio != ""){
				tinymce.get("editor2").setContent(rel2.relatorio);
		}else{
			tinymce.get("editor2").setContent(relPadrao);
		}

		if(rel3.relatorio != ""){
				tinymce.get("editor3").setContent(rel3.relatorio);
		}else{
			tinymce.get("editor3").setContent(relPadrao);
		}
		
	})()
}


//carregar configurações das linhas
async function loadCnfTrfLin(iDB, nLin){//função chamada na folha: /tarefas/js/carregamento.js
	//carrega tabela
	await bdOK()
	var transaction = db.transaction('configTaref', "readonly");
	var store = transaction.objectStore('configTaref');
	const objectStoreRequest = store.get(iDB)
	objectStoreRequest.onsuccess = () => {
		try{
			var getL = objectStoreRequest.result
			//popular configurações nas linhas
			const L = [...document.getElementsByClassName("trfConf_L"+nLin)]
			L[0].value = getL.nANV
			L[1].value = getL.snANV
			L[2].value = getL.snMGB
			L[3].value = getL.snGTM1
			L[4].value = getL.snGTM2
			L[5].value = getL.inicio
			L[6].value = getL.fim
			L[7].innerHTML = getL.status
			
			//configura botões
			if(getL.status == "inativo"){
				//oculta botões
				document.getElementById("tfpbAtv"+nLin).style.display = "block"
				document.getElementById("tfpbEdt"+nLin).style.display = "none"
				document.getElementById("tfpbArq"+nLin).style.display = "none"
				document.getElementById("tfpbExc"+nLin).style.display = "none"
				document.getElementById("tfpbSlv"+nLin).style.display = "none"
				document.getElementById("tfpbCan"+nLin).style.display = "none"
				L[0].disabled = false
				L[1].disabled = false
				L[2].disabled = false
				L[3].disabled = false
				L[4].disabled = false
				L[5].disabled = false
				L[6].disabled = false
			}else{
				//oculta botões
				document.getElementById("tfpbAtv"+nLin).style.display = "none"
				document.getElementById("tfpbEdt"+nLin).style.display = "block"
				document.getElementById("tfpbArq"+nLin).style.display = "block"
				document.getElementById("tfpbExc"+nLin).style.display = "block"
				document.getElementById("tfpbSlv"+nLin).style.display = "none"
				document.getElementById("tfpbCan"+nLin).style.display = "none"
				L[0].disabled = true
				L[1].disabled = true
				L[2].disabled = true
				L[3].disabled = true
				L[4].disabled = true
				L[5].disabled = true
				L[6].disabled = true
			}
			
		}catch (erro){
			var icon = "img/imgError.png"
			var msg = "Erro!"
			var act = erro
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao carregar configurações da linha 0"+nLin+ "!"  + erro)
		}
	}
}



//ativar configurações das linhas
function ativLin(nLin,iDB){
	const L = [...document.getElementsByClassName("trfConf_L"+nLin)]
	if(L[0].value != "VAGO" && L[5].value != "" && L[6].value != ""){
		//Abrindo a transação com o banco de dados"
		var transaction = db.transaction('configTaref', "readwrite");
		var store = transaction.objectStore('configTaref');
		var request = store.get(iDB);

		//quando ocorrer um erro ao buscar o registro
		request.onerror = function (event) {
		    console.log('Ocorreu um erro ao buscar banco de dados da linha 0'+nLin);
		};
		
		//quando o registro for encontrado com sucesso
		request.onsuccess = function (event) {

			//preparar registros para gravar
			var configTaref = event.target.result;
			configTaref.nANV = L[0].value;
			configTaref.snANV = L[1].value;
			configTaref.snMGB = L[2].value;
			configTaref.snGTM1 = L[3].value;
			configTaref.snGTM2 = L[4].value;
			configTaref.inicio = L[5].value;
			configTaref.fim = L[6].value;
			configTaref.status = "ativo"

			//grava registros
		    	var requestUpdate = store.put(configTaref);
		    
		    	//quando o registro for atualizado com sucesso
		    	requestUpdate.onsuccess = function (event) {
				console.log('A linha 0'+nLin+ ' foi ativada com sucesso!') ;
				var icon = "img/imgOK.png"
				var msg = "Confirmado!"
				var act = "A linha 0"+nLin+ ' foi ativada com sucesso!'
				var modo = "conf"
				var reload = "true"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
		    	};
		    	//quando ocorrer erro ao atualizar o registro
		    	requestUpdate.onerror = function (event) {
				console.log("Erro ao ativar linha 0"+nLin+ "! " +event);
				var icon = "img/imgError.png"
				var msg = "Erro ao ativar a linha 0"+nLin+ "!"
				var act = event
				var modo = "conf"
				var reload = "false"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
		    	};
		};

		//oculta botões
		document.getElementById("tfpbAtv"+nLin).style.display = "none"
		document.getElementById("tfpbEdt"+nLin).style.display = "block"
		document.getElementById("tfpbArq"+nLin).style.display = "block"
		document.getElementById("tfpbExc"+nLin).style.display = "block"
		document.getElementById("tfpbSlv"+nLin).style.display = "none"
		document.getElementById("tfpbCan"+nLin).style.display = "none"
	}else{
		var icon = "img/imgAlert.png"
		var msg = ""
		var act = "Preencha os campos obrigatórios!"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}	
}
//botão ativar configurações da linha 01
document.getElementById("tfpbAtv1").addEventListener("click",(e)=>{
	e.preventDefault();
	ativLin(1,2)
})
//botão ativar configurações da linha 02
document.getElementById("tfpbAtv2").addEventListener("click",(e)=>{
	e.preventDefault();
	ativLin(2,3)
})
//botão ativar configurações da linha 03
document.getElementById("tfpbAtv3").addEventListener("click",(e)=>{
	e.preventDefault();
	ativLin(3,4)
})



//editar configuração das linhas
function editLinMNT(lin){
	//oculta botões
	document.getElementById("tfpbAtv"+lin).style.display = "none"
	document.getElementById("tfpbEdt"+lin).style.display = "none"
	document.getElementById("tfpbArq"+lin).style.display = "none"
	document.getElementById("tfpbExc"+lin).style.display = "none"
	document.getElementById("tfpbSlv"+lin).style.display = "block"
	document.getElementById("tfpbCan"+lin).style.display = "block"
	const L1 = [...document.getElementsByClassName("trfConf_L"+lin)]
	L1[1].disabled = false
	L1[2].disabled = false
	L1[3].disabled = false
	L1[4].disabled = false
	L1[5].disabled = false
	L1[6].disabled = false
}
//botão editar configurações da linha 01
document.getElementById("tfpbEdt1").addEventListener("click",()=>{
	editLinMNT(1)
})
//botão editar configurações da linha 02
document.getElementById("tfpbEdt2").addEventListener("click",()=>{
	editLinMNT(2)
})
//botão editar configurações da linha 03
document.getElementById("tfpbEdt3").addEventListener("click",()=>{
	editLinMNT(3)
})



//arquivar configurações das linhas
function arqLin(nLin){
	var icon = "img/imgAlert.png"
	var msg = "Em desenvolvimento!"
	var act = "Aguardando desenvolvimento"
	var modo = "conf"
	var reload = "false"
	var func = ""
	openMSG(icon, msg, act, modo, reload,func);
	//oculta botões
	//document.getElementById("tfpbAtv"+nLin).style.display = "block"
	//document.getElementById("tfpbEdt"+nLin).style.display = "none"
	//document.getElementById("tfpbArq"+nLin).style.display = "none"
	//document.getElementById("tfpbExc"+nLin).style.display = "none"
	//document.getElementById("tfpbSlv"+nLin).style.display = "none"
	//document.getElementById("tfpbCan"+nLin).style.display = "none"
}
//botão arquivar configurações da linha 01
document.getElementById("tfpbArq1").addEventListener("click",(e)=>{
	e.preventDefault();
	arqLin(1)
})
//botão arquivar configurações da linha 02
document.getElementById("tfpbArq2").addEventListener("click",(e)=>{
	e.preventDefault();
	arqLin(2)
})
//botão arquivar configurações da linha 02
document.getElementById("tfpbArq3").addEventListener("click",(e)=>{
	e.preventDefault();
	arqLin(3)
})



//excluir configurações das linhas
function excLin(nLin, iDB){
	//Abrindo a transação com o banco de dados"
	var transaction = db.transaction('configTaref', "readwrite");
	var store = transaction.objectStore('configTaref');
	var request = store.get(iDB);

	//quando ocorrer um erro ao buscar o registro
	request.onerror = function (event) {
	    console.log('Ocorreu um erro ao buscar banco de dados da linha 0'+nLin);
	};
	
	//quando o registro for encontrado com sucesso
	request.onsuccess = function (event) {

		//preparar registros para gravar
		var configTaref = event.target.result;
		configTaref.nANV = "VAGO";
		configTaref.snANV = ""
		configTaref.snMGB = ""
		configTaref.snGTM1 = ""
		configTaref.snGTM2 = ""
		configTaref.inicio = ""
		configTaref.fim = ""
		configTaref.status = "inativo"
		configTaref.relatorio = ""

		//grava registros
	    	var requestUpdate = store.put(configTaref);
	    
	    	//quando o registro for atualizado com sucesso
	    	requestUpdate.onsuccess = function (event) {
			console.log('Linha 0'+nLin+ ' excluída com sucesso.') ;
			var icon = "img/imgOK.png"
			var msg = "Confirmado!"
			var act = "Linha 0"+nLin+ ' excluída com sucesso!'
			var modo = "conf"
			var reload = "true"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
	    	};
		//quando ocorrer erro ao atualizar o registro
		requestUpdate.onerror = function (event) {
			console.log('Ocorreu um erro ao excluir a linha 0'+nLin+ " " + event);
			var icon = "img/imgError.png"
			var msg = "Erro ao excluir a linha 0"+nLin
			var act = event
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
	    	};
	};
	//oculta botões
	document.getElementById("tfpbAtv"+nLin).style.display = "block"
	document.getElementById("tfpbEdt"+nLin).style.display = "none"
	document.getElementById("tfpbArq"+nLin).style.display = "none"
	document.getElementById("tfpbExc"+nLin).style.display = "none"
	document.getElementById("tfpbSlv"+nLin).style.display = "none"
	document.getElementById("tfpbCan"+nLin).style.display = "none"
	
	//excluir tarefas da linha
	var transaction1 = db.transaction("linha0"+nLin, "readwrite");
	var store1 = transaction1.objectStore("linha0"+nLin);
	var request1 = store1.openCursor();
	request1.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			cursor.delete()
			cursor.continue();
		}
	}
}
//botão excluir configurações da linha 01
document.getElementById("tfpbExc1").addEventListener("click",(e)=>{
	e.preventDefault();
	var icon = "img/imgInter.png"
	var msg = "Confirme para Excluir!"
	var act = "Deseja Excluir a linha 01? Todas as tarefas serão perdidas!"
	var modo = "yn"
	var reload = "false"
	var func = () => {excLin(1,2)}
	openMSG(icon, msg, act, modo, reload,func)
})
//botão excluir configurações da linha 02
document.getElementById("tfpbExc2").addEventListener("click",(e)=>{
	e.preventDefault();
	var icon = "img/imgInter.png"
	var msg = "Confirme para Excluir!"
	var act = "Deseja Excluir a linha 02? Todas as tarefas serão perdidas!"
	var modo = "yn"
	var reload = "false"
	var func = () => {excLin(2,3)}
	openMSG(icon, msg, act, modo, reload,func)
})
//botão excluir configurações da linha 03
document.getElementById("tfpbExc3").addEventListener("click",(e)=>{
	e.preventDefault();
	var icon = "img/imgInter.png"
	var msg = "Confirme para Excluir!"
	var act = "Deseja Excluir a linha 03? Todas as tarefas serão perdidas!"
	var modo = "yn"
	var reload = "false"
	var func = () => {excLin(3,4)}
	openMSG(icon, msg, act, modo, reload,func)
})



//salvar configurações das linhas
function salvLin(nLin, iDB){
	const L = [...document.getElementsByClassName("trfConf_L"+nLin)]
	if(L[0].value != "VAGO" && L[5].value != "" && L[6].value != ""){
		//Abrindo a transação com o banco de dados"
		var transaction = db.transaction('configTaref', "readwrite");
		var store = transaction.objectStore('configTaref');
		var request = store.get(iDB);

		//quando ocorrer um erro ao buscar o registro
		request.onerror = function (event) {
		    console.log('Ocorreu um erro ao buscar banco de dados da linha 0'+nLin);
		};
		
		//quando o registro for encontrado com sucesso
		request.onsuccess = function (event) {

			//preparar registros para gravar
			var configTaref = event.target.result;
			configTaref.nANV = L[0].value;
			configTaref.snANV = L[1].value;
			configTaref.snMGB = L[2].value;
			configTaref.snGTM1 = L[3].value;
			configTaref.snGTM2 = L[4].value;
			configTaref.inicio = L[5].value;
			configTaref.fim = L[6].value;
			configTaref.status = "ativo"

			//grava registros
		    	var requestUpdate = store.put(configTaref);
		    
		    	//quando o registro for atualizado com sucesso
		    	requestUpdate.onsuccess = function (event) {
				console.log('Configurações da linha 0'+nLin+ ' salvas com sucesso.') ;
				var icon = "img/imgOK.png"
				var msg = "Confirmado!"
				var act = "Configurações da linha 0"+nLin+ ' salvas com sucesso!'
				var modo = "conf"
				var reload = "true"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
		    	};
		    	//quando ocorrer erro ao atualizar o registro
		    	requestUpdate.onerror = function (event) {
				console.log('Ocorreu um erro ao salvar os configurações da linha 0'+nLin+ " " + event);
				var icon = "img/imgError.png"
				var msg = "Erro ao salvas configurações da linha 0"+nLin
				var act = event
				var modo = "conf"
				var reload = "false"
				var func = ""
				openMSG(icon, msg, act, modo, reload,func);
		    	};
		};

		//oculta botões
		document.getElementById("tfpbAtv"+nLin).style.display = "none"
		document.getElementById("tfpbEdt"+nLin).style.display = "block"
		document.getElementById("tfpbArq"+nLin).style.display = "block"
		document.getElementById("tfpbExc"+nLin).style.display = "block"
		document.getElementById("tfpbSlv"+nLin).style.display = "none"
		document.getElementById("tfpbCan"+nLin).style.display = "none"
	}else{
		var icon = "img/imgAlert.png"
		var msg = ""
		var act = "Preencha os campos obrigatórios!"
		var modo = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo, reload,func);
	}		
}
//botão salvar configurações da linha 01
document.getElementById("tfpbSlv1").addEventListener("click",(e)=>{
	e.preventDefault();
	salvLin(1, 2)
})
//botão salvar configurações da linha 02
document.getElementById("tfpbSlv2").addEventListener("click",(e)=>{
	e.preventDefault();
	salvLin(2, 3)
})
//botão salvar configurações da linha 03
document.getElementById("tfpbSlv3").addEventListener("click",(e)=>{
	e.preventDefault();
	salvLin(3, 4)
})



//cancelar editar configurações das linhas
//botão cancelar configurações da linha 01
document.getElementById("tfpbCan1").addEventListener("click",(e)=>{
	location.reload();
})
//botão cancelar configurações da linha 02
document.getElementById("tfpbCan2").addEventListener("click",(e)=>{
	location.reload();
})
//botão cancelar configurações da linha 03
document.getElementById("tfpbCan3").addEventListener("click",(e)=>{
	location.reload();
})
//--------------------------------------------------------------------











