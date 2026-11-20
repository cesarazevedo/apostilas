# Prompt do projeto

Texto para pedir a Claude uma nova apostila (ou ajustar as existentes) mantendo o padrão do site. Troque `[NOME]`, `[X]` e `[curso/nível]`.

```
Atue como designer instrucional e desenvolvedor web. Crie uma apostila
HTML da disciplina "[NOME]" (carga horária [X] h), a partir da ementa
anexa, para alunos de [curso/nível] do IFRN.

Formato:
- Uma página HTML única, visual intuitivo e colorido, que exporte bem
  para PDF pela impressão.
- Linguagem simples, com analogias e exemplos do dia a dia. Sem
  complicar.
- Cada capítulo: objetivos, conteúdo, caixas de analogia/exemplo/dica/
  atenção, atividade desplugada, laboratórios guiados passo a passo,
  resumo, quiz interativo (com correção, nova tentativa e nota salva),
  questões abertas com resposta e "Para saber mais".
- Laboratórios com VirtualBox + Ubuntu Server 26.04 LTS (e Windows
  Server quando couber), com redes de laboratório bem definidas.
  Rede no Ubuntu pelo netplan; firewall com ufw.
- Ferramentas interativas quando ajudarem (calculadoras, simuladores).
- Referências em ABNT NBR 6023 (ordem alfabética, título em negrito,
  "Disponível em" e "Acesso em" para sites).

Recursos do site:
- CSS e JS compartilhados; JS e glossário próprios por disciplina.
- Modo escuro com botão fixo (ícone 🌙/☀️) no canto superior direito,
  painel de progresso salvo no navegador, glossário com dicas, botão
  de copiar código, imprimir com/sem respostas.
- Acessibilidade (pular ao conteúdo, foco visível, leitor de tela).
- Funcionamento offline (service worker) e instalável (manifest).
- Em toda apostila, um link para voltar à página inicial
  (cesarazevedo.github.io/apostilas): "← Todas as apostilas" no menu
  lateral e "🏠 Apostilas" na barra do celular.
- Uma página do professor (`professor.html`) com carga horária por
  capítulo, sequência de aulas, avaliação e requisitos, no padrão de
  Redes e SO.
- Publicar no GitHub Pages (repo cesarazevedo/apostilas), com um card
  na página inicial. A descrição do card deve ser curta e atrativa,
  com uma pergunta ou convite ao aluno. Nada de "apostila com N
  capítulos".

Processo:
- Faça um capítulo por vez, teste (Playwright, sem erros de JS, quiz,
  PDF) e pergunte se pode seguir para o próximo.
- Cada mudança vai em uma branch própria, com PR e merge na main ao
  terminar. Faça commit e PR com os trailers de co-autoria.
- Avise o que não pôde testar (laboratórios em VMs reais, links das
  referências) e peça para conferir antes da aula.
```
