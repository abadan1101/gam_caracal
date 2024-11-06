

//-------------------------------ROTINAS PARA REALIZAÇÃO DO BACKUP DO BANCO DE DADOS--------------------------
//------------------------------------------------------------------------------------------------------------

document.getElementById("backupGeral").addEventListener("click",()=>{
	async function backup(){
		try{
			//backup linha 01--------------------------------------------
			dbLinha = "linha01"
			
			let nomeArquivo = 'backupLinha01';
			
			//preenche a tabela principal
			var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
			var textoJSON = JSON.stringify(bdTabela);

			let blob = new Blob( ["const bkLinha01 = " + textoJSON] , {type: "text/plain;charset=utf-8"} );
			saveAs(blob,nomeArquivo+".js");
			//----------------------------------------------------------
			
			
			//backup linha 02-------------------------------------------
			dbLinha = "linha02"
			
			let nomeArquivo2 = 'backupLinha02';
			
			//preenche a tabela principal
			var bdTabela2 = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
			var textoJSON2 = JSON.stringify(bdTabela2);

			let blob2 = new Blob( ["const bkLinha02 = " + textoJSON2] , {type: "text/plain;charset=utf-8"} );
			saveAs(blob2,nomeArquivo2+".js");
			//----------------------------------------------------------
			
			
			//backup linha 03--------------------------------------------
			dbLinha = "linha03"
			
			let nomeArquivo3 = 'backupLinha03';
			
			//preenche a tabela principal
			var bdTabela3 = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
			var textoJSON3 = JSON.stringify(bdTabela3);

			let blob3 = new Blob( ["const bkLinha03 = " + textoJSON3] , {type: "text/plain;charset=utf-8"} );
			saveAs(blob3,nomeArquivo3+".js");
			//----------------------------------------------------------
			
			
			//backup configurações das tarefas--------------------------
			
			dbLinha = "configTaref"
			
			let nomeArquivo4 = 'backupLinhaConfig';
			
			//preenche a tabela principal
			var bdTabela4 = await loadTBCfgGeral()//pertence a folha: /tarefas/js/banco.js
			var textoJSON4 = JSON.stringify(bdTabela4);

			let blob4 = new Blob( ["const bkLinhaConf = " + textoJSON4] , {type: "text/plain;charset=utf-8"} );
			saveAs(blob4,nomeArquivo4+".js");
			//----------------------------------------------------------
			
			
			//mensagem de corfirmado
			var icon = "img/imgOK.png"
			var msg = "Backup!"
			var act = "Backup realizado com sucesso!"
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			
		}catch (erro){
			//mensagem em caso de erro
			var icon = "img/imgError.png"
			var msg = "Erro do backup!"
			var act = erro
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao realizar backup! " + erro)
		}
	
	}backup()

})
//------------------------------------------------------------------------------------------------------------




//--------------------------------------ROTINAS PARA RESTAURAR O BANCO DE DADOS-------------------------------
//------------------------------------------------------------------------------------------------------------
document.getElementById("restaurarBakup").addEventListener("click",()=>{
	console.log(bkLinha01)
	console.log(bkLinha02)
	console.log(bkLinha03)
	console.log(bkLinhaConf)
	
	//restaurar linha 01
	dbLinha = "linha01"
	//addTarefasBd(bkLinha01, "true")
	
	//restaurar linha 02
	dbLinha = "linha02"
	//addTarefasBd(bkLinha02, "true")
	
	//restaurar linha 03
	dbLinha = "linha03"
	//addTarefasBd(bkLinha03, "true")
	
	//restaurar configuração das linhas
	dbLinha = "configTaref"
})
//------------------------------------------------------------------------------------------------------------















