function controleAcesso(modulo, tipoPermissao){
    return (req, res, next) => {
        const permissoes = req.user.permissoes;
        console.log('Permissões do usuário:', permissoes);
        if (permissoes && permissoes[modulo] && permissoes[modulo].includes(tipoPermissao)) {
            return next();
        } else {
            return res.status(403).json({ error: 'Acesso negado: Permissão insuficiente' });
        }
    };
};

module.exports = controleAcesso;