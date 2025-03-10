const fs = require('fs')

//classe da carta
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

function salvarNoArquivo(texto) {
    fs.appendFileSync('saida_jogo.txt', texto + '\n', 'utf8');
}
function limparArquivo() {
    fs.writeFileSync('saida_jogo.txt', '', 'utf8'); 
}

function seedToNumber(seed) {
    let hash = 0;
    for (let i = 0; i < seed.toString().length; i++) {
        hash = (hash * 31 + seed.toString().charCodeAt(i)) & 0x7FFFFFFF; // Mantém número positivo
    }
    return (hash % 100000) / 100000; // Garante um valor entre 0 e 1
}


//funcao que cria o baralho
function criaBaralho() {
    let baralho = [];
    for (let l = 0; l < 52; l++) {
        let valor = 1 + (l % 13)
        let naipe = 1 + (l % 4)
        baralho[l] = new Carta(naipe, valor);
        // baralho[l].naipe = naipe;
        // baralho[l].valor = valor;
    }

    return baralho;
}

//função que pega um valor aleatoria
function cartaAleatoria(size, rng) {
    return Math.floor(rng * (size));
}

//função que remove a carta
function cartaParaRemover(baralho, cartaRemover) {
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
        }
        switch (contador) {
            case 4:
                console.log(`Jogador [${i}] tem 1 quadra`);
                salvarNoArquivo(`Jogador [${i}] tem 1 quadra`);
                break

            case 3:
                console.log(`Jogador [${i}] tem 1 trinca`);
                salvarNoArquivo(`Jogador [${i}] tem 1 trinca`);
                break;
            case 2:
                console.log(`Jogador [${i}] tem 2 pares`);
                salvarNoArquivo(`Jogador [${i}] tem 2 pares`);
                break;
            case 1:
                console.log(`Jogador [${i}] tem 1 par`);
                salvarNoArquivo(`Jogador [${i}] tem 1 par`);
                break;

            default:
                console.log("sem jogos");
                // salvarNoArquivo("sem jogos");
                break;
        }
        contador = 0;
    }
}

function Flush(jogadores, comunitarias) {
    let contador_flush = 0;
    let flush = []
    for (let i = 0; i < jogadores.length; i++) {
        for (let j = 0; j < comunitarias.length; j++) {
            if (jogadores[i].carta_2.naipe == comunitarias[j].naipe) {
                contador_flush += 1
                flush[j] = jogadores[i].carta_2
            }
            if (jogadores[i].carta_1.naipe == comunitarias[j].naipe) {
                contador_flush += 1
                flush[j] = jogadores[i].carta_1
            }
        }
        if (contador_flush == 5) {
            let flag = false
            console.log(flush);
            salvarNoArquivo(flush);

            for (let l = 0; l < flush.length - 1; l++) {
                if (flush[l].naipe == flush[l + 1].naipe) {
                    flag = true
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
        contador_flush = 0;
    }
}

function jogo(seed, numero_jogadores) {

    let rng = seedToNumber(seed)
    console.log("Rng: ", rng);

    console.log(`Usando a seed: ${seed}`);
    salvarNoArquivo(`Usando a seed: ${seed}`);

    let jogadores = [];
    let comunitarias = [];


    //criando o baralho
    let baralho = criaBaralho();

    // console.log(baralho);
    console.log(baralho.length);

    //mostrando as cartas comunitarias
    //TODO faer um sistema de sementes
    for (let i = 0; i < 5; i++) {
        let carta = cartaAleatoria(baralho.length, rng)
        comunitarias[i] = baralho[carta];
        baralho = cartaParaRemover(baralho, baralho[carta])
    }

    //dando as cartas dos jogadores
    for (let j = 0; j < numero_jogadores; j++) {
        //pegando duas cartas aleatorias
        jogadores[j] = new Jogador;

        let random_1 = cartaAleatoria(baralho.length, rng)
        jogadores[j].carta_1 = baralho[random_1]
        baralho = cartaParaRemover(baralho, baralho[random_1])


        //criando o jogador e dando suas cartas
        let random_2 = cartaAleatoria(baralho.length, rng)
        jogadores[j].carta_2 = baralho[random_2]
        baralho = cartaParaRemover(baralho, baralho[random_2])
    }
    console.log(comunitarias);
    salvarNoArquivo(comunitarias);

    console.log(jogadores);
    salvarNoArquivo(jogadores);

    Pares(jogadores, comunitarias)
    Flush(jogadores, comunitarias)
    Straight(jogadores, comunitarias)
    console.log(baralho);   

    console.log(baralho.length);
}

// let seed = prompt("Digite a seed entre 0 e 1", Math.random());
// let num_jogadores;
// do {
//     alert("Coloque entre 1 e 9 jogadores")
//     num_jogadores = prompt("Digite a quantidade de jogadores");
// } while (num_jogadores < 1 || num_jogadores >= 10)

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Deseja limpar o arquivo de saída antes de começar? (s/n): ", (resposta) => {
    if (resposta.toLowerCase() === "s") {
      limparArquivo();
    }
    rl.close();
  
    // Executa os jogos após a resposta do usuário
    for (let i = 0; i < 10000000; i++) {
      salvarNoArquivo(`Jogo ${i} \n`);
      jogo(Math.random(), 9);
      salvarNoArquivo(`=====================================================================================`);
    }
  });



