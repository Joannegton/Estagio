"""1) Crie uma variável chamada x , com valor de 10 e printe-a."""
x = 10
print("Exercicio 1:", x)

"""2) Eleve a variável x ao cubo e printe o resultado."""
print("Exercicio 2:", x**3)


"""3) Some o primeiro e o terceiro valor da lista [1,2,3,4,5] e printe a resposta """

lista = [1,2,3,4,5]
print("Exercicio 3:", lista[0] + lista[2])

"""4) Crie uma variável com o valor '0123456789' (em formato de string), e printe:
    a) Do 3º caractere em diante
    b) Do primeiro ao 5º caractere
    c) Do 3º ao 6º caractere
    d) O último caractere da string
    e) O penúltimo caractere da string"""

valor = '0123456789'
print("Exercicio 4a:", valor[2:])
print("Exercicio 4b:", valor[:5])
print("Exercicio 4c:", valor[2:6])
print("Exercicio 4d:", valor[-1])
print("Exercicio 4e:", valor[-2])

"""5) Crie um dicionário que contenha como chave os valores da Coluna 1, e como valores, os valores da Coluna 2.
|Coluna 1| Coluna 2|
|--------|---------|
| a      |   1     |
| b      |   2     |
| c      |   3     |
| d      |   4     |
| e      |   5     |

Após criado printe os valores das chaves "b" e "e"."""
valores = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
print("Exercicio 5:", valores['b'], valores['e'])


