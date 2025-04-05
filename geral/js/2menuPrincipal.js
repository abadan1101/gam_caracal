//-----------------------------------------FUNÇÕES MENU PRINCIPAL-------------------------------------

//ocultar ou mostrar menu a depender do tamanho tela
function ocultMenu(){
	const menuStat = document.getElementById("sidebar");
	const iconRM = document.getElementById("iconRM")
	const content = document.getElementById("content");
	const areaPcp = document.getElementById("areaPcp");
	if (window.innerWidth < tipMenu){//variável pertence a folha "geral/js/1configUsuario.js"	
		menuStat.classList.add("menuRecolhido")
		menuStat.classList.remove("menuNormal")
		iconRM.classList.remove("ocultPainel")
		content.style = "width: 100%; left: 2px;"
		areaPcp.style = "width: 100%; left: 2px;"
	}else{		
		menuStat.classList.remove("menuRecolhido")
		menuStat.classList.add("menuNormal")
		iconRM.classList.add("ocultPainel")
		content.style = "width: calc(100% - 260px); left: 260px;"
		areaPcp.style = "width: calc(100% - 260px); left: 260px;"
	}
}//função chamada na folha "geral/js/3inicializacao.js"

//mostrar menu principal
const iconRM = document.getElementById("iconRM")
iconRM.addEventListener('click', function () {
	const menuStat = document.getElementById("sidebar")
	menuStat.classList.toggle("menuRecolhido")
	menuStat.classList.toggle("menuNormal")
	
	const body = document.body
	const div = document.createElement("div")
	div.setAttribute("id","pnlMunu")
	div.setAttribute("style","position: absolute;width: 100%;height: 100%;z-index: 199;")
	body.append(div)
})

//recolher menu principal
window.addEventListener('click', function (e) {
	const pnlMunu = document.getElementById("pnlMunu")
	const sidebar = document.getElementById("sidebar")
	if (e.target == pnlMunu){
		sidebar.classList.add("menuRecolhido")
		sidebar.classList.remove("menuNormal")
		pnlMunu.remove()
	}
})

//esconder ou mostrar sub-menu do menu principal.
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');
				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}
		if(!a.classList.contains('mSus')){
			const altSB=document.querySelectorAll('[altSB]');
			for(i=0;i<altSB.length;i++){
			    altSB[i].classList.remove('altSub');
			}
			if (window.innerWidth < tipMenu){//variável pertence a folha "geral/js/1configUsuario.js"	
				const pnlMunu = document.getElementById("pnlMunu")
				const sidebar = document.getElementById("sidebar")
				sidebar.classList.add("menuRecolhido")
				sidebar.classList.remove("menuNormal")
				pnlMunu.remove()
			}
			
		}
		
		this.classList.toggle('active');
		item.classList.toggle('show');

	})
})

//marcar subitem clicado
const altSB=document.querySelectorAll('[altSB]');
altSB.forEach(function(e){
    e.addEventListener('click', function(){
        for(i=0;i<altSB.length;i++){
            altSB[i].classList.remove('altSub');
        }
        e.classList.add('altSub');
		if (window.innerWidth < tipMenu){//variável pertence a folha "geral/js/1configUsuario.js"
			const pnlMunu = document.getElementById("pnlMunu")
			const sidebar = document.getElementById("sidebar")
			sidebar.classList.add("menuRecolhido")
			sidebar.classList.remove("menuNormal")
			pnlMunu.remove()
		}
    })
})

//ocultar paineis dos modulos principais e mostrar somente o painel ativo
function showModule(mAtv){//função chamada nas folhas dos modulos
	const modulo = [...document.getElementsByClassName("modulo")]
	modulo.map((el)=>{
		el.classList.add('ocultPainel')
	})
	document.getElementById(mAtv).classList.remove('ocultPainel')
}

//define abertura do sub-menu no reload
const SbMnClick = [...document.getElementsByClassName('side-dropdown')]
SbMnClick.map((el)=>{
	const x = [...(el.children)]
	x.map((e)=>{
		e.addEventListener('click', function (a) {
			sessionStorage.setItem('btnClick',e.innerText)
			sessionStorage.setItem('mdlAtivo',(e.parentElement).parentElement.id)	
			sessionStorage.setItem('logicaSB',true)
		})
	})
})

//logica para desligar o reload do sub-menu
const IOsb = [...document.getElementsByClassName('noSB')]
IOsb.map((e)=>{
	e.addEventListener('click', function (a) {
		sessionStorage.setItem('logicaSB',false)
	})
})

//logica para ligar o reload do sub-menu
if(sessionStorage.getItem('logicaSB') == "true"){
//variáveis
var mdlAtivo = sessionStorage.getItem('mdlAtivo')
var sbLocStrg = sessionStorage.getItem("btnClick")
var sb = null
var altSBAtiv = null
let index = null
//modulo tarefas
sb = document.getElementById(mdlAtivo)
altSBAtiv = [...(sb.children[1].children)]
index = altSBAtiv.findIndex(i => i.innerText === sbLocStrg)
sb.children[0].classList.toggle('active')
sb.children[1].classList.toggle('show')
altSBAtiv[index].children[0].classList.add('altSub')
}
//_________________________________________________________________________________________________
//-------------------------------------------------------------------------------------------------



