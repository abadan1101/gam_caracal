//------------------------------------------BARRA DE PESQUISA----------------------------------------
//-------------------------------------------------------------------------------------------------


//------------------------------CAIXA DE PESQUISA --------------------------------------
//--------------------------------------------------------------------------------------
//pressionar "enter" na caixa de pesquisa
const cx_pesquisa = document.getElementById("barrPesc_pesquisa")
cx_pesquisa.addEventListener('keypress', (event)=>{
	if (event.key === 'Enter') {
		event.preventDefault();
		pesquisar()
	}
})

//botão "lupa"
const i_pesquisa = document.getElementById("barrPesc_Ipesquisa")
i_pesquisa.addEventListener('click', ()=>{{pesquisar()}})

//função pesquisar
async function pesquisar(){

	var bdTabelaL1 = await loadTBLin()//pertence a folha: /tarefas/js/banco.js

	var tabela = []

	const vlPessquisa = cx_pesquisa.value.toLowerCase()

	bdTabelaL1.map((e)=>{

		const itemJson = JSON.stringify(e).toLowerCase()

		if(itemJson.includes(vlPessquisa) == true){
			tabela.push(e)
		}

	})

	//chamadas da tabela principal
	document.getElementById("trf_tblTbBdy").innerHTML = ""//limpar tabela
	setTimeout(()=>{
		async function retardar(){
			const body = document.getElementById("tarefas") 
			const div = document.createElement("div")
			div.setAttribute("id","pnlMunu1")
			div.setAttribute("style","position: absolute;width: 100%;" +
			"height: 100%;z-index: 99999;background: rgba(0,0,0,0.2);" +
			"display: flex;justify-content: center;align-items:center;font-size: 20px;")
			div.innerHTML = "<div style='background: #fff;width:200px;height: 50px; display: flex; justify-content: center;align-items:center; border-radius:10px;'>carregando...</div>"
			body.prepend(div)

			if(tblPrincipal == "estatica"){
				await TrfTbl_LoadStatic(tabela)//funções chamadas da folha: /tarefas/js/tabela.js
				//filtrar tarefas
				await trfTbl_filtroReload();//pertence a folha: /tarefas/js/tabela.js
				trfTbl_filtro()//pertence a folha: /tarefas/js/tabela.js
			}else{
				await TrfTbl_Load(tabela)//funções chamadas da folha: /tarefas/js/tabela.js
				//filtrar tarefas
				await trfTbl_filtroReload();//pertence a folha: /tarefas/js/tabela.js
				trfTbl_filtro()//pertence a folha: /tarefas/js/tabela.js
			}

			pnlMunu1.remove()

		}retardar()
		
	},500)

}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------




