document.addEventListener('DOMContentLoaded', () => {

    window.mostrarMenu = () => {
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

    window.mostrarEnvioTaloes = () => {
        document.getElementById('envioTaloes').style.display = 'block'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('editarEnvioTaloes').style.display = 'none'
        document.getElementById('editarPerfil').style.display = 'none'
        mostrarMenu()
    }
    window.mostrarEstoque = () => {
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'block'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('editarEnvioTaloes').style.display = 'none'
        document.getElementById('editarPerfil').style.display = 'none'
        mostrarMenu()
    }
    window.mostrarManutencao = () => {
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'block'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('editarEnvioTaloes').style.display = 'none'
        document.getElementById('editarPerfil').style.display = 'none'
        mostrarMenu()
    }
    window.mostrarPerfil = () => {
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'block'
        document.getElementById('editarEnvioTaloes').style.display = 'none'
        document.getElementById('editarPerfil').style.display = 'none'
        mostrarMenu()
    }

    window.mostrarEditarEnvioTaloes = () =>{
        document.getElementById('editarEnvioTaloes').style.display = 'block'
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('editarPerfil').style.display = 'none'
        mostrarMenu()
    }
    
    window.mostrarEditarPerfil = () =>{
        document.getElementById('editarEnvioTaloes').style.display = 'none'
        document.getElementById('envioTaloes').style.display = 'none'
        document.getElementById('estoque').style.display = 'none'
        document.getElementById('manutencao').style.display = 'none'
        document.getElementById('perfil').style.display = 'none'
        document.getElementById('editarPerfil').style.display = 'block'
    }

    
    
    

    /*
    const profileForm = document.getElementById('perfilForm');
    const profileTableBody = document.getElementById('profileTableBody');

    function renderProfiles() {
        const profiles = getProfiles();
        profileTableBody.innerHTML = '';
        profiles.forEach(profile => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${profile.name}</td>
                <td>${profile.permissions.join(', ')}</td>
                <td>
                    <button onclick="editProfile(${profile.id})">Editar</button>
                    <button onclick="deleteProfile(${profile.id})">Deletar</button>
                </td>
            `;
            profileTableBody.appendChild(row);
        });
    }

    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('nomePerfil').value;
        const permissions = Array.from(document.getElementById('permissoes').selectedOptions).map(option => option.value);
        addProfile({ name, permissions });
        renderProfiles();
        profileForm.reset();
    });

    window.editProfile = (id) => {
        const profile = getProfiles().find(profile => profile.id === id);
        if (profile) {
            document.getElementById('nomePerfil').value = profile.name;
            const permissoesSelect = document.getElementById('permissoes');
            Array.from(permissoesSelect.options).forEach(option => {
                option.selected = profile.permissions.includes(option.value);
            });
            profileForm.onsubmit = (event) => {
                event.preventDefault();
                const name = document.getElementById('nomePerfil').value;
                const permissions = Array.from(document.getElementById('permissoes').selectedOptions).map(option => option.value);
                updateProfile(id, { name, permissions });
                renderProfiles();
                profileForm.reset();
                profileForm.onsubmit = null;
            };
        }
    };

    window.deleteProfile = (id) => {
        deleteProfile(id);
        renderProfiles();
    };

    renderProfiles();*/
}); 



/*
window.mostrarEnvioTaloes = () => {
    const taloes = getTaloes();
    const taloesTableBody = document.getElementById('taloesTableBody');
    taloesTableBody.innerHTML = '';
    taloes.forEach(talao => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${talao.id}</td>
            <td>${talao.valor}</td>
            <td>${talao.data}</td>
            <td>${talao.situacao}</td>
            <td>
                <button onclick="editarTalao(${talao.id})">Editar</button>
                <button onclick="deletarTalao(${talao.id})">Deletar</button>
            </td>
        `;
        taloesTableBody.appendChild(row);
    });
    document.getElementById('envioTaloes').style.display = 'block';
}
    */