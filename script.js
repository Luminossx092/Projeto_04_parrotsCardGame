let baralho = [];
let ultimaCartaSelecionadaString = "";
let ultimaCartaSelecionada;
let contadorJogadas = 0;
const parrots = ["bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot"]

SetupJogo();

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
    if(elemento.classList.contains("virada")){
    
    }
    else{
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
            if (ultimaCartaSelecionadaString == cartaClass) {    
                ultimaCartaSelecionadaString = "";
                ultimaCartaSelecionada = undefined;
                VerificarGameOver();
            }
            else {
                //espera um tempo
                elemento.classList.remove("virada")
                ultimaCartaSelecionada.classList.remove("virada");
                ultimaCartaSelecionadaString = "";
                ultimaCartaSelecionada = undefined;
            }
        }
    }
    

}
function VerificarGameOver(){
    const lista = document.querySelectorAll(".virada")
    if(lista.length == baralho.length){
        //delay
        alert(`Você ganhou em ${Number(contadorJogadas)} jogadas!`);
        const JogarNovamente = prompt("Quer jogar novamente?");
        if(JogarNovamente == "Sim"){
            Location.reload();
        }
    }
}