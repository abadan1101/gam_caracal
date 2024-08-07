//RECARREGAR PÁGINA DAS CONFIGURAÇÕES DAS TAREFAS
//-----------------------------------------------
(function callConfig() {
    if(sessionStorage.getItem("reload") == "trf_conf"){
        btnCnf()//metodo contido na folha: /tarefas/js/1menu.js
        if(sessionStorage.getItem("reloadUpdate") == "true"){
            var modo = "conf"
            var rld = ""
            var func = ""
            var icon = "img/imgOK.png"
            var msg = "Confirmado!"
            var act = "Configurações salvas com sucesso!"
            openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false")  
    }
})()
//-----------------------------------------------