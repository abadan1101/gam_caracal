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
	
	//preencher select (baixar cartões de trabalho)
	const bxr = document.getElementById('trf_form_bxr');
	bxr.innerHTML = ""
	const optLimp = document.createElement("option")
	optLimp.innerHTML = "selecione um cartão"
	bxr.append(optLimp);
	
	(async function cartoes(){
			
		//baixar cartões salvos
		const cartoes = await loadCartaoGeral()
		cartoes.map((e)=>{
			const opt = document.createElement("option")
			opt.innerHTML = e.nome
			bxr.append(opt)
		
		})
	bxr.value = $(bxr).val("selecione um cartão").select2();
	})();
	
	
	//caixas com textarea
	document.getElementById('trf_form_txa1').value = "";
	document.getElementById('trf_form_txa2').value = "";
	
	//caixa dos pedidos
	tfPlimp()

	//preencher select (ferramentas)
	const tff = document.getElementById('trf_form_Fer');
	tff.innerHTML = ""
	const optLimpFer = document.createElement("option")
	optLimpFer.innerHTML = "selecione uma ferramenta"
	tff.append(optLimpFer);
	
	(async function ferramentas(){
		//baixar ferramentas salvas salvos
		const ferramentas = await loadFerramentasGeral()
		ferramentas.map((e)=>{
			const opt1 = document.createElement("option")
			opt1.innerHTML = e.ferramenta
			tff.append(opt1)
		
		})
		tff.value = $(tff).val("selecione uma ferramenta").select2();
	})();
	
	//preencher select (produtos)
	const tfp = document.getElementById('trf_form_Prd');
	tfp.innerHTML = ""
	const optLimpProd = document.createElement("option")
	optLimpProd.innerHTML = "selecione um produto"
	tfp.append(optLimpProd);
	
	(async function produtos(){
		//baixar produtos salvos
		const produtos = await loadProdutosGeral()
		produtos.map((e)=>{
			const opt1 = document.createElement("option")
			opt1.innerHTML = e.produto
			tfp.append(opt1)
		
		})
		tfp.value = $(tfp).val("selecione um produto").select2();
	})();
	
	//preencher select (equipe)
	const tfe = document.getElementById('trf_form_EquMem');
	tfe.innerHTML = ""
	const optLimpEqp = document.createElement("option")
	optLimpEqp.innerHTML = "selecione um membro"
	tfe.append(optLimpEqp);
	
	(async function equipe(){
		//baixar produtos salvos
		const equipe = await loadEquipeGeral()
		equipe.map((e)=>{
			const opt1 = document.createElement("option")
			opt1.innerHTML = e.membro
			tfe.append(opt1)
		
		})
		tfe.value = $(tfe).val("selecione um membro").select2();
	})();
	
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

