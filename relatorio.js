document.addEventListener('DOMContentLoaded', () => {
  const relatorioContainer = document.querySelector('#relatorio');
  const botaoVoltar = document.querySelector('#voltar-quiz');

  // Recupera os dados do usuário
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const mensagemUsuario = document.getElementById('mensagem-usuario');

  if (usuario && usuario.nome) {
    mensagemUsuario.innerHTML = `<h2>Olá, ${usuario.nome}! Aqui está seu relatório:</h2>`;
  }

  // Recupera as respostas do localStorage
  const respostas = JSON.parse(localStorage.getItem('respostasQuiz'));

  if (!respostas || respostas.length === 0) {
    relatorioContainer.innerHTML = '<p>Nenhuma resposta encontrada.</p>';
    return;
  }

  // Gera o relatório
  const relatorioHTML = respostas.map((resposta, index) => {
    return `
      <div class="quiz-item">
        <h3>Pergunta ${index + 1}</h3>
        <p><strong>Sua Resposta:</strong> ${resposta.texto}</p>
        <p><strong>Recomendação:</strong> ${resposta.recomendacao}</p>
      </div>
    `;
  }).join('');

  relatorioContainer.innerHTML = relatorioHTML;

  // Adiciona evento ao botão para voltar ao quiz
  botaoVoltar.addEventListener('click', () => {
    window.location.href = './index.html';
  });
});