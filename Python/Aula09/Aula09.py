# 1.a) Calcule os 100 primeiros termos da sequência, colocando-os em uma lista.

def sequenciaFib():
    lista = []

    for i in range(100): 
        if i == 0:
            lista.append(0)
        elif i == 1:
            lista.append(1)
        else:
            lista.append(lista[i-1] + lista[i-2])
    
    return lista

#print(sequenciaFib())

#1.b) Qual o valor do 59º termo da sequência?
def termo59():
    lista = sequenciaFib()
    return lista[58]

#print(termo59())

#1.c) Calcule a média aritmética dos 100 primeiros termos da sequencia de Fibonacci.
def mediaFib():
    lista = sequenciaFib()
    soma = sum(lista)
    return soma/len(lista)

#print(mediaFib())

"""2) Faça uma função que calcule a sequência de fibonacci até o n-ésimo termo, sendo n um argumento que será passado pra função. 
Faça essa função retornar uma lista com os termos calculados dentro.
"""
def sequenciaFibbonecci(n):
    lista = []
    for i in range(n):
        if i == 0:
            lista.append(0)
        elif i == 1:
            lista.append(1)
        else:
            lista.append(lista[i-1] + lista[i-2])

    return lista

#print(sequenciaFibbonecci(10))

"""
3) Utilizando a função criada no exercício anterior, crie 2 arquivos de texto, um com o nome *10_termos.txt* 
que contenha os 10 primeiros termos da sequência de Fibonacci, um termo em cada linha, e outro arquivo 
*100_termos.txt* com os 100 primeiros termos da sequência.
"""
def escreverArquivo(n, nomeArquivo):
    lista = sequenciaFibbonecci(n)
    with open(nomeArquivo, 'w') as arquivo:
        for i in lista:
            arquivo.write(str(i) + '\n')

#escreverArquivo(10, '10_termos.txt')
#escreverArquivo(100, '100_termos.txt')

"""
4) Crie utilizando um pandas dataframe a seguinte tabela e salve essa tabela em um arquivo excel (tabela.xlsx):

| nome | idade | cidade         | profissão |
|------|-------|----------------|-----------|
| joão | 22    | Porto Alegre   | professor |
| ana  | 23    | São Paulo      | jornalista|
| pedro| 24    | Rio de Janeiro | advogado  |
| maria| 25    | Belo Horizonte | vendedor  |
| josé | 26    | Porto Alegre   | engenheiro|
"""
import pandas as pd

def criarTabela():

    dados = {
        'nome': ['joão', 'ana', 'pedro', 'maria', 'josé'],
        'idade': [22, 23, 24, 25, 26],
        'cidade': ['Porto Alegre', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre'],
        'profissão': ['professor', 'jornalista', 'advogado', 'vendedor', 'engenheiro']
    }

    dataFrame = pd.DataFrame(dados)
    dataFrame.to_excel('tabela.xlsx', index=False)

    print("Tabela salva em tabela.xlsx")

"""
"""