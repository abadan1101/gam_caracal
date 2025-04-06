//---------------------CONFIGURAÇÕES DO USUÁRIO---------------------------
//-----------------------------------------------------------------------

//senha padrão para configurações gerais
if(!localStorage.getItem("senhaConfig")){localStorage.setItem("senhaConfig", 1101)}

//menu responsivo: 1500, recolhido: 5000 ou menu fixo: 800
if(!localStorage.getItem("tipoMenu")){localStorage.setItem("tipoMenu", 5000)}

//estatica: não é possivel editar a tabela sem o formulário; normal: tabela editavel.
if(!localStorage.getItem("tipoTabela")){localStorage.setItem("tipoTabela", "estatica")}







//variável da senha para configurações gerais
const senhaAltAvancado = localStorage.getItem("senhaConfig"); 

//variavel do tamanho da tela padrão em px
const tipMenu = localStorage.getItem("tipoMenu"); 

//variavel que difine tipo de tabela principal
const tblPrincipal = localStorage.getItem("tipoTabela") 






