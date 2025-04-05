function openControles(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo.
	const mAtv = "controles"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js

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

//botão de chamada do inicio
document.getElementById("controle01").addEventListener('click',()=>{
	openControles()
	sessionStorage.setItem("reloadCtrl", "ctrlFerramentas")
	document.getElementById("ctrlFerramentas").classList.remove("ocultPainel");
	document.getElementById("ctrlProdutos").classList.add("ocultPainel");
	document.getElementById("ctrlEquipe").classList.add("ocultPainel");
});
//botão de chamada do inicio
document.getElementById("controle02").addEventListener('click',()=>{
	openControles()
	sessionStorage.setItem("reloadCtrl", "ctrlProdutos")
	document.getElementById("ctrlFerramentas").classList.add("ocultPainel");
	document.getElementById("ctrlProdutos").classList.remove("ocultPainel");
	document.getElementById("ctrlEquipe").classList.add("ocultPainel");
});
//botão de chamada do inicio
document.getElementById("controle03").addEventListener('click',()=>{
	openControles()
	sessionStorage.setItem("reloadCtrl", "ctrlEquipe")
	document.getElementById("ctrlFerramentas").classList.add("ocultPainel");
	document.getElementById("ctrlProdutos").classList.add("ocultPainel");
	document.getElementById("ctrlEquipe").classList.remove("ocultPainel");
});
