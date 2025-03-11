
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const {Flush, Pares,Straight,cartaAleatoria,cartaParaRemover,criaBaralho,limparArquivo, salvarNoArquivo, escreveCarta}= require("./baralho/baralho.js");
const seedrandom = require("../node_modules/seedrandom")
const {Jogador} = require("./Classes/classes.js")


function jogo(seed, numero_jogadores) {
    let rng = seedrandom(seed)

    salvarNoArquivo(`Usando a seed: ${seed}`);

    let jogadores = [];
    let comunitarias = [];


    //criando o baralho
    let baralho = criaBaralho();

    for (let i = 0; i < 5; i++) {
        let carta = cartaAleatoria(baralho.length,  rng())
        comunitarias[i] = baralho[carta];
        baralho = cartaParaRemover(baralho, baralho[carta])
    }

    //dando as cartas dos jogadores
    for (let j = 0; j < numero_jogadores; j++) {
        //pegando duas cartas aleatorias
        jogadores[j] = new Jogador;

        let random_1 = cartaAleatoria(baralho.length, rng())
        jogadores[j].carta_1 = baralho[random_1]
        baralho = cartaParaRemover(baralho, baralho[random_1])


        //criando o jogador e dando suas cartas
        let random_2 = cartaAleatoria(baralho.length, rng())
        jogadores[j].carta_2 = baralho[random_2]
        baralho = cartaParaRemover(baralho, baralho[random_2])
    }
    console.log(comunitarias);
    for (let c = 0; c < comunitarias.length; c++) {
      salvarNoArquivo(`Carta[${c}]: ${escreveCarta(comunitarias[c].valor-1, comunitarias[c].naipe-1)} \t`);
    }

    console.log(jogadores);
    for (let j = 0; j < jogadores.length; j++) {
      salvarNoArquivo(`Jogador[${j}]: \nCarta 1: ${escreveCarta(jogadores[j].carta_1.valor - 1, jogadores[j].carta_1.naipe-1)} \nCarta 2: ${escreveCarta(jogadores[j].carta_2.valor-1, jogadores[j].carta_2.naipe-1)} `);
    }

    Pares(jogadores, comunitarias)
    Flush(jogadores, comunitarias)
    Straight(jogadores, comunitarias)

}

const rl = readline.createInterface({ input, output });



rl.question("Deseja limpar o arquivo de saída antes de começar? (s/n): ", (resposta) => {
    if (resposta.toLowerCase() === "s") {
      limparArquivo();
    }
    rl.close();
  
    // Executa os jogos após a resposta do usuário
    for (let i = 0; i < 1; i++) {
      salvarNoArquivo(`Jogo ${i} \n`);
      jogo(0.8342737088169092, 9);
      salvarNoArquivo(`=====================================================================================`);
    }
  });



