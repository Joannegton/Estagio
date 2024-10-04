/*Tendo como dados de entrada a altura e o sexo de uma pessoa, construa um algoritmo que calcule seu peso ideal de um número determinado de pessoas (usuário deve definir esse número), utilizando as seguintes fórmulas:
● para homens: (72.7 * h) – 58;
● para mulheres: (62.1 * h) – 44.7. 
Ao final, mostre como saída os seguintes dados de cada pessoa:
Nome;
Sexo;
Peso Ideal;*/
function formulario(){
    let qntPessoas = parseInt(document.getElementById('qntPessoas').value)
    let forms = document.getElementById('forms')
    forms.innerHTML = ''

    for (let index = 0; index < qntPessoas; index++) {
        forms.innerHTML += `
            <div>
                <h3>Pessoa ${index + 1}</h3>
                <label for="nome${index}">Nome</label>
                <input type="text" name="nome${index}" id="nome${index}" required><br>

                <label for="altura${index}">Altura (m)</label>
                <input type="number" name="altura${index}" id="altura${index}" step="0.01" required><br>

                <label for="sexo${index}">Sexo</label>
                <select name="sexo${index}" id="sexo${index}">
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select><br><br>
            </div>
        `
    }

    forms.innerHTML += `<button onclick="pesoIdeal(${qntPessoas})">Calcular Peso Ideal</button>`
}

function pesoIdeal(qntPessoas){
    let resultado = document.getElementById('resultado')
    resultado.innerHTML = ''

    let pessoas = []

    for (let index = 0; index < qntPessoas; index++) {
        let nome = document.getElementById(`nome${index}`).value
        let altura = parseFloat(document.getElementById(`altura${index}`).value)
        let sexo = document.getElementById(`sexo${index}`).value

        if(isNaN(altura) || altura <= 0){
            alert(`Preencha os campos corretamente para a pessoa ${index + 1}.`)
            return
        }

        let peso
        if (sexo === "Masculino") {
            peso = (72.7 * altura) - 58
        } else {
            peso = (62.1 * altura) - 44.7
        }

        pessoas.push({nome, altura, sexo, peso})
    }

    document.getElementById('forms').style = 'display: none'

    pessoas.forEach((pessoa) => {
        resultado.innerHTML += `
            <p>
                Nome: ${pessoa.nome}<br>
                Sexo: ${pessoa.sexo}<br>
                Peso ideal: ${pessoa.peso.toFixed(2)} kg<br>
            </p>
        `
    })
}











