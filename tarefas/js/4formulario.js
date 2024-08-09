//CONFIGURAR CABEÇALHO DO FORMULÁRIO
function configForm(){//função chamada na folha: /tarefas/js/banco.js
	try{
		//caixa do controle 0
		if(getCT.chave00[1] == true){
			const trf_form_Ch00 = document.getElementById("trf_form_Ch00")
			document.getElementById("trf_form_Ch00Lb").innerHTML = getCT.chave00[0]
			trf_form_Ch00.innerHTML = ""
			for(i=2;i<12;i++){
				const x = document.createElement("option");
				var y = getCT.chave00[i]
				if(y != ""){
					x.innerHTML = getCT.chave00[i]
					trf_form_Ch00.appendChild(x);
				} 
			}
		}else{
			document.getElementById("trf_form_Ch00Dv").classList.add("ocultPainel")
		}

		//caixa do controle 1
		if(getCT.chave01[1] == true){
			const trf_form_Ch01 = document.getElementById("trf_form_Ch01")
			document.getElementById("trf_form_Ch01Lb").innerHTML = getCT.chave01[0]
			trf_form_Ch01.innerHTML = ""
			for(i=2;i<12;i++){
				const x = document.createElement("option");
				var y = getCT.chave01[i]
				if(y != ""){
					x.innerHTML = getCT.chave01[i]
					trf_form_Ch01.appendChild(x);
				} 
			}
		}else{
			document.getElementById("trf_form_Ch01Dv").classList.add("ocultPainel")
		}
		
		//caixa do controle 2
		if(getCT.chave02[1] == true){
			const trf_form_Ch02 = document.getElementById("trf_form_Ch02")
			document.getElementById("trf_form_Ch02Lb").innerHTML = getCT.chave02[0]
			trf_form_Ch02.innerHTML = "<option value='' selected>*selecione*</option>"
			for(i=2;i<12;i++){
				const x = document.createElement("option");
				var y = getCT.chave02[i]
				if(y != ""){
					x.innerHTML = getCT.chave02[i]
					trf_form_Ch02.appendChild(x);
				} 
			}
		}else{
			document.getElementById("trf_form_Ch02Dv").classList.add("ocultPainel")
		}	

		//caixa do controle 3
		if(getCT.chave03[1] == true){
			const trf_form_Ch03 = document.getElementById("trf_form_Ch03")
			document.getElementById("trf_form_Ch03Lb").innerHTML = getCT.chave03[0]
			trf_form_Ch03.innerHTML = "<option value='' selected>*selecione*</option>"
			for(i=2;i<12;i++){
				const x = document.createElement("option");
				var y = getCT.chave03[i]
				if(y != ""){
					x.innerHTML = getCT.chave03[i]
					trf_form_Ch03.appendChild(x);
				} 
			}
		}else{
			document.getElementById("trf_form_Ch03Dv").classList.add("ocultPainel")
		}	

		//caixa do controle 4
		if(getCT.chave04[1] == true){
			document.getElementById("trf_form_Ch04Lb").innerHTML = getCT.chave04[0]
		}else{
			document.getElementById("trf_form_Ch04Dv").classList.add("ocultPainel")
		}

		//caixa do controle 5
		if(getCT.chave05[1] == true){
			document.getElementById("trf_form_Ch05Lb").innerHTML = getCT.chave05[0]
		}else{
			document.getElementById("trf_form_Ch05Dv").classList.add("ocultPainel")
		}

		//caixa do controle "Baixar"
		if(!getCT.baixar[1] == true){
			document.getElementById("trf_form_bxrDv").classList.add("ocultPainel")
		}
		console.log('Cabeçalho do form das tarefas carregados com sucesso!')
	}catch{
		console.log('Erro ao carregar form das tarefas!')
	}
}
//---------------------------------------------------------------------




//ABRIR FORMULÁRIO ----------------------------------------------------
function novaTarefa(){//funcção chamada na folha: /tarefas/js/2menuSec.js

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
	
	LimpTaref();
	
	if(tfd.value == "" || tfd.value == "dd/mm/aaaa"){dtHoje}
	tt.style.display = "none";
	tc.style.display = "none";
	tf.style.display = "block";
	
	console.log("Novo formulário aberto com sucesso!")
	
}
//---------------------------------------------------------------------



	
//LIMPAR FORMULÁRIO -------------------------------------------------------
function LimpTaref(){
	//cabeçalho
	document.getElementById('trf_form_num').value = "";

	document.getElementById('trf_form_Ch00').value = "Aberto"
	document.getElementById('trf_form_Ch01').value = "indisponível"
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
}
//---------------------------------------------------------------------




//CAIXA DOS PEDIDOS -----------------------------------------------------
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
	OcultColm()//oculta colunas em tabelas em telas pequenas
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
		
		pim.innerHTML = pedPim.value;
		nome.innerHTML = pedNom.value;
		tipo.innerHTML = pedTip.value;
		qtd.innerHTML = pedQtd.value;
		pn.innerHTML = pedPn.value;
		pna.innerHTML = pedPna.value;
		man.innerHTML = pedMan.value;
		obs.innerHTML = pedObs.value;

		
		const checkB = document.createElement("INPUT");
		checkB.type = "checkbox";
		checkB.setAttribute("checked","true")
		status.appendChild(checkB);
		
		
		linha.classList.add('tfProv');
		tipo.classList.add('geralOcultTD')
		qtd.classList.add('tfpOcult');
		pn.classList.add('tfpOcult');
		pna.classList.add('tfpOcult');
		man.classList.add('tfpOcult');
		obs.classList.add('tfpOcult');
		status.classList.add('tftcenter');
		tfPlimp ()

		//mensagem
		const img = "img/imgOK.png"
		const tx = "pedido adicionado com sucesso!"
		tfp_msg(img, tx)
	}
})

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
//---------------------------------------------------------------------




