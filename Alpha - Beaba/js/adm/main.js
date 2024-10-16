import { mostrarEnvioTaloes } from './envioTaloes.js';
import { mostrarEstoque } from './estoque.js';
import { mostrarManutencao } from './manutencao.js';
import { alternadorPerfil, mostrarPerfil } from './perfil.js';
import { mostrarLojas, alternadorLojas } from './lojas.js';
import { alternadorRelatorios, mostrarRelatorios } from './relatorios.js';
import { mostrarMenu } from '../utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Menu navigation
    document.getElementById('mostrarEnvioTaloes').addEventListener('click', () =>{
        mostrarEnvioTaloes()
    })
    document.getElementById('mostrarEstoque').addEventListener('click', mostrarEstoque)
    document.getElementById('mostrarManutencao').addEventListener('click', mostrarManutencao)
    document.getElementById('mostrarPerfil').addEventListener('click', () => {
        mostrarPerfil()
        alternadorPerfil()
    })
    document.getElementById('mostrarLojas').addEventListener('click', () => {
        mostrarLojas()
        alternadorLojas()
    })
    document.getElementById('mostrarRelatorio').addEventListener('click', () => {
        mostrarRelatorios()
        alternadorRelatorios()
    })

    // Perfis


    // Lojas
    

    // Relatórios

    window.onload = () =>{
        mostrarMenu()
        alternadorRelatorios()
    }
});
