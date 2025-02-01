

//classe da carta
class Carta {
    constructor(naipe, valor) {
        
        this.valor = valor;
        this.naipe = naipe;
        
    }
    
    
}
//classe do jogador
class Jogador{
    constructor(c1, c2){
        this.carta_1 = c1;
        this.carta_2 = c2;
    }
}

//funcao que cria o baralho
function criaBaralho() {
    let baralho = [];
    for (let l = 0; l < 52; l++) {
        let valor = 1+(l % 13) 
        let naipe = 1+ (l % 4)
        baralho[l] = new Carta;
        baralho[l].naipe = naipe;
        baralho[l].valor = valor;
    }
    
    return baralho;
}

//função que pega um valor aleatoria
function cartaAleatoria(size) {
    return Math.floor(Math.random() * (size)) ;
}

//função que remove a carta
function cartaParaRemover(baralho, cartaRemover) {
    return baralho.filter(carta => carta.valor !== cartaRemover.valor || carta.naipe !== cartaRemover.naipe)
}

function Pares(jogadores, comunitarias) {

    let contador = 0 ;
    for (let i = 0; i < jogadores.length; i++) {
        for (let j = 0; j < comunitarias.length; j++) {
            if(jogadores[i].carta_1.valor == comunitarias[j].valor && jogadores[i].carta_2.valor == comunitarias[j].valor){
                contador += 2
            }
            if(jogadores[i].carta_1.valor == comunitarias[j].valor || jogadores[i].carta_2.valor == comunitarias[j].valor){
                contador += 1
            }  
        } 
        switch (contador) {
            case 1:
                console.log(`Jogador [${i}] tem 1 par`);
                break;
            case 2:
                console.log(`Jogador [${i}] tem 2 pares`);
            break;

            case 3:
                console.log(`Jogador [${i}] tem 1 trinca`);
            break;

            case 4:
                console.log(`Jogador [${i}] tem 1 quadra`);
            break
            default:
                console.log("sem jogos");
                
                break;
        }
        contador = 0;
    }
}

let numero_jogadores;
let jogadores = [];
let comunitarias = [];
//pedindo a quantidade de jogadores
do {
    alert("Coloque entre 1 e 10 jogadores")
    numero_jogadores = prompt("Digite a quantidade de jogadores");
} while (numero_jogadores < 1 || numero_jogadores > 10) 

//criando o baralho
let baralho = criaBaralho();

console.log(baralho);
console.log(baralho.length);

//mostrando as cartas comunitarias
for (let i = 0; i < 5; i++) {
    let carta = cartaAleatoria(baralho.length)
    comunitarias[i] = baralho[carta];
    baralho = cartaParaRemover(baralho, baralho[carta])
}

//dando as cartas dos jogadores
for (let j = 0; j < numero_jogadores; j++) {
    //pegando duas cartas aleatorias
    let random_1 = cartaAleatoria(baralho.length)
    let random_2 = cartaAleatoria(baralho.length)

    //criando o jogador e dando suas cartas
    jogadores[j] = new Jogador;
    jogadores[j].carta_1 = baralho[random_1] 
    jogadores[j].carta_2 = baralho[random_2] 
    
    //removendo as cartas dadas
    baralho = cartaParaRemover(baralho, baralho[random_1])
    baralho = cartaParaRemover(baralho, baralho[random_2])
}   
console.log(comunitarias);

console.log(jogadores);

Pares(jogadores,comunitarias)
console.log(baralho);
console.log(baralho.length);