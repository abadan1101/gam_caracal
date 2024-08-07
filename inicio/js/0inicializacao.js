//FUNÇÃO DOS BOTÕES DO MENU PRINCIPAL (SUB-MENUS)
//chamada da linha 01
document.getElementById("home").addEventListener('click',()=>{
	//ocultar paineis dos modulos principais e mostrar somente o painel ativo
	const mAtv = "inicio"
	showModule(mAtv)//metodo contido na folha: /geral/js/2menuPrincipal.js
});
