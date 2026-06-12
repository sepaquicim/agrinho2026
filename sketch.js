let registros = [];
let totalArvores = 0;

function setup() {

    let canvas = createCanvas(900, 450);

    canvas.parent("grafico");

    carregarDados();
}

function draw() {

    background(255);

    desenharGrafico();
}

function registrarPlantio() {

    const nome =
        document.getElementById("nome").value;

    const quantidade =
        Number(
            document.getElementById("quantidade").value
        );

   if (nome.trim() === "" || quantidade <= 0 || isNaN(quantidade)) {
    alert("Digite um nome e uma quantidade maior que zero.");
    return;
}

    registros.push({

        nome: nome,
        quantidade: quantidade,
        mes: new Date().getMonth()

    });

    salvarDados();

    atualizarTela();

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
}

function atualizarTela() {

    totalArvores = registros.reduce(

        (total, item) =>
        total + item.quantidade,

        0

    );

    document.getElementById("total")
        .innerHTML = totalArvores;

    let historico = "";

    registros
        .slice()
        .reverse()
        .forEach(item => {

            historico += `
            <div class="registro">
                🌳 <strong>${item.nome}</strong>
                plantou
                <strong>${item.quantidade}</strong>
                árvore(s)
            </div>
            `;
        });

    document.getElementById("historico")
        .innerHTML = historico;
}

function desenharGrafico() {

    const meses = new Array(12).fill(0);

    registros.forEach(item => {

        meses[item.mes] += item.quantidade;

    });

    const nomesMeses = [
        "Jan","Fev","Mar","Abr",
        "Mai","Jun","Jul","Ago",
        "Set","Out","Nov","Dez"
    ];

    stroke(220);

    for(let y=50; y<height-50; y+=40){
        line(40,y,width-20,y);
    }

    noStroke();

    fill(0);

    textSize(22);

    textAlign(CENTER);

    text(
        "Árvores Plantadas por Mês",
        width/2,
        30
    );

    for(let i=0;i<12;i++){

        let altura =
            meses[i] * 5;

        fill(46,125,50);

        rect(

            50 + i*70,

            height - altura - 60,

            50,

            altura

        );

        fill(0);

        textSize(12);

        text(

            nomesMeses[i],

            75 + i*70,

            height - 20

        );

        text(

            meses[i],

            75 + i*70,

            height - altura - 70

        );

    }

}

function salvarDados(){

    localStorage.setItem(
        "plantios",
        JSON.stringify(registros)
    );

}

function carregarDados(){

    const dados =
        localStorage.getItem("plantios");

    if(dados){

        registros =
            JSON.parse(dados);

    }

    atualizarTela();

}
