const fs = require('fs');
const set = require("../Classes/classes")

function salvarNoArquivo(texto) {
    fs.appendFileSync('saida_jogo.txt', texto + '\n', 'utf8');
}
function limparArquivo() {
    fs.writeFileSync('saida_jogo.txt', '', 'utf8');
}


function escreveCarta(valor, naipe) {
    let valores = [2, 3, 4, 5, 6, 7, 8, 9, 10, "valete", "Dama", "Rei", "Ás"]
    let naipes = ["Paus", "Copas", "Espadas", "Ouros"]

    return (`${valores[valor]} de ${naipes[naipe]}`)
}

//funcao que cria o baralho
function criaBaralho() {
    let baralho = [];
    for (let l = 0; l < 52; l++) {
        let valor = 1 + (l % 13)
        let naipe = 1 + (l % 4)
        baralho[l] = new set.Carta(naipe, valor);
    }

    return baralho;
}

//função que pega um valor aleatoria
function cartaAleatoria(size, rng) {
    return Math.floor(rng * (size));
}

//função que remove a carta
function cartaParaRemover(baralho, cartaRemover) {
    if (!cartaRemover) {
        console.error("Erro: cartaRemover está indefinida!", baralho);
        return baralho;
    }
    return baralho.filter(carta => carta.valor !== cartaRemover.valor || carta.naipe !== cartaRemover.naipe)
}

function Pares(jogadores, comunitarias) {
    let contador = 0;

    for (let i = 0; i < jogadores.length; i++) {
        for (let j = 0; j < comunitarias.length; j++) {
            if (jogadores[i].carta_2.valor == comunitarias[j].valor) {
                contador += 1
            }
            if (jogadores[i].carta_1.valor == comunitarias[j].valor) {
                contador += 1
            }
            if (jogadores[i].carta_1.valor == jogadores[i].carta_2.valor) {
                contador += 1
            }
        }
        console.log(contador);
        switch (contador) {
            case 4:

                salvarNoArquivo(`Jogador [${i}] tem 1 quadra`);
                break;

            case 3:
                //console.log(`Jogador [${i}] tem 1 trinca`);
                salvarNoArquivo(`Jogador [${i}] tem 1 trinca`);
                break;
            case 2:
                //console.log(`Jogador [${i}] tem 2 pares`);
                salvarNoArquivo(`Jogador [${i}] tem 2 pares`);
                break;
            case 1:
                //console.log(`Jogador [${i}] tem 1 par`);
                salvarNoArquivo(`Jogador [${i}] tem 1 par`);
                break;

            default:
                //console.log("sem jogos");
                // salvarNoArquivo("sem jogos");
                break;
        }
        contador = 0;
    }
}


function Flush(jogadores, comunitarias) {
    for (let i = 0; i < jogadores.length; i++) {
        let flush = [];
        for (let j = 0; j < comunitarias.length; j++) {
            if (jogadores[i].carta_2?.naipe === comunitarias[j]?.naipe) {
                flush.push(jogadores[i].carta_2); // Adiciona ao final do array (sem índice `j`)
            }
            if (jogadores[i].carta_1?.naipe === comunitarias[j]?.naipe) {
                flush.push(jogadores[i].carta_1);
            }
        }

        flush = flush.concat(comunitarias);

        if (flush.length >= 5) {
            const naipeBase = flush[0]?.naipe;
            const temFlush = flush.every(carta => carta?.naipe === naipeBase);

            if (temFlush) {
                console.log(`Jogador [${i}] tem flush`);
                salvarNoArquivo(`Jogador [${i}] tem flush`);

                for (let f = 0; f < flush.length; f++) {
                    if (flush[f]) {
                        salvarNoArquivo(`\n ${escreveCarta(flush[f].valor - 1, flush[f].naipe - 1)}, `);
                    }
                }
            }
        }
    }
}



function Straight(jogadores, comunitarias) {
    let contador_sequencia = 0;
    for (let i = 0; i < jogadores.length; i++) {
        for (let j = 0; j < comunitarias.length; j++) {
            let carta_anterior1 = jogadores[i].carta_1
            let carta_anterior2 = jogadores[i].carta_2
            if (comunitarias[j].valor == carta_anterior1.valor + 1) {
                contador_sequencia++;
                carta_anterior1 = comunitarias[j];
            }

        }
        if (contador_sequencia == 5) {
            console.log(`Jogador [${i}] tem sequencia`);
            salvarNoArquivo(`Jogador [${i}] tem sequencia`);
        }
        contador_sequencia = 0;
    }
}

module.exports = { Flush, Pares, Straight, cartaAleatoria, cartaParaRemover, criaBaralho, limparArquivo, salvarNoArquivo, escreveCarta }