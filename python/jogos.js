/* Jogos de arrastar e soltar da apostila de Python (motor em ../assets/jogos.js) */
(function(){
function G(t,a,z,i,o){return Object.assign({titulo:t,ajuda:a,
 zonas:z.map(function(s){var p=s.split('|');return{id:p[0],rotulo:p[1],sub:p[2]}}),
 itens:i.map(function(x){return{t:x[0],z:x[1],why:x[2]}})},o||{})}
var J=window.JOGOS=window.JOGOS||{};
var M={mono:true},MU={mono:true,unico:true},U={unico:true};

/* ===== Capítulo 1: Motivação ===== */
J['p1-mitos']=G('Mito ou verdade?',
 'Muita gente tem medo de programar por causa de ideias erradas. Separe o que é mito do que é verdade.',
 ['mito|🙅 Mito|isso não é verdade','ver|✅ Verdade|pode acreditar'],
 [['Só gênio aprende a programar','mito','Qualquer pessoa pode aprender, com vontade e dedicação.'],
  ['Paciência e atenção valem mais que velocidade','ver','Quem vai com calma e entende o problema chega mais longe.'],
  ['15 minutos por dia rendem mais que uma maratona só no fim de semana','ver','Estudo regular em sessões curtas é mais eficiente.'],
  ['Programação só existe dentro do computador','mito','Está em tudo: web, saúde, jogos, bancos.'],
  ['Python é simples e boa para quem está começando','ver','Fácil de ler, mas poderosa.'],
  ['Quem erra muito não leva jeito','mito','Errar faz parte: todo programador vive corrigindo erros.']]);

J['p1-termos']=G('Primeiros termos, com analogia',
 'Ligue cada termo à analogia da cozinha.',
 ['prog|Programa','interp|Interpretador','bug|Bug (erro)'],
 [['📖 A receita de bolo, com os passos escritos','prog','Uma lista de instruções que o computador segue.'],
  ['👩‍🍳 O cozinheiro que lê a receita e executa, linha por linha','interp','O Python lê e executa seu programa linha por linha.'],
  ['🧂 Sal no lugar do açúcar: o bolo não sai como esperado','bug','Um erro no programa: acontece com todo mundo.']],U);

/* ===== Capítulo 2: Ambiente ===== */
J['p2-ide']=G('Conhecendo o IDLE',
 'O IDLE é o programa onde você escreve e testa o seu código.',
 ['prompt|>>>','novo|File → New File','f5|F5 (Run Module)','igual|='],
 [['Testar uma linha rápida, na hora','prompt','É o prompt: o Python responde assim que você aperta Enter.'],
  ['Abrir um arquivo novo para escrever um programa (.py)','novo','Para guardar o programa e rodar de novo depois.'],
  ['Executar o programa que está no editor','f5','Atalho para rodar o arquivo.'],
  ['Atribuir um valor a uma variável (não é comparar!)','igual','Para comparar, usa-se ==.']],MU);

J['p2-operadores']=G('Os operadores',
 'Ligue cada operador ao que ele faz.',
 ['+|+','-|-','*|*','/|/','**|**','%|%'],
 [['Soma: 2 + 3 dá 5','+','Junta valores.'],
  ['Subtração: 5 - 3 dá 2','-','Tira um valor do outro.'],
  ['Multiplicação: 2 * 3 dá 6','*','O asterisco é o “vezes”.'],
  ['Divisão: 7 / 2 dá 3.5','/','Sempre devolve um número com ponto decimal.'],
  ['Potência: 2 ** 3 dá 8','**','Dois asteriscos: “elevado a”.'],
  ['Resto da divisão: 7 % 2 dá 1','%','Muito usado para saber se um número é par.']],MU);

J['p2-precedencia']=G('Quanto dá a conta?',
 'Primeiro **, depois * / %, depois + -. Parênteses mudam a ordem. Ligue cada conta ao resultado.',
 ['14|14','20|20','16|16','8.0|8.0','2|2'],
 [['2 + 3 * 4','14','A multiplicação vem antes: 3*4 = 12, depois +2.'],
  ['(2 + 3) * 4','20','Os parênteses mandam: 5 * 4.'],
  ['2 ** 3 * 2','16','Primeiro a potência: 8 * 2.'],
  ['10 - 4 / 2','8.0','Primeiro a divisão (2.0), depois 10 - 2.0.'],
  ['10 % 3 + 1','2','10 % 3 é 1, depois +1.']],MU);

/* ===== Capítulo 3: Variáveis e entrada ===== */
J['p3-tipos']=G('Qual é o tipo?',
 'Cada valor tem um tipo: int (inteiro), float (com ponto decimal), str (texto) e bool (verdadeiro ou falso).',
 ['int|int','float|float','str|str','bool|bool'],
 [['42','int','Número inteiro.'],
  ['-7','int','Inteiro negativo.'],
  ['3.14','float','Tem ponto decimal. No Python, o decimal usa ponto, não vírgula.'],
  ['0.5','float','Tem ponto: é float.'],
  ['"olá"','str','Entre aspas: é texto.'],
  ['"10"','str','Pegadinha: entre aspas, é texto, não número.'],
  ['True','bool','Valor lógico.'],
  ['False','bool','Valor lógico.']],M);

J['p3-nomes']=G('Nome de variável válido?',
 'O nome começa com letra ou sublinha, não tem espaços e não pode começar com número.',
 ['ok|✅ Válido','nao|❌ Inválido'],
 [['nome','ok','Só letras.'],
  ['idade2','ok','Número no fim pode.'],
  ['_x','ok','Começa com sublinha: pode.'],
  ['total_geral','ok','Sublinha no lugar do espaço.'],
  ['2idade','nao','Não pode começar com número.'],
  ['meu nome','nao','Espaço não pode.'],
  ['nota-final','nao','O hífen é lido como subtração.'],
  ['1a','nao','Começa com número.']],M);

J['p3-logicos']=G('Verdadeiro ou falso?',
 'Qual é o resultado de cada expressão?',
 ['t|True','f|False'],
 [['5 > 3','t','5 é maior que 3.'],
  ['2 == 3','f','2 não é igual a 3.'],
  ['4 != 4','f','Diferente? Não, são iguais.'],
  ['10 <= 10','t','Menor ou igual: é igual, então vale.'],
  ['not True','f','not inverte.'],
  ['True and False','f','and exige as duas verdadeiras.'],
  ['True or False','t','or exige pelo menos uma verdadeira.'],
  ['"a" == "a"','t','Textos iguais.']],M);

J['p3-input']=G('O que o input devolve?',
 'O input() sempre devolve texto. Para ter número, é preciso converter.',
 ['str|str','int|int','float|float'],
 [['input("Seu nome: ")','str','Sem conversão, é sempre texto.'],
  ['input("Idade: ")','str','Mesmo digitando 20, vem como "20" (texto).'],
  ['int(input("Idade: "))','int','Converte o texto em inteiro.'],
  ['float(input("Preço: "))','float','Converte o texto em número com ponto decimal.']],M);

/* ===== Capítulo 4: Condições ===== */
J['p4-estruturas']=G('Quem é quem nas condições',
 'Ligue cada estrutura ao que ela faz.',
 ['if|if','else|else','elif|elif','aninhado|if aninhado'],
 [['Executa o bloco só se a condição for True','if','A porta que só abre se a condição for verdadeira.'],
  ['Cuida do caminho contrário, sem escrever a condição oposta','else','Se não for o if, é o else.'],
  ['Encadeia várias condições: só o primeiro bloco verdadeiro roda','elif','O Python testa em ordem e para no primeiro verdadeiro.'],
  ['Um if dentro de outro bloco','aninhado','A condição de dentro só é testada se a de fora permitir.']],MU);

J['p4-saida']=G('O que o programa imprime?',
 'Siga o código com calma. Em cada caso, qual é o resultado?',
 ['apr|Imprime APROVADO','rep|Imprime REPROVADO','nada|Não imprime nada'],
 [['nota = 8 · if nota >= 7: APROVADO · else: REPROVADO','apr','8 >= 7 é verdadeiro.'],
  ['nota = 7 · if nota >= 7: APROVADO · else: REPROVADO','apr','Cuidado: >= inclui o 7.'],
  ['nota = 6 · if nota >= 7: APROVADO · else: REPROVADO','rep','6 >= 7 é falso, então vai para o else.'],
  ['nota = 7 · if nota > 7: APROVADO · else: REPROVADO','rep','Aqui é só >, e 7 não é maior que 7.'],
  ['nota = 5 · if nota >= 7: APROVADO (sem else)','nada','Condição falsa e sem else: nada acontece.'],
  ['nota = 10 · if nota > 10: APROVADO (sem else)','nada','10 não é maior que 10.']],M);

J['p4-sintaxe']=G('Está certo ou tem erro?',
 'Cuidado com os dois-pontos, o == e o else sem condição.',
 ['ok|✅ Certo','erro|❌ Tem erro'],
 [['if x > 3:','ok','Condição e dois-pontos no fim.'],
  ['if x > 3','erro','Faltou o dois-pontos no final.'],
  ['if x = 3:','erro','Para comparar use ==. O = atribui.'],
  ['if x == 3:','ok','Comparação correta.'],
  ['elif nota >= 5:','ok','O elif tem condição e dois-pontos.'],
  ['else nota < 5:','erro','O else não tem condição, só os dois-pontos: else:'],
  ['if x > 3 and x < 10:','ok','Duas condições ligadas por and.']],M);

/* ===== Capítulo 5: Repetições ===== */
J['p5-loop']=G('Termina ou loop infinito?',
 'O while repete enquanto a condição for verdadeira. Se ela nunca ficar falsa, o laço nunca para.',
 ['fim|✅ Termina','inf|♾️ Loop infinito'],
 [['x = 0 · while x < 3: x = x + 1','fim','x cresce até chegar em 3.'],
  ['x = 0 · while x < 3: print(x)','inf','x nunca muda, então x < 3 é sempre verdadeiro.'],
  ['x = 10 · while x > 0: x = x - 1','fim','x diminui até chegar em 0.'],
  ['x = 10 · while x > 0: x = x + 1','inf','x só cresce, então nunca fica 0 ou menos.'],
  ['while True: (sem break)','inf','A condição é sempre verdadeira e ninguém interrompe.'],
  ['while True: ... if ok: break','fim','O break interrompe o laço na hora.']],M);

J['p5-conceitos']=G('Conceitos de repetição',
 'Ligue cada conceito à explicação.',
 ['cont|Contador','acum|Acumulador','break|break','aninh|Laço aninhado'],
 [['🔢 Conta quantas vezes algo aconteceu (c = c + 1)','cont','Soma sempre 1.'],
  ['➕ Soma valores ao longo das voltas (s = s + n)','acum','Vai guardando o total.'],
  ['🛑 Interrompe o laço na hora','break','Mesmo que a condição ainda seja verdadeira.'],
  ['🎡 O de dentro roda inteiro a cada volta do de fora','aninh','Como os ponteiros: a cada hora, o minuto dá a volta toda.']],U);

J['p5-cont-acum']=G('Contador ou acumulador?',
 'Contador soma sempre 1. Acumulador soma valores diferentes.',
 ['cont|🔢 Contador','acum|➕ Acumulador'],
 [['c = c + 1','cont','Soma 1 a cada vez.'],
  ['qtd += 1','cont','Mesma ideia, escrita mais curta.'],
  ['pares = pares + 1','cont','Conta quantos números pares apareceram.'],
  ['s = s + n','acum','Soma o valor de n, que muda.'],
  ['total = total + preco','acum','Soma os preços.'],
  ['soma += nota','acum','Acumula as notas.']],M);

/* ===== Capítulo 6: Listas ===== */
J['p6-metodos']=G('Operações com listas',
 'Ligue cada método ao que ele faz.',
 ['append|append','extend|extend','pop|pop','del|del','in|in','len|len'],
 [['➕ Coloca um item no fim da lista','append','L.append(5).'],
  ['🔗 Junta outra lista no fim','extend','Une duas listas.'],
  ['⬅️ Remove o último item (e devolve ele)','pop','L.pop().'],
  ['🗑️ Remove o item de uma posição (índice)','del','del L[0].'],
  ['🔍 Pergunta se um valor está na lista','in','5 in L dá True ou False.'],
  ['📏 Diz quantos itens a lista tem','len','len(L).']],MU);

J['p6-estruturas']=G('Estruturas de dados, com analogia',
 'Ligue cada estrutura à analogia.',
 ['lista|Lista','fila|Fila','pilha|Pilha','dic|Dicionário','tupla|Tupla'],
 [['🛒 A lista de compras: você pode acrescentar, trocar e riscar itens','lista','Dá para alterar.'],
  ['🏦 A fila do banco: sai quem chegou primeiro','fila','Primeiro a entrar, primeiro a sair.'],
  ['🍽️ A pilha de pratos: pega o último que foi colocado','pilha','Último a entrar, primeiro a sair.'],
  ['📒 A agenda: cada nome (chave) leva a um telefone (valor)','dic','Escrito com chaves: {"Ana": 9999}.'],
  ['📜 Um documento carimbado: depois de pronto, não muda','tupla','Parece uma lista, mas não pode ser alterada.']],U);

J['p6-indices']=G('Qual é o item?',
 'Considere L = ["a", "b", "c", "d"]. Os índices começam em 0! Ligue cada expressão ao seu resultado.',
 ['a|"a"','b|"b"','c|"c"','d|"d"'],
 [['L[0]','a','O primeiro item tem índice 0.'],
  ['L[1]','b','Segundo item.'],
  ['L[2]','c','Terceiro item.'],
  ['L[3]','d','Quarto e último item.'],
  ['L[-1]','d','O -1 conta de trás para frente: o último.'],
  ['L[-2]','c','O -2 é o penúltimo.']],M);

/* ===== Capítulo 7: Strings ===== */
J['p7-metodos']=G('Métodos de string',
 'Ligue cada método ao que ele faz com o texto.',
 ['lower|lower()','upper|upper()','strip|strip()','split|split()','join|join()','replace|replace()','find|find()','count|count()'],
 [['Tudo em minúsculas','lower','"Casa".lower() dá "casa".'],
  ['Tudo em maiúsculas','upper','"Casa".upper() dá "CASA".'],
  ['Tira os espaços das bordas','strip','"  oi ".strip() dá "oi".'],
  ['Quebra o texto em uma lista','split','"a b c".split() dá ["a", "b", "c"].'],
  ['Junta uma lista em um texto','join','O caminho contrário do split.'],
  ['Troca um pedaço do texto por outro','replace','"casa".replace("a", "o") dá "coso".'],
  ['Diz a posição onde achou (ou -1 se não achar)','find','Devolve o índice.'],
  ['Conta quantas vezes aparece','count','"banana".count("a") dá 3.']],MU);

J['p7-valida']=G('Verdadeiro ou falso?',
 'Esses métodos validam o conteúdo de um texto. Qual é o resultado?',
 ['t|True','f|False'],
 [['"123".isdigit()','t','Só tem dígitos.'],
  ['"12a".isdigit()','f','Tem uma letra no meio.'],
  ['"abc".isalpha()','t','Só tem letras.'],
  ['"ab1".isalpha()','f','O 1 não é letra.'],
  ['"ab1".isalnum()','t','Letras e números: alfanumérico.'],
  ['"a b".isalnum()','f','O espaço atrapalha.'],
  ['"Python".startswith("Py")','t','Começa com Py.'],
  ['"Python".endswith("Py")','f','Termina com "on", não com "Py".']],M);

J['p7-imutavel']=G('Funciona ou dá TypeError?',
 'Strings são imutáveis: não dá para trocar uma letra no lugar. Dá para criar uma string nova.',
 ['ok|✅ Funciona','erro|❌ TypeError'],
 [['s[0] = "C"','erro','Não dá para alterar um caractere de uma string.'],
  ['s = "C" + s[1:]','ok','Cria uma string nova e guarda no mesmo nome.'],
  ['l = list(s) · l[0] = "C"','ok','A lista pode ser alterada.'],
  ['"".join(l)','ok','Transforma a lista de volta em string.'],
  ['s.upper()','ok','Devolve uma nova string, sem alterar s.'],
  ['s[0]','ok','Ler um caractere é permitido.']],M);

/* ===== Capítulo 8: Funções ===== */
J['p8-print-return']=G('print ou return?',
 'print mostra na tela. return entrega o valor para quem chamou a função.',
 ['print|print','return|return'],
 [['Mostra o valor na tela','print','Só aparece para a pessoa.'],
  ['Entrega o valor para quem chamou','return','Dá para guardar numa variável.'],
  ['Encerra a função na hora','return','Depois do return, o resto não roda.'],
  ['r = f(3) guarda o valor em r','return','Só funciona se a função devolver algo.'],
  ['Uma função que só tem print devolve None','print','Sem return, o resultado da função é None.']],M);

J['p8-partes']=G('As partes de uma função',
 'Ligue cada peça ao seu papel.',
 ['def|def','param|Parâmetro','arg|Argumento','return|return','base|Caso base'],
 [['🔨 Palavra que cria a função','def','def soma(a, b):'],
  ['📥 A variável que recebe o valor, dentro da definição','param','Os nomes que aparecem entre parênteses ao criar.'],
  ['📤 O valor que você manda na chamada','arg','soma(2, 3): o 2 e o 3.'],
  ['🎁 Devolve o resultado a quem chamou','return','E encerra a função.'],
  ['🛑 Faz a função recursiva parar','base','Sem caso base, ela chama a si mesma para sempre.']],U);

J['p8-saida']=G('Qual é o resultado?',
 'def dobro(x): return x * 2  ·  def soma(a, b=1): return a + b  ·  def f(): pass. Ligue cada chamada ao resultado.',
 ['10|10','6|6','7|7','None|None'],
 [['dobro(5)','10','5 * 2.'],
  ['soma(5)','6','O b usa o valor padrão 1.'],
  ['soma(5, 2)','7','Agora o b vale 2.'],
  ['print(f())','None','A função não devolve nada, então vira None.']],MU);

/* ===== Capítulo 9: Arquivos ===== */
J['p9-modos']=G('Os modos de abrir um arquivo',
 'open(nome, modo). Ligue cada modo ao que ele faz.',
 ['r|"r"','w|"w"','a|"a"','with|with'],
 [['Ler o arquivo','r','read.'],
  ['Gravar, apagando o que havia antes','w','write: cuidado!'],
  ['Acrescentar no final, sem apagar','a','append.'],
  ['Fecha o arquivo sozinho ao terminar o bloco','with','Evita esquecer de fechar.']],MU);

J['p9-apaga']=G('Apaga ou mantém?',
 'Quando você abre um arquivo para gravar, o modo muda tudo.',
 ['apaga|🗑️ Apaga o que havia','mantem|💾 Mantém o conteúdo'],
 [['open("notas.txt", "w")','apaga','O modo "w" começa do zero.'],
  ['with open("notas.txt", "w") as f:','apaga','Mesma coisa, mas fechando sozinho.'],
  ['open("notas.txt", "a")','mantem','O "a" acrescenta no final.'],
  ['with open("notas.txt", "a") as f:','mantem','Acrescenta e fecha sozinho.'],
  ['open("notas.txt", "r")','mantem','Só lê. Não mexe em nada.']],M);

J['p9-ferramentas']=G('Ferramentas para trabalhar com arquivos',
 'Ligue cada ferramenta ao que ela resolve.',
 ['strip|strip()','conv|int() / float()','reader|csv.reader','dict|csv.DictReader','try|try / except'],
 [['✂️ Tira o \\n que vem no fim de cada linha lida','strip','Sem isso, o texto vem com a quebra de linha.'],
  ['🔢 Transforma o texto lido em número','conv','Tudo que vem do arquivo é texto.'],
  ['📋 Lê uma tabela CSV linha por linha, como lista','reader','Cada linha vira uma lista.'],
  ['📇 Lê cada linha do CSV como um dicionário','dict','Dá para pegar pelo nome da coluna.'],
  ['🛟 Evita que o programa quebre se o arquivo não existir','try','Trata o FileNotFoundError.']],MU);

/* ===== Capítulo 10: Classes e objetos ===== */
J['p10-vocab']=G('O vocabulário de classes',
 'Pense em um molde de biscoito. Ligue cada termo à analogia.',
 ['classe|Classe','obj|Objeto','attr|Atributo','met|Método','init|__init__','self|self'],
 [['🍪 O molde de biscoito','classe','Define como serão todos os objetos.'],
  ['🍪 Um biscoito feito com o molde','obj','Também chamado de instância.'],
  ['🎨 Uma característica: cor, sabor, tamanho','attr','Os dados do objeto.'],
  ['🏃 Uma ação que o objeto sabe fazer','met','Uma função dentro da classe.'],
  ['🏗️ Roda sozinho na hora de criar o objeto e guarda os dados iniciais','init','O construtor.'],
  ['👤 O próprio objeto, aquele que está sendo usado','self','Primeiro parâmetro de todo método, mas não aparece na chamada.']],MU);

J['p10-heranca']=G('Classe-mãe ou classe-filha?',
 'Na herança, a filha reaproveita a mãe e muda só o que for diferente.',
 ['mae|👩 Classe-mãe','filha|👧 Classe-filha'],
 [['class Animal:','mae','A base, com o que é comum a todos.'],
  ['class Cachorro(Animal):','filha','Tem o nome da mãe entre parênteses.'],
  ['Guarda o que é comum a vários tipos','mae','Para não repetir código.'],
  ['Reaproveita atributos e métodos da outra','filha','Herda tudo da mãe.'],
  ['Redefine só o que for diferente','filha','Só escreve o que muda.']],M);

J['p10-codigo']=G('O que essa linha faz?',
 'Ligue cada linha de código ao que ela faz.',
 ['classe|Cria a classe (o molde)','obj|Cria um objeto (instância)','met|Chama um método','attr|Lê um atributo'],
 [['class Pessoa:','classe','A palavra class define o molde.'],
  ['class Aluno(Pessoa):','classe','Um molde novo, que herda de Pessoa.'],
  ['p = Pessoa("Ana")','obj','Cria um objeto a partir do molde.'],
  ['a = Aluno("Bia")','obj','Cria um objeto da classe Aluno.'],
  ['p.falar()','met','Tem parênteses: é uma ação.'],
  ['a.andar()','met','Parênteses: método.'],
  ['p.nome','attr','Sem parênteses: é um dado.'],
  ['a.idade','attr','Sem parênteses: atributo.']],M);

/* ===== Capítulo 11: Banco de dados ===== */
J['p11-crud']=G('O CRUD do SQL',
 'Criar, ler, alterar e apagar: as 4 operações básicas de qualquer sistema.',
 ['ins|INSERT','sel|SELECT','upd|UPDATE','del|DELETE'],
 [['➕ Cadastrar uma linha nova','ins','Adiciona um registro à tabela.'],
  ['🔍 Consultar os dados','sel','Só lê, não muda nada.'],
  ['✏️ Alterar dados que já existem','upd','Muda valores de linhas existentes.'],
  ['🗑️ Apagar linhas','del','Remove registros.']],MU);

J['p11-sqlite']=G('O sqlite3 no Python',
 'Ligue cada passo ao que ele faz.',
 ['connect|connect','cursor|cursor','execute|execute','commit|commit','fetchall|fetchall','fetchone|fetchone'],
 [['🔌 Abre (ou cria) o arquivo do banco','connect','A ligação com o banco.'],
  ['🛎️ O garçom que leva seus comandos ao banco','cursor','É quem executa os comandos.'],
  ['📨 Envia um comando SQL','execute','conn.cursor().execute("SELECT ...").'],
  ['💾 Grava de verdade as mudanças','commit','Sem o commit, o que você fez some.'],
  ['📚 Devolve todas as linhas, em uma lista de tuplas','fetchall','Todas de uma vez.'],
  ['📄 Devolve uma linha só, em uma tupla','fetchone','Só a próxima.']],MU);

J['p11-sql']=G('Cláusulas e funções do SQL',
 'Ligue cada uma ao que ela faz na consulta.',
 ['where|WHERE','order|ORDER BY','count|COUNT','avg|AVG','max|MAX','sum|SUM'],
 [['🔎 Filtra: só as linhas que combinam','where','Como o filtro de uma planilha.'],
  ['📶 Coloca os resultados em ordem','order','Do menor para o maior, ou o contrário.'],
  ['🔢 Conta quantas linhas existem','count','Quantos registros.'],
  ['📊 Calcula a média','avg','Média dos valores.'],
  ['🏆 Devolve o maior valor','max','O máximo.'],
  ['➕ Soma os valores','sum','O total.']],MU);

J['p11-seguro']=G('Seguro ou perigoso?',
 'Um UPDATE ou DELETE sem WHERE atinge a tabela inteira. E juntar texto no SQL abre a porta para a injeção de SQL.',
 ['seguro|✅ Seguro','perigo|⚠️ Perigoso'],
 [['DELETE FROM alunos','perigo','Sem WHERE, apaga todos os alunos!'],
  ['UPDATE alunos SET nota = 0','perigo','Sem WHERE, zera a nota de todo mundo.'],
  ['DELETE FROM alunos WHERE id = ?','seguro','Só apaga o aluno indicado.'],
  ['execute("... WHERE nome = ?", (nome,))','seguro','O ? com tupla protege contra injeção de SQL.'],
  ['execute("... WHERE nome = \'" + nome + "\'")','perigo','Juntar textos abre a porta para a injeção de SQL.'],
  ['SELECT * FROM alunos','seguro','Só lê, não altera nada.']],M);

/* ===== Capítulo 12: Projeto final ===== */
J['p12-etapas']=G('Planta ou obra?',
 'Todo projeto começa pela planta. Depois vem a obra, etapa por etapa.',
 ['antes|📐 Antes de programar|a planta','durante|🔨 Durante|a obra'],
 [['Escrever os requisitos em frases simples','antes','O que o programa precisa fazer.'],
  ['Dividir o problema em peças pequenas','antes','Cada classe ou função com uma responsabilidade só.'],
  ['Listar os casos de teste','antes','De preferência antes de programar.'],
  ['Testar cada pedaço assim que ficar pronto','durante','Achar o erro cedo é mais fácil.'],
  ['Validar a entrada com while e try/except','durante','Para o programa não quebrar com uma digitação errada.'],
  ['Guardar os dados em CSV ou em banco de dados','durante','Para os dados sobreviverem ao fim do programa.']]);

J['p12-bugs']=G('Corrigindo um erro, passo a passo',
 'Quando algo dá errado, siga a ordem. Ligue cada passo à ação.',
 ['1|1º passo','2|2º passo','3|3º passo','4|4º passo'],
 [['👀 Ler a mensagem de erro e ver a linha indicada','1','A mensagem já diz muita coisa.'],
  ['🔁 Fazer o erro acontecer de novo, de forma controlada','2','Se você não consegue repetir, não consegue consertar.'],
  ['🔬 Acompanhar o valor das variáveis, linha a linha (rastrear)','3','Descobre onde as coisas começam a sair do esperado.'],
  ['🔧 Mudar uma coisa de cada vez e testar de novo','4','Se mudar tudo junto, você não sabe o que resolveu.']],U);

J['p12-casos']=G('Caso normal ou caso de borda?',
 'Casos de borda são os extremos, onde os erros gostam de se esconder.',
 ['normal|🙂 Normal','borda|🧗 Borda'],
 [['Idade 25','normal','Um valor comum.'],
  ['Nota 7.5','normal','Dentro do esperado.'],
  ['Nome "Ana"','normal','Um texto comum.'],
  ['Nota 0','borda','O limite mínimo.'],
  ['Nota 10','borda','O limite máximo.'],
  ['Lista vazia','borda','Nenhum item: muitos programas quebram aqui.'],
  ['Texto vazio ""','borda','O usuário só apertou Enter.'],
  ['Idade negativa','borda','Um valor que não faz sentido.']]);
})();