//CAIXA DAS FERRAMENTAS -----------------------------------------------------
//adicionar na caixa de ferramentas
$('.pesq_formFer').on('select2:select', function (e){
	const tipFer = document.getElementById('trf_form_Fer');
	if(tipFer.value != "selecione uma ferramenta"){
		const tb = document.getElementById("tftfB");
		var qtdLin = tb.rows.length;
		var linha = tb.insertRow(qtdLin);
		
		var fer = linha.insertCell(0);
		var chb = linha.insertCell(1);
		var btn = linha.insertCell(2);
		
		const checkB = document.createElement("INPUT");
		checkB.type = "checkbox";
		checkB.setAttribute("checked","true")
		
		const saveBtn = document.createElement("BUTTON");
		saveBtn.textContent = "excluir";
		
		fer.innerHTML = tipFer.value;
		chb.appendChild(checkB);
		btn.appendChild(saveBtn);
		
		linha.classList.add('tfProv');
		chb.classList.add('tftcenter');
		saveBtn.classList.add('tftbtn')
		tipFer.value = $(tipFer).val("selecione uma ferramenta").select2();
	
		//mensagem
		const img = "img/imgOK.png"
		const tx = "ferramenta adicionada com sucesso!"
		tff_msg(img, tx)
	}

})

//botão excluir itens da tabela de ferramentas
const tftf = document.getElementById('tftfB')
tftf.addEventListener('click', function (e) {
	const r = e.target.parentElement
	const v = r.parentElement
	if( e.target.classList.contains("tftbtn")){
		v.remove()

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
//---------------------------------------------------------------------




//CAIXA DOS PRODUTOS -----------------------------------------------------
//adicionar na caixa dos produtos
$('.pesq_formProd').on('select2:select', function (e){
	const tipProd = document.getElementById('trf_form_Prd');
	if(tipProd.value != "selecione um produto"){
		const tb = document.getElementById("tftprB");
		var qtdLin = tb.rows.length;
		var linha = tb.insertRow(qtdLin);
		
		var prod = linha.insertCell(0);
		var chb = linha.insertCell(1);
		var btn = linha.insertCell(2);

		const checkB = document.createElement("INPUT");
		checkB.type = "checkbox";
		checkB.setAttribute("checked","true")		
			
		const saveBtn = document.createElement("BUTTON");
		saveBtn.textContent = "excluir";
		
		prod.innerHTML = tipProd.value;
		chb.appendChild(checkB);
		btn.appendChild(saveBtn);
		
		linha.classList.add('tfProv');
		chb.classList.add('tftcenter');
		saveBtn.classList.add('tftbtn')
		tipProd.value = $(tipProd).val("selecione um produto").select2();
	
		//mensagem
		const img = "img/imgOK.png"
		const tx = "produto adicionado com sucesso!"
		tfpr_msg(img, tx)
	}

})

//botão excluir itens da tabela de produtos
const tftpr = document.getElementById('tftprB')
tftpr.addEventListener('click', function (e) {
	const r = e.target.parentElement
	const v = r.parentElement
	if( e.target.classList.contains("tftbtn")){
		v.remove()

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
//---------------------------------------------------------------------




//CAIXA DA EQUIPE -----------------------------------------------------
//adicionar na caixa de equipe
$('.pesq_formEqu').on('select2:select', function (e){
	const tipEqp = document.getElementById('trf_form_EquMem');
	if(tipEqp.value != "selecione um membro"){
		const tb = document.getElementById("tdteB");
		var qtdLin = tb.rows.length;
		var linha = tb.insertRow(qtdLin);
		var eqp = linha.insertCell(0);
		var btn = linha.insertCell(1);
		const saveBtn = document.createElement("BUTTON");
		saveBtn.textContent = "excluir";
		eqp.innerHTML = tipEqp.value;
		btn.appendChild(saveBtn);
		linha.classList.add('tfProv');
		saveBtn.classList.add('tftbtn')
		tipEqp.value = $(tipEqp).val("selecione um membro").select2();
	
		//mensagem
		const img = "img/imgOK.png"
		const tx = "membro adicionado com sucesso!"
		tfe_msg(img, tx)
	}
})

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
//---------------------------------------------------------------------




//SALVAR FORMULÁRIO ------------------------------------------------
const salvTaref = document.querySelectorAll('.trf_form_btn');
salvTaref.forEach(function(e){
    e.addEventListener('click', function(){
	const f = e.id;
	var modo = ""
	var reload = ""
	var func = ""
	var icon = "";
	var msg = "";
	var act = "";
	if(f != "trf_form_cnc" && trf_form_dat.value != "" && trf_form_num.value != "" && trf_form_txa1.value != ""){
	
		addTarefa()//função pertence a folha: /tarefas/js/0banco.js
		sessionStorage.setItem("reloadUpdate","true")
		
		if(f == "trf_form_slN"){
			sessionStorage.setItem("index",1)//abrir formulário no reload
		}else{
			sessionStorage.setItem("index",0)
		}
		
		location.reload();

	}else{
		if(f != "trf_form_cnc"){
			modo = "conf"
			var reload = ""
			var func = ""
			icon = "img/imgAlert.png"
			msg = "formulário incompleto!"
			act = "Preencha os itens obrigatórios!"
			openMSG(icon, msg, act, modo, reload,func);
		}
	}
    })
});
//--------------------------------------------------------------------------------




//FECHAR FORMULÁRIO ----------------------------------------------------
const tfc = document.getElementById("trf_form_cnc")
tfc.addEventListener("click",(evt)=>{
	location.reload();
	sessionStorage.setItem("reloadUpdate","false")
})
//---------------------------------------------------------------------
