const perguntas = [
  {
    pergunta: "Como você prefere estudar?",
    respostas: [
      { texto: "Aulas em vídeo", recomendacao: "Experimente assistir a videoaulas e tutoriais interativos." },
      { texto: "Leituras teóricas", recomendacao: "Considere estudar por livros e artigos detalhados." },
      { texto: "Exercícios práticos", recomendacao: "Foque em plataformas que ofereçam atividades práticas e projetos." }
    ]
  },
  {
    pergunta: "Qual o melhor horário para você estudar?",
    respostas: [
      { texto: "Manhã", recomendacao: "Aproveite sua energia matinal para aprender novos conceitos." },
      { texto: "Tarde", recomendacao: "Organize seu cronograma para estudar nas tardes mais tranquilas." },
      { texto: "Noite", recomendacao: "Crie um ambiente confortável para estudar à noite sem distrações." }
    ]
  },
  {
    pergunta: "Você prefere estudar sozinho ou em grupo?",
    respostas: [
      { texto: "Sozinho", recomendacao: "Use plataformas personalizadas para um aprendizado independente." },
      { texto: "Em grupo", recomendacao: "Participe de grupos de estudo ou fóruns online para troca de ideias." },
      { texto: "Depende da situação", recomendacao: "Combine sessões solo e colaborativas para maximizar os resultados." }
    ]
  },
  {
    pergunta: "Qual método de avaliação você prefere?",
    respostas: [
      { texto: "Provas objetivas", recomendacao: "Pratique simulados com questões de múltipla escolha." },
      { texto: "Projetos práticos", recomendacao: "Escolha cursos que incluem projetos no final de cada módulo." },
      { texto: "Questionários rápidos", recomendacao: "Encontre plataformas com quizzes frequentes para reforçar conceitos." }
    ]
  },
  {
    pergunta: "Você prefere estudar com pausas frequentes ou por períodos longos?",
    respostas: [
      { texto: "Pausas frequentes", recomendacao: "Experimente a técnica Pomodoro para intercalar estudo e descanso." },
      { texto: "Períodos longos", recomendacao: "Reserve blocos de tempo dedicados para se aprofundar no conteúdo." },
      { texto: "Misturar ambos", recomendacao: "Adapte seu cronograma para alternar entre pausas e sessões intensas." }
    ]
  },
  {
    pergunta: "Você gosta de aprender com atividades práticas?",
    respostas: [
      { texto: "Sim, prefiro atividades práticas", recomendacao: "Procure cursos que incluem muitos projetos e desafios práticos." },
      { texto: "Não, prefiro teoria", recomendacao: "Foque em leituras detalhadas e videoaulas explicativas." },
      { texto: "Um equilíbrio entre ambos", recomendacao: "Escolha programas que mesclam teoria e prática." }
    ]
  },
  {
    pergunta: "Você prefere estudar por conta própria ou com um mentor/professor?",
    respostas: [
      { texto: "Por conta própria", recomendacao: "Explore cursos autodirigidos e com suporte online." },
      { texto: "Com um mentor/professor", recomendacao: "Considere aulas ao vivo ou mentorias personalizadas." },
      { texto: "Depende do tema", recomendacao: "Para assuntos complexos, prefira mentores; para o básico, estude sozinho." }
    ]
  },
  {
    pergunta: "Qual dispositivo você prefere para estudar?",
    respostas: [
      { texto: "Computador", recomendacao: "Explore plataformas otimizadas para desktop, como ferramentas interativas." },
      { texto: "Celular", recomendacao: "Busque apps de aprendizado práticos para estudar em qualquer lugar." },
      { texto: "Tablet", recomendacao: "Aproveite a portabilidade do tablet para estudar com mais conforto." }
    ]
  },
  {
    pergunta: "Você gosta de revisões frequentes do conteúdo?",
    respostas: [
      { texto: "Sim, revisões frequentes ajudam", recomendacao: "Use técnicas como mapas mentais ou resumos para revisão." },
      { texto: "Não, prefiro aprender uma vez e aplicar", recomendacao: "Foque na prática direta após aprender o conteúdo." },
      { texto: "Depende do conteúdo", recomendacao: "Ajuste sua abordagem conforme a complexidade do material." }
    ]
  },
  {
    pergunta: "Qual é seu objetivo principal ao estudar?",
    respostas: [
      { texto: "Aprender um novo hobby ou habilidade", recomendacao: "Escolha cursos curtos e dinâmicos para aprendizado leve." },
      { texto: "Avançar na carreira", recomendacao: "Invista em certificações reconhecidas na sua área." },
      { texto: "Melhorar o desempenho acadêmico", recomendacao: "Combine teoria detalhada com exercícios práticos." }
    ]
  },
];


document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const mensagemBemVindo = document.getElementById('bem-vindo');

  if (usuario && usuario.nome) {
    mensagemBemVindo.innerHTML = `<h2>Bem-vindo, ${usuario.nome}!</h2>`;
  } else {
    window.location.href = './usuario.html'; // Redireciona para criar usuário, se não existir
  }

  // Código do quiz aqui
});

const quiz = document.querySelector('#quiz');
const template = document.querySelector('template');
const respostasUsuario = []; // Armazena as respostas do usuário

// Loop para criar as perguntas
for (const [index, item] of perguntas.entries()) {
  const quizItem = template.content.cloneNode(true);
  quizItem.querySelector('h3').textContent = item.pergunta;

  for (let resposta of item.respostas) {
    const dt = quizItem.querySelector('dl dt').cloneNode(true);
    dt.querySelector('span').textContent = resposta.texto;
    dt.querySelector('input').setAttribute('name', `pergunta-${index}`);
    dt.querySelector('input').value = JSON.stringify(resposta);
    dt.querySelector('input').onchange = (event) => {
      respostasUsuario[index] = JSON.parse(event.target.value);
    };
    quizItem.querySelector('dl').appendChild(dt);
  }

  quizItem.querySelector('dl dt').remove();

  // Adiciona a pergunta ao quiz
  quiz.appendChild(quizItem);
}

// Botão para finalizar
const botaoFinalizar = document.createElement('button');
botaoFinalizar.textContent = 'Finalizar e Ver Relatório';
botaoFinalizar.addEventListener('click', () => {
  if (respostasUsuario.length !== perguntas.length) {
    alert('Por favor, responda todas as perguntas antes de finalizar.');
    return;
  }

  // Salva respostas no localStorage
  localStorage.setItem('respostasQuiz', JSON.stringify(respostasUsuario));

  // Redireciona para a página do relatório
  window.location.href = './relatorio.html';
});

document.body.appendChild(botaoFinalizar);