const grade = 5;
const tesouro = 1;
const bomba = 3;
let BombasTesouros = [];
let dinheiroinicio = 100; // Outra variável para o dinheiro que vai ser usada quando um bomba for clicada
let dinheiro = 100;


const grid = document.getElementById("grid"); 
const contador = document.getElementById("ct"); 

function iniciar() { // Função que inicia o jogo
    console.log("Chamou")
    grid.innerHTML = ""; // Limpa o grid e o array para uma nova rodada
    BombasTesouros = [];
    for (let i = 0; i < grade * grade; i++) {
        const celulas = document.createElement("div"); // Faz com que cada grid do CSS vire uma div
        celulas.classList.add("celula"); // Cria uma classe para ser estilizada no CSS
        celulas.dataset.indice = i; // Armazena o valor de i em celulas o que será necessário em Click( )
        celulas.addEventListener("click", Click); // Cria um evento de clique que chama a função quando ocorrer
        grid.appendChild(celulas); // Anexa a célula ao DOM no final de cada div(célula)
    }
    randomizar();
    atualizarCT();
}
function randomizar() { // Função para randomizar as posições de bombas e tesouros
    const posicoes = [];
    for (let i = 0; i < grade * grade; i++) {
        posicoes.push(i); // Adiciona o valor de i em posicoes e devolve o comprimento do array
    }
    for (let i = posicoes.length - 1; i > 0; i--) { // De trás para frente permite que os valores sejam trocados desde o primeiro loop
        const j = Math.floor(Math.random() * (i + 1)); // i+1 permite a escolha do maior valor de i, porque o Math.random nunca gera o maior valor
        const aux = posicoes[i];
        posicoes[i] = posicoes[j]; 
        posicoes[j] = aux; // Troca números do array de j e i a cada loop
    }
    for (let i = 0; i < tesouro; i++) {
        BombasTesouros[posicoes[i]] = "tesouro" // Armazena no array de bombas e tesouros a primeria posição de posicoes[] o que vai ser o tesouro
    }
    for (let i = tesouro; i < tesouro + bomba; i++) {
        BombasTesouros[posicoes[i]] = "bombas" // Armazena nas próximas três posições as bombas e começa da posição de tesouro para evitar problemas
    }
}
function Click(event) { // Função chamada quando o click ocorre em um célula
    const celulas = event.target; 
    // parseInt converte a string em números
    const indice = parseInt(celulas.dataset.indice); // Chama o valor i de celulas de iniciar() para descobrir onde o clique ocorreu 
    const item = BombasTesouros[indice]; // Pega o valor armazenado em BombasTesouros[] no indice que possui o valor da célula
    if (item === undefined) { 
        celulas.innerHTML = "Vazio"
        celulas.classList.add("Revelada")
    } else if (item === "tesouro") {
        celulas.innerHTML = "🪙";
        celulas.classList.add("Tesouro");
        dinheiro += 100;
        atualizarCT();
        alert("Achou um tesouro!!");
        setTimeout(iniciar, 500); 
    } else if (item === "bombas") {
        celulas.innerHTML = "💣"
        celulas.classList.add("Bomba");
        dinheiro = dinheiroinicio;
        atualizarCT();
        alert("BOMMMM!!!");
        setTimeout(iniciar,500);
    }
}
function atualizarCT() {
    ct.innerHTML = dinheiro;
}
function Dicas() {
    if (dinheiro >= 100) {
        dinheiro -= 100;
        atualizarCT();
        const celulas = document.querySelectorAll(".celula"); // querySelectorAll seleciona todas as classes celula do grid
            for(let i=0;i<celulas.length;i++){ 
               const celulaP= celulas[i]; //celulaP vai ser a posição da celula no grid
            if (BombasTesouros[i] === "bombas") { // Caso a posição de celulas seja a de uma bomba o if ocorre
                celulaP.innerHTML = "💣";
                celulaP.classList.add("Bomba");
            }
        };
        alert("Dica comprada! Bombas reveladas.");
        setTimeout(function () { // A function dentro de setTimeout esconde as bombas e continua o jogo de onde parou
            const celulas = document.querySelectorAll(".celula");
            for(let i=0;i<celulas.length;i++){
                const celulaP= celulas[i];
                if (celulaP.innerHTML === "💣") {
                    celulaP.innerHTML = "";
                    celulaP.classList.remove("Bomba");
                }
            };
        }, 2000);
    }
    else {
        alert("Sem dinheiro");
    }
}
function Reiniciar(){
    iniciar();
    dinheiro=dinheiroinicio; // Reinicia o dinheiro quando o botão é clicado
}
document.addEventListener('DOMContentLoaded', iniciar); // Inicia o jogo quando a página carrega