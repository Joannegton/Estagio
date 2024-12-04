// middlewares/checkPermissions.js
function checkPermissions(modulo) {
    return (req, res, next) => {
        const permissoes = req.user.permissoes

        if (permissoes[modulo] || permissoes['Todas']) {
            next()
        } else {
            console.log('Acesso negado: ', permissoes, modulo)
            res.redirect('/acessoNegado')
        }
    }
}

module.exports = checkPermissions