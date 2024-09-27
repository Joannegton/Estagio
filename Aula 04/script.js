/*1. Faça um algoritmo que leia os valores A, B, C e imprima na tela se a soma de A + B é menor
que C.*/
function somaMenor(){
    let num1 = parseInt(document.getElementById('ex1num1').value)
    let num2 = parseInt(document.getElementById('ex1num2').value)
    let num3 = parseInt(document.getElementById('ex1num3').value)

    if(num1 + num2 < num3){
        document.getElementById('ex1Result').innerHTML = `${num1} + ${num2} é menor que ${num3}`
    } else if(num1 + num2 == num3){
        document.getElementById('ex1Result').innerHTML = `${num1} + ${num2} é igual a ${num3}`
    } else{
        document.getElementById('ex1Result').innerHTML = `${num1} + ${num2} é maior que ${num3}`
    }
}
                                                                                                                                                                                                    
/*2. Faça um algoritmo que leia o nome, o sexo e o estado civil de uma pessoa. Caso sexo seja “F” e
estado civil seja “CASADA”, solicitar o tempo de casada (anos).*/
function estadoCivil() {
    let nome = document.getElementById('ex2nome').value
    let sexo = document.getElementById('ex2sexo').value
    let estadoCivil = document.getElementById('ex2estadoCivil').value

    if (!nome || !sexo || !estadoCivil) {
        alert("Por favor, preencha todos os campos.")
        return
    }

    let resultado = `${nome}, `
    
    if (sexo === 'F') {
        resultado += "Feminino, "
        if (estadoCivil === 'Casada') {
            let tempoCasada = prompt("Quantos anos de casada?\nEx: 2")
            resultado += `Estado civil: Casada, ${tempoCasada} anos de casada`
        } else {
            resultado += `Estado civil: ${estadoCivil}`
        }
    } else {
        resultado += `Masculino, Estado civil: ${estadoCivil}`
    }

    document.getElementById('ex2estadoCivilResult').innerHTML = resultado
}

/*3. Faça um algoritmo para receber um número qualquer e informar na tela se é par ou ímpar.*/
function parImpar(){
    let num = parseInt(document.getElementById('ex3num').value)

    if(num % 2 !== 0){
        document.getElementById('ex3Result').innerHTML =  num + ": Número impar"
    }else{
        document.getElementById('ex3Result').innerHTML =  num + ": Número par"
    }
}

/*4. Faça um algoritmo que leia dois valores inteiros A e B se os valores forem iguais deverá se
somar os dois, caso contrário multiplique A por B. Ao final de qualquer um dos cálculos deve-se
atribuir o resultado para uma variável C e mostrar seu conteúdo na tela*/
function somaProduto(){
    let num1 = parseInt(document.getElementById('ex4num1').value)
    let num2 = parseInt(document.getElementById('ex4num2').value)

    if (num1 == num2) {
        let result = num1 + num2
        document.getElementById('ex4Result').innerHTML = `${num1} + ${num2} = ${result}`
    } else {
        let result = num1 * num2
        document.getElementById('ex4Result').innerHTML = `${num1} * ${num2} = ${result}`
    }
}

//INTERESSANTE
/*5. Encontrar o dobro de um número caso  ele seja positivo e o seu  triplo caso  seja negativo,
imprimindo o resultado*/
function produtosNumero(){
    let num = parseInt(document.getElementById('ex5num').value)
    if (num > 0) {
        document.getElementById('ex5Result').innerHTML = `${num} * 2 = ${num * 2}`
    } else if(num < 0) {
        document.getElementById('ex5Result').innerHTML = `${num} * 3 = ${num * 2}`
    } else{
        document.getElementById('ex5Result').innerHTML = `${num} é ${num} kkkk neutro`
    }
}

/*6. Escreva um algoritmo que lê dois valores booleanos (lógicos) e então determina se ambos são
VERDADEIROS ou FALSOS.*/
function verificarBooleano(){
    let valor1 = document.getElementById('valor1').checked
    let valor2 = document.getElementById('valor2').checked

    if (valor1 == true && valor2 == true) {
        document.getElementById('ex6Result').innerHTML = "Ambos são verdadeiros"
    } else if (valor1 == false && valor2 == false) {
        document.getElementById('ex6Result').innerHTML = "Ambos são falsos"
    }else{
        document.getElementById('ex6Result').innerHTML = "Somente um é verdadeiro"
    }
}

/*7. Faça um algoritmo que leia uma variável e some 5 caso seja par ou some 8 caso seja ímpar,
imprimir o resultado desta operação.*/
function somaNumero() {
    let num = parseInt(document.getElementById('ex7num').value)

    if (num % 0 == 1) {
        let soma = num + 8
        document.getElementById('ex7Result').innerHTML = `${num} é impar, logo ${num} + 8 = ${soma}`
    } else {
        let soma = num + 5
        document.getElementById('ex7Result').innerHTML = `${num} é par, logo ${num} + 5 = ${soma}`
    }
}

/*8. Escreva  um  algoritmo  que  leia  três  valores  inteiros  e  diferentes  e  mostre-os  em  ordem
decrescente*/
function ordemDecrescente() {
    let num1 = parseInt(document.getElementById('ex8num1').value)
    let num2 = parseInt(document.getElementById('ex8num2').value)
    let num3 = parseInt(document.getElementById('ex8num3').value)

    if (num1 === num2 || num2 === num3 || num1 === num3){
        alert("ATENÇÃO: Os numero não podem ser iguais!")
    } else{
        let numeros = [num1, num2, num3]
        numeros.sort((a, b) => b - a) //ordena decrescente
        document.getElementById('ex8Result').innerHTML = "Ordem decrescente: " + numeros

    }
}

/*9. Tendo como dados de entrada a altura e o sexo de uma pessoa, construa um algoritmo que
calcule seu peso ideal, utilizando as seguintes fórmulas:
para homens: (72.7 * h) – 58;
para mulheres: (62.1 * h) – 44.7. */
function calcularPeso() {
    let altura = parseFloat(document.getElementById("altura").value)
    let sexo = document.getElementById("sexo").value

    let pesoIdeal

    if (sexo == 'm' || sexo == 'M') {
        pesoIdeal = (72.7 * altura) - 58
    } else if (sexo == 'f' || sexo == 'F') {
        pesoIdeal = (62.1 * altura) - 44.7
    } else {
        pesoIdeal = "Sexo inválido!"
    }

    document.getElementById('resultado').innerHTML = "Peso ideal: " + pesoIdeal.toFixed(2) + " kg"
}

/*10. O IMC – Indice de Massa Corporal é um critério da Organização Mundial de Saúde para dar
umaindicação sobre a condição de peso de uma pessoa adulta. A fórmula é IMC = peso / ( altura )2
Elabore um algoritmo que leia o peso e a altura de um adulto e mostre sua condição de acordo
com a tabela abaixo.
IMC em adultos Condição 
Abaixo de 18,5 Abaixo do peso 
Entre 18,5 e 25 Peso normal 
Entre 25 e 30 Acima do peso 
Acima de 30 obeso*/
function imc(){
    let peso = parseFloat(document.getElementById('peso').value)
    let altura = parseFloat(document.getElementById('ex10altura').value)
    let imc = peso / altura**2

    console.log(peso, altura)
    let condicao

    if (imc < 18.5) {
        condicao = "Abaixo do peso"
    } else if (imc >= 18.5 && imc < 25) {
        condicao = "Peso normal"
    } else if (imc >= 25 && imc < 30) {
        condicao = "Acima do peso"
    } else {
        condicao = "Obeso"
    }

    document.getElementById('ex10Result').innerHTML = "Seu IMC é " + imc.toFixed(2) + ". Condição: " + condicao
}