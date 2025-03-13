const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const {Flush, Pares,Straight,cartaAleatoria,cartaParaRemover,criaBaralho,limparArquivo, salvarNoArquivo, escreveCarta}= require("./baralho/baralho.js");
const {Jogador, Carta} = require("./Classes/classes.js")


function jogo(seed, numero_jogadores) {
    const seedrandom = require("../node_modules/seedrandom")
    let rng = seedrandom(seed)

    salvarNoArquivo(`Usando a seed: ${seed}`);

    let jogadores = [];
    let comunitarias = [];
    let jFlush = new Jogador


    //criando o baralho
    let baralho = criaBaralho();

    
        let c1 = new Carta(1,2)
        let c2 = new Carta(1,3)
        let c3 = new Carta(1,5)
        let c4 = new Carta(3,6)
        let c5 = new Carta(2,5)
        baralho = cartaParaRemover(baralho, c1)
        baralho = cartaParaRemover(baralho, c2)
        baralho = cartaParaRemover(baralho, c3)
        baralho = cartaParaRemover(baralho, c4)
        baralho = cartaParaRemover(baralho, c5)


    // for (let i = 0; i < 2; i++) {
    //     let carta = cartaAleatoria(baralho.length,  rng())
    //     comunitarias[i] = baralho[carta];
    //     baralho = cartaParaRemover(baralho, baralho[carta])
    // }

    comunitarias.push(c1);
    comunitarias.push(c2);
    comunitarias.push(c3);
    comunitarias.push(c4);
    comunitarias.push(c5);

    let cf1 = new Carta(1,7)
    jFlush.carta_1 = cf1
    baralho = cartaParaRemover(baralho, cf1)

    let cf2 = new Carta(1,8)
    jFlush.carta_2 = cf2
    baralho = cartaParaRemover(baralho, cf2)




    
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

    jogadores.push(jFlush)
    
    console.log(comunitarias);
    for (let c = 0; c < comunitarias.length; c++) {
      salvarNoArquivo(`Carta[${c}]: ${escreveCarta(comunitarias[c].valor-1, comunitarias[c].naipe-1)} \t`);
    }

    console.log(jogadores);
    for (let j = 0; j < jogadores.length; j++) {
      salvarNoArquivo(`Jogador[${j}]: \nCarta 1: ${escreveCarta(jogadores[j].carta_1.valor - 1, jogadores[j].carta_1.naipe-1)} \nCarta 2: ${escreveCarta(jogadores[j].carta_2.valor-1, jogadores[j].carta_2.naipe-1)} `);
    }

    // Pares(jogadores, comunitarias)
    Flush(jogadores, comunitarias)
    // Straight(jogadores, comunitarias)

}

const rl = readline.createInterface({ input, output });



rl.question("Deseja limpar o arquivo de saída antes de começar? (s/n): ", (resposta) => {
    if (resposta.toLowerCase() === "s") {
      limparArquivo();
    }
    rl.close();
  
    // Executa os jogos após a resposta do usuário
    for (let i = 0; i < 10000; i++) {
      salvarNoArquivo(`Jogo ${i} \n`);
      jogo(Math.random(), 8);
      salvarNoArquivo(`=====================================================================================`);
    }
  });



