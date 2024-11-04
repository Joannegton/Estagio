function carregarCSS(arquivos) {
    arquivos.forEach(arquivo => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = arquivo;
        document.head.appendChild(link);
    });
}

// Exemplo de uso:
const arquivosCSS = [
    '../components/modal_carregamento/modalCarregamento.css',
    '../style/geral.css',
    '../style/adm.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

carregarCSS(arquivosCSS);