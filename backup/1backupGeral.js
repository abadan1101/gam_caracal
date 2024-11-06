
async function retardar(){
	let nomeArquivo = 'backupLinha01';
	
	//preenche a tabela principal
	var bdTabela = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
	var myJsonString = JSON.stringify(bdTabela);

	//let blob = new Blob( ["const bkLinha01 = " + myJsonString] , {type: "text/plain;charset=utf-8"} );
	//saveAs(blob,nomeArquivo+".js");

	console.log(bkLinha01)

}retardar()
