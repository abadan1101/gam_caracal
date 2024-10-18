//------------------------CONFIGURAR CABEÇALHO DO FORMULÁRIO----------------------------------
//--------------------------------------------------------------------------------------------
async function configForm(){
	var bdCfg = await loadTBCfgLin(0)
	
	return new Promise((resolve)=>{	
		try{
			//caixa do controle 0
			if(bdCfg.chave00[1] == true){
				const trf_form_Ch00 = document.getElementById("trf_form_Ch00")
				document.getElementById("trf_form_Ch00Lb").innerHTML = bdCfg.chave00[0]
				trf_form_Ch00.innerHTML = ""
				for(i=2;i<12;i++){
					const x = document.createElement("option");
					var y = bdCfg.chave00[i]
					if(y != ""){
						x.innerHTML = bdCfg.chave00[i]
						trf_form_Ch00.appendChild(x);
					} 
				}
			}else{
				document.getElementById("trf_form_Ch00Dv").classList.add("ocultPainel")
			}

			//caixa do controle 1
			if(bdCfg.chave01[1] == true){
				const trf_form_Ch01 = document.getElementById("trf_form_Ch01")
				document.getElementById("trf_form_Ch01Lb").innerHTML = bdCfg.chave01[0]
				trf_form_Ch01.innerHTML = ""
				for(i=2;i<12;i++){
					const x = document.createElement("option");
					var y = bdCfg.chave01[i]
					if(y != ""){
						x.innerHTML = bdCfg.chave01[i]
						trf_form_Ch01.appendChild(x);
					} 
				}
			}else{
				document.getElementById("trf_form_Ch01Dv").classList.add("ocultPainel")
			}
			
			//caixa do controle 2
			if(bdCfg.chave02[1] == true){
				const trf_form_Ch02 = document.getElementById("trf_form_Ch02")
				document.getElementById("trf_form_Ch02Lb").innerHTML = bdCfg.chave02[0]
				trf_form_Ch02.innerHTML = "<option value='' selected>*selecione*</option>"
				for(i=2;i<12;i++){
					const x = document.createElement("option");
					var y = bdCfg.chave02[i]
					if(y != ""){
						x.innerHTML = bdCfg.chave02[i]
						trf_form_Ch02.appendChild(x);
					} 
				}
			}else{
				document.getElementById("trf_form_Ch02Dv").classList.add("ocultPainel")
			}	

			//caixa do controle 3
			if(bdCfg.chave03[1] == true){
				const trf_form_Ch03 = document.getElementById("trf_form_Ch03")
				document.getElementById("trf_form_Ch03Lb").innerHTML = bdCfg.chave03[0]
				trf_form_Ch03.innerHTML = "<option value='' selected>*selecione*</option>"
				for(i=2;i<12;i++){
					const x = document.createElement("option");
					var y = bdCfg.chave03[i]
					if(y != ""){
						x.innerHTML = bdCfg.chave03[i]
						trf_form_Ch03.appendChild(x);
					} 
				}
			}else{
				document.getElementById("trf_form_Ch03Dv").classList.add("ocultPainel")
			}	

			//caixa do controle 4
			if(bdCfg.chave04[1] == true){
				document.getElementById("trf_form_Ch04Lb").innerHTML = bdCfg.chave04[0]
			}else{
				document.getElementById("trf_form_Ch04Dv").classList.add("ocultPainel")
			}

			//caixa do controle 5
			if(bdCfg.chave05[1] == true){
				document.getElementById("trf_form_Ch05Lb").innerHTML = bdCfg.chave05[0]
			}else{
				document.getElementById("trf_form_Ch05Dv").classList.add("ocultPainel")
			}

			//caixa do controle "Baixar"
			if(!bdCfg.baixar[1] == true){
				document.getElementById("trf_form_bxrDv").classList.add("ocultPainel")
			}

			resolve()
		}catch (erro){
			var icon = "img/imgError.png"
			var msg = "Erro!"
			var act = erro
			var modo = "conf"
			var reload = "false"
			var func = ""
			openMSG(icon, msg, act, modo, reload,func);
			console.log("Erro ao carregar Cabeçalho do form das tarefas! "  + erro)	
		}
		
	})

}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//------------------------------LIMPAR FORMULÁRIO --------------------------------------------
//--------------------------------------------------------------------------------------------
function LimpTaref(){
	//cabeçalho
	document.getElementById('trf_form_num').value = "";
	document.getElementById('trf_form_Ch00').value = "Aberto"
	document.getElementById('trf_form_Ch01').value = "Indisponível"
	document.getElementById('trf_form_Ch02').value = "";
	document.getElementById('trf_form_Ch03').value = "";
	document.getElementById('trf_form_Ch04').value = "";
	document.getElementById('trf_form_Ch05').value = "";
	const bxr = document.getElementById('trf_form_bxr');
	bxr.value = $(bxr).val("selecione um cartão").select2();
	
	//caixas com textarea
	document.getElementById('trf_form_txa1').value = "";
	document.getElementById('trf_form_txa2').value = "";
	
	//caixa dos pedidos
	tfPlimp()

	//caixa das ferramentas
	const tff = document.getElementById('trf_form_Fer');
	tff.value = $(tff).val("selecione uma ferramenta").select2();	
	
	//caixa dos produtos
	const tfp = document.getElementById('trf_form_Prd');
	tfp.value = $(tfp).val("selecione um produto").select2();
	
	//caixa da equipe
	const tfe = document.getElementById('trf_form_EquMem');
	tfe.value = $(tfe).val("selecione um membro").select2();
	
	//limpar tabelas dos pedidos, ferramentas, produtos e equipe
	const tfProv = [...document.querySelectorAll(".tfProv")]
	tfProv.map((el)=>{
		el.remove();
	})
	
	//limpar percentual
	document.getElementById('trfForm_Percentual').style.display = "flex"
	document.getElementById('trfForm_vlPorcentagem').value = "";

	//limpar dados do rodapé
	const dadosRdp = [...document.getElementById("trf_form_inf").children]
	dadosRdp[0].children[1].innerHTML = "novo"
	dadosRdp[1].children[1].innerHTML = "..."
	dadosRdp[2].children[1].innerHTML = "0%"
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------



//----------------------------------ABRIR FORMULÁRIO------------------------------------------
//--------------------------------------------------------------------------------------------
//variavel que define se nova tarefa ou editar tarefa
var idTarefa = ""

//ABRIR NOVA TAREFA
function novaTarefa(){//funcção chamada na folha: /tarefas/js/menuSec.js & js/carregamento
	configForm().then(()=>{
		//variáveis
		const tf = document.getElementById("trf_form")
		const tt= document.getElementById("trf_tbl")
		const tc = document.getElementById("trf_conf")
		const tfd = document.getElementById("trf_form_dat");
		
		//configuração da data
		const data = new Date();
		const ano = data.getFullYear();
		const mes = (data.getMonth() +1).toString().padStart(2, "0");
		const dia = data.getDate().toString().padStart(2, "0");
		const dtHoje = tfd.value = ano + "-" + mes + "-" + dia;

		//limpar folrmulário
		LimpTaref();

		//configurar porcentagem do andamento
		trfFrm_autoPorcentagem()
		
		//mostrar formulário
		if(tfd.value == "" || tfd.value == "dd/mm/aaaa"){dtHoje}
		tt.style.display = "none";
		tc.style.display = "none";
		tf.style.display = "block";
		})

		//habilitar botão "salvar e novo"
		document.getElementById("trf_form_slN").style.display = ""

		//id para inserir nova tarefa
		idTarefa = "novo"

		//variavel andamento ativo
		trfFrm_andamentoAtv = "Aberto"
}

//ABRIR FORMULÁRIO PARA EDITAR TAREFA
function editarTarefa(tarefa){//funcção chamada na folha: /tarefas/js/tabela
	configForm().then(()=>{
		//limpar formulário
		LimpTaref();
		
		//carregar número
		document.getElementById('trf_form_num').value = tarefa.numero
		
		//configuração da data
		const tfd = document.getElementById("trf_form_dat");
		const data = new Date(tarefa.data);
		const ano = data.getFullYear();
		const mes = (data.getMonth() +1).toString().padStart(2, "0");
		const dia = data.getDate().toString().padStart(2, "0");
		const dtTarefa = tfd.value = ano + "-" + mes + "-" + dia;
		
		//baixar dados das caixas de seleção
		document.getElementById('trf_form_Ch00').value = tarefa.chave00;
		document.getElementById('trf_form_Ch01').value = tarefa.chave01;
		document.getElementById('trf_form_Ch02').value = tarefa.chave02;
		document.getElementById('trf_form_Ch03').value = tarefa.chave03;
		document.getElementById('trf_form_Ch04').value = tarefa.chave04;
		document.getElementById('trf_form_Ch05').value = tarefa.chave05;
		
		//configurar caixa de baixar cartão
		const bxr = document.getElementById('trf_form_bxr');
		bxr.value = $(bxr).val("selecione um cartão").select2();
		
		//caixas com textarea
		document.getElementById('trf_form_txa1').value = tarefa.tarefa;
		document.getElementById('trf_form_txa2').value = tarefa.serviço;

		//caixa dos pedidos
		const popularPedidos = tarefa.pedidos
		popularPedidos.map((e)=>{
			var pedidos = []
			pedidos.push(e.pim)
			pedidos.push(e.nome)
			pedidos.push(e.tipo)
			pedidos.push(e.quantidade)
			pedidos.push(e.PN)
			pedidos.push(e.PNA)
			pedidos.push(e.manual)
			pedidos.push(e.observacao)
			pedidos.push(e.status)
			trfFrm_adicionarPedidos(pedidos)
		})
		
		//caixa das ferramentas
		const popularFerramentas = tarefa.ferramentas
		popularFerramentas.map((e)=>{
			var ferramentas = []
			ferramentas.push(e.ferramenta)
			ferramentas.push(e.status)
			trfFrm_adicionarFerramentas(ferramentas)
		})

		//caixa dos produtos
		const popularProdutos = tarefa.produtos
		popularProdutos.map((e)=>{
			var produtos = []
			produtos.push(e.produto)
			produtos.push(e.status)
			trfFrm_adicionarProdutos(produtos)
		})

		//caixa da equipe
		const popularEquipe = tarefa.equipe
		popularEquipe.map((e)=>{
			var equipe = []
			equipe.push(e)
			trfFrm_adicionarEquipe(equipe)
		})

		//oculta colunas na tabela dos pedidos em telas pequenas
		OcultColm()//função pertence a folha "geral/js/inicializacao

		//configurar porcentagem do andamento
		trfFrm_autoPorcentagem()

		//dados do rodapé
		const dadosRdp = [...document.getElementById("trf_form_inf").children]
		dadosRdp[0].children[1].innerHTML = tarefa.id
		dadosRdp[1].children[1].innerHTML = new Date(tarefa.atualizacao).toLocaleDateString("pt-BR");
		dadosRdp[2].children[1].innerHTML = tarefa.porcentagem + "%"
		
		//mostrar formulário
		const tf = document.getElementById("trf_form")
		const tt= document.getElementById("trf_tbl")
		const tc = document.getElementById("trf_conf")
		tt.style.display = "none";
		tc.style.display = "none";
		tf.style.display = "block";

		//desabilitar botão "salvar e novo"
		document.getElementById("trf_form_slN").style.display = "none"

		//id para editar tarefa
		idTarefa = tarefa.id

		//variavel andamento ativo
		trfFrm_andamentoAtv = tarefa.chave00
	})
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//---------------------------------CAIXA DOS PEDIDOS -----------------------------------------
//--------------------------------------------------------------------------------------------
//limpar caixa de pedidos
function tfPlimp (){
	document.getElementById('trf_form_pedPim').value = "";
	document.getElementById('trf_form_pedNom').value = "";
	document.getElementById("trf_form_pedAvd").style.display = "none"
	document.getElementById("trf_form_pedCB").checked = false;
	document.getElementById('trf_form_pedTip').value = "sobressalente";
	document.getElementById('trf_form_pedQtd').value = "";
	document.getElementById('trf_form_pedPN').value = "";
	document.getElementById('trf_form_pedPNA').value = "";
	document.getElementById('trf_form_pedMan').value = "";
	document.getElementById('trf_form_pedObs').value = "";
	document.getElementById("tfdc3").style.display = "flex";
	document.getElementById('tfdca6').style.display = "none";
	
	const tfProv = [...document.querySelectorAll(".tfProv")]
	tfProv.map((el)=>{
		el.classList.remove("tftClin")

	})
	//oculta colunas na tabela dos pedidos em telas pequenas
	OcultColm()//função pertence a folha "geral/js/inicializacao
}

//abrir ou fechar pedidos avançados
const tfpCb = document.getElementById("trf_form_pedCB");
const tfpta = document.getElementById("trf_form_pedAvd");
tfpta.style.display = "none"
tfpCb.addEventListener('change', function () {
	if(tfpCb.checked == true){
		tfpta.style.display = "flex"
	}else{
		tfpta.style.display = "none"
	}
})

//adicionar na caixa de pedidos
const trf_form_pedAdd = document.getElementById("trf_form_pedAdd");
trf_form_pedAdd.addEventListener('click', function () {
	const pedPim = document.getElementById('trf_form_pedPim');
	const pedNom = document.getElementById('trf_form_pedNom');
	const pedTip = document.getElementById('trf_form_pedTip');
	const pedQtd = document.getElementById('trf_form_pedQtd');
	const pedPn = document.getElementById('trf_form_pedPN');
	const pedPna = document.getElementById('trf_form_pedPNA');
	const pedMan = document.getElementById('trf_form_pedMan');
	const pedObs = document.getElementById('trf_form_pedObs');
	if(pedPim.value == "" || pedNom.value == ""){
		pedNom.reportValidity()
		pedPim.reportValidity()
	}else{
		
		//criar array
		var arrayPedidos = []
		arrayPedidos.push(pedPim.value)
		arrayPedidos.push(pedNom.value)
		arrayPedidos.push(pedTip.value)
		arrayPedidos.push(pedQtd.value)
		arrayPedidos.push(pedPn.value)
		arrayPedidos.push(pedPna.value)
		arrayPedidos.push(pedMan.value)
		arrayPedidos.push(pedObs.value)
		arrayPedidos.push(true)

		//adicionar o pedido
		trfFrm_adicionarPedidos(arrayPedidos).then(()=>{
			//limpar formulário
			tfPlimp ()

			//mensagem
			const img = "img/imgOK.png"
			const tx = "pedido adicionado com sucesso!"
			tfp_msg(img, tx)
		})
	}
})
function trfFrm_adicionarPedidos(array){
	return new Promise((resolve)=>{

		//criar tabela
		const tb = document.getElementById("tftpB");
		var qtdLin = tb.rows.length;
		var linha = tb.insertRow(qtdLin);
		var pim = linha.insertCell(0);
		var nome = linha.insertCell(1);
		var tipo = linha.insertCell(2);
		var qtd = linha.insertCell(3);
		var pn = linha.insertCell(4);
		var pna = linha.insertCell(5);
		var man = linha.insertCell(6);
		var obs = linha.insertCell(7);
		var status = linha.insertCell(8);

		//popular tabela
		pim.innerHTML = array[0];
		nome.innerHTML = array[1];
		tipo.innerHTML = array[2];
		qtd.innerHTML = array[3];
		pn.innerHTML = array[4];
		pna.innerHTML = array[5];
		man.innerHTML = array[6];
		obs.innerHTML = array[7];

		//configurar checkbox
		const checkB = document.createElement("INPUT");
		checkB.type = "checkbox";
		checkB.setAttribute("checked","false")
		checkB.classList.add('tfChecked');
		checkB.checked = array[8];
		status.appendChild(checkB);

		//adicionar classes
		linha.classList.add('tfProv');
		tipo.classList.add('geralOcultTD')
		qtd.classList.add('tfpOcult');
		pn.classList.add('tfpOcult');
		pna.classList.add('tfpOcult');
		man.classList.add('tfpOcult');
		obs.classList.add('tfpOcult');
		status.classList.add('tftcenter');

		//alterar andamento da tarefa
		if(array[8] == true){
			document.getElementById("trf_form_Ch00").value = "Pendente"
			trfFrm_autoPorcentagem()
		}
		
		resolve()
	})
}

//editar ou excluir itens da tabela de pedidos
var tfpNlin = "";
const trf_form_tblPed = document.getElementById("tftpB");
trf_form_tblPed.addEventListener('click', function (e) {
	const r = e.target.parentElement
	if(r.rowIndex > 0){
		const tfProv = [...document.querySelectorAll(".tfProv")]
		tfProv.map((el)=>{
			el.classList.remove("tftClin")

		})
		r.classList.add("tftClin")

		document.getElementById("trf_form_pedAvd").style.display = "flex"
		document.getElementById("tfdc3").style.display = "none";
		document.getElementById('tfdca6').style.display = "flex";

		document.getElementById('trf_form_pedPim').value = r.children[0].innerHTML;
		document.getElementById('trf_form_pedNom').value = r.children[1].innerHTML;
		document.getElementById('trf_form_pedTip').value = r.children[2].innerHTML;
		document.getElementById('trf_form_pedQtd').value = r.children[3].innerHTML;
		document.getElementById('trf_form_pedPN').value = r.children[4].innerHTML;
		document.getElementById('trf_form_pedPNA').value = r.children[5].innerHTML;
		document.getElementById('trf_form_pedMan').value = r.children[6].innerHTML;
		document.getElementById('trf_form_pedObs').value = r.children[7].innerHTML;
		tfpNlin = r;
	}
})

//botão cancelar alteração nos itens da tabela de pedidos
const tfdca6Cn = document.getElementById("tfdca6Cn");
tfdca6Cn.addEventListener("click", ()=>{
	tfPlimp ()
})

//botão excluir itens da tabela de pedidos
const tfdca6Ex = document.getElementById("tfdca6Ex");
tfdca6Ex.addEventListener("click", ()=>{
	tfpNlin.remove()
	tfPlimp ()

	//alterar andamento da tarefa
	const verificarPendencias = trfFrm_verificarPendencias()
	if(verificarPendencias == true){
		document.getElementById("trf_form_Ch00").value = "Pendente"
		trfFrm_autoPorcentagem()
	}else{
		trfFrm_altAndamentoCB()
	}

	//mensagem
	const img = "img/imgExc.png"
	const tx = "pedido excluído com sucesso!"
	tfp_msg(img, tx)
})

//botão alterar itens da tabela de pedidos
const tfdca6Sv = document.getElementById("tfdca6Sv");
tfdca6Sv.addEventListener("click", ()=>{
	r = tfpNlin
	r.children[0].innerHTML = document.getElementById('trf_form_pedPim').value;
	r.children[1].innerHTML = document.getElementById('trf_form_pedNom').value;
	r.children[2].innerHTML = document.getElementById('trf_form_pedTip').value;
	r.children[3].innerHTML = document.getElementById('trf_form_pedQtd').value;
	r.children[4].innerHTML = document.getElementById('trf_form_pedPN').value;
	r.children[5].innerHTML = document.getElementById('trf_form_pedPNA').value;
	r.children[6].innerHTML = document.getElementById('trf_form_pedMan').value;
	r.children[7].innerHTML = document.getElementById('trf_form_pedObs').value;

	tfPlimp ()

	//mensagem
	const img = "img/imgOK.png"
	const tx = "alteração realizada com sucesso!"
	tfp_msg(img, tx)

})

//mensagens da caixa de pedidos
function tfp_msg(img, tx){
	const tftp = document.getElementById("trf_form_tblPed");
	const tftpMsg = document.getElementById("trf_form_tblPedMsg");
	const tfpmsgTx = document.getElementById("tfpmsgTx");
	const tfpmsg = document.getElementById('tfpmsg');
	tftp.classList.add('ocultPainel')
	tftpMsg.classList.remove('ocultPainel')
	tftpMsg.classList.add('trf_form_tblMsg')
	tfpmsg.src = img;
	tfpmsgTx.innerHTML = tx;
	function x(){
		tftp.classList.remove('ocultPainel')
		tftpMsg.classList.add('ocultPainel')
		tftpMsg.classList.remove('trf_form_tblMsg')
	}
	
	setTimeout(x, 3000)
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//-------------------------------CAIXA DAS FERRAMENTAS ---------------------------------------
//--------------------------------------------------------------------------------------------
//adicionar na caixa de ferramentas
$('.pesq_formFer').on('select2:select', function (e){
	const tipFer = document.getElementById('trf_form_Fer');
	if(tipFer.value != "selecione uma ferramenta"){
		const ferramenta = []
		ferramenta.push(tipFer.value)
		ferramenta.push(true)
		
		trfFrm_adicionarFerramentas(ferramenta).then(()=>{
			tipFer.value = $(tipFer).val("selecione uma ferramenta").select2();
			//mensagem
			const img = "img/imgOK.png"
			const tx = "ferramenta adicionada com sucesso!"
			tff_msg(img, tx)
		})
		
	}
})
function trfFrm_adicionarFerramentas(array){
	return new Promise((resolve)=>{

		//criar tabela
		const tb = document.getElementById("tftfB");
		var qtdLin = tb.rows.length;
		var linha = tb.insertRow(qtdLin);
		
		var fer = linha.insertCell(0);
		var chb = linha.insertCell(1);
		var btn = linha.insertCell(2);
		
		const checkB = document.createElement("INPUT");
		checkB.type = "checkbox";
		checkB.setAttribute("checked","false")
		checkB.classList.add('tfChecked');
		checkB.checked = array[1];
		chb.appendChild(checkB);
		
		const saveBtn = document.createElement("BUTTON");
		saveBtn.textContent = "excluir";
		btn.appendChild(saveBtn);
		
		//popular tabela
		fer.innerHTML = array[0];

		//adicionar classes
		linha.classList.add('tfProv');
		chb.classList.add('tftcenter');
		saveBtn.classList.add('tftbtn')

		//alterar andamento da tarefa
		if(array[1] == true){
			document.getElementById("trf_form_Ch00").value = "Pendente"
			trfFrm_autoPorcentagem()
		}

		resolve()
	})
}

//botão excluir itens da tabela de ferramentas
const tftf = document.getElementById('tftfB')
tftf.addEventListener('click', function (e) {
	const r = e.target.parentElement
	const v = r.parentElement
	if( e.target.classList.contains("tftbtn")){
		v.remove()

		//alterar andamento da tarefa
		const verificarPendencias = trfFrm_verificarPendencias()
		if(verificarPendencias == true){
			document.getElementById("trf_form_Ch00").value = "Pendente"
			trfFrm_autoPorcentagem()
		}else{
			trfFrm_altAndamentoCB()
		}

		//mensagem
		const img = "img/imgExc.png"
		const tx = "ferramenta excluída com sucesso!"
		tff_msg(img, tx)
	}
})

//mensagens da caixa de ferramentas
function tff_msg(img, tx){
	const tftf = document.getElementById("trf_form_tblFer");
	const tftfMsg = document.getElementById("trf_form_tblFerMsg");
	const tffmsgTx = document.getElementById("tffmsgTx");
	const tffmsg = document.getElementById('tffmsg');
	tftf.classList.add('ocultPainel')
	tftfMsg.classList.remove('ocultPainel')
	tftfMsg.classList.add('trf_form_tblMsg')
	tffmsg.src = img;
	tffmsgTx.innerHTML = tx;
	function x(){
		tftf.classList.remove('ocultPainel')
		tftfMsg.classList.add('ocultPainel')
		tftfMsg.classList.remove('trf_form_tblMsg')
	}
	
	setTimeout(x, 3000)
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//---------------------------------CAIXA DOS PRODUTOS ----------------------------------------
//--------------------------------------------------------------------------------------------
//adicionar na caixa dos produtos
$('.pesq_formProd').on('select2:select', function (e){
	const tipProd = document.getElementById('trf_form_Prd');
	if(tipProd.value != "selecione um produto"){
		const produtos = []
		produtos.push(tipProd.value)
		produtos.push(true)

		trfFrm_adicionarProdutos(produtos).then(()=>{
		tipProd.value = $(tipProd).val("selecione um produto").select2();
		//mensagem
		const img = "img/imgOK.png"
		const tx = "produto adicionado com sucesso!"
		tfpr_msg(img, tx)
		})
	}

})
function trfFrm_adicionarProdutos(array){
	return new Promise((resolve)=>{
		//criar tabela
		const tb = document.getElementById("tftprB");
		var qtdLin = tb.rows.length;
		var linha = tb.insertRow(qtdLin);
		
		var prod = linha.insertCell(0);
		var chb = linha.insertCell(1);
		var btn = linha.insertCell(2);

		const checkB = document.createElement("INPUT");
		checkB.type = "checkbox";
		checkB.setAttribute("checked","true")
		checkB.classList.add('tfChecked');
		checkB.checked = array[1];	
		chb.appendChild(checkB);	
			
		const saveBtn = document.createElement("BUTTON");
		saveBtn.textContent = "excluir";
		btn.appendChild(saveBtn);
		
		//popular tabela
		prod.innerHTML = array[0];
		
		
		//adicionar classes
		linha.classList.add('tfProv');
		chb.classList.add('tftcenter');
		saveBtn.classList.add('tftbtn')

		//alterar andamento da tarefa
		if(array[1] == true){
			document.getElementById("trf_form_Ch00").value = "Pendente"
			trfFrm_autoPorcentagem()
		}

		resolve()
	})
}

//botão excluir itens da tabela de produtos
const tftpr = document.getElementById('tftprB')
tftpr.addEventListener('click', function (e) {
	const r = e.target.parentElement
	const v = r.parentElement
	if( e.target.classList.contains("tftbtn")){
		v.remove()

		//alterar andamento da tarefa
		const verificarPendencias = trfFrm_verificarPendencias()
		if(verificarPendencias == true){
			document.getElementById("trf_form_Ch00").value = "Pendente"
			trfFrm_autoPorcentagem()
		}else{
			trfFrm_altAndamentoCB()
		}

		//mensagem
		const img = "img/imgExc.png"
		const tx = "produto excluído com sucesso!"
		tfpr_msg(img, tx)
	}
})

//mensagens da caixa de produtos
function tfpr_msg(img, tx){
	const tfprf = document.getElementById("trf_form_tblPrd");
	const tftprMsg = document.getElementById("trf_form_tblPrdMsg");
	const tfprmsgTx = document.getElementById("tfprmsgTx");
	const tfprmsg = document.getElementById('tfprmsg');
	tfprf.classList.add('ocultPainel')
	tftprMsg.classList.remove('ocultPainel')
	tftprMsg.classList.add('trf_form_tblMsg')
	tfprmsg.src = img;
	tfprmsgTx.innerHTML = tx;
	function x(){
		tfprf.classList.remove('ocultPainel')
		tftprMsg.classList.add('ocultPainel')
		tftprMsg.classList.remove('trf_form_tblMsg')
	}
	
	setTimeout(x, 3000)
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//---------------------------------CAIXA DA EQUIPE -------------------------------------------
//--------------------------------------------------------------------------------------------
//adicionar na caixa de equipe
$('.pesq_formEqu').on('select2:select', function (e){
	const tipEqp = document.getElementById('trf_form_EquMem');
	if(tipEqp.value != "selecione um membro"){
		const equipe = []
		equipe.push(tipEqp.value)

		trfFrm_adicionarEquipe(equipe).then(()=>{
			tipEqp.value = $(tipEqp).val("selecione um membro").select2();
			//mensagem
			const img = "img/imgOK.png"
			const tx = "membro adicionado com sucesso!"
			tfe_msg(img, tx)
		})
		
	}
})
function trfFrm_adicionarEquipe(array){
	return new Promise((resolve)=>{
		//criar tabela
		const tb = document.getElementById("tdteB");
		var qtdLin = tb.rows.length;
		var linha = tb.insertRow(qtdLin);
		var eqp = linha.insertCell(0);
		var btn = linha.insertCell(1);
		const saveBtn = document.createElement("BUTTON");
		saveBtn.textContent = "excluir";
		btn.appendChild(saveBtn);

		//popular tabela
		eqp.innerHTML = array[0];
		
		//adicionar classes
		linha.classList.add('tfProv');
		saveBtn.classList.add('tftbtn')

		resolve()
	})
}

//botão excluir itens da tabela de equipe
const tfte = document.getElementById('tdteB')
tfte.addEventListener('click', function (e) {
	const r = e.target.parentElement
	const v = r.parentElement
	if( e.target.classList.contains("tftbtn")){
		v.remove()

		//mensagem
		const img = "img/imgExc.png"
		const tx = "membro excluído com sucesso!"
		tfe_msg(img, tx)
	}
})

//mensagens da caixa de equipe
function tfe_msg(img, tx){
	const tfte = document.getElementById("trf_form_tblEqp");
	const tfteMsg = document.getElementById("trf_form_tblEqpMsg");
	const tfeqmsgTx = document.getElementById("tfeqmsgTx");
	const tfeqmsg = document.getElementById('tfeqmsg');
	tfte.classList.add('ocultPainel')
	tfteMsg.classList.remove('ocultPainel')
	tfteMsg.classList.add('trf_form_tblMsg')
	tfeqmsg.src = img;
	tfeqmsgTx.innerHTML = tx;
	function x(){
		tfte.classList.remove('ocultPainel')
		tfteMsg.classList.add('ocultPainel')
		tfteMsg.classList.remove('trf_form_tblMsg')
	}
	
	setTimeout(x, 3000)
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//----------------------------------FECHAR FORMULÁRIO ----------------------------------------
//--------------------------------------------------------------------------------------------
const tfc = document.getElementById("trf_form_cnc")
tfc.addEventListener("click",(evt)=>{
	document.getElementById("trf_conf").style.display = "none";
	document.getElementById("trf_tbl").style.display = "block";
	document.getElementById("trf_form").style.display = "none";
})
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------




//----------------------------------SALVAR FORMULÁRIO-----------------------------------------
//--------------------------------------------------------------------------------------------
const salvTaref = document.querySelectorAll('.trf_form_btn');
salvTaref.forEach(function(e){
	e.addEventListener('click', function(){
		const fb = e.id;
		if(fb != "trf_form_cnc" && trf_form_dat.value != "" && trf_form_num.value != "" && trf_form_txa1.value != "" && trfForm_vlPorcentagem.value != ""){
		
			//inserir tarefa no banco de dados
			
			//criação da classe pedido
			function pedido(pim, nome, tipo, quantidade, PN, PNA, manual, observacao, status) {
				this.pim = pim;
				this.nome = nome;
				this.tipo = tipo;
				this.quantidade = quantidade;
				this.PN = PN;
				this.PNA = PNA;
				this.manual = manual;
				this.observacao = observacao;
				this.status = status;
			}

			//popular pedidos no banco
			var pdd = []
			const tbPed = document.getElementById('trf_form_tblPed')
			const x = tbPed.rows
			const nRow = tbPed.rows.length;
			for(let contador = 1; contador < nRow; contador++) {
				var p1 = x[contador].cells[0].innerHTML
				var p2 = x[contador].cells[1].innerHTML
				var p3 = x[contador].cells[2].innerHTML
				var p4 = x[contador].cells[3].innerHTML
				var p5 = x[contador].cells[4].innerHTML
				var p6 = x[contador].cells[5].innerHTML
				var p7 = x[contador].cells[6].innerHTML
				var p8 = x[contador].cells[7].innerHTML
				var p9 = x[contador].cells[8].firstChild.checked
				var pedBd = new pedido(p1, p2, p3, p4, p5, p6, p7, p8, p9);
				pdd.push(pedBd)
			}

			//criação da classe ferramentas
			function ferramenta(ferramenta, status) {
				this.ferramenta = ferramenta;
				this.status = status;
			}

			//popular ferramentas no banco
			var fer = []
			const tbFer = document.getElementById('trf_form_tblFer')
			const f = tbFer.rows
			const fRow = tbFer.rows.length;
			for(let contador = 1; contador < fRow; contador++) {
				var f1 = f[contador].cells[0].innerHTML
				var f2 = f[contador].cells[1].firstChild.checked
				var ferBd = new ferramenta(f1, f2);
				fer.push(ferBd)
			}
				
			//criação da classe produtos
			function produto(produto, status) {
				this.produto = produto;
				this.status = status;
			}
			
			//popular produtos no banco
			var prd = []
			const tbPrd = document.getElementById('trf_form_tblPrd')
			const pr = tbPrd.rows
			const prRow = tbPrd.rows.length;
			for(let contador = 1; contador < prRow; contador++) {
				var pr1 = pr[contador].cells[0].innerHTML
				var pr2 = pr[contador].cells[1].firstChild.checked
				var prodBd = new produto(pr1, pr2);
				prd.push(prodBd)
			}
			
			//popular equipe no banco
			var eqp = []
			const tbEqp = document.getElementById('trf_form_tblEqp')
			const eq = tbEqp.rows
			const eqRow = tbEqp.rows.length;
			for(let contador = 1; contador < eqRow; contador++) {
				var eq1 = eq[contador].cells[0].innerHTML
				eqp.push(eq1)
			}
			
			//porcentagem
			var porcentagem = percentualVL = document.getElementById('trfForm_vlPorcentagem').value
			
			//transação na tabela do banco
			var tabela = []
			
			tabela.push({
				numero: document.getElementById('trf_form_num').value,
				data: new Date(document.getElementById('trf_form_dat').value).getTime() + 86400000,
				chave00: document.getElementById('trf_form_Ch00').value,
				chave01: document.getElementById('trf_form_Ch01').value,
				chave02: document.getElementById('trf_form_Ch02').value,
				chave03: document.getElementById('trf_form_Ch03').value,
				chave04: document.getElementById('trf_form_Ch04').value,
				chave05: document.getElementById('trf_form_Ch05').value,
				tarefa: document.getElementById('trf_form_txa1').value,
				serviço: document.getElementById('trf_form_txa2').value,
				pedidos: pdd,
				ferramentas: fer,
				produtos: prd,
				equipe: eqp,
				atualizacao: new Date().getTime(),
				porcentagem: porcentagem
			})
			//reabrir formulário em caso de reload
			if(fb == "trf_form_slN"){
				sessionStorage.setItem("index_frm",1)//abrir formulário no reload
			}else{
				sessionStorage.setItem("index_frm",0)
			}
			
			if(idTarefa == "novo"){
				//gravar nova tarefa no banco de dados
				addTarefasBd(tabela)//função pertence a folha: /tarefas/js/banco.js
			}else{
				//gravar alterações da tarefa no banco de dados
				(async ()=>{
					//grava as alterações
					await editarTarefasBD(idTarefa,tabela)//função pertence a folha: /tarefas/js/banco.js
					//verifica se foi alterado com sucesso
					const tarefaBD = []
					tarefaBD.push(await obterTarefas(idTarefa))
					if(tarefaBD[0].atualizacao == tabela[0].atualizacao){
						//modifica a linha editada na tabela
						//a variável "trfTbl_EditarLinha" pertence a folha: /tarefas/js/tabela.js
						
						//preencher coluna numero
						trfTbl_EditarLinha.children[1].innerHTML = tarefaBD[0].numero
						//preencher coluna data
						trfTbl_EditarLinha.children[2].innerHTML = new Date(tarefaBD[0].data).toLocaleDateString("pt-BR");
						//preencher coluna disponibilidade
						if(tarefaBD[0].chave01 == "Indisponível"){
							tarefaBD[0].chave01 = "I"
						}
						if(tarefaBD[0].chave01 == "Disponível"){
							tarefaBD[0].chave01 = "D"
						}
						if(tarefaBD[0].chave01 == "Restrito"){
							tarefaBD[0].chave01 = "R"
						}
						trfTbl_EditarLinha.children[3].innerHTML = tarefaBD[0].chave01;
						//preencher coluna andamento
						trfTbl_EditarLinha.children[4].firstChild.value = tarefaBD[0].chave00;
						//preencher coluna chave 01
						trfTbl_EditarLinha.children[5].firstChild.value = tarefaBD[0].chave02;
						//preencher coluna chave 02
						trfTbl_EditarLinha.children[6].firstChild.value = tarefaBD[0].chave03;
						//preencher coluna chave 03
						trfTbl_EditarLinha.children[7].innerHTML = tarefaBD[0].chave04;
						//preencher coluna chave 04
						trfTbl_EditarLinha.children[8].innerHTML = tarefaBD[0].chave05;
						//preencher coluna porcentagem
						trfTbl_EditarLinha.children[9].innerHTML = tarefaBD[0].porcentagem + "%";
						//preencher coluna tarefa
						trfTbl_EditarLinha.children[10].innerHTML = tarefaBD[0].tarefa;
						//preencher coluna serviço
						trfTbl_EditarLinha.children[11].firstChild.value = tarefaBD[0].serviço;
						trfTbl_EditarLinha.children[11].firstChild.style.height = trfTbl_EditarLinha.clientHeight + "px"
						//preencher coluna das pendencias			
						var t="";u="";v=""
						var vrfPdd = tarefaBD[0].pedidos;
						var vrfFer = tarefaBD[0].ferramentas;
						var vrfPrd = tarefaBD[0].produtos;
						vrfPdd.map((e)=>{if(e.status == true){t = "pedidos"}})
						vrfFer.map((e)=>{if(e.status == true){u = "ferramentas"}})
						vrfPrd.map((e)=>{if(e.status == true){v = "produtos"}})
						trfTbl_EditarLinha.children[12].innerHTML = t + " " + u + " " + v
						//preencher equipe
						var membros = tarefaBD[0].equipe
						trfTbl_EditarLinha.children[13].innerHTML = ""
						membros.map((e)=>{trfTbl_EditarLinha.children[13].innerHTML = trfTbl_EditarLinha.children[13].innerHTML + " " + e});
						//preencher data de atualização
						if(tarefaBD[0].atualizacao != ""){
							trfTbl_EditarLinha.children[14].innerHTML = new Date(tarefaBD[0].atualizacao).toLocaleDateString("pt-BR");
						}

						//adicionar cor da linha
						trfTbl_CorLinha(trfTbl_EditarLinha.children[4].firstChild, trfTbl_EditarLinha)

						//reiniciar a variável que define qual linha será editada na tabela
						trfTbl_EditarLinha = "" //variável pertence a folha: /tarefas/js/tabela.js
						
						//configura sub-painel ativo
						document.getElementById("trf_conf").style.display = "none";
						document.getElementById("trf_tbl").style.display = "block";
						document.getElementById("trf_form").style.display = "none";

						//mensagem de corfirmado
						var icon = "img/imgOK.png"
						var msg = "Confirmação " + dbLinha + "!"
						var act = "Tarefa alterada com sucesso!"
						var modo = "conf"
						var reload = "false"
						var func = ""
						openMSG(icon, msg, act, modo, reload,func);
					}else{
						//mensagem de erro na alteração
						var icon = "img/imgAlert.png"
						var msg = "Erro!"
						var act = ""
						var modo = "conf"
						var reload = "false"
						var func = ""
						openMSG(icon, msg, act, modo, reload,func);
						console.log("Erro ao alterar tarefa na " + dbLinha);
					}
				})()
			}
			
		}else{
			if(fb != "trf_form_cnc"){
				if(trf_form_dat.value == "" || trf_form_num.value == "" || trf_form_txa1.value == ""){
					//mensagem de rejeitado
					var icon = "img/imgAlert.png"
					var msg = "formulário incompleto!"
					var act = "Preencha os campos Obrigatórios"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					document.getElementById("trfForm_vlPorcentagem").reportValidity()
				}
			}
		}
    })
});
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------




//-------------------------------CAIXA DE ATUALIZAÇÃO DO PERCENTUAL--------------------------------------
//-------------------------------------------------------------------------------------------------------
//ativar ou desativar caixa de atualização do percentual------------------
const tf = document.getElementById("trf_form_Ch00")
tf.addEventListener('change', function () {
	trfFrm_autoPorcentagem()
})
function trfFrm_autoPorcentagem(){
	const porcentagem = document.getElementById("trfForm_vlPorcentagem")
	if(tf.value == "Fechado" || tf.value == "Ag. Virada" || tf.value == "Ag. Abrir" || tf.value == "Aberto"){
		porcentagem.disabled = "true"
		if(tf.value == "Fechado" || tf.value == "Ag. Virada"){porcentagem.value = "100"}
		if(tf.value == "Ag. Abrir" || tf.value == "Aberto"){porcentagem.value = "0"}
	}else{
		porcentagem.disabled = ""
		porcentagem.value = ""
	}

}
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------




//-------------------------------CONFIGURAÇÕES ANDAMENTO AUTOMÁTICO--------------------------------------
//-------------------------------------------------------------------------------------------------------
//variáveis
const trfFrm_selectAndamento = document.getElementById("trf_form_Ch00")
var trfFrm_andamentoAtv = ""

//rotinas ao alterar o select andamento manualmente
trfFrm_selectAndamento.addEventListener("change",()=>{
	trfFrm_andamentoAtv = trfFrm_selectAndamento.value
})

//procurar pendências
function trfFrm_verificarPendencias(){
	var pendenciasAtivas = false
	const tbPed = document.getElementById('trf_form_tblPed').rows
	for(let contador = 1; contador < tbPed.length; contador++) {
		var p1 = tbPed[contador].cells[8].firstChild	
		if(p1.checked == true){pendenciasAtivas = true}
	}
	const tbFer = document.getElementById('trf_form_tblFer').rows
	for(let contador = 1; contador < tbFer.length; contador++) {
		var p1 = tbFer[contador].cells[1].firstChild	
		if(p1.checked == true){pendenciasAtivas = true}
	}
	const tbPrd = document.getElementById('trf_form_tblPrd').rows
	for(let contador = 1; contador < tbPrd.length; contador++) {
		var p1 = tbPrd[contador].cells[1].firstChild	
		if(p1.checked == true){pendenciasAtivas = true}
	}
	return(pendenciasAtivas)
}

//alterar andamento da tarefa ao mudar checkbox dos pedidos, ferramentas ou produtos
const trfFrm_tabelaPedidos = [...document.getElementsByClassName('trf_form_tbl')]
trfFrm_tabelaPedidos.map((e)=>{
	e.addEventListener('click', function (e) {
		const r = e.target.parentElement
		const x = r.firstChild
		if(x.classList.contains("tfChecked")){
			if(x.checked == true){
				trfFrm_selectAndamento.value = "Pendente"
				trfFrm_autoPorcentagem()
			}else{
				trfFrm_altAndamentoCB()
			}
		}
	})
})
function trfFrm_altAndamentoCB(){
	const pendente = trfFrm_verificarPendencias()
		if(pendente == false){
			if(trfFrm_andamentoAtv == "Pendente"){
				if(document.getElementById("trf_form_txa2").value == ""){
					trfFrm_selectAndamento.value = "Aberto"
				}else{
					trfFrm_selectAndamento.value = "Em Exec."
				}
			}else{
				if(document.getElementById("trf_form_txa2").value == ""){
					if(trfFrm_andamentoAtv != "Ag. Abrir"){
						trfFrm_selectAndamento.value = "Aberto"
					}else{
						trfFrm_selectAndamento.value = "Ag. Abrir"
					}
				}else{
					if(trfFrm_andamentoAtv == "Aberto"){
						trfFrm_selectAndamento.value = "Em Exec."
					}else{
						trfFrm_selectAndamento.value = trfFrm_andamentoAtv
					}
				}
			}
		}
	trfFrm_autoPorcentagem()
}

//alterar andamento da tarefa ao mudar o serviço executado
var servico = document.getElementById("trf_form_txa2")
servico.addEventListener("focusout",()=>{
	const pendente = trfFrm_verificarPendencias()
	if(pendente != true){
		if(servico.value == ""){
			if(trfFrm_andamentoAtv != "Ag. Abrir"){
				trfFrm_selectAndamento.value = "Aberto"
			}else{
				trfFrm_selectAndamento.value = "Ag. Abrir"
			}
		}else{
			if(trfFrm_andamentoAtv == "Aberto"){
				trfFrm_selectAndamento.value = "Em Exec."
			}else{
				if(trfFrm_andamentoAtv == "Pendente"){
					trfFrm_selectAndamento.value = "Em Exec."
				}else{
					trfFrm_selectAndamento.value = trfFrm_andamentoAtv
				}
				
			}
		}
		trfFrm_autoPorcentagem()
	}
})

//configurar lista de opções do select andamento
trfFrm_selectAndamento.addEventListener("focus",()=>{
	const opcoes = [...trfFrm_selectAndamento.children]
	//caso alguma pendência
	const pendente = trfFrm_verificarPendencias()
	if(pendente == true){
		for(i=0;i<opcoes.length;i++){
			opcoes[i].disabled = true
			opcoes[i].style.color = "#ddd"
		}
	}else{
		//caso caixa de serviço vazia
		const Servico = document.getElementById("trf_form_txa2")
		if(Servico.value == ""){
			for(i=0;i<opcoes.length;i++){
				opcoes[i].disabled = true
				opcoes[i].style.color = "#ddd"
				opcoes[0].disabled = false
				opcoes[0].style.color = "#000"
				opcoes[4].disabled = false
				opcoes[4].style.color = "#000"
			}
		}else{
			for(i=0;i<opcoes.length;i++){
				opcoes[i].disabled = false
				opcoes[i].style.color = "#000"
				opcoes[0].disabled = true
				opcoes[0].style.color = "#ddd"
				opcoes[2].disabled = true
				opcoes[2].style.color = "#ddd"
			}
		}
	}	
})
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------