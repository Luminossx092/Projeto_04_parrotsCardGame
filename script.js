let baralho = document.querySelector("ul");
let ultimaCartaSelecionada;
const parrots = ["bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot"]
//SetupJogo();
function SetupJogo() {
    let cartasJogadorEscolheu = Number(prompt("Com quantas cartas quer jogar?"));
    let SeJogadorTiverEscolherDeNovo = (cartasJogadorEscolheu < 4 || cartasJogadorEscolheu > 14 || (cartasJogadorEscolheu % 2 == 1));
    while (SeJogadorTiverEscolherDeNovo) {
        cartasJogadorEscolheu = Number(prompt("Com quantas cartas quer jogar?"));
        SeJogadorTiverEscolherDeNovo = (cartasJogadorEscolheu < 4 || cartasJogadorEscolheu > 14 || (cartasJogadorEscolheu % 2 == 1));
    }
    CriarCartas(cartasJogadorEscolheu);
}

function CriarCartas(numeroCartas) {
    parrots.sort(comparador);
    for (let i = 0; i < numeroCartas; i++) {
        baralho.innerHTML += `<li onclick="virar(this)" class="Carta ${parrots[Math.floor(i/2)]}">
        <div class="FaceCarta FrenteCarta">
            <img src="./Images/${parrots[Math.floor(i/2)]}.gif">
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
    if(ultimaCartaSelecionada != undefined){
        
    }
    elemento.classList.toggle("virada");

}