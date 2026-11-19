# Apostilas

Apostilas digitais das disciplinas do Prof. César Azevedo (IFRN – Campus João Câmara).

- [Redes de Computadores](redes/) · [plano de aula (professor)](redes/professor.html)
- [Sistemas Operacionais de Redes](so/) (4 capítulos, completa)

## Estrutura

```
index.html            página inicial (cards das disciplinas)
assets/apostila.css   estilo compartilhado por todas as apostilas
assets/apostila.js    recursos compartilhados: tema escuro, quiz, progresso, glossário, acessibilidade
sw.js, manifest...    modo offline e instalação como aplicativo
redes/                index.html (conteúdo), redes.js (simuladores), glossario.js
so/                   Sistemas Operacionais de Redes (index.html, so.js, glossario.js)
```

## Nova disciplina
1. Copie a pasta `redes/` para uma nova pasta (ex.: `so/`) e troque o conteúdo do `index.html`.
2. Ajuste `data-curso` no `<body>` (identifica o progresso salvo) e as cores `--c1…--c7`.
3. Escreva o `glossario.js` da disciplina e os simuladores próprios em um `.js` à parte.
4. Adicione o card em `index.html` da raiz.
