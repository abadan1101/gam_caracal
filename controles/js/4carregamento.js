function openControles(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo.
	const mAtv = "controles"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js
	
	//carregar painel ativo
	if(sessionStorage.getItem("reloadCtrl") == "ctrlFerramentas"){
		openTableControles()//metodo contido na folha: controles/js/0ferramentas.js
	}
	if(sessionStorage.getItem("reloadCtrl") == "ctrlProdutos"){
		openTableControlesProd()//metodo contido na folha: controles/js/1produtos.js
	}
	
	//configuração para reload
	sessionStorage.setItem("reload", "controles")
}

//reload da aba início
(function reloadControles() {
    if(sessionStorage.getItem("reload") == "controles"){
    	if(!sessionStorage.getItem("reloadCtrl")){
    		sessionStorage.setItem("reloadCtrl", "ctrlFerramentas")
    	}
    	const rlad = sessionStorage.getItem("reloadCtrl")
        openControles();
        document.getElementById(rlad).classList.remove("ocultPainel")
    }
})();

//botão de chamada do painel ferramentas
document.getElementById("controle01").addEventListener('click',()=>{
	sessionStorage.setItem("reloadCtrl", "ctrlFerramentas")
	openControles()
	document.getElementById("ctrlFerramentas").classList.remove("ocultPainel");
	document.getElementById("ctrlProdutos").classList.add("ocultPainel");
	document.getElementById("ctrlEquipe").classList.add("ocultPainel");
});
//botão de chamada do painel produtos
document.getElementById("controle02").addEventListener('click',()=>{
	sessionStorage.setItem("reloadCtrl", "ctrlProdutos")
	openControles()
	document.getElementById("ctrlFerramentas").classList.add("ocultPainel");
	document.getElementById("ctrlProdutos").classList.remove("ocultPainel");
	document.getElementById("ctrlEquipe").classList.add("ocultPainel");
});
//botão de chamada do painel equipe
document.getElementById("controle03").addEventListener('click',()=>{
	sessionStorage.setItem("reloadCtrl", "ctrlEquipe")
	openControles()
	document.getElementById("ctrlFerramentas").classList.add("ocultPainel");
	document.getElementById("ctrlProdutos").classList.add("ocultPainel");
	document.getElementById("ctrlEquipe").classList.remove("ocultPainel");
});
