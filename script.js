SetupJogo();
function SetupJogo() {
    let cartasJogadorEscolheu = Number(prompt("Com quantas cartas quer jogar?"));
    let SeJogadorTiverEscolherDeNovo = (cartasJogadorEscolheu < 4 || cartasJogadorEscolheu > 14 || (cartasJogadorEscolheu % 2 == 1));
    while (SeJogadorTiverEscolherDeNovo) {
        cartasJogadorEscolheu = Number(prompt("Com quantas cartas quer jogar?"));
        SeJogadorTiverEscolherDeNovo = (cartasJogadorEscolheu < 4 || cartasJogadorEscolheu > 14 || (cartasJogadorEscolheu % 2 == 1));
    }
}
function virar(elemento) {
    elemento.classList.toggle("virada");
}