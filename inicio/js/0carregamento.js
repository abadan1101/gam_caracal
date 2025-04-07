function openInicio(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo.
	const mAtv = "inicio"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js

	//configuração para reload
	sessionStorage.setItem("reload", "inicio")

	graficosLinha01()
	graficosLinha02()
	graficosLinha03()
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

//chamada em caso de primeiro acesso
(function primeiroLoad() {
    if(!sessionStorage.getItem("reload")){
        openInicio();
    }
})();
