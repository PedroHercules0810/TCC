const fs = require('fs');
const set = require("../Classes/classes");
const { log } = require('console');
const { loadavg } = require('os');

function removerDoisMenores(array) {
    return array.sort((a, b) => a - b).slice(2);
}

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
        }
        contador = 0;
    }
}






function StraightFlush(jogadores, comunitarias) {
    for (let j = 0; j < jogadores.length; j++) {
        let flush = [];

        const filtrarRepetidos = arr => {
            const contagem = arr.reduce((acc, carta) => {
                acc[carta.naipe] = (acc[carta.naipe] || 0) + 1;
                return acc;
            }, {});

            return arr.filter(carta => contagem[carta.naipe] > 3);
        };


        flush = comunitarias.map(carta => carta);

        flush.push(jogadores[j].carta_1, jogadores[j].carta_2);


        flush = filtrarRepetidos(flush);

        let temFlush = false;
        if (flush.length >= 5) {
            const naipeBase = flush[0].naipe;
            temFlush = flush.every(carta => carta.naipe === naipeBase);

            
            if (temFlush) {
                console.log(`Jogador [${j}] tem flush!`);
                salvarNoArquivo(`Jogador [${j}] tem flush!`);
            }
        }
        //==============================================/=================================================================
        let sequencia = []
        sequencia.push(jogadores[j].carta_1)
        sequencia.push(jogadores[j].carta_2)
        
        sequencia = sequencia.concat(comunitarias)
        
        sequencia.sort((a, b) => a.valor - b.valor).slice(2);
        flush.sort((a, b) => a.valor - b.valor).slice(2);
        
        if (flush.length >= 5) {
            if (flush[0].valor == 9 && flush[1].valor == 10 && flush[2].valor == 11 && flush[3].valor == 12 && flush[4].valor == 13) {
                salvarNoArquivo(`Jogador [${j}] Tem umm Royal Straight Flush!!!!!`);
                break;
            }
        }

        let contadorSF = 1;
        for (let i = 1; i < flush.length; i++) {

            if (flush[i].valor === flush[i - 1].valor + 1) {
                contadorSF++;
                if (contadorSF >= 5) {
                    console.log(`Jogador [${j}] tem sequência do mesmo Naipe!`);
                    salvarNoArquivo(`Jogador [${j}] tem sequência do mesmo Naipe!`);
                    break;
                }
            }
            else {
                contadorSF = 1;
            }
        }

        let contador = 1;
        for (let i = 1; i < sequencia.length; i++) {

            if (sequencia[i].valor === sequencia[i - 1].valor + 1) {
                contador++;
                if (contador >= 5) {
                    console.log(`Jogador [${j}] tem sequência!`);
                    salvarNoArquivo(`Jogador [${j}] tem sequência!`);
                    break;
                }
            }
            else {
                contador = 1;
            }
        }
    }

}

module.exports = { Pares, StraightFlush, cartaAleatoria, cartaParaRemover, criaBaralho, limparArquivo, salvarNoArquivo, escreveCarta }