import pandas as pd

# 1) Crie um dataframe conforme a seguinte tabela:
#|produto|preco|
#|-------|-----|
#|cadeira| 50  |
#| mesa  | 200 |
#|torneira|15|
#|cama| 800|
#|abajur|90|
#|porta|450|

dados = {
    'produto': ['cadeira', 'mesa', 'torneira', 'cama', 'abajur', 'porta'],
    'preco': [50, 200, 15, 800, 90, 450]
}

df = pd.DataFrame(dados)
print('\nExercicio 1:\n', df)

# 2) Com o dataframe criado, ordene-o em ordem decrescente de preço.
ordemDecrescente = df.sort_values(by='preco', ascending=False)
print('\nExercicio 2:\n', ordemDecrescente)

# 3) Adicione ao dataframe o produto "tapete" que tem valor 250.
novoProduto = pd.DataFrame({'produto': ['tapete'], 'preco': [250]})
novoDf = pd.concat([df, novoProduto], ignore_index=True)
print('\nExercicio 3:\n', novoDf)

# 4) Filtre o dataframe para mostrar os produtos com preço menor que 100.
filtro = novoDf[novoDf['preco'] < 100]
print('\nExercicio 4:\n', filtro)

# 5) Salve o dataframe original em um arquivo csv
arquivoCsv = novoDf.to_csv('produtos.csv', index=False)
print('\nExercicio 5:\nArquivo salvo com sucesso!')

# 6) Use o pd.read_csv para ler o dataframe salvo anteriormente e adicione a esse dataframe uma coluna "vendas" que representa a quantidade vendida (inicialmente nenhum produto vendido, então o valor será 0 para todas as linhas).
arquivobase = pd.read_csv('produtos.csv')
arquivobase['vendas'] = 0
print('\nExercicio 6:\n', arquivobase)

# 7) Crie o seguinte dataframe:
# 
# |produto|qtd_vendida|
# |-------|-----|
# |cadeira| 5  |
# | mesa  | 12 |
# |torneira|65|
# |cama| 51|
# |abajur|12|
# |porta|9|
# 
# E faça um merge com o dataframe do exercício 1 para obter o dataframe a seguir:
# 
# |produto| preco |qtd_vendida|
# |-------| ------|-----|
# |cadeira|    50  |5  |
# | mesa  |200 |12 |
# |torneira|15|65|
# |cama| 800|51|
# |abajur|90|12|
# |porta|450|9|
# 

dados2 = {
    'produto': ['cadeira', 'mesa', 'torneira', 'cama', 'abajur', 'porta'],
    'qtd_vendida': [5, 12, 65, 51, 12, 9]
}

df2 = pd.DataFrame(dados2)
df_merged = pd.merge(df, df2, on='produto')
print('\nExercicio 7:\n', df_merged)

# 8) Crie uma coluna no dataframe do exercício anterior que indique a receita total do produto, após isso, calcule a 
# receita total de todos os produtos e crie uma nova coluna indicando qual a porcentagem de cada produto na receita total.
df_merged['receita_total'] = df_merged['preco'] * df_merged['qtd_vendida']
receita_total = df_merged['receita_total'].sum()
df_merged['porcentagem'] = df_merged['receita_total'] / receita_total * 100
print('\nExercicio 8:\n', df_merged)    

