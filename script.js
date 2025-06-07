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

function mostrarHistorico() {
    const nome = localStorage.getItem('nomeUsuario');
    const historico = JSON.parse(localStorage.getItem(`historico_${nome}`)) || [];
    const div = document.getElementById('historico');
    div.innerHTML = '';

    historico.forEach(reg => {
        div.innerHTML += `<p>${reg.dia}: ${reg.humor} "${reg.motivo}"</p>`;
    });
}

function mostrarResumo() {
    const nome = localStorage.getItem('nomeUsuario');
    const historico = JSON.parse(localStorage.getItem(`historico_${nome}`)) || [];
    const resumo = {};

    historico.forEach(reg => {
        resumo[reg.humor] = (resumo[reg.humor] || 0) + 1;
    });

 const div = document.getElementById('resumo');
    div.innerHTML = '';

    for (let humor in resumo) {
        div.innerHTML += `<p>${humor} x${resumo[humor]}</p>`;
    }
}

window.onload = function () {
    const nome = localStorage.getItem('nomeUsuario');
    if (nome && document.getElementById('diarioTitulo')) {
        document.getElementById('diarioTitulo').innerText = `Diário de "${nome}"...`;
        mostrarHistorico();
        mostrarResumo();
    }
}

function mostrarImagemEmocao(humor) {
    const imagem = document.getElementById('emocaoImagem');
    imagem.src = `img/${humor.toLowerCase()}.png`;
    imagem.style.display = 'block';
    imagem.style.transition = 'top 0.6s ease, opacity 0.3s ease';

    imagem.style.top = '-120px';
    imagem.style.opacity = '0';

    setTimeout(() => {
        imagem.style.top = '20px';
        imagem.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        imagem.style.top = '-120px';
        imagem.style.opacity = '0';

        setTimeout(() => {
            imagem.style.display = 'none';
        }, 600); 
    }, 3000);
}