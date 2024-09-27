/*1. A  imobiliária  Imóbilis  vende  apenas  terrenos  retangulares.  Faça  um  algoritmo  para  ler  as
dimensões de um terreno e depois exibir a área do terreno. */
function areaTerreno(largura, comprimento){
    return largura * comprimento
}
console.log(areaTerreno(10, 20)) // 200

/*2. Faça  um  algoritmo  para  calcular  quantas  ferraduras  são  necessárias  para  equipar  todos  os
cavalos comprados para um haras.*/
function ferraduras(cavalos){
    return cavalos * 4
}
console.log(ferraduras(10)) // 40

/*3. A padaria Hotpão vende uma certa quantidade de pães franceses e uma quantidade de broas a
cada dia. Cada pãozinho custa R$ 0,12 e a broa custa R$ 1,50. Ao final do dia, o dono quer saber
quanto arrecadou com a venda dos pães e broas (juntos), e quanto deve guardar numa conta de
poupança (10% do total arrecadado). Você foi contratado para fazer os cálculos para o dono. Com
base nestes fatos, faça um algoritmo para ler as quantidades de pães e de broas, e depois calcular
os dados solicitados.*/
function padaria(paes, broas){
    let total = (paes * 0.12) + (broas * 1.50)
    let poupanca = total * 0.1
    return `Total arrecadado: R$ ${total.toFixed(2)}\nValor a ser guardado na poupança: R$ ${poupanca.toFixed(2)}`
}
console.log(padaria(10, 5)) // Total arrecadado: R$ 3.00

/*4. Escreva um algoritmo para ler o nome e a idade de uma pessoa, e exibir quantos dias de vida
ela possui. Considere sempre anos completos, e que um ano possui 365 dias. Ex: uma pessoa
com 19 anos possui 6935 dias de vida; veja um exemplo de saída: MARIA, VOCÊ JÁ VIVEU 6935
DIAS*/
function diasVida(nome, idade){
    return `${nome}, você já viveu ${idade * 365} dias`
}
console.log(diasVida('Wellington', 26)) // Wellington, você já viveu 9490 dias

/*5. Um motorista deseja colocar no seu tanque X reais de gasolina. Escreva um algoritmo para ler o
preço do litro da gasolina e o valor do pagamento, e exibir quantos litros ele conseguiu colocar no
tanque.*/
function abastecer(preco, pagamento){
    return `Litros abastecidos: ${pagamento / preco}`
}
console.log(abastecer(5, 50)) // Litros abastecidos: 10

/*6. O restaurante a quilo Bem-Bão cobra R$12,00 por cada quilo de refeição. Escreva um algoritmo
que leia o peso do prato montado pelo cliente (em quilos) e imprima o valor a pagar. Assuma que a
balança já desconte o peso do prato.*/
function restaurante(peso){
    return `Valor a pagar: R$ ${peso * 12}`
}
console.log(restaurante(2)) // Valor a pagar: R$ 24

/*7. Entrar com o dia e o mês de uma data e informar quantos dias se passaram desde o início do
ano. Esqueça a questão dos anos bissextos e considere sempre que um mês possui 30 dias.*/
function diasPassados(dia, mes){
    return `Dias passados: ${((mes - 1) * 30) + dia}`
}
console.log(diasPassados(10, 3)) // Dias passados: 70

/*8. Faça um algoritmo para ler três notas de um aluno em uma disciplina e imprimir a sua média
ponderada (as notas tem pesos respectivos de 1, 2 e 3).*/
function mediaPonderada(nota1, nota2, nota3){
    return `Média ponderada: ${(nota1 + (nota2 * 2) + (nota3 * 3)) / 6}`
}
console.log(mediaPonderada(5, 7, 10)) // Média ponderada: 7.333333333333333

/*9. Uma  fábrica  de  camisetas  produz  os  tamanhos  pequeno,  médio  e  grande,  cada  uma  sendo
vendida respectivamente por 10, 12 e 15 reais. Construa um algoritmo em que o usuário forneça a
quantidade  de  camisetas  pequenas,  médias  e  grandes  referentes  a  uma  venda,  e  a  máquina
informe quanto será o valor arrecadado.*/
function camisetas(pequenas, medias, grandes){
    return `Valor arrecadado: R$ ${(pequenas * 10) + (medias * 12) + (grandes * 15)}`
}
console.log(camisetas(10, 5, 2)) // Valor arrecadado: R$ 175

/*10. Construa um algoritmo para calcular a distância entre dois pontos do plano cartesiano. Cada
ponto é um par ordenado (x,y).*/
function distancia(x1, y1, x2, y2){
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
console.log(distancia(1, 1, 4, 5)) // 5