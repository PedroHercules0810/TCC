

function jogo(seed, numero_jogadores) {
  // const fs = require('fs')
  const classes =  require("./Classes/classes.js")
  const readline = require("readline")
  const {Flush, Pares,Straight,cartaAleatoria,cartaParaRemover,criaBaralho,limparArquivo, salvarNoArquivo}= require("./baralho/baralho.js");
  const seedrandom = require("../seedrandom")

    let rng = seedrandom(seed)
    //console.log("Rng: ", rng);

    //console.log(`Usando a seed: ${seed}`);
    salvarNoArquivo(`Usando a seed: ${seed}`);

    let jogadores = [];
    let comunitarias = [];


    //criando o baralho
    let baralho = criaBaralho(rng);

    //console.log(baralho);
    //console.log(baralho.length);

    //mostrando as cartas comunitarias
    //TODO faer um sistema de sementes
    for (let i = 0; i < 5; i++) {
        let carta = cartaAleatoria(baralho.length,  rng, i)
        comunitarias[i] = baralho[carta];
        baralho = cartaParaRemover(baralho, baralho[carta])
    }

    //dando as cartas dos jogadores
    for (let j = 0; j < numero_jogadores; j++) {
        //pegando duas cartas aleatorias
        jogadores[j] = new Jogador;

        let random_1 = cartaAleatoria(baralho.length, rng, j)
        jogadores[j].carta_1 = baralho[random_1]
        baralho = cartaParaRemover(baralho, baralho[random_1])


        //criando o jogador e dando suas cartas
        let random_2 = cartaAleatoria(baralho.length, rng, j)
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
    //console.log(baralho);   

    //console.log(baralho.length);
}

// let seed = prompt("Digite a seed entre 0 e 1", Math.random());
// let num_jogadores;
// do {
//     alert("Coloque entre 1 e 9 jogadores")
//     num_jogadores = prompt("Digite a quantidade de jogadores");
// } while (num_jogadores < 1 || num_jogadores >= 10)

 rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Deseja limpar o arquivo de saída antes de começar? (s/n): ", (resposta) => {
    if (resposta.toLowerCase() === "s") {
      limparArquivo();
    }
    rl.close();
  
    // Executa os jogos após a resposta do usuário
    for (let i = 0; i < 5; i++) {
      salvarNoArquivo(`Jogo ${i} \n`);
      jogo(Math.random(), 5);
      salvarNoArquivo(`=====================================================================================`);
    }
  });



