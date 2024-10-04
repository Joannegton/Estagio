/*Escreva um algoritmo que leia o número de identificação de cada aluno de uma turma, 
as 3 notas obtidas por um aluno nas 3 verificações e a média dos exercícios que fazem parte da avaliação, 
e calcule a média de aproveitamento de cada aluno, usando a fórmula:
MA := (nota1 + nota 2 * 2 + nota 3 * 3 + ME)/7
A atribuição dos conceitos obedece a tabela abaixo. O algoritmo deve escrever o número do aluno de cada aluno, 
suas notas, a média dos exercícios, a média de aproveitamento, o conceito correspondente e 
a mensagem 'Aprovado' se o conceito for A, B ou C, e 'Reprovado' se o conceito for D ou E. 
Média de aproveitamento Conceito
>= 90 A
>= 75 e < 90 B
>= 60 e < 75 C
>= 40 e < 60 D
< 40 E */
function formulario() {
    let qntPessoas = parseInt(document.getElementById('qntPessoas').value)
    let forms = document.getElementById('forms')
    forms.innerHTML = ''

    for (let index = 0; index < qntPessoas; index++) {
        forms.innerHTML += `
        <div>
            <label for="nome${index}">Nome</label>
            <input type="text" name="nome${index}" id="nome${index}" required>

            <label for="nota1${index}">Nota 1</label>
            <input type="number" name="nota1${index}" id="nota1${index}" required>

            <label for="nota2${index}">Nota 2</label>
            <input type="number" name="nota2${index}" id="nota2${index}" required>

            <label for="nota3${index}">Nota 3</label>
            <input type="number" name="nota3${index}" id="nota3${index}" required>

            <label for="mediaExerc${index}">Media Exercícios</label>
            <input type="number" name="mediaExerc${index}" id="mediaExerc${index}" required>
        </div>
        `
    }

    forms.innerHTML += `<button onclick="mediaAprov(${qntPessoas})">Calcular Média</button>`
}

function mediaAprov(qntPessoas) {
    let resultado = document.getElementById('resultado')
    resultado.innerHTML = ''
    let alunos = []

    for (let index = 0; index < qntPessoas; index++) {
        let nome = document.getElementById(`nome${index}`).value
        let nota1 = parseFloat(document.getElementById(`nota1${index}`).value)
        let nota2 = parseFloat(document.getElementById(`nota2${index}`).value)
        let nota3 = parseFloat(document.getElementById(`nota3${index}`).value)
        let mediaExerc = parseFloat(document.getElementById(`mediaExerc${index}`).value)

        let media = (nota1 + nota2 * 2 + nota3 * 3 + mediaExerc) / 7
        let conceito

        if (media >= 90) {
            conceito = "A"
        } else if (media >= 75) {
            conceito = "B"
        } else if (media >= 60) {
            conceito = "C"
        } else if (media >= 40) {
            conceito = "D"
        } else {
            conceito = "E"
        }

        let resposta = conceito === "A" || conceito === "B" || conceito === "C" ? "Aprovado" : "Reprovado"

        alunos.push({ nome, nota1, nota2, nota3, mediaExerc, media, conceito, resposta })
    }

    resultado.innerHTML = `
        <table id="tabelaNotas">
            <thead>
                <tr>
                    <th>Nº</th>
                    <th>Nome</th>
                    <th>Nota 1</th>
                    <th>Nota 2</th>
                    <th>Nota 3</th>
                    <th>Exercícios</th>
                    <th>Média</th>
                    <th>Conceito</th>
                    <th>Situação</th>
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    `

    let tabelaBody = document.getElementById('tbody')

    alunos.forEach((aluno, index) => {
        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.nota1}</td>
                <td>${aluno.nota2}</td>
                <td>${aluno.nota3}</td>
                <td>${aluno.mediaExerc.toFixed(2)}</td>
                <td>${aluno.media.toFixed(2)}</td>
                <td>${aluno.conceito}</td>
                <td>${aluno.resposta}</td>
            </tr>
        `
        tabelaBody.innerHTML += row
    })
}
