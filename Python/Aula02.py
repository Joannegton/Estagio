"""1) Printe os números de 5 até 20"""
def printNumeros(inicio, fim):
    for i in range(inicio, fim + 1):
        print(i)
print("Exercicio 1:")
printNumeros(5, 20)

"""2) Printe todos os números pares de 0 a 100"""
def printPares(inicio, fim):
    for i in range(inicio, fim + 1):
        if i % 2 == 0:
            print(i)
print("Exercicio 2: ")
printPares(0, 100)

"""3) Crie uma função para calcular a área de um quadrado (o tamanho do lado do quadrado é o argumento da função)."""
def areaQuadrado(lado):
    print("Exercicio 3: ", lado**2)

areaQuadrado(3)

"""4) Crie uma função que receba um número e printe a tabuada desse número."""
def tabuada(numero):
    for i in range(11):
        print(f"{numero} x {i} = {numero*i}")

print("Exercicio 4:")
tabuada(2)

"""5) Crie uma função que some até 3 números passados como parâmetros."""
def soma(num1 = 0, num2 = 0, num3=0):
    if isinstance(num1, (int, float)) and isinstance(num2, (int, float)) :
        print("Exercicio 5: ", num1 + num2 + num3)
    else:
        print('Insira ao menos 2 valores numéricos')

soma(1, 2)      
soma(1, 2, 3)     
soma(1, 'a')     

"""6) Crie um função recursiva que retorne o fatorial de um número inteiro."""
def fatorial(n):
    soma = 1
    while n > 1:
        soma *= n
        n -= 1
    return soma

print("Exercicio 6: ", fatorial(3))

"""7) Crie uma função que receba como argumento um número inteiro e retorne uma lista contendo 
os números da decomposição em fatores primos do número."""
def fatoresPrimos(n):
    fatores = []
    divisor = 2
    while n > 1:
        while n % divisor == 0:
            fatores.append(divisor)
            n //= divisor
        divisor += 1
    return fatores
print("Exercicio 7: ", fatoresPrimos(56))