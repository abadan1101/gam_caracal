//RECARREGAR PÁGINA DA LINHA 01 DE MANUTENÇÃO
//-----------------------------------------------
(function callTrfLin1() {
    if(sessionStorage.getItem("reload") == "TrfLin1"){
    
        openL1();//metodo contido na folha: /tarefas/js/1menu.js
        
        if(sessionStorage.getItem("index") == 1){
        	setTimeout(novaTarefa,200);//funcção pertence a folha: /tarefas/js/5formulário.js
        }
        
        sessionStorage.setItem("index",0)
        
        if(sessionStorage.getItem("reloadUpdate") == "true"){
            var modo = "conf"
            var rld = ""
            var func = ""
            var icon = "img/imgOK.png"
            var msg = "Confirmado!"
            var act = "Tarefa salva com sucesso!"
            openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false")  
    }

})();
//-----------------------------------------------



//RECARREGAR PÁGINA DA LINHA 02 DE MANUTENÇÃO
//-----------------------------------------------
(function callTrfLin2() {
    if(sessionStorage.getItem("reload") == "TrfLin2"){
    
        openL2();//metodo contido na folha: /tarefas/js/1menu.js
        
        if(sessionStorage.getItem("index") == 1){
        	setTimeout(novaTarefa,200);//funcção pertence a folha: /tarefas/js/5formulário.js
        }
        
        sessionStorage.setItem("index",0)
        
        if(sessionStorage.getItem("reloadUpdate") == "true"){
            var modo = "conf"
            var rld = ""
            var func = ""
            var icon = "img/imgOK.png"
            var msg = "Confirmado!"
            var act = "Tarefa salva com sucesso!"
            openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false")  
    }

})();
//-----------------------------------------------



//RECARREGAR PÁGINA DA LINHA 03 DE MANUTENÇÃO
//-----------------------------------------------
(function callTrfLin3() {
    if(sessionStorage.getItem("reload") == "TrfLin3"){
    
        openL3();//metodo contido na folha: /tarefas/js/1menu.js
        
        if(sessionStorage.getItem("index") == 1){
        	setTimeout(novaTarefa,200);//funcção pertence a folha: /tarefas/js/5formulário.js
        }
        
        sessionStorage.setItem("index",0)
        
        if(sessionStorage.getItem("reloadUpdate") == "true"){
            var modo = "conf"
            var rld = ""
            var func = ""
            var icon = "img/imgOK.png"
            var msg = "Confirmado!"
            var act = "Tarefa salva com sucesso!"
            openMSG(icon, msg, act, modo, rld,func);
        }
        sessionStorage.setItem("reloadUpdate","false")  
    }

})();
//-----------------------------------------------



//RECARREGAR PÁGINA DAS CONFIGURAÇÕES DAS TAREFAS
//-----------------------------------------------
(function callTrfConf() {
    if(sessionStorage.getItem("reload") == "trf_conf"){
        openCnf()//metodo contido na folha: /tarefas/js/1menu.js
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
})();
//-----------------------------------------------
