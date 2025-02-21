
    let rng = prompt("Digite a seed entre 0 e 1", Math.random());
 

    console.log(`Usando a seed: ${rng}`);

    // Aqui você pode refazer o baralho, distribuir cartas, etc., com base na nova seed
    //classe da carta
    class Carta {
        constructor(naipe, valor) {
    
            this.valor = valor;
            this.naipe = naipe;
    
        }
    
    
    }
    //classe do jogador
    class Jogador {
        constructor(c1, c2) {
            this.carta_1 = c1;
            this.carta_2 = c2;
        }
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
                    break
    
                case 3:
                    console.log(`Jogador [${i}] tem 1 trinca`);
                    break;
                case 2:
                    console.log(`Jogador [${i}] tem 2 pares`);
                    break;
                case 1:
                    console.log(`Jogador [${i}] tem 1 par`);
                    break;
    
                default:
                    console.log("sem jogos");
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
                if (jogadores[i].carta_2.naipe == comunitarias[j].naipe ) {
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
                
                for (let l = 0; l < flush.length-1; l++) {
                   if (flush[l].naipe == flush[l+1].naipe) {
                        flag = true
                   }else{
                        flag = false
                        break;
                   }
                }
                if (flag) {
                    console.log(`Jogador [${i}] tem flush`);
                    console.log(flush);
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
                if (comunitarias[j].valor == carta_anterior1.valor + 1 ) {
                    contador_sequencia ++;
                    carta_anterior1 = comunitarias[j];
                }
                
            }
            if (contador_sequencia == 5) {
                console.log(`Jogador [${i}] tem sequencia`);
            }
            contador_flush = 0;
        }
    }
    
    let numero_jogadores;
    let jogadores = [];
    let comunitarias = [];
    //pedindo a quantidade de jogadores
    do {
        alert("Coloque entre 1 e 9 jogadores")
        numero_jogadores = prompt("Digite a quantidade de jogadores");
    } while (numero_jogadores < 1 || numero_jogadores >= 10)
    
    //criando o baralho
    let baralho = criaBaralho();
    
    console.log(baralho);
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
    
        let random_1 = cartaAleatoria(baralho.length,rng)
        jogadores[j].carta_1 = baralho[random_1]
        baralho = cartaParaRemover(baralho, baralho[random_1])
    
    
        //criando o jogador e dando suas cartas
        let random_2 = cartaAleatoria(baralho.length, rng)
        jogadores[j].carta_2 = baralho[random_2]
        baralho = cartaParaRemover(baralho, baralho[random_2])
    }
    console.log(comunitarias);
    
    console.log(jogadores);
    
    Pares(jogadores, comunitarias)
    Flush(jogadores, comunitarias)
    console.log(baralho);
    console.log(baralho.length);
