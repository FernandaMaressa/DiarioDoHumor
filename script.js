function saveName() {
    const nome = document.getElementById('username').value;
    if (nome.trim() !== "") {
        localStorage.setItem('nomeUsuario', nome);
        window.location.href = 'diario.html';
    } else {
        alert("Digite seu nome antes de entrar.");
    }
}

let humorSelecionado = '';

function selecionarHumor(humor) {
    humorSelecionado = humor;

    const imagens = document.querySelectorAll('.humor-opcao img');
    imagens.forEach(img => img.classList.remove('selecionado'));

    const opcao = Array.from(document.querySelectorAll('.humor-opcao'))
        .find(div => div.textContent.trim() === humor);

    if (opcao) {
        const img = opcao.querySelector('img');
        if (img) {
            img.classList.add('selecionado');
        }
    }

    mostrarImagemEmocao(humor);
}