//ABRIR NOVA TAREFA
function novaTarefa(){//funcção chamada na folha: /tarefas/js/menuSec.js & js/carregamento
	configForm().then(()=>{
		//variáveis
		const tf = document.getElementById("trf_form")
		const tt= document.getElementById("trf_tbl")
		const tc = document.getElementById("trf_conf")
		const tfd = document.getElementById("trf_form_dat");
		const tft = document.getElementById("trf_form_tit");

		//nomear formulário para "Adicionar nova tarefa"
		tft.innerHTML = "Adicionar nova tarefa"
		
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

		//variavel andamento ativo
		trfFrm_andamentoAtv = "Aberto"
}

//ABRIR FORMULÁRIO PARA EDITAR TAREFA
function editarTarefa(tarefa){//funcção chamada na folha: /tarefas/js/tabela
	configForm().then(()=>{

		//nomear formulário para "Editar tarefa"
		const tft = document.getElementById("trf_form_tit");
		tft.innerHTML = "Editar tarefa"

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
			class pedido {
				constructor(pim, nome, tipo, quantidade, PN, PNA, manual, observacao, status) {
					this.pim = pim
					this.nome = nome
					this.tipo = tipo
					this.quantidade = quantidade
					this.PN = PN
					this.PNA = PNA
					this.manual = manual
					this.observacao = observacao
					this.status = status
				}
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
			class ferramenta {
				constructor(ferramenta, status) {
					this.ferramenta = ferramenta
					this.status = status
				}
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
			class produto {
				constructor(produto, status) {
					this.produto = produto
					this.status = status
				}
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
			var porcentagem  = document.getElementById('trfForm_vlPorcentagem').value
			
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
			
			//verificar se "nova tarefa" ou "editar tarefa"
			if(idTarefa == "novo"){//variável pertence a folha: /tarefas/js/tabela.js
				//gravar nova tarefa no banco de dados
				addTarefasBd(tabela, "false");//função pertence a folha: /tarefas/js/banco.js
				(async ()=>{
					var tarefa = []
					var tabelaBD = await loadTBLin()//pertence a folha: /tarefas/js/banco.js
					var indice = tabelaBD.length
					var x = tabelaBD[indice -1]
					tarefa.push(await obterTarefas(x.id))
					if(tabela[0].atualizacao == tarefa[0].atualizacao){
						//configura sub-painel ativo
						if(fb != "trf_form_slN"){
							document.getElementById("trf_conf").style.display = "none";
							document.getElementById("trf_tbl").style.display = "block";
							document.getElementById("trf_form").style.display = "none";
						}else{
							//limpar formulário
							novaTarefa()
							document.getElementById("trf_form_num").focus()
						}
						//adicionar nova tarefa na tabela
						if(tblPrincipal == "estatica"){
							await TrfTbl_LoadStatic(tarefa)
						}else{
							await TrfTbl_Load(tarefa)
						}
						
					}else{
						//mensagem de rejeitado
						var icon = "img/imgAlert.png"
						var msg = "Erro!"
						var act = "erro ao salvar nova tarefa"
						var modo = "conf"
						var reload = "false"
						var func = ""
						openMSG(icon, msg, act, modo, reload,func);
					}
				})()

			}else{
				//gravar alterações da tarefa no banco de dados
				editarTarefasBD(idTarefa,tabela).then(()=>{
					trfTbl_alterarTarefa(tabela)//função pertence a folha: /tarefas/js/tabela.js
				})
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
//caixa de texto de atualização do percentual
document.getElementById("trfForm_vlPorcentagem").addEventListener("input", (e)=>{
	if(e.target.value.substring(0,1) == 0){
		e.target.value = ""
	}
	if(e.target.value.length == 2){
		document.getElementById('trf_form_slv').focus()
	}
})
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
	var pendenciasAtivas = false;
	const tbPed = document.getElementById('trf_form_tblPed').rows;
	for(let contador = 1; contador < tbPed.length; contador++) {
		var p1 = tbPed[contador].cells[8].firstChild	
		if(p1.checked == true){pendenciasAtivas = true}
	}
	const tbFer = document.getElementById('trf_form_tblFer').rows;
	for(let contador = 1; contador < tbFer.length; contador++) {
		var p1 = tbFer[contador].cells[1].firstChild	
		if(p1.checked == true){pendenciasAtivas = true}
	}
	const tbPrd = document.getElementById('trf_form_tblPrd').rows;
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
async function trfFrm_altAndamentoCB(){
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
		var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js
		for(i = 0; i < bdCfg.chave00.length; i++){
			if(i != 2 && i != 4 && bdCfg.chave00[i] != "" && document.getElementById("trf_form_txa2").value.includes(bdCfg.chave00[i] + "**")){
				trfFrm_selectAndamento.value = bdCfg.chave00[i]
			}
		}
	trfFrm_autoPorcentagem()
}

//alterar andamento da tarefa ao mudar o serviço executado
var servico = document.getElementById("trf_form_txa2")
servico.addEventListener("focusout",()=>{
	(async function alterarServico(){
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
			var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js
			for(i = 0; i < bdCfg.chave00.length; i++){
				if(i != 2 && i != 4 && bdCfg.chave00[i] != "" && servico.value.includes(bdCfg.chave00[i] + "**")){
					trfFrm_selectAndamento.value = bdCfg.chave00[i]
				}
			}
			trfFrm_autoPorcentagem()
		}
	})()
})

//configurar lista de opções do select andamento
trfFrm_selectAndamento.addEventListener("focus",()=>{
	(async function andamentoAuto(){
		const opcoes = [...trfFrm_selectAndamento.children]

		//verificar uso de andamento automático no textarea
		const vlTXA = document.getElementById("trf_form_txa2").value;
		var usoTXA = false
		var bdCfg = await loadTBCfgLin(0)//pertence a folha: /tarefas/js/banco.js
		for(i = 0; i < bdCfg.chave00.length; i++){
			if(i != 2 && i != 4 && bdCfg.chave00[i] != "" && vlTXA.includes(bdCfg.chave00[i] + "**")){
				usoTXA = true
			}
		}

		//caso alguma pendência
		const pendente = trfFrm_verificarPendencias()
		if(pendente == true || usoTXA == true){
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
	})()
})
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------





//--------------------------------------------BAIXAR CARTÕES---------------------------------------------
//-------------------------------------------------------------------------------------------------------
//inserir cartão no banco de dados
function addCartao(modo, id){	
	//criação da classe pedido
	class pedido {
		constructor(pim, nome, tipo, quantidade, PN, PNA, manual, observacao, status) {
			this.pim = pim
			this.nome = nome
			this.tipo = tipo
			this.quantidade = quantidade
			this.PN = PN
			this.PNA = PNA
			this.manual = manual
			this.observacao = observacao
			this.status = status
		}
	}

	//popular pedidos no banco
	var pdd = []
	const tbPed = document.getElementById('trf_form_tblPed')
	const x = tbPed.rows
	const nRow = tbPed.rows.length;
	for(let contador = 1; contador < nRow; contador++) {
		var p1 = "00000"
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
	class ferramenta {
		constructor(ferramenta, status) {
			this.ferramenta = ferramenta
			this.status = status
		}
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
	class produto {
		constructor(produto, status) {
			this.produto = produto
			this.status = status
		}
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
	
	//transação na tabela do banco
	var tabela = []
	
	tabela.push({
		nome: document.getElementById('ctrlPnlInput').value,
		serviço: document.getElementById('trf_form_txa2').value,
		pedidos: pdd,
		ferramentas: fer,
		produtos: prd,
	})
	
	if(modo == "inserir"){addCartaoBd(tabela)};
	if(modo == "alterar"){
		AltCartoesBd(id, tabela)

		//remover caixa de mensagem
		document.getElementById("PnlmsgAlert1").remove();
					
		//mensagem de corfirmado
		var icon = "img/imgOK.png"
		var msg = "Confirmação"
		var act = "cartão salvo com sucesso!"
		var modo1 = "conf"
		var reload = "false"
		var func = ""
		openMSG(icon, msg, act, modo1, reload,func);
	};	
		
}

//botão salvar novo cartão
document.getElementById("trf_form_slvIcn").addEventListener("click",()=>{
	//mensagem
	var icon = "img/imgAlert.png"
	var msg = "Atenção!"
	var act = "Para continuar, digite a senha!"
	var modo = "yn"
	var reload = ""
	var func = () => {salvarCartao()}
	var senha = true
	openMSG(icon, msg, act, modo, reload,func,senha);
	
	function salvarCartao(){
		const body = document.body
		const caixa = document.createElement("div")
		caixa.setAttribute("id","PnlmsgAlert1")
		body.append(caixa)

		const caixafull = 
			"<div id='ctrlPnl1'>"+
				"<div class='ctrlPnl1'><img src='img/imgInter.png' alt='Logo' id='iconAlert1'></div>"+
				"<div class='ctrlPnl1'><h4 id='msgAlertText1'>deseja salvar esta tarefa como padrão?</h4></div>"+
				"<div class='ctrlPnl1'><p id='msgAlertAct1'>Insira o nome identificador</p></div>"+
				"<div class='ctrlPnl1' id='cartaoAddDv'>"+
					"<input type='text' class='ctrlPnlInput' id='ctrlPnlInput' maxLength='30' required>"+
				"</div>"+
				"<div class='ctrlPnlBtn1'>"+
					"<button class='trfForm_addEspSlv' id='ctrlPnlBtnSlv'>salvar</button>"+
					"<button class='trfForm_addEspCnc' id='ctrlPnlBtnCnc'>cancelar</button>"+
				"</div>"+
			"</div>"

		caixa.innerHTML += caixafull
		
		//carregar input com valor atual do select 
		var vlSlct = document.getElementById("trf_form_bxr").value
		if(vlSlct == "selecione um cartão"){vlSlct = ""}
		document.getElementById("ctrlPnlInput").value = vlSlct
		
		//botão cancelar
		document.getElementById("ctrlPnlBtnCnc").addEventListener('click', function () {
			document.getElementById("PnlmsgAlert1").remove();
		})
		
		//botão salvar
		document.getElementById("ctrlPnlBtnSlv").addEventListener('click', function () {
			if(document.getElementById("ctrlPnlInput").value == ""){
				document.getElementById("ctrlPnlInput").reportValidity()
			}else{
				(async function cartoes(){
				
					//baixar cartões salvos
					const cartoes = await loadCartaoGeral()
					
					//procurar cartão igual
					var vrfIgual = false
					var idIgual = ""
					cartoes.map((e)=>{
						if(document.getElementById("ctrlPnlInput").value == e.nome){
							vrfIgual = true
							idIgual = e.id
						}
					})
					
					//salvar novo cartão
					if(vrfIgual == false){
						addCartao("inserir", "")
						const bxr = document.getElementById("trf_form_bxr")
						const opt = document.createElement("option")
						opt.innerHTML = document.getElementById("ctrlPnlInput").value
						bxr.append(opt)

						//remover caixa de mensagem
						document.getElementById("PnlmsgAlert1").remove();
						
						//mensagem de corfirmado
						var icon = "img/imgOK.png"
						var msg = "Confirmação"
						var act = "cartão salvo com sucesso!"
						var modo = "conf"
						var reload = "false"
						var func = ""
						openMSG(icon, msg, act, modo, reload,func);
					}else{
						//mensagem
						var icon = "img/imgAlert.png"
						var msg = "Atenção, cartão já existente!"
						var act = "Deseja sobrescrever?"
						var modo = "yn"
						var reload = ""
						var func = () => {addCartao("alterar", idIgual)}
						openMSG(icon, msg, act, modo, reload,func);
						
					}
					
					
					
				})()
			}
		})
	}
	
})

//botão baixar novo cartão
document.getElementById("trf_form_bxrIcn").addEventListener("click",()=>{
	
	const slctBxrCrd = document.getElementById("trf_form_bxr")
	if(slctBxrCrd.value != "" || slctBxrCrd.value == "selecione um cartão"){
		//mensagem
		var icon = "img/imgAlert.png"
		var msg = "Atenção!"
		var act = "Para continuar, digite a senha!"
		var modo = "yn"
		var reload = ""
		var func = () => {baixarCartao()}
		var senha = true
		openMSG(icon, msg, act, modo, reload,func,senha);

	}else{
		slctBxrCrd.reportValidity()
	}
	
	function baixarCartao(){
		
		(async function cartoes(){
					
			//baixar cartões salvos
			const tabela = await loadCartaoGeral();

			//procurar cartão igual
			tabela.map((e)=>{
				if(slctBxrCrd.value == e.nome){
					
					//caixas com textarea
					document.getElementById('trf_form_txa2').value = "***" + e.serviço + "***\n" + document.getElementById('trf_form_txa2').value;

					//caixa dos pedidos
					const popularPedidos = e.pedidos
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
					const popularFerramentas = e.ferramentas
					popularFerramentas.map((e)=>{
						var ferramentas = []
						ferramentas.push(e.ferramenta)
						ferramentas.push(e.status)
						trfFrm_adicionarFerramentas(ferramentas)
					})

					//caixa dos produtos
					const popularProdutos = e.produtos
					popularProdutos.map((e)=>{
						var produtos = []
						produtos.push(e.produto)
						produtos.push(e.status)
						trfFrm_adicionarProdutos(produtos)
					})

					//oculta colunas na tabela dos pedidos em telas pequenas
					OcultColm()//função pertence a folha "geral/js/inicializacao
					
					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "cartão baixado com sucesso!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}
			})
		})();
	}
})

//botão excluir cartão
document.getElementById("trf_form_deleteIcn").addEventListener("click",()=>{

	const slctBxrCrd = document.getElementById("trf_form_bxr")
	if(slctBxrCrd.value != "" || slctBxrCrd.value == "selecione um cartão"){
		//mensagem
		var icon = "img/imgAlert.png"
		var msg = "Atenção!"
		var act = "Para continuar, digite a senha!"
		var modo = "yn"
		var reload = ""
		var func = () => {excluirCard()}
		var senha = true
		openMSG(icon, msg, act, modo, reload,func,senha);

	}else{
		slctBxrCrd.reportValidity()
	}
	
	function excluirCard(){
		const nome = slctBxrCrd.value;
		(async function cartoes(){		
			//baixar cartões salvos
			const tabela = await loadCartaoGeral();
			
			tabela.map((e)=>{
				if(slctBxrCrd.value == e.nome){
					excluirCartao(e.id)
					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "cartão excluido com sucesso!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
					
					
					const x = [...document.getElementById("trf_form_bxr").children]
					x.map((e)=>{
						if(e.innerHTML == slctBxrCrd.value && e.innerHTML != "selecione um cartão")
						e.remove()
					})
					
					
				};
			});
				
		})()
	}
	
})
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------



//------------------------------------ADICIONAR NOVA FERRAMENTA------------------------------------------
//-------------------------------------------------------------------------------------------------------
//botão adicionar nova ferramenta
document.getElementById("trfForm_addFer").addEventListener("click",()=>{
	const body = document.body
	const caixa = document.createElement("div")
	caixa.setAttribute("id","PnlmsgAlert1")
	body.append(caixa)

	const caixafull = 
		"<div id='ctrlPnl1'>"+
			"<div class='ctrlPnl1'><img src='img/imgInter.png' alt='Logo' id='iconAlert1'></div>"+
			"<div class='ctrlPnl1'><h4 id='msgAlertText1'>deseja adicionar uma nova ferramenta?</h4></div>"+
			"<div class='ctrlPnl1'><p id='msgAlertAct1'>Insira os dados da ferramenta</p></div>"+
			"<div class='ctrlPnl1' id='cartaoAddDv'>"+
				"<input type='text' class='ctrlPnlInput' id='trfForm_novaFer' maxLength='100' required>"+
			"</div>"+
			"<div class='ctrlPnlBtn1'>"+
				"<button class='trfForm_addEspSlv' id='trfForm_BtnSlvFer'>salvar</button>"+
				"<button class='trfForm_addEspCnc' id='trfForm_BtnCanFer'>cancelar</button>"+
			"</div>"+
		"</div>"

	caixa.innerHTML += caixafull

	//botão cancelar
	document.getElementById("trfForm_BtnCanFer").addEventListener('click', function () {
		document.getElementById("PnlmsgAlert1").remove();
	})

	//botão salvar
	document.getElementById("trfForm_BtnSlvFer").addEventListener('click', function () {
		if(document.getElementById("trfForm_novaFer").value == ""){
			document.getElementById("trfForm_novaFer").reportValidity()
		}else{
			
			//baixar ferramentas salvos
			(async function salvarFer(){
				const ferramenta = await loadFerramentasGeral()

				//procurar ferramenta igual
				var vrfIgual = false
				ferramenta.map((e)=>{
					if(document.getElementById("trfForm_novaFer").value == e.ferramenta){
						vrfIgual = true
					}
				})

				//salvar novo cartão
				if(vrfIgual == true){
					document.getElementById("PnlmsgAlert1").remove();
					//mensagem de corfirmado
					var icon = "img/imgAlert.png"
					var msg = "Repetido"
					var act = "Ferramenta já existe!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					const fer = document.getElementById("trfForm_novaFer").value
					addFerramentaoBd(fer)
					
					const cxSlct = document.getElementById("trf_form_Fer")
					const opt = document.createElement("option")
					opt.innerHTML = document.getElementById("trfForm_novaFer").value
					cxSlct.append(opt)

					document.getElementById("PnlmsgAlert1").remove();

					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "Ferramenta criada com sucesso!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}

			})()
			
		}
	})
})
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------




//------------------------------------ADICIONAR NOVO PRODUTO------------------------------------------
//-------------------------------------------------------------------------------------------------------
//botão adicionar novo produto
document.getElementById("trfForm_addProd").addEventListener("click",()=>{
	const body = document.body
	const caixa = document.createElement("div")
	caixa.setAttribute("id","PnlmsgAlert1")
	body.append(caixa)

	const caixafull = 
		"<div id='ctrlPnl1'>"+
			"<div class='ctrlPnl1'><img src='img/imgInter.png' alt='Logo' id='iconAlert1'></div>"+
			"<div class='ctrlPnl1'><h4 id='msgAlertText1'>deseja adicionar uma novo produto?</h4></div>"+
			"<div class='ctrlPnl1'><p id='msgAlertAct1'>Insira os dados do produto</p></div>"+
			"<div class='ctrlPnl1' id='cartaoAddDv'>"+
				"<input type='text' class='ctrlPnlInput' id='trfForm_novoProd' maxLength='70' required>"+
			"</div>"+
			"<div class='ctrlPnlBtn1'>"+
				"<button class='trfForm_addEspSlv' id='trfForm_BtnSlvPrd'>salvar</button>"+
				"<button class='trfForm_addEspCnc' id='trfForm_BtnCanPrd'>cancelar</button>"+
			"</div>"+
		"</div>"

	caixa.innerHTML += caixafull

	//botão cancelar
	document.getElementById("trfForm_BtnCanPrd").addEventListener('click', function () {
		document.getElementById("PnlmsgAlert1").remove();
	})

	//botão salvar
	document.getElementById("trfForm_BtnSlvPrd").addEventListener('click', function () {
		if(document.getElementById("trfForm_novoProd").value == ""){
			document.getElementById("trfForm_novoProd").reportValidity()
		}else{
			
			//baixar produtos salvos
			(async function salvarPrd(){
				const produto = await loadProdutosGeral()

				//procurar produto igual
				var vrfIgual = false
				produto.map((e)=>{
					if(document.getElementById("trfForm_novoProd").value == e.produto){
						vrfIgual = true
					}
				})

				//salvar novo produto
				if(vrfIgual == true){
					document.getElementById("PnlmsgAlert1").remove();
					//mensagem de corfirmado
					var icon = "img/imgAlert.png"
					var msg = "Repetido"
					var act = "Produto já existe!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					const prd = document.getElementById("trfForm_novoProd").value
					addProdutosBd(prd)
					
					const cxSlct = document.getElementById("trf_form_Prd")
					const opt = document.createElement("option")
					opt.innerHTML = document.getElementById("trfForm_novoProd").value
					cxSlct.append(opt)

					document.getElementById("PnlmsgAlert1").remove();

					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "Ferramenta criada com sucesso!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}

			})()
			
		}
	})
})
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------




//------------------------------------ADICIONAR NOVO MEMBRO DA EQUIPE------------------------------------
//-------------------------------------------------------------------------------------------------------
//botão adicionar novo produto
document.getElementById("trfForm_addEqp").addEventListener("click",()=>{
	const body = document.body
	const caixa = document.createElement("div")
	caixa.setAttribute("id","PnlmsgAlert1")
	body.append(caixa)

	const caixafull = 
		"<div id='ctrlPnl1'>"+
			"<div class='ctrlPnl1'><img src='img/imgInter.png' alt='Logo' id='iconAlert1'></div>"+
			"<div class='ctrlPnl1'><h4 id='msgAlertText1'>deseja adicionar uma novo membro?</h4></div>"+
			"<div class='ctrlPnl1'><p id='msgAlertAct1'>Insira o nome do membro</p></div>"+
			"<div class='ctrlPnl1' id='cartaoAddDv'>"+
				"<input type='text' class='ctrlPnlInput' id='trfForm_novoMem' maxLength='70' required>"+
			"</div>"+
			"<div class='ctrlPnlBtn1'>"+
				"<button class='trfForm_addEspSlv' id='trfForm_BtnSlvMem'>salvar</button>"+
				"<button class='trfForm_addEspCnc' id='trfForm_BtnCanMem'>cancelar</button>"+
			"</div>"+
		"</div>"

	caixa.innerHTML += caixafull

	//botão cancelar
	document.getElementById("trfForm_BtnCanMem").addEventListener('click', function () {
		document.getElementById("PnlmsgAlert1").remove();
	})

	//botão salvar
	document.getElementById("trfForm_BtnSlvMem").addEventListener('click', function () {
		if(document.getElementById("trfForm_novoMem").value == ""){
			document.getElementById("trfForm_novoMem").reportValidity()
		}else{
			
			//baixar equipe salva
			(async function salvarEqp(){
				const equipe = await loadEquipeGeral()

				//procurar produto igual
				var vrfIgual = false
				equipe.map((e)=>{
					if(document.getElementById("trfForm_novoMem").value == e.membro){
						vrfIgual = true
					}
				})

				//salvar novo produto
				if(vrfIgual == true){
					document.getElementById("PnlmsgAlert1").remove();
					//mensagem de corfirmado
					var icon = "img/imgAlert.png"
					var msg = "Repetido"
					var act = "Membro já existe!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}else{
					const mem = document.getElementById("trfForm_novoMem").value
					addEquipeBd(mem)
					
					const cxSlct = document.getElementById("trf_form_EquMem")
					const opt = document.createElement("option")
					opt.innerHTML = document.getElementById("trfForm_novoMem").value
					cxSlct.append(opt)

					document.getElementById("PnlmsgAlert1").remove();

					//mensagem de corfirmado
					var icon = "img/imgOK.png"
					var msg = "Confirmação"
					var act = "Membro criado com sucesso!"
					var modo = "conf"
					var reload = "false"
					var func = ""
					openMSG(icon, msg, act, modo, reload,func);
				}

			})()
			
		}
	})
})
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------










