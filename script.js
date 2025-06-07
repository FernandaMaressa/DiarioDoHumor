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

function salvarHumor() {
    const motivo = document.getElementById('motivo').value;
    const nome = localStorage.getItem('nomeUsuario'); // pega o usuário atual

    let historico = JSON.parse(localStorage.getItem(`historico_${nome}`)) || [];
    
    const agora = new Date();
    const diaSemana = agora.toLocaleDateString('pt-BR', { weekday: 'long' });
    const dataCompleta = agora.toLocaleDateString('pt-BR');
    const diaFormatado = `${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)} - ${dataCompleta}`;

    historico.push({
        dia: diaFormatado,
        humor: humorSelecionado,
        motivo: motivo
    });

    localStorage.setItem(`historico_${nome}`, JSON.stringify(historico));
    mostrarHistorico();
    mostrarResumo();
}
