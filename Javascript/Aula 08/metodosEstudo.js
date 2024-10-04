// splice: Altera o conteúdo de um array, removendo elementos existentes ou adicionando novos elementos.
let livros = ["Livro A", "Livro B", "Livro C", "Livro D", "Livro E"]
// Removendo 2 elementos a partir do índice 1 e adicionando "Livro X" e "Livro Y"
livros.splice(1, 2, "Livro X", "Livro Y")
console.log(livros); // ["Livro A", "Livro X", "Livro Y", "Livro D", "Livro E"]

// slice: Retorna uma cópia superficial de uma parte do array dentro de um novo array.
let algunsLivros = livros.slice(1, 3)
console.log(algunsLivros) // ["Livro X", "Livro Y"]

// for...of: O loop for...of percorre objetos iteráveis (como arrays, strings, etc.) 
//e executa um bloco de código para cada valor do objeto.
let generos = {
    "Ficcao": [{ titulo: "Livro A" }, { titulo: "Livro B" }],
    "Nao-Ficcao": [{ titulo: "Livro C" }, { titulo: "Livro D" }]
}
for (let livro of generos["Ficcao"]) {
    console.log(livro.titulo) // "Livro A", "Livro B"
}

// forEach: O método forEach executa uma função fornecida uma vez para cada elemento do array.
generos["Ficcao"].forEach(livro => {
    console.log(livro.titulo) // "Livro A", "Livro B"
})

// map: O método map cria um novo array com os resultados da chamada de uma função fornecida em cada elemento do array.
let titulos = generos["Ficcao"].map(livro => livro.titulo)
console.log(titulos) // ["Livro A", "Livro B"]

// filter: O método filter cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.
let livrosComMaisDeUm = [
    { titulo: "Livro A", quantidade: 2 },
    { titulo: "Livro B", quantidade: 1 }
].filter(livro => livro.quantidade > 1);
console.log(livrosComMaisDeUm) // [{ titulo: "Livro A", quantidade: 2 }]

// reduce: O método reduce aplica uma função a um acumulador e a cada valor do array 
//(da esquerda para a direita) para reduzi-lo a um único valor.
let totalFiccao = [
    { titulo: "Livro A", quantidade: 2 },
    { titulo: "Livro B", quantidade: 1 }
].reduce((total, livro) => total + livro.quantidade, 0);
console.log(totalFiccao) // 3