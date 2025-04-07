// -----------------------GRÁFICOS DA LINHA 01---------------------

async function graficosLinha01(){

    //verificar se está ativo
    const db = await loadTBCfgLin(1)

    if(db.status == "inativo"){
        document.getElementById('myChartLinha01').style.display = "none"
    }else{

        document.getElementById('myChartLinha01').style.display = "block"
        //ANDAMENTO DOS CARTÕES
        const ctx = document.getElementById('myChart');
        const data = {
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

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
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