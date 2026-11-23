/* Jogos de arrastar e soltar da apostila de Educação em Tecnologias Digitais (motor em ../assets/jogos.js) */
(function(){
function G(t,a,z,i,o){return Object.assign({titulo:t,ajuda:a,
 zonas:z.map(function(s){var p=s.split('|');return{id:p[0],rotulo:p[1],sub:p[2]}}),
 itens:i.map(function(x){return{t:x[0],z:x[1],why:x[2]}})},o||{})}
var J=window.JOGOS=window.JOGOS||{};

/* ===== Capítulo 1: O computador e o Windows ===== */
J['e1-pecas']=G('Para que serve cada peça?',
 'O computador recebe, trabalha, guarda e mostra. Como uma cozinha: pedido, cozinheiro, despensa e prato pronto.',
 ['ent|⌨️ Entrada|o pedido que chega','pro|🧠 Trabalha|cozinheiro e bancada','gua|📦 Guarda|a despensa','sai|🖥️ Saída|o prato pronto'],
 [['Teclado','ent','Você digita e a informação entra no computador.'],
  ['Mouse','ent','Você aponta e clica: é um pedido.'],
  ['Microfone','ent','O som entra no computador.'],
  ['Processador','pro','É o cérebro: faz as contas.'],
  ['Memória RAM','pro','É a bancada de trabalho: guarda o que você usa agora e esvazia ao desligar.'],
  ['HD ou SSD','gua','Guarda seus arquivos mesmo desligado.'],
  ['Pen drive','gua','Também guarda arquivos.'],
  ['Monitor','sai','Mostra o resultado na tela.'],
  ['Caixa de som','sai','Toca o som.'],
  ['Impressora','sai','Coloca o resultado no papel.']]);

J['e1-hard-soft']=G('Hardware ou software?',
 'Hardware é o que dá para tocar. Software são os programas, que não dá para pegar na mão.',
 ['hard|🔧 Hardware|dá para tocar','soft|💿 Software|são os programas'],
 [['Teclado','hard','Dá para pegar.'],
  ['Windows','soft','É o sistema operacional: um programa que organiza tudo.'],
  ['Monitor','hard','Peça física.'],
  ['Word','soft','Programa para escrever textos.'],
  ['Mouse','hard','Peça física.'],
  ['Navegador da internet','soft','Programa para visitar sites.'],
  ['Gabinete','hard','A caixa que guarda as peças.'],
  ['WhatsApp','soft','Programa de mensagens.']]);

J['e1-mouse']=G('O que faz cada clique?',
 'Ligue cada ação do mouse ao que ela faz.',
 ['cl|Um clique','dc|Duplo clique','dir|Botão direito','arr|Arrastar'],
 [['👆 Escolher (selecionar) algo','cl','Marca o que você quer.'],
  ['👆👆 Abrir um arquivo ou programa','dc','Dois cliques rápidos.'],
  ['📋 Mostrar um menu de opções','dir','O “cardápio” do que dá para fazer.'],
  ['✋ Mover algo de lugar','arr','Segure o botão e leve até onde quer.']],{unico:true});

/* ===== Capítulo 2: Teclado e digitação ===== */
J['e2-teclas']=G('Que tecla é essa?',
 'Ligue cada tecla ao que ela faz.',
 ['ent|Enter','bk|Backspace','sh|Shift','cap|Caps Lock','esp|Espaço','esc|Esc'],
 [['↩️ Pula para uma nova linha ou parágrafo','ent','Como virar a página do caderno.'],
  ['⬅️ Apaga a letra que ficou para trás','bk','É a borracha.'],
  ['⬆️ Faz uma letra maiúscula ou o símbolo de cima','sh','Segure e aperte outra tecla.'],
  ['🔒 Deixa todas as letras maiúsculas até apertar de novo','cap','Fica “travado”.'],
  ['␣ Deixa um espaço entre as palavras','esp','A barra comprida embaixo.'],
  ['🚪 Cancela ou sai','esc','Serve para sair de alguma coisa.']],{unico:true});

J['e2-postura']=G('Postura certa ou errada?',
 'Digitar com cuidado evita dor nas costas e nas mãos.',
 ['sim|✅ Faça','nao|⛔ Evite'],
 [['Costas apoiadas na cadeira','sim','Sem curvar o corpo.'],
  ['Tela na altura dos olhos','sim','Para não forçar o pescoço.'],
  ['Punhos retos','sim','Sem dobrar o pulso.'],
  ['Fazer pausas','sim','Descanse as mãos de vez em quando.'],
  ['Ficar curvado, com o rosto colado na tela','nao','Machuca as costas e o pescoço.'],
  ['Digitar com os punhos dobrados','nao','Cansa e machuca as mãos.'],
  ['Ficar horas sem parar','nao','O corpo precisa de pausa.']]);

J['e2-linha']=G('Onde os dedos moram?',
 'Os dedos ficam na linha do meio: A S D F e J K L Ç. O F e o J têm um relevo para você achar sem olhar.',
 ['meio|🏠 Linha do meio|onde os dedos descansam','fora|🚶 Outras linhas|os dedos vão e voltam'],
 [['A','meio','É a casa do dedo mindinho esquerdo.'],
  ['S','meio','Linha do meio.'],
  ['D','meio','Linha do meio.'],
  ['F','meio','Tem relevo: ajuda a achar sem olhar.'],
  ['J','meio','Também tem relevo.'],
  ['K','meio','Linha do meio.'],
  ['L','meio','Linha do meio.'],
  ['Ç','meio','Linha do meio.'],
  ['Q','fora','Linha de cima.'],
  ['P','fora','Linha de cima.'],
  ['Z','fora','Linha de baixo.'],
  ['M','fora','Linha de baixo.']]);

/* ===== Capítulo 3: Word ===== */
J['e3-tela']=G('Conhecendo a tela do Word',
 'Ligue cada parte da tela ao que ela é.',
 ['tit|Título','ace|Acesso rápido','gui|Guias','faixa|Faixa de opções','fol|Folha','bar|Barra de status'],
 [['📛 O nome do documento, lá em cima','tit','Mostra como se chama o seu arquivo.'],
  ['⚡ Botões das ações mais usadas, como salvar e desfazer','ace','Atalhos à mão.'],
  ['🗂️ As abas: Página Inicial, Inserir, Layout...','gui','Cada aba guarda um grupo de ferramentas.'],
  ['🧰 Os botões da guia que está aberta','faixa','A caixa de ferramentas.'],
  ['📄 A página branca onde você escreve','fol','Seu caderno.'],
  ['ℹ️ A faixa de baixo, com número da página e contagem de palavras','bar','Informações sobre o documento.']],{unico:true});

J['e3-guias']=G('Em qual guia fica?',
 'Cada guia do Word guarda um tipo de ferramenta.',
 ['ini|🏠 Página Inicial','ins|➕ Inserir','lay|📐 Layout'],
 [['Negrito, itálico e sublinhado','ini','Os botões N, I e S.'],
  ['Tamanho e cor da letra','ini','Para mudar a aparência do texto.'],
  ['Alinhamento e marcadores','ini','Esquerda, centro, direita, listas.'],
  ['Imagens','ins','Para colocar uma foto no texto.'],
  ['Tabelas','ins','Para organizar em linhas e colunas.'],
  ['Margens da folha','lay','O espaço em branco nas bordas.'],
  ['Orientação (em pé ou deitada)','lay','Retrato ou paisagem.']]);

J['e3-regras']=G('Certo ou errado?',
 'Bons hábitos no Word.',
 ['sim|✅ Faça','nao|⛔ Não faça'],
 [['Apertar Enter só quando quiser um novo parágrafo','sim','O texto desce sozinho quando a linha acaba.'],
  ['Selecionar o texto antes de formatar','sim','Regra de ouro: primeiro seleciona, depois formata.'],
  ['Salvar o trabalho com frequência','sim','Se faltar luz, você não perde tudo.'],
  ['Ver a pré-visualização antes de imprimir','sim','Evita desperdiçar papel.'],
  ['Salvar em PDF para enviar o currículo','sim','O PDF não muda de forma em outro computador.'],
  ['Apertar Enter no fim de cada linha','nao','O Word já pula sozinho.'],
  ['Formatar sem selecionar nada antes','nao','O Word não sabe o que você quer mudar.'],
  ['Só salvar no final, quando terminar tudo','nao','Salve no começo e vá salvando.']]);

/* ===== Capítulo 4: Excel ===== */
J['e4-planilha']=G('Linha, coluna ou célula?',
 'A planilha é como um tabuleiro de batalha naval.',
 ['col|Coluna|vai de cima a baixo','lin|Linha|vai de lado a lado','cel|Célula|o quadradinho','int|Intervalo|um grupo de células'],
 [['A, B, C...','col','As colunas têm letras.'],
  ['1, 2, 3...','lin','As linhas têm números.'],
  ['B3','cel','Coluna B com linha 3.'],
  ['B2:B6','int','Do B2 até o B6, tudo junto.'],
  ['D','col','Letra: é coluna.'],
  ['7','lin','Número: é linha.']]);

J['e4-formula']=G('É fórmula ou só texto?',
 'Toda fórmula começa com o sinal de igual (=). Sem o igual, o Excel entende como texto.',
 ['f|🧮 É fórmula|começa com =','t|📝 É só texto|não calcula'],
 [['=B2+B3','f','Tem o igual: o Excel faz a conta.'],
  ['=SOMA(B2:B6)','f','Soma tudo de B2 até B6.'],
  ['=C3*2','f','Multiplica por 2.'],
  ['=MÉDIA(B2:B6)','f','Calcula a média.'],
  ['Total','t','É só uma palavra.'],
  ['SOMA(B2:B6)','t','Sem o igual, vira texto e não calcula.'],
  ['B2+B3','t','Sem o igual, não calcula.']]);

J['e4-funcoes']=G('Qual função usar?',
 'Funções são atalhos prontos. Qual é a certa para cada pedido?',
 ['soma|SOMA','media|MÉDIA','max|MÁXIMO','min|MÍNIMO'],
 [['🛒 Quanto deu a lista de compras no total?','soma','Soma os valores.'],
  ['📊 Qual foi a nota média da turma?','media','Soma e divide pela quantidade.'],
  ['💰 Qual é o item mais caro?','max','Acha o maior valor.'],
  ['🏷️ Qual é o item mais barato?','min','Acha o menor valor.']],{unico:true});

/* ===== Capítulo 5: PowerPoint ===== */
J['e5-slide']=G('Slide bom ou slide ruim?',
 'Um slide é como um cartaz: precisa ser lido de longe.',
 ['bom|👍 Slide bom','ruim|👎 Slide ruim'],
 [['Pouco texto','bom','Quem assiste precisa ouvir você, não só ler.'],
  ['Letra grande','bom','Dá para ler do fundo da sala.'],
  ['Uma ideia por slide','bom','Fica fácil de entender.'],
  ['Cores com bom contraste (letra escura em fundo claro)','bom','Dá para ler bem.'],
  ['Texto demais, parecendo uma página de livro','ruim','Ninguém lê.'],
  ['Letra miúda','ruim','Ninguém enxerga.'],
  ['Letra clara em fundo claro','ruim','Falta contraste: não dá para ler.'],
  ['Vários assuntos no mesmo slide','ruim','Confunde quem assiste.']]);

J['e5-teclas']=G('Teclas e formatos',
 'Ligue cada tecla ou formato ao que ele faz.',
 ['f5|F5','seta|Seta →','esc|Esc','ppt|.pptx','pdf|PDF'],
 [['▶️ Começar a apresentação','f5','Apertou F5, a apresentação começa.'],
  ['⏭️ Passar para o próximo slide','seta','Use também as outras setas.'],
  ['⏹️ Sair da apresentação','esc','Volta para a edição.'],
  ['✏️ Formato para editar depois','ppt','É o arquivo original do PowerPoint.'],
  ['📤 Formato para enviar a alguém','pdf','Abre igual em qualquer aparelho.']],{unico:true});

J['e5-guias']=G('Onde fica no PowerPoint?',
 'Ligue cada ação à guia certa.',
 ['ini|🏠 Página Inicial','des|🎨 Design','ins|➕ Inserir'],
 [['Novo slide','ini','É onde se cria mais um slide.'],
  ['Escolher um tema (visual pronto)','des','Muda cores e fundo de uma vez.'],
  ['Colocar uma imagem','ins','Fotos e figuras ficam em Inserir.'],
  ['Mudar a cor e o tamanho da letra','ini','Formatar o texto fica na Página Inicial.']]);

/* ===== Capítulo 6: Internet e comunicação ===== */
J['e6-site']=G('Site confiável ou desconfie?',
 'Antes de digitar seus dados, confira o endereço e o cadeado.',
 ['ok|✅ Parece confiável','ruim|🚩 Desconfie'],
 [['Endereço termina em .gov.br','ok','Site do governo.'],
  ['Tem o cadeado e o endereço certo do banco','ok','Confira sempre o endereço.'],
  ['Endereço com letras trocadas, parecido com o do banco','ruim','Os golpistas copiam o nome.'],
  ['E-mail pedindo sua senha','ruim','Nenhum banco pede senha por e-mail.'],
  ['Promete um prêmio que você nunca pediu','ruim','Prêmio fácil é armadilha.'],
  ['Pedem dinheiro para você usar a conta gov.br','ruim','Ninguém cobra para você usar a gov.br.']]);

J['e6-email']=G('As partes do e-mail',
 'Escrever um e-mail é como mandar uma carta.',
 ['para|Para','ass|Assunto','msg|Mensagem','ane|Anexo'],
 [['📮 Quem vai receber','para','O endereço do destinatário.'],
  ['🏷️ O título, para a pessoa saber do que se trata','ass','Escreva algo curto e claro.'],
  ['✍️ O texto que você escreve','msg','A carta em si.'],
  ['📎 Um arquivo que vai junto','ane','Foto, PDF, currículo...']],{unico:true});

J['e6-pesquisa']=G('Pesquisando com cuidado',
 'Na internet tem de tudo. Confie, mas confira.',
 ['sim|✅ Faça','nao|⛔ Evite'],
 [['Usar poucas palavras na busca','sim','Fica mais fácil achar.'],
  ['Ver quem escreveu e quando','sim','Pode ser uma notícia antiga.'],
  ['Comparar com outros sites sérios','sim','Se só um site diz, desconfie.'],
  ['Clicar em “Sair” no computador compartilhado','sim','Senão o próximo usuário vê seus e-mails.'],
  ['Clicar no primeiro resultado marcado “Anúncio”','nao','Anúncio é propaganda, não é o melhor resultado.'],
  ['Deixar sua conta aberta no computador do laboratório','nao','Qualquer pessoa pode entrar.'],
  ['Acreditar em tudo que aparece','nao','Nem tudo na internet é verdade.']]);

/* ===== Capítulo 7: Segurança e cidadania digital ===== */
J['e7-senha']=G('Senha forte ou fraca?',
 'Uma senha boa é uma frase longa, com letras, números e símbolos, e diferente em cada conta.',
 ['forte|💪 Forte','fraca|🥱 Fraca'],
 [['Meu gato Tom come 3 peixes!','forte','Frase longa e fácil de lembrar.'],
  ['Café com leite às 6h na padaria da esquina','forte','Longa e com números.'],
  ['123456','fraca','A primeira que o golpista tenta.'],
  ['maria1980','fraca','Nome e ano de nascimento: fácil de adivinhar.'],
  ['A mesma senha em todas as contas','fraca','Se roubarem uma, abrem todas.'],
  ['senha','fraca','Fácil demais.']]);

J['e7-golpe']=G('Golpe ou tudo bem?',
 'Golpe usa pressa, medo e prêmio. Fique de olho nos sinais.',
 ['golpe|🚩 Golpe|desconfie','ok|✅ Tudo bem|pode confiar'],
 [['“Sua conta será bloqueada hoje! Clique aqui agora!”','golpe','Pressa: o golpista não quer que você pense.'],
  ['Mensagem de um número desconhecido pedindo dinheiro','golpe','Pedir dinheiro por mensagem é sinal de golpe.'],
  ['“Você ganhou um carro!” em um sorteio que você nunca viu','golpe','Prêmio sem participar é golpe.'],
  ['Alguém pede o código que chegou por SMS no seu celular','golpe','Nunca passe o código a ninguém.'],
  ['Ligar você mesmo para o número que está no seu cartão','ok','Você escolheu o número, então é seguro.'],
  ['Aviso que aparece no aplicativo do banco que você abriu','ok','Você abriu o aplicativo oficial.']]);

J['e7-caiu']=G('Caí no golpe. E agora?',
 'Acontece com muita gente, e a culpa é do golpista. O que fazer depois?',
 ['sim|✅ Faça logo','nao|⛔ Não faça'],
 [['Avisar o banco','sim','Quanto mais cedo, melhor.'],
  ['Trocar as senhas','sim','Comece pelas contas mais importantes.'],
  ['Fazer o boletim de ocorrência (B.O.)','sim','Registra o crime.'],
  ['Contar para a família e os amigos','sim','Eles podem ajudar e se proteger.'],
  ['Ficar com vergonha e não contar a ninguém','nao','Quanto mais tempo, maior o prejuízo.'],
  ['Pagar o “resgate” ou mandar mais dinheiro','nao','O golpista só pede mais.']]);

J['e7-noticia']=G('Antes de compartilhar uma notícia',
 'Pare e pense: quem, quando, outros veículos e a emoção.',
 ['quem|Quem','quando|Quando','outros|Outros veículos','emo|A emoção'],
 [['👤 Ver quem escreveu e se é gente de confiança','quem','Sem autor, desconfie.'],
  ['📅 Ver a data: pode ser uma notícia velha','quando','Notícia antiga volta como se fosse nova.'],
  ['📰 Procurar se outros sites sérios dizem a mesma coisa','outros','Se só um lugar diz, é suspeito.'],
  ['😡 Desconfiar se a notícia só quer te deixar com raiva ou medo','emo','Notícia falsa mexe com a emoção para você compartilhar sem pensar.']],{unico:true});
})();
