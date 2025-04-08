// -----------------------GRÁFICOS DA LINHA 01---------------------

async function graficosLinha01(){

    //verificar se está ativo
    const dbConfig = await loadTBCfgLin(0)
    const db = await loadTBCfgLin(1)

    if(db.status == "inativo"){
        document.getElementById('myChartLinha01').style.display = "none"
    }else{
	
	const dbData =  [78, 50, 100, 50, 30, 57, 98, 42, 65, 23];
	
	document.getElementById("myChartANV").innerHTML = "LINHA 01 ANV " + db.nANV
	
        document.getElementById('myChartLinha01').style.display = "block"
        //ANDAMENTO DOS CARTÕES
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
                label: 'Cartões de inspeção',
                data: dbData,
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
		barPercentage: 0.5,
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

        //ANDAMENTO DAS INSPEÇÕES
        const ctx2 = document.getElementById('myChart2');									
        const data2 = {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
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
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
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
        document.getElementById('myChartLinha02').style.display = "block"
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
        document.getElementById('myChartLinha03').style.display = "block"
    } 
}

//---------------------------------------------------------------
//---------------------------------------------------------------
