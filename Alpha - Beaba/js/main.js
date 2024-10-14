document.addEventListener('DOMContentLoaded', () => {

    mostrarMenu = () => {
        var nav = document.getElementById('menu');
        if (window.innerWidth <= 768) {
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
                console.log(nav.style.display)
            }
        }
    }
    mostrarEnvioTaloes = () => {
        document.getElementById('envioTaloes').style.display = 'block'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }
    mostrarEstoque = () => {
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'block'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }
    mostrarManutencao = () => {
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'block'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }
    mostrarPerfil = () => {
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'block'
        document.getElementById('relatorios').style.display = 'none'
        mostrarMenu()
    }
    mostrarRelatorios = () => {
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('relatorios').style.display = 'block'
        mostrarMenu()
    }

    //Perfis de usuario
    const perfis = document.getElementById('perfis')
    const cadastroPerfil = document.getElementById('cadastroPerfis')

    // Menu alternador
    perfis.addEventListener('click', () =>{
        alternador(perfis, perfis, cadastroPerfil, 'seletorPerfis', 'seletorCadastro', 'indicadorPerfis')
    })
    cadastroPerfil.addEventListener('click', () =>{
        alternador(perfis, cadastroPerfil, perfis, 'seletorCadastro', 'seletorPerfis', 'indicadorPerfis')
    })

    editarPerfil = () => {
        document.getElementById('containerBotaoAcao').style.display = 'none'
        
        var perfilNome = document.getElementById('perfil-nome')
        var permissoes = document.getElementById('perfil-tipoUsuario')
        var nome = perfilNome.innerText

        perfilNome.innerHTML = '<input type="text" id="input-nome" value="' + nome + '">'
        permissoes.innerHTML = `
            <select id="select-tipoUsuario">
                <option value="todas">Administrador</option>
                <option value="manutencao">Gerente</option>
                <option value="estoque">Caixa</option>
            </select>
        `

        document.getElementById('salvar').style.display = 'block'    
    }

    salvarPerfil = () => {
        var inputNome = document.getElementById('input-nome')
        var selectPermissoes = document.getElementById('select-tipoUsuario')
    
        var newNome = inputNome.value
        var newPermissoes = selectPermissoes.options[selectPermissoes.selectedIndex].text
    
        // atualizar os valores
        document.getElementById('perfil-nome').innerText = newNome
        document.getElementById('perfil-tipoUsuario').innerText = newPermissoes
    
        // tira os inputs e select
        document.getElementById('salvar').style.display = 'none'
        document.getElementById('containerBotaoAcao').style.display = 'block'
        inputNome.remove()
        selectPermissoes.remove()
    }


    //Manutenção de talões   
    editarEnvioTalao = ()=>{
        document.getElementById('containerBotaoAcaoManutencao').style.display = 'none'

        var statusManutencao = document.getElementById('statusManutencao')
        var dataEntrega = document.getElementById('DataEntregaManutencao')

        statusManutencao.innerHTML = `
            <select id="select-statusManutencao">
                <option value="enviado">Enviado</option>
                <option value="finalizado">Recebido</option>
            </select>
        `
        dataEntrega.innerHTML = `
            <input type="date" id="input-DataEntregaManutencao">
        `
        document.getElementById('salvarManutencao').style.display = 'block'
    }

    salvarManutencao = () => {
        var statusManutencao = document.getElementById('select-statusManutencao')
        var dataEntrega = document.getElementById('input-DataEntregaManutencao')

        var newStatusManutencao = statusManutencao.options[statusManutencao.selectedIndex].text
        var newDataEntrega = dataEntrega.value

        document.getElementById('statusManutencao').innerText = newStatusManutencao
        document.getElementById('DataEntregaManutencao').innerText = newDataEntrega

        document.getElementById('salvarManutencao').style.display = 'none'
        document.getElementById('containerBotaoAcaoManutencao').style.display = 'block'
        statusManutencao.remove()
        dataEntrega.remove()
    }


    // Relatorios
    const geral = document.getElementById('mostrarTabelas')
    const seletorGrafico = document.getElementById('mostrarGrafico')

    geral.addEventListener('click', () => {
        alternador(geral, geral, seletorGrafico, 'seletorTabela', 'enviosChart', 'indicador')
    })

    seletorGrafico.addEventListener('click', () => {
        grafico()
        alternador(geral, seletorGrafico, geral, 'enviosChart', 'seletorTabela', 'indicador')
    })

    let enviosChart
    function grafico() {
        if (enviosChart) {
            enviosChart.destroy()
        }

        const ctx = document.getElementById('enviosChart').getContext('2d');
        enviosChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Envios de Talões',
                    data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 30, 35],
                    backgroundColor: '#c4df4e',
                    borderColor: '#4CAF50',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Envios de Talões por mês'
                    }
                }
            }
        })

        enviosChart.update()
    }


    // geral
    function alternador(elementoAtivo, elementoDesativar, elementoAtivar, ativar, desativar, indicador) {
        elementoDesativar.classList.add('ativo')
        elementoDesativar.classList.remove('inativo')
        elementoAtivar.classList.add('inativo')
        elementoAtivar.classList.remove('ativo')

        if (elementoDesativar === elementoAtivo) {
            document.getElementById(indicador).style.transform = 'translateX(0)'
        } else {
            document.getElementById(indicador).style.transform = 'translateX(100%)'
        }
        document.getElementById(ativar).style.display = 'grid'
        document.getElementById(desativar).style.display = 'none'
    }

})
