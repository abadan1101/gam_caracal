function openConfig(){
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo.
	const mAtv = "configuracoes"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js

	//configuração para reload
	sessionStorage.setItem("reload", "configuracoes");
}

//reload da aba início
(function reloadConfig() {
    if(sessionStorage.getItem("reload") == "configuracoes"){
        openConfig();
    }
})();

//botão de chamada do inicio
document.getElementById("trf_menu_afConfiguracoes").addEventListener('click',()=>{
	openConfig()
});
