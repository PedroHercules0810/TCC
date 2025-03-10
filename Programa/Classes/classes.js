class Carta {
    constructor(naipe, valor) {

        this.valor = valor;
        this.naipe = naipe;

    }
}
class Jogador {
    constructor(c1, c2) {
        this.carta_1 = c1;
        this.carta_2 = c2;
    }
}

module.exports = {Jogador, Carta}