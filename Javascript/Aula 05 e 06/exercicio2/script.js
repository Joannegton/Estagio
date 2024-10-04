/*O IMC – Indice de Massa Corporal é um critério da Organização Mundial de Saúde para dar
umaindicação sobre a condição de peso de uma pessoa adulta. A fórmula é IMC = peso / ( altura )2
Elabore um algoritmo que leia o peso e a altura de um adulto e mostre sua condição de acordo
com a tabela abaixo.
IMC em adultos Condição 
Abaixo de 18,5 Abaixo do peso 
Entre 18,5 e 25 Peso normal 
Entre 25 e 30 Acima do peso 
Acima de 30 obeso */

function formulario() {
    let qntPessoas = parseInt(document.getElementById('qntPessoas').value)
    
    let forms = document.getElementById('forms')
    forms.innerHTML = '' 

    for (let index = 0; index < qntPessoas; index++) {
        forms.innerHTML += `
            <div>
                <h3>Pessoa ${index + 1}</h3>
                <label for="nome${index}">Nome:</label>
                <input type="text" id="nome${index}"><br>

                <label for="peso${index}">Peso (kg):</label>
                <input type="number" id="peso${index}" step="0.1"><br>

                <label for="altura${index}">Altura (m):</label>
                <input type="number" id="altura${index}" step="0.01"><br><br>
            </div>
        `        
    }

    forms.innerHTML += `<button onclick="imc(${qntPessoas})">Calcular IMC</button>` 
}


function imc(qntPessoas) {
    let resultado = document.getElementById('resultado')
    resultado.innerHTML = ''
    
    let pessoas = []

    for (let index = 0; index < qntPessoas; index++) {
        let nome = document.getElementById(`nome${index}`).value
        let peso = parseFloat(document.getElementById(`peso${index}`).value)
        let altura = parseFloat(document.getElementById(`altura${index}`).value)

        if(nome == '' || isNaN(peso) || isNaN(altura)){
            alert(`preencha os campos corretamente no ${pessoas[i]}`)
            return
        }
        
        let imc = (peso / altura**2).toFixed(2)
        let condicao = ''

        switch (true) {
            case (imc < 18.5):
                condicao = "Abaixo do peso"
                break
            case (imc >= 18.5 && imc < 25):
                condicao = "Peso normal"
                break
            case (imc >= 25 && imc < 30):
                condicao = "Acima do peso"
                break
            case (imc >= 30):
                condicao = "Obeso"
                break
        }
        
        pessoas.push({nome, imc, condicao})
    }

    resultado.style = 'display: block'
    document.getElementById('forms').style = 'display: none'

    console.log(pessoas)
    pessoas.forEach((pessoa)=> {
        resultado.innerHTML += `
            <p><strong>${pessoa.nome}</strong><br> 
            IMC: ${pessoa.imc}<br>
            Condição: ${pessoa.condicao}</p>
        `
    })
}