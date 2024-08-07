// CONFIGURAÇÕES DO MENU SECUNDÁRIO DAS TAREFAS
const trf_menu = document.getElementById("trf_menu")
const trf_mn = document.getElementById("trf_mn")
trf_menu.addEventListener('click', function () {
	trf_mn.classList.toggle('menuModulos_mst');
})
window.addEventListener('click', function (e) {
	if(e.target !== trf_menu) {
		if(e.target !== trf_mn) {
			if(trf_mn.classList.contains('menuModulos_mst')) {
				trf_mn.classList.remove('menuModulos_mst');
			}
		}
	}
})

//botão nova tarefa
const tmAf = document.getElementById("trf_menu_afNew")	
tmAf.addEventListener("click",(evt)=>{
	novaTarefa()//funcção pertence a folha: /tarefas/js/5formulário.js
})
//________________________________________________________________________________
//--------------------------------------------------------------------------------
