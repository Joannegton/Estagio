class ModalCarregamento {
    constructor() {
        this.modal = document.getElementById('modalCarregamento');
        if (!this.modal) {
            this.modal = document.createElement('div');
            this.modal.id = 'modalCarregamento';
            this.modal.classList.add('modall');
            this.modal.innerHTML = `
                <div class="modalContentt">
                    <div class="carregar-pontoss">
                        <div class="pontos"></div>
                        <div class="pontos"></div>
                        <div class="pontos"></div>
                    </div>
                </div>`;
            document.body.appendChild(this.modal);
        }
    }

    mostrar() {
        this.modal.style.display = 'flex';
    }

    esconder() {
        this.modal.style.display = 'none';
    }
}

export { ModalCarregamento }