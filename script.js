function saveName() {
    const nome = document.getElementById('username').value;
    if (nome.trim() !== "") {
        localStorage.setItem('nomeUsuario', nome);
        window.location.href = 'diario.html';
    } else {
        alert("Digite seu nome antes de entrar.");
    }
}