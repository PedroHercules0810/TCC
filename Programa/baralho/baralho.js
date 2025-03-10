import fs from 'fs';
import * as set from "../Classes/classes.js"

export function salvarNoArquivo(texto) {
    fs.appendFileSync('saida_jogo.txt', texto + '\n', 'utf8');
}
export function limparArquivo() {
    fs.writeFileSync('saida_jogo.txt', '', 'utf8');
}

export function seedToNumber(seed) {
    seed *= Math.random();
    let hash = 0;
    for (let i = 0; i < seed.toString().length; i++) {
        hash = (hash * 31 + seed.toString().charCodeAt(i)) & 0x7FFFFFFF; // Mantém número positivo
    }
    return (hash % 100000) / 100000; // Garante um valor entre 0 e 1
}

//funcao que cria o baralho
export function criaBaralho() {
    let baralho = [];
    for (let l = 0; l < 52; l++) {
        let valor = 1 + (l % 13)
        let naipe = 1 + (l % 4)
        baralho[l] = new set.Carta(naipe, valor);
    }

    return baralho;
}

//função que pega um valor aleatoria
export function cartaAleatoria(size, rng) {
    return Math.floor(rng * (size));
}

//função que remove a carta
export function cartaParaRemover(baralho, cartaRemover) {
    return baralho.filter(carta => carta.valor !== cartaRemover.valor || carta.naipe !== cartaRemover.naipe)
}

export function Pares(jogadores, comunitarias) {
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


export function Flush(jogadores, comunitarias) {
    let contador_flush = 0;
    let flush = []
    for (let i = 0; i < jogadores.length; i++) {


        
        for (let j = 0; j < comunitarias.length; j++) {
            if (jogadores[i].carta_2.naipe == comunitarias[j].naipe) {
                contador_flush = contador_flush + 1;
                flush[j] = jogadores[i].carta_2
            }
            if (jogadores[i].carta_1.naipe == comunitarias[j].naipe) {
                contador_flush = contador_flush + 1;
                flush[j] = jogadores[i].carta_1
            }
        }

        /*
        if (contador_flush == 4){
            salvarNoArquivo(`mão 1: ${jogadores[i].carta_1.naipe}`);
            salvarNoArquivo(`mão 2: ${jogadores[i].carta_2.naipe}`);

            comunitarias.forEach((i, index) => {
                salvarNoArquivo(`comunitaria ${index}: ${i.naipe}`);
            });
        }*/

        if (contador_flush == 5) {
            let flag = false
            console.log(flush);

            for (let l = 0; l < flush.length - 1; l++) {
                if (flush[l].naipe == flush[l + 1].naipe) {
                    flag = true
                    salvarNoArquivo(`Jogador [${i}] tem flush`);
                } else {
                    flag = false
                    break;
                }
            }
            if (flag) {
                console.log(`Jogador [${i}] tem flush`);
                salvarNoArquivo(`Jogador [${i}] tem flush`);
                console.log(flush);
                salvarNoArquivo(flush);

            }

        }
        contador_flush = 0;
    }
}

export function Straight(jogadores, comunitarias) {
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

module.exports = {Flush, Pares,Straight,cartaAleatoria,cartaParaRemover,criaBaralho,limparArquivo, salvarNoArquivo}