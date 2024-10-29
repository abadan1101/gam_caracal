function openInicio(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo.
	const mAtv = "inicio"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js

	//configuração para reload
	sessionStorage.setItem("reload", "inicio")
}

//reload da aba início
(function reloadInicio() {
    if(sessionStorage.getItem("reload") == "inicio"){
        openInicio();
    }
})();

//botão de chamada do inicio
document.getElementById("home").addEventListener('click',()=>{
	openInicio()
});
