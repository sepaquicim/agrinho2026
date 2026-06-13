let registros = [];
let totalArvores = 0;

function setup() {

    let canvas = createCanvas(
        document.getElementById("grafico").offsetWidth,
        450
    );

    canvas.parent("grafico");

    carregarDados();

    noLoop();
}

function draw() {
    background(255);
    desenharGrafico();
}

function registrarPlantio() {

    const nome = document.getElementById("nome").value.trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    if (
        nome === "" ||
        isNaN(quantidade) ||
        quantidade <= 0
    ) {
        alert("Digite um nome e uma quantidade maior que zero.");
        return;
    }

    if (quantidade > 1000) {
        alert("Máximo permitido: 1000 árvores.");
        return;
    }

    registros.push({
        nome,
        quantidade,
        mes: new Date().getMonth()
    });

    salvarDados();
    atualizarTela();
    redraw();

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
}

function atualizarTela() {

    totalArvores = registros.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    document.getElementById("total").textContent =
        totalArvores;

    let historico = "";

    [...registros].reverse().forEach(item => {

        historico += `
        <div class="registro">
            🌳 <strong>${item.nome}</strong>
            plantou
            <strong>${item.quantidade}</strong>
            árvore(s)
        </div>
        `;
    });

    document.getElementById("historico").innerHTML =
        historico;
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

    const maiorValor =
        Math.max(...meses, 1);

    stroke(220);

    for(let y = 50; y < height - 50; y += 40){
        line(40, y, width - 20, y);
    }

    noStroke();
    fill(0);
    textSize(22);
    textAlign(CENTER);

    text(
        "Árvores Plantadas por Mês",
        width / 2,
        30
    );

    for(let i = 0; i < 12; i++){

        const altura = map(
            meses[i],
            0,
            maiorValor,
            0,
            height - 150
        );

        fill(46,125,50);

        rect(
            50 + i * 65,
            height - altura - 60,
            45,
            altura
        );

        fill(0);
        textSize(12);

        text(
            nomesMeses[i],
            72 + i * 65,
            height - 20
        );

        text(
            meses[i],
            72 + i * 65,
            height - altura - 70
        );
    }
}

function salvarDados() {

    localStorage.setItem(
        "plantios",
        JSON.stringify(registros)
    );
}

function carregarDados() {

    const dados =
        localStorage.getItem("plantios");

    if(dados){

        try{
            registros =
                JSON.parse(dados) || [];
        }catch{
            registros = [];
        }
    }

    atualizarTela();
}

function windowResized(){

    resizeCanvas(
        document.getElementById("grafico")
            .offsetWidth,
        450
    );

    redraw();
}
