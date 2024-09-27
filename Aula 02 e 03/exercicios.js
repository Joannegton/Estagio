/*Exercicios realizados em sala 1 ao 6. a, b, c e d*/

/*6.e) Efetuar  o  cálculo  e  a  apresentação  do  
valor de uma prestação em atraso, 
utilizando  a  fórmula  
PRESTAÇÃO  ← VALOR + (VALOR * (TAXA/100) * TEMPO)*/
function prestacaoAtraso(){
    let valor = parseFloat(document.getElementById("valorPrestacao").value);
    let taxa = parseFloat(document.getElementById("taxaPrestacao").value);
    let tempo = parseFloat(document.getElementById("tempoPrestacao").value);
    let resultado = valor + (valor * (taxa / 100) * tempo);
    document.getElementById("resultadoPrestacao").innerText = `Prestação em atraso: R$ ${resultado.toFixed(2)}`;
}

/*6.f) Ler  dois  valores  para  as  variáveis  A  e  
B,  e  efetuar  a  troca  dos  valores  de  
forma que a variável A passe a possuir 
o  valor  da  variável  B  e  a  variável  B  
passe  a  possuir  o  valor  da  variável  A.  
Apresentar os valores trocados.*/

function trocaValores(){
    let a = parseFloat(document.getElementById("valorA").value);
    let b = parseFloat(document.getElementById("valorB").value);
    let temp = a;
    a = b;
    b = temp;
    document.getElementById("resultadoTroca").innerText = `Valores trocados: A = ${a}, B = ${b}`;
}

/*6.g) Ler quatro números e apresentar o 
resultado da adição e multiplicação, 
baseando-se na utilização da 
propriedade distributiva. Ou seja, se 
forem  lidas  as  variáveis  A,  B,  C  e  D,  
devem  ser  somadas  e  multiplicadas  A  
com  B,  A  com  C  e  A  com  D.  Depois  B  
com C, B com D e por fim C com D. */
function calcularOperacoes() {
    let A = parseFloat(document.getElementById("valorG_A").value);
    let B = parseFloat(document.getElementById("valorG_B").value);
    let C = parseFloat(document.getElementById("valorG_C").value);
    let D = parseFloat(document.getElementById("valorG_D").value);

    let resultadoSoma = `Somas: A+B=${A+B}, A+C=${A+C}, A+D=${A+D}, B+C=${B+C}, B+D=${B+D}, C+D=${C+D}`;
    let resultadoMultiplicacao = `Multiplicações: A*B=${A*B}, A*C=${A*C}, A*D=${A*D}, B*C=${B*C}, B*D=${B*D}, C*D=${C*D}`;
    document.getElementById("resultadoOperacoes").innerText = `${resultadoSoma}\n${resultadoMultiplicacao}`;
}

/*6.h) Elaborar  um  programa  que  calcule  e  
apresente o volume de uma caixa 
retangular por meio da fórmula: 
VOLUME ← COMPRIMENTO * 
LARGURA * ALTURA.*/
function volumeCaixa(){
    let comprimento = parseFloat(document.getElementById("comprimento").value);
    let largura = parseFloat(document.getElementById("largura").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let volume = comprimento * largura * altura;
    document.getElementById("resultadoVolume").innerText = `Volume da caixa: ${volume}`;
}

/*6.i) Efetuar a leitura de um número inteiro e 
apresentar o resultado do quadrado 
desse número.*/
function quadradoNumero() {
    let num = parseFloat(document.getElementById("numeroQuadrado").value);
    let quadrado = num ** 2;
    document.getElementById("resultadoQuadrado").innerText = `Quadrado do número: ${quadrado}`;
}

/*6.j) Ler  dois  inteiros  (variáveis  A  e  B)  e  
imprimir  o  resultado  do  quadrado  da  
diferença do primeiro valor pelo 
segundo.*/
function quadradoDiferenca() {
    let num1 = parseInt(document.getElementById("valorA_6j").value);
    let num2 = parseInt(document.getElementById("valorB_6j").value);
    
    let resultado = (num1 - num2) ** 2;
    document.getElementById("resultadoDiferenca").innerText = `Quadrado da diferença: ${resultado}`;
}
/*6.k) Elaborar um programa que efetue a 
apresentação do valor da conversão 
em  real  (R$)  de  um  valor  lido  em  dólar  
(US$). O programa deve solicitar o 
valor  da  cotação  do  dólar  e  também  a  
quantidade de dólares disponível com o 
usuário.*/
function dolarReal(){
    let valorDolar = parseFloat(document.getElementById("valorDolar").value);
    let taxa = parseFloat(document.getElementById("taxaDolar").value);
    let resultado = valorDolar * taxa;
    document.getElementById("resultadoDolarReal").innerText = `Valor em reais: R$ ${resultado.toFixed(2)}`;
}

/*6.l) Elaborar um programa que efetue a 
apresentação do valor da conversão 
em  dólar  US$) de  um  valor  lido  em  real  
(R$).  O  programa  deve  solicitar  o  valor  
da cotação do dólar e também a 
quantidade  de  reais  disponível  com  o  
usuário. */
function realDolar() {
    let valorReal = parseFloat(document.getElementById("valorReal").value);
    let taxa = parseFloat(document.getElementById("taxaReal").value);
    let resultado = valorReal / taxa;
    document.getElementById("resultadoRealDolar").innerText = `Valor em dólares: $${resultado.toFixed(2)}`;
}

/*6.m) Elaborar um programa que efetue a 
leitura  de  três  valores  (A,  B  e  C)  e  
apresente  como  resultado  final  a  soma  
dos quadrados dos três valores lidos.*/
function somaQuadrados() {
    let num1 = parseFloat(document.getElementById("numeroM1").value);
    let num2 = parseFloat(document.getElementById("numeroM2").value);
    let num3 = parseFloat(document.getElementById("numeroM3").value);
    
    let resultado = num1 ** 2 + num2 ** 2 + num3 ** 2;
    document.getElementById("resultadoSomaQuadrados").innerText = `Soma dos quadrados: ${resultado}`;
}

/*6.n) Elaborar um programa que efetue a 
leitura  de  três  valores  (A,  B  e  C)  e  
apresente como resultado final o 
quadrado da soma dos três valores 
lidos.*/
function quadradoSoma() {
    let num1 = parseFloat(document.getElementById("numeroN1").value);
    let num2 = parseFloat(document.getElementById("numeroN2").value);
    let num3 = parseFloat(document.getElementById("numeroN3").value);
    
    let soma = num1 + num2 + num3;
    let resultado = soma ** 2;
    document.getElementById("resultadoQuadradoSoma").innerText = `Quadrado da soma: ${resultado}`;
}








