//---------------------CONFIGURAÇÕES DO USUÁRIO---------------------------
//-----------------------------------------------------------------------

//menu responsivo: 1500, recolhido: 5000 ou menu fixo: 800
if(!localStorage.getItem("tipoMenu")){localStorage.setItem("tipoMenu", 5000)}

//estatica: não é possivel editar a tabela sem o formulário; normal: tabela editavel.
if(!localStorage.getItem("tipoTabela")){localStorage.setItem("tipoTabela", "normal")}

//variavel do tamanho da tela padrão em px
var tipMenu = localStorage.getItem("tipoMenu"); 

//variavel que difine tipo de tabela principal
var tblPrincipal = localStorage.getItem("tipoTabela") 

localStorage.setItem("tipoMenu", 5000)
localStorage.setItem("tipoTabela", "normal")
