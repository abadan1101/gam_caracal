//-------------------------------------------INICIALIZAÇÃO-----------------------------------------
//------------------------------------------------------------------------------------------------
//eventos que ocorrem ao iniciar a aplicação
window.onload = function() {
	ocultMenu()//função pertence a folha "geral/js/1menuPrincipal.js"
	OcultColm()
};

//eventos que ocorrem com o redimencionamento da tela
window.addEventListener('resize', function(){
	ocultMenu()//função pertence a folha "geral/js/1menuPrincipal.js"
	OcultColm()
})
//________________________________________________________________________________
//--------------------------------------------------------------------------------




//-----------CONFIGURAÇÃO DE RESPONSIVIDADE DAS COLUNAS DAS TABELAS---------------
//--------------------------------------------------------------------------------
//ocultar ou mostrar colunas especificas em tabelas a depender do tamanho tela
const telaPadrao1 = 600;
function OcultColm(){
	const gotd = [...document.querySelectorAll(".geralOcultTD")];
	if (window.innerWidth < telaPadrao1){	
		gotd.map((el)=>{
			el.classList.add("ocultPainel")
		})
	}else{
		gotd.map((el)=>{
			el.classList.remove("ocultPainel")
	
		})
	}
}
//________________________________________________________________________________
//--------------------------------------------------------------------------------




//------------------------------IMPORTAÇÕES DE CLASSES----------------------------
//--------------------------------------------------------------------------------
/*EXEMPLOS DAS MASCARAS
$('.date').mask('00/00/0000');
$('.time').mask('00:00:00');
$('.date_time').mask('00/00/0000 00:00:00');
$('.cep').mask('00000-000');
$('.phone').mask('0000-0000');
$('.phone_with_ddd').mask('(00) 0000-0000');
$('.phone_us').mask('(000) 000-0000');
$('.mixed').mask('AAA 000-S0S');
$('.cpf').mask('000.000.000-00', {reverse: true});
$('.cnpj').mask('00.000.000/0000-00', {reverse: true});
$('.money').mask('000.000.000.000.000,00', {reverse: true});
$('.money2').mask("#.##0,00", {reverse: true});
$('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
	translation: {
		'Z': {
			pattern: /[0-9]/, optional: true
		}
	}
});
$('.ip_address').mask('099.099.099.099');
$('.percent').mask('##0,00%', {reverse: true});
$('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
$('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
$('.fallback').mask("00r00r0000", {
	translation: {
		'r': {
			pattern: /[\/]/,
			fallback: '/'
		},
		placeholder: "__/__/____"
	}
});
$('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
*/

//mascaras criadas
$('.maskNumeros').mask('0000000000'); //somente numeros até 10 caracteres
$('.maskNum02').mask('00'); //somente numeros até 02 caracteres



//CONFIGURAÇÃO PARA CAIXAS DE PESQUISA SIMPLES DE INPUT
//modulo das tarefas
//caixa de pesquisa baixar cartão
$(document).ready(function() {
	$('.pesq_formBxr').select2();//
});
//caixa de pesquisa ferramentas
$(document).ready(function() {
	$('.pesq_formFer').select2();//
});
//caixa de pesquisa produtos
$(document).ready(function() {
	$('.pesq_formProd').select2();//
});
//caixa de pesquisa equipe
$(document).ready(function() {
	$('.pesq_formEqu').select2();//
});
//________________________________________________________________________________
//--------------------------------------------------------------------------------
