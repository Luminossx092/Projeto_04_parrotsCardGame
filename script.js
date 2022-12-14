let baralho = [];
let ultimaCartaSelecionadaString;
let ultimaCartaSelecionada;
let jogadorNaoPodeClicar = false;
let contadorJogadas;
let tempo;
let intervalID;
const elementoTempo = document.querySelector(".Tempo");
const parrots = ["bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot"]

SetupJogo();

function SetupJogo() {
    baralho = [];
    contadorJogadas = 0;
    ultimaCartaSelecionadaString = "";
    ultimaCartaSelecionada = undefined;
    let cartasJogadorEscolheu = Number(prompt("Com quantas cartas quer jogar?"));
    let SeJogadorTiverEscolherDeNovo = (cartasJogadorEscolheu < 4 || cartasJogadorEscolheu > 14 || (cartasJogadorEscolheu % 2 == 1));
    while (SeJogadorTiverEscolherDeNovo) {
        cartasJogadorEscolheu = Number(prompt("Com quantas cartas quer jogar?"));
        SeJogadorTiverEscolherDeNovo = (cartasJogadorEscolheu < 4 || cartasJogadorEscolheu > 14 || (cartasJogadorEscolheu % 2 == 1));
    }
    tempo = 0;
    intervalID = setInterval(ContadorTempo, 1000 );
    CriarCartas(cartasJogadorEscolheu);
}
function CriarCartas(numeroCartas) {
    parrots.sort(comparador);
    for (let j = 0; j < numeroCartas; j++) {
        baralho.push(parrots[Math.floor(j / 2)]);
    }
    baralho.sort(comparador);
    const listaCartas = document.querySelector("ul");
    for (let i = 0; i < numeroCartas; i++) {
        listaCartas.innerHTML += `<li onclick="virar(this)" class="Carta ${baralho[i]}">
        <div class="FaceCarta FrenteCarta">
            <img src="./Images/${baralho[i]}.gif">
        </div>
        <div class="FaceCarta VersoCarta">
            <img src="./Images/back.png">
        </div>
        </li>`
    }
}

function comparador() {
    return Math.random() - 0.5;
}
function virar(elemento) {
    if(jogadorNaoPodeClicar){
        return;
    }
    if (!elemento.classList.contains("virada")) {
        let cartaClass;
        for (let i = 0; i < parrots.length; i++) {
            if (elemento.classList.contains(parrots[i])) {
                cartaClass = parrots[i];
            }
        }
        elemento.classList.toggle("virada");
        if (ultimaCartaSelecionadaString == "") {
            ultimaCartaSelecionadaString = cartaClass;
            ultimaCartaSelecionada = elemento;
        }
        else {
            contadorJogadas++;
            jogadorNaoPodeClicar = true;
            
            if (ultimaCartaSelecionadaString == cartaClass) {
                setTimeout(function(){jogadorNaoPodeClicar = false}, 500);
                ultimaCartaSelecionadaString = "";
                ultimaCartaSelecionada = undefined;
                VerificarGameOver();
            }
            else {
                setTimeout(function(){jogadorNaoPodeClicar = false}, 1000);
                setTimeout(VirarCartasSelecionadaEUltimaSelecionada, 1000, elemento)
            }
        }
    }
}
function VirarCartasSelecionadaEUltimaSelecionada(carta1) {
    carta1.classList.remove("virada")
    ultimaCartaSelecionada.classList.remove("virada");
    ultimaCartaSelecionadaString = "";
    ultimaCartaSelecionada = undefined;
}
function VerificarGameOver() {
    const lista = document.querySelectorAll(".virada")
    if (lista.length == baralho.length) {
        clearInterval(intervalID);
        setTimeout(AlertaGameOverEJogarNovamente, 700);
    }
}
function AlertaGameOverEJogarNovamente() {
    alert(`Voc?? ganhou em ${Number(contadorJogadas)} jogadas e ${tempo} segundos!`);
    const JogarNovamente = prompt("Quer jogar novamente?");
    if (JogarNovamente == "sim") {
        const listaCartasJogo = document.querySelectorAll(".Carta");
        for (let i = 0; i < listaCartasJogo.length; i++) {
            listaCartasJogo[i].remove();
        }
        SetupJogo();
    }
    else if(JogarNovamente == "n??o"){
        alert(":/");
    }
}
function ContadorTempo(elemento){
    tempo++;
    let minutos = Math.floor(tempo/60);
    if(minutos == 0){
        elementoTempo.innerHTML = tempo;
    }
    else {
        elementoTempo.innerHTML = minutos + ":" + (tempo%60);
    }
}