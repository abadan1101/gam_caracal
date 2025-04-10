// -----------------------GRÁFICOS DA LINHA 01---------------------

async function graficosLinha01(){

	//verificar se está ativo
    const db = await loadTBCfgLin(1)

    if(db.status == "inativo"){
        document.getElementById('myChartLinha01').style.display = "none"
    }else{

        //baixar dados de configuração das linhas
        const dbConfig = await loadTBCfgLin(0)

        //baixar cartões da linha
        const bdTabela = await loadTBLinVar("linha01")
        var andamento = []
        bdTabela.map((e)=>{
            andamento.push(e.chave00)
        })

        //configura quantidade de repetições dos cartões da linha
        const occurrences = andamento.reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        //valores de percentual do andamento
        const totalcartoes = bdTabela.length
        var totalCumprido = 0
        bdTabela.map((e)=>{
            totalCumprido += parseInt(e.porcentagem)
        })
        var percentual = totalCumprido / totalcartoes
        var emAndamento = 100 - percentual

	if(andamento.length <=0){
        	percentual = 0
        	emAndamento = 100
        }
        
        //valores de percentual do prazo
        const dataInicio = new Date(db.inicio)
        const dataFim = new Date(db.fim)
        const dataHoje = new Date().getTime()
        var diasTotais
        var diasPassados
        var porcentagemDias = 100
        var diasRest = 0
        var x = dataHoje
        var y = dataFim.getTime()
        var z = dataInicio.getTime() 
	var diasUteis = 0
	var diasUteis2 = 0
        while(x<y){
        	var d = new Date(x).getDay()
        	if(d != 6 && d != 0){
        		diasUteis++
        	}
        	x += 86400000
        }
        while(z<y){
        	var d = new Date(z).getDay()
        	if(d != 6 && d != 0){
        		diasUteis2++
        	}
        	z += 86400000
        }
        if(dataHoje <= dataInicio){
            porcentagemDias = 0
            diasRest = 100
            document.getElementById("myChartTitleL1_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
	    document.getElementById("myChartTitleL1_Pass").innerHTML = 0 + " dias passados"
	    document.getElementById("myChartTitleL1_Disp").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias totais disponíveis"
	    document.getElementById("myChartTitleL1_util").innerHTML = diasUteis2 + " dias uteis disponíveis"
        }else{
            if(dataHoje <= dataFim){
                diasTotais =  Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1)
                diasPassados = Math.floor((dataHoje - dataInicio) / (1000 * 60 * 60 * 24) + 1)
                porcentagemDias = diasPassados / diasTotais * 100
                diasRest = 100 - porcentagemDias
                document.getElementById("myChartTitleL1_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
                document.getElementById("myChartTitleL1_Pass").innerHTML = diasPassados + " dias passados"
                document.getElementById("myChartTitleL1_Disp").innerHTML = diasTotais - diasPassados + " dias totais disponíveis"
                document.getElementById("myChartTitleL1_util").innerHTML = diasUteis + " dias uteis disponíveis"
            }else{
            	document.getElementById("myChartTitleL1_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
        	document.getElementById("myChartTitleL1_Pass").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias passados"
        	document.getElementById("myChartTitleL1_Disp").innerHTML = 0 + " dias totais disponíveis"
        	document.getElementById("myChartTitleL1_util").innerHTML = 0 + " dias uteis disponíveis"
            }
        }
        
        
        

        //mostrar painel em caso de linha ativa
        document.getElementById('myChartLinha01').style.display = "block"

        //nome da linha
	    document.getElementById("myChartANV").innerHTML = "LINHA 01 ANV " + db.nANV


        //GRÁFICO DE ANDAMENTO DOS CARTÕES
        const ctx = document.getElementById('myChart');
        const data = {
            labels: [
                dbConfig.chave00[2],
                dbConfig.chave00[3],
                dbConfig.chave00[4],
                dbConfig.chave00[5],
                dbConfig.chave00[6],
                dbConfig.chave00[7],
                dbConfig.chave00[8],
                dbConfig.chave00[9],
                dbConfig.chave00[10],
                dbConfig.chave00[11],
            ],
            datasets: [{
                label: 'Cartões de trabalho',
                data: [
                    occurrences[dbConfig.chave00[2]],
                    occurrences[dbConfig.chave00[3]],
                    occurrences[dbConfig.chave00[4]],
                    occurrences[dbConfig.chave00[5]],
                    occurrences[dbConfig.chave00[6]],
                    occurrences[dbConfig.chave00[7]],
                    occurrences[dbConfig.chave00[8]],
                    occurrences[dbConfig.chave00[9]],
                    occurrences[dbConfig.chave00[10]],
                    occurrences[dbConfig.chave00[11]],
                ],
                backgroundColor: [
		        '#f77',
		        '#2E8B57',
		        '#FFD700',
		        '#9fcd9f',
		        '#fff',
		        '#e2e1e1',
		        '#599cf3',
		        '#a175f8',
		        '#F00',
		        '#BC8F8F'
                ],
                borderColor: [
                 	'#f77',
		        '#2E8B57',
		        '#FFD700',
		        '#9fcd9f',
		        '#ccc',
		        '#e2e1e1',
		        '#599cf3',
		        '#a175f8',
		        '#F00',
		        '#BC8F8F'
                ],
                borderWidth: 1,
                barPercentage: 1,
                barThickness: 20,
                maxBarThickness: 20,
                minBarLength: 2,
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
	    	responsive: true
	    },
        });


        //GÁFICO DE ANDAMENTO DAS INSPEÇÕES
        const ctx2 = document.getElementById('myChart2');									
        const data2 = {
            labels: [
                'AGUARDANDO',
                'ENCERRADAS',
            ],
            datasets: [{
                label: 'Percentual',
                data: [emAndamento, percentual],
                backgroundColor: [
                '#EEE',
                '#2E8B00',
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx2, {
            type: 'doughnut',
            data: data2,
        });

        //PRAZOS DE INSPEÇÃO
        const ctx3 = document.getElementById('myChart3');							
        const data3 = {
            labels: [
                'dias restantes',
                'dias passados'
            ],
            datasets: [{
                label: 'Percentual',
                data: [diasRest, porcentagemDias],
                backgroundColor: [
                '#EEE',
                'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx3, {
            type: 'doughnut',
            data: data3,
        });
    } 
}
//---------------------------------------------------------------
//---------------------------------------------------------------





// -----------------------GRÁFICOS DA LINHA 02---------------------

async function graficosLinha02(){

	//verificar se está ativo
    const db = await loadTBCfgLin(2)

    if(db.status == "inativo"){
        document.getElementById('myChartLinha02').style.display = "none"
    }else{

        //baixar dados de configuração das linhas
        const dbConfig = await loadTBCfgLin(0)

        //baixar cartões da linha
        const bdTabela = await loadTBLinVar("linha02")
        var andamento = []
        bdTabela.map((e)=>{
            andamento.push(e.chave00)
        })

        //configura quantidade de repetições dos cartões da linha
        const occurrences = andamento.reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        //valores de percentual do andamento
        const totalcartoes = bdTabela.length
        var totalCumprido = 0
        bdTabela.map((e)=>{
            totalCumprido += parseInt(e.porcentagem)
        })
        
        var percentual = totalCumprido / totalcartoes
        var emAndamento = 100 - percentual
        
        if(andamento.length <=0){
        	percentual = 0
        	emAndamento = 100
        }

        //valores de percentual do prazo
        const dataInicio = new Date(db.inicio)
        const dataFim = new Date(db.fim)
        const dataHoje = new Date().getTime()
        var diasTotais
        var diasPassados
        var porcentagemDias = 100
        var diasRest = 0
        var x = dataHoje
        var y = dataFim.getTime()
        var z = dataInicio.getTime() 
	var diasUteis = 0
	var diasUteis2 = 0
        while(x<y){
        	var d = new Date(x).getDay()
        	if(d != 6 && d != 0){
        		diasUteis++
        	}
        	x += 86400000
        }
        while(z<y){
        	var d = new Date(z).getDay()
        	if(d != 6 && d != 0){
        		diasUteis2++
        	}
        	z += 86400000
        }
        if(dataHoje <= dataInicio){
            porcentagemDias = 0
            diasRest = 100
            document.getElementById("myChartTitleL2_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
	    document.getElementById("myChartTitleL2_Pass").innerHTML = 0 + " dias passados"
	    document.getElementById("myChartTitleL2_Disp").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias totais disponíveis"
	    document.getElementById("myChartTitleL2_util").innerHTML = diasUteis2 + " dias uteis disponíveis"
        }else{
            if(dataHoje <= dataFim){
                diasTotais =  Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1)
                diasPassados = Math.floor((dataHoje - dataInicio) / (1000 * 60 * 60 * 24) + 1)
                porcentagemDias = diasPassados / diasTotais * 100
                diasRest = 100 - porcentagemDias
                document.getElementById("myChartTitleL2_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
                document.getElementById("myChartTitleL2_Pass").innerHTML = diasPassados + " dias passados"
                document.getElementById("myChartTitleL2_Disp").innerHTML = diasTotais - diasPassados + " dias totais disponíveis"
                document.getElementById("myChartTitleL2_util").innerHTML = diasUteis + " dias uteis disponíveis"
            }else{
            	document.getElementById("myChartTitleL2_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
        	document.getElementById("myChartTitleL2_Pass").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias passados"
        	document.getElementById("myChartTitleL2_Disp").innerHTML = 0 + " dias totais disponíveis"
        	document.getElementById("myChartTitleL2_util").innerHTML = 0 + " dias uteis disponíveis"
            }
        }
        
        

        //mostrar painel em caso de linha ativa
        document.getElementById('myChartLinha02').style.display = "block"

        //nome da linha
	   document.getElementById("myChartANV2").innerHTML = "LINHA 02 ANV " + db.nANV


        //GRÁFICO DE ANDAMENTO DOS CARTÕES
        const ctx = document.getElementById('myChart4');
        const data = {
            labels: [
                dbConfig.chave00[2],
                dbConfig.chave00[3],
                dbConfig.chave00[4],
                dbConfig.chave00[5],
                dbConfig.chave00[6],
                dbConfig.chave00[7],
                dbConfig.chave00[8],
                dbConfig.chave00[9],
                dbConfig.chave00[10],
                dbConfig.chave00[11],
            ],
            datasets: [{
                label: 'Cartões de trabalho',
                data: [
                    occurrences[dbConfig.chave00[2]],
                    occurrences[dbConfig.chave00[3]],
                    occurrences[dbConfig.chave00[4]],
                    occurrences[dbConfig.chave00[5]],
                    occurrences[dbConfig.chave00[6]],
                    occurrences[dbConfig.chave00[7]],
                    occurrences[dbConfig.chave00[8]],
                    occurrences[dbConfig.chave00[9]],
                    occurrences[dbConfig.chave00[10]],
                    occurrences[dbConfig.chave00[11]],
                ],
                backgroundColor: [
		        '#f77',
		        '#2E8B57',
		        '#FFD700',
		        '#9fcd9f',
		        '#fff',
		        '#e2e1e1',
		        '#599cf3',
		        '#a175f8',
		        '#F00',
		        '#BC8F8F'
                ],
                borderColor: [
                 	'#f77',
		        '#2E8B57',
		        '#FFD700',
		        '#9fcd9f',
		        '#ccc',
		        '#e2e1e1',
		        '#599cf3',
		        '#a175f8',
		        '#F00',
		        '#BC8F8F'
                ],
                borderWidth: 1,
                barPercentage: 1,
                barThickness: 20,
                maxBarThickness: 20,
                minBarLength: 2,
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
	    	responsive: true
	    },
        });


        //GÁFICO DE ANDAMENTO DAS INSPEÇÕES
        const ctx2 = document.getElementById('myChart5');									
        const data2 = {
            labels: [
                'AGUARDANDO',
                'ENCERRADAS',
            ],
            datasets: [{
                label: 'Percentual',
                data: [emAndamento, percentual],
                backgroundColor: [
                '#EEE',
                '#2E8B00',
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx2, {
            type: 'doughnut',
            data: data2,
        });

        //PRAZOS DE INSPEÇÃO
        const ctx3 = document.getElementById('myChart6');							
        const data3 = {
            labels: [
                'dias restantes',
                'dias passados'
            ],
            datasets: [{
                label: 'Percentual',
                data: [diasRest, porcentagemDias],
                backgroundColor: [
                '#EEE',
                'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx3, {
            type: 'doughnut',
            data: data3,
        });
    } 
}
//---------------------------------------------------------------
//---------------------------------------------------------------






// -----------------------GRÁFICOS DA LINHA 03---------------------

async function graficosLinha03(){

	//verificar se está ativo
    const db = await loadTBCfgLin(3)

    if(db.status == "inativo"){
        document.getElementById('myChartLinha03').style.display = "none"
    }else{

        //baixar dados de configuração das linhas
        const dbConfig = await loadTBCfgLin(0)

        //baixar cartões da linha
        const bdTabela = await loadTBLinVar("linha03")
        var andamento = []
        bdTabela.map((e)=>{
            andamento.push(e.chave00)
        })

        //configura quantidade de repetições dos cartões da linha
        const occurrences = andamento.reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        //valores de percentual do andamento
        const totalcartoes = bdTabela.length
        var totalCumprido = 0
        bdTabela.map((e)=>{
            totalCumprido += parseInt(e.porcentagem)
        })
        var percentual = totalCumprido / totalcartoes
        var emAndamento = 100 - percentual
        
        if(andamento.length <=0){
        	percentual = 0
        	emAndamento = 100
        }

        //valores de percentual do prazo
        const dataInicio = new Date(db.inicio)
        const dataFim = new Date(db.fim)
        const dataHoje = new Date().getTime()
        var diasTotais
        var diasPassados
        var porcentagemDias = 100
        var diasRest = 0
         var x = dataHoje
        var y = dataFim.getTime()
        var z = dataInicio.getTime() 
	var diasUteis = 0
	var diasUteis2 = 0
        while(x<y){
        	var d = new Date(x).getDay()
        	if(d != 6 && d != 0){
        		diasUteis++
        	}
        	x += 86400000
        }
        while(z<y){
        	var d = new Date(z).getDay()
        	if(d != 6 && d != 0){
        		diasUteis2++
        	}
        	z += 86400000
        }
        if(dataHoje <= dataInicio){
            porcentagemDias = 0
            diasRest = 100
            document.getElementById("myChartTitleL3_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
	    document.getElementById("myChartTitleL3_Pass").innerHTML = 0 + " dias passados"
	    document.getElementById("myChartTitleL3_Disp").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias totais disponíveis"
	    document.getElementById("myChartTitleL3_util").innerHTML = diasUteis2 + " dias uteis disponíveis"
        }else{
            if(dataHoje <= dataFim){
                diasTotais =  Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1)
                diasPassados = Math.floor((dataHoje - dataInicio) / (1000 * 60 * 60 * 24) + 1)
                porcentagemDias = diasPassados / diasTotais * 100
                diasRest = 100 - porcentagemDias
                document.getElementById("myChartTitleL3_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
                document.getElementById("myChartTitleL3_Pass").innerHTML = diasPassados + " dias passados"
                document.getElementById("myChartTitleL3_Disp").innerHTML = diasTotais - diasPassados + " dias totais disponíveis"
                document.getElementById("myChartTitleL3_util").innerHTML = diasUteis + " dias uteis disponíveis"
            }else{
            	document.getElementById("myChartTitleL3_pz").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias de prazo"
        	document.getElementById("myChartTitleL3_Pass").innerHTML = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1) + " dias passados"
        	document.getElementById("myChartTitleL3_Disp").innerHTML = 0 + " dias totais disponíveis"
        	document.getElementById("myChartTitleL3_util").innerHTML = 0 + " dias uteis disponíveis"
            }
        }
        
        

        //mostrar painel em caso de linha ativa
        document.getElementById('myChartLinha03').style.display = "block"

        //nome da linha
	    document.getElementById("myChartANV3").innerHTML = "LINHA 03 ANV " + db.nANV


        //GRÁFICO DE ANDAMENTO DOS CARTÕES
        const ctx = document.getElementById('myChart7');
        const data = {
            labels: [
                dbConfig.chave00[2],
                dbConfig.chave00[3],
                dbConfig.chave00[4],
                dbConfig.chave00[5],
                dbConfig.chave00[6],
                dbConfig.chave00[7],
                dbConfig.chave00[8],
                dbConfig.chave00[9],
                dbConfig.chave00[10],
                dbConfig.chave00[11],
            ],
            datasets: [{
                label: 'Cartões de trabalho',
                data: [
                    occurrences[dbConfig.chave00[2]],
                    occurrences[dbConfig.chave00[3]],
                    occurrences[dbConfig.chave00[4]],
                    occurrences[dbConfig.chave00[5]],
                    occurrences[dbConfig.chave00[6]],
                    occurrences[dbConfig.chave00[7]],
                    occurrences[dbConfig.chave00[8]],
                    occurrences[dbConfig.chave00[9]],
                    occurrences[dbConfig.chave00[10]],
                    occurrences[dbConfig.chave00[11]],
                ],
                backgroundColor: [
		        '#f77',
		        '#2E8B57',
		        '#FFD700',
		        '#9fcd9f',
		        '#fff',
		        '#e2e1e1',
		        '#599cf3',
		        '#a175f8',
		        '#F00',
		        '#BC8F8F'
                ],
                borderColor: [
                 	'#f77',
		        '#2E8B57',
		        '#FFD700',
		        '#9fcd9f',
		        '#ccc',
		        '#e2e1e1',
		        '#599cf3',
		        '#a175f8',
		        '#F00',
		        '#BC8F8F'
                ],
                borderWidth: 1,
                barPercentage: 1,
                barThickness: 20,
                maxBarThickness: 20,
                minBarLength: 2,
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
	    	responsive: true
	    },
        });


        //GÁFICO DE ANDAMENTO DAS INSPEÇÕES
        const ctx2 = document.getElementById('myChart8');									
        const data2 = {
            labels: [
                'AGUARDANDO',
                'ENCERRADAS',
            ],
            datasets: [{
                label: 'Percentual',
                data: [emAndamento, percentual],
                backgroundColor: [
                '#EEE',
                '#2E8B00',
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx2, {
            type: 'doughnut',
            data: data2,
        });

        //PRAZOS DE INSPEÇÃO
        const ctx3 = document.getElementById('myChart9');							
        const data3 = {
            labels: [
                'dias restantes',
                'dias passados'
            ],
            datasets: [{
                label: 'Percentual',
                data: [diasRest, porcentagemDias],
                backgroundColor: [
                '#EEE',
                'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx3, {
            type: 'doughnut',
            data: data3,
        });
    } 
}
//---------------------------------------------------------------
//---------------------------------------------------------------
