let numero_jogadores;
let jogadores = [];


//classe da carta
class Carta {
    constructor(naipe, valor) {
        this.valor = 0;
        this.naipe = 0;
    }
}

function criaBaralho() {
    let baralho = [];
    for (let l = 0; l < 52; l++) {
            let valor = l % 13
            let naipe = l % 4
                baralho[l] = new Carta;
                baralho[l].naipe = naipe;
                baralho[l].valor = valor;
    }
    return baralho;
}



function cartaAleatoria(size) {
    return Math.floor(Math.random() * (size)) ;
}

let baralho = criaBaralho();
//mostrando as cartas comunitarias
console.log(baralho);
console.log(baralho.length);
let random = cartaAleatoria(baralho.length)

let cartaParaRemover = baralho[random]; // Carta a ser removida

console.log(baralho[random]);

// Filtrando o baralho para excluir a carta
baralho = baralho.filter(carta => carta.valor !== cartaParaRemover.valor || carta.naipe !== cartaParaRemover.naipe);

console.log(baralho);
console.log(baralho.length);