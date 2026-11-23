/* Jogos de arrastar e soltar da apostila de Sistemas Operacionais de Redes (motor em ../assets/jogos.js) */
(function(){
function G(t,a,z,i,o){return Object.assign({titulo:t,ajuda:a,
 zonas:z.map(function(s){var p=s.split('|');return{id:p[0],rotulo:p[1],sub:p[2]}}),
 itens:i.map(function(x){return{t:x[0],z:x[1],why:x[2]}})},o||{})}
var J=window.JOGOS=window.JOGOS||{};

/* ===== Capítulo 1: Virtualização ===== */
J['so1-hipervisor']=G('Hipervisor tipo 1 ou tipo 2?',
 'O hipervisor é o “síndico” que reparte os recursos entre as máquinas virtuais. Onde cada um roda?',
 ['t1|🏗️ Tipo 1|direto no hardware','t2|🧩 Tipo 2|sobre um sistema operacional'],
 [['Roda direto sobre o hardware','t1','Sem sistema comum no meio, por isso rende mais.'],
  ['Roda como um programa dentro do Windows, Linux ou macOS','t2','É como abrir um programa qualquer.'],
  ['Servidores e data centers','t1','Quem precisa de desempenho usa o tipo 1.'],
  ['Estudo, testes e desktops','t2','É o que usamos nos laboratórios.'],
  ['VirtualBox','t2','Gratuito e usado nos nossos laboratórios.'],
  ['VMware Workstation','t2','Muito usado em desktops.'],
  ['VMware ESXi','t1','Hipervisor de data centers.'],
  ['Proxmox VE','t1','Plataforma baseada em Debian que gerencia VMs e containers.'],
  ['Hyper-V','t1','Vem no Windows Pro/Enterprise/Education e no Windows Server.'],
  ['KVM','t1','Já faz parte do kernel do Linux.']]);

J['so1-redes']=G('Qual modo de rede da VM?',
 'Toda VM tem uma placa de rede virtual. O que muda é como ela é conectada. Imagine a VM como um morador do prédio.',
 ['nat|NAT','pon|Ponte','int|Rede interna','hos|Somente hospedeiro'],
 [['🚪 A VM sai para a Internet pela “porta de casa”, mas ninguém de fora a acessa','nat','NAT: o morador sai para a rua, mas ninguém entra direto no apartamento.'],
  ['🏘️ A VM aparece na rede física como se fosse mais um computador','pon','Ponte: o morador ganha um endereço próprio na rua.'],
  ['🔒 Só as VMs conversam entre si, tudo isolado do resto','int','Rede interna: uma conversa só entre os moradores do prédio.'],
  ['🤝 VMs e o seu computador conversam, mas sem Internet','hos','Somente hospedeiro: a VM só fala com o dono da casa.']],{unico:true});

J['so1-vm-container']=G('Máquina virtual ou container?',
 'Os dois isolam programas, mas de jeitos diferentes. Pense em apartamentos (VM) e quartos de um mesmo apartamento (containers).',
 ['vm|🖥️ Máquina virtual|um apartamento inteiro','ct|📦 Container|um quarto compartilhado'],
 [['Tem seu próprio sistema operacional completo','vm','Cada apartamento tem a sua cozinha, banheiro e tudo.'],
  ['Compartilha o kernel do hospedeiro','ct','Os quartos dividem a mesma cozinha.'],
  ['Mais leve e inicia mais rápido','ct','Não precisa ligar um sistema inteiro.'],
  ['Isola mais, é mais “blindada”','vm','Cada VM é um sistema separado.'],
  ['Consome mais memória e disco','vm','Um sistema operacional completo por VM pesa.'],
  ['Isola menos que a outra opção','ct','Como o kernel é compartilhado, o isolamento é menor.']]);

/* ===== Capítulo 2: Windows Server ===== */
J['so2-ad']=G('A turma do Active Directory',
 'O AD é o cadastro central da rede. Ligue cada peça à analogia de uma empresa.',
 ['ad|Active Directory','gr|Grupo','ou|OU (unidade organizacional)','gpo|GPO (política de grupo)','dns|DNS'],
 [['📒 O cadastro central de funcionários, computadores e recursos','ad','Centraliza usuários, grupos e computadores.'],
  ['👥 A turma que recebe as mesmas permissões','gr','Dê a permissão ao grupo, não a cada pessoa.'],
  ['🗂️ O setor da empresa (Financeiro, RH...)','ou','Organiza os objetos e recebe as políticas.'],
  ['📜 O regulamento aplicado a um setor','gpo','Define regras para usuários e computadores. A política mais próxima vence.'],
  ['📖 A lista telefônica sem a qual o AD não funciona','dns','O AD depende do DNS para os computadores se encontrarem.']],{unico:true});

J['so2-backup']=G('Tipos de backup',
 'Completo, incremental ou diferencial? Lembre da regra 3-2-1 e de sempre testar a restauração.',
 ['com|📦 Completo','inc|➕ Incremental','dif|📈 Diferencial'],
 [['Copia tudo, sempre','com','É o “backup inteiro”.'],
  ['Copia só o que mudou desde o último backup de qualquer tipo','inc','Cada cópia é bem pequena.'],
  ['Copia o que mudou desde o último backup completo','dif','Vai crescendo até o próximo completo.'],
  ['Ocupa mais espaço e demora mais para fazer','com','Mas é o mais simples de restaurar.'],
  ['Para restaurar, precisa do completo e de todos os incrementais','inc','Uma cadeia: se um elo falha, tudo se complica.'],
  ['Para restaurar, precisa do completo e só do último diferencial','dif','Só duas peças.'],
  ['O mais rápido de fazer','inc','Copia pouca coisa por vez.']]);

J['so2-dhcp']=G('O DHCP do Windows Server',
 'O servidor DHCP entrega a configuração de rede. Ligue cada conceito ao que ele faz.',
 ['esc|Escopo','exc|Exclusão','res|Reserva','opc|Opções'],
 [['📏 A faixa de IPs que o servidor pode distribuir','esc','É a “lista de crachás” disponível.'],
  ['🚫 Endereços da faixa que ficam de fora (ex.: servidores)','exc','Para não distribuir IPs que já têm dono.'],
  ['⭐ Sempre entrega o mesmo IP a um aparelho específico (pelo MAC)','res','Como a vaga fixa no estacionamento.'],
  ['🎒 Gateway, DNS e outros dados que vão junto com o IP','opc','O “kit” que acompanha o endereço.']],{unico:true});

J['so2-core']=G('Desktop Experience ou Server Core?',
 'O Windows Server pode ser instalado de dois jeitos.',
 ['gui|🖼️ Desktop Experience|com interface gráfica','core|⌨️ Server Core|sem interface gráfica'],
 [['Tem janelas, menus e mouse como no Windows comum','gui','É o mais fácil para quem está começando.'],
  ['Administrado por linha de comando e PowerShell','core','Sem desenho, só texto.'],
  ['Mais leve e com menos coisas para atacar','core','Quanto menos recursos instalados, menos portas abertas.'],
  ['Traz o Gerenciador do Servidor na própria máquina','gui','Tudo à mão, na tela.'],
  ['Ocupa menos espaço em disco e memória','core','Sem a parte gráfica, sobra mais para os serviços.']]);

/* ===== Capítulo 3: Linux ===== */
J['so3-comandos']=G('Que comando é esse?',
 'Ligue cada comando do Linux ao que ele faz.',
 ['pwd|pwd','ls|ls','cd|cd','mkdir|mkdir','rm|rm','grep|grep','sudo|sudo','chmod|chmod'],
 [['📍 Mostra em que pasta você está','pwd','“Onde estou?”'],
  ['👀 Lista o conteúdo da pasta','ls','Como abrir a gaveta e olhar dentro.'],
  ['🚶 Muda de pasta','cd','Anda de uma sala para outra.'],
  ['🆕 Cria uma pasta','mkdir','“Make directory”.'],
  ['🗑️ Apaga arquivos (cuidado: não vai para a lixeira)','rm','No terminal, apagou, sumiu.'],
  ['🔎 Procura um texto dentro dos arquivos','grep','O “Ctrl+F” do terminal.'],
  ['👑 Executa como administrador','sudo','O crachá de chefe, por um instante.'],
  ['🔐 Muda as permissões de um arquivo','chmod','Define quem lê, escreve e executa.']],{unico:true,mono:true});

J['so3-pastas']=G('Onde fica cada coisa?',
 'No Linux tudo parte da raiz “/”. Ligue cada pasta ao seu conteúdo.',
 ['raiz|/','etc|/etc','log|/var/log','home|/home'],
 [['🌳 O início de tudo: a raiz da árvore de diretórios','raiz','Todos os caminhos partem dela.'],
  ['⚙️ Os arquivos de configuração do sistema e dos serviços','etc','É o “painel de controle” em texto.'],
  ['📜 Os registros (logs) do que aconteceu','log','O diário do servidor.'],
  ['🏠 As pastas pessoais dos usuários','home','Cada usuário tem a sua “casa”.']],{unico:true,mono:true});

J['so3-permissoes']=G('Lendo as permissões',
 'rwx para dono, grupo e outros. Em números: r = 4, w = 2, x = 1. Ligue cada peça ao seu significado.',
 ['r|r = 4','w|w = 2','x|x = 1','750|chmod 750'],
 [['👁️ Ler o arquivo','r','Ver o conteúdo.'],
  ['✏️ Alterar ou gravar','w','Escrever no arquivo.'],
  ['▶️ Executar (ou entrar na pasta)','x','Rodar o programa.'],
  ['Dono: tudo · Grupo: ler e executar · Outros: nada','750','7 = 4+2+1, 5 = 4+1, 0 = nada.']],{unico:true,mono:true});

J['so3-servicos']=G('Quem é quem nos serviços de rede',
 'Ligue cada serviço do Linux à sua função.',
 ['ssh|SSH (porta 22)','bind|BIND9','dhcp|DHCP','samba|Samba','apache|Apache'],
 [['🔐 Acesso remoto seguro (prefira chaves a senhas)','ssh','O terminal à distância, com criptografia.'],
  ['📖 Servidor DNS: guarda zonas e registros','bind','A lista telefônica da rede.'],
  ['🎫 Entrega IP automático (escopo e opções)','dhcp','Quem distribui os crachás.'],
  ['📁 Compartilha arquivos com computadores Windows (SMB)','samba','A ponte entre Linux e Windows.'],
  ['🌐 Servidor web','apache','Entrega as páginas do site.']],{unico:true});

J['so3-gerencia']=G('Gerenciando o servidor',
 'Ligue cada comando à tarefa de administração.',
 ['sysctl|systemctl','jour|journalctl','apt|apt','ip|ip -br a','ss|ss -tulpn','add|adduser'],
 [['🔌 Liga, desliga e reinicia serviços','sysctl','Controla os serviços.'],
  ['📖 Lê os logs do sistema','jour','Ver o que o serviço contou.'],
  ['📦 Instala e atualiza programas (pacotes)','apt','A “loja de aplicativos” do Linux.'],
  ['🌐 Mostra os endereços IP das placas de rede','ip','O resumo da rede.'],
  ['🚪 Lista as portas abertas e quem as usa','ss','Quais portas estão escutando.'],
  ['👤 Cria um usuário novo','add','Cadastra alguém no sistema.']],{unico:true,mono:true});

/* ===== Capítulo 4: Computação em nuvem ===== */
J['so4-servico']=G('IaaS, PaaS ou SaaS?',
 'Quanto você precisa cuidar? Quanto mais à direita, menos trabalho (e menos controle).',
 ['iaas|🏗️ IaaS|infraestrutura','paas|🛠️ PaaS|plataforma','saas|📱 SaaS|programa pronto'],
 [['Você cuida do sistema operacional, dos programas e dos dados','iaas','O provedor entrega só a máquina.'],
  ['Você cuida só do código e dos dados','paas','Como alugar a cozinha equipada.'],
  ['Você só usa o programa pronto','saas','Como pedir a pizza pronta.'],
  ['Uma máquina virtual alugada','iaas','Você configura tudo dentro dela.'],
  ['Um e-mail ou editor de texto na web','saas','Abre no navegador e usa.'],
  ['Um lugar para publicar seu site sem cuidar do servidor','paas','O provedor cuida do servidor, você cuida do site.']]);

J['so4-implantacao']=G('Qual tipo de nuvem?',
 'Ligue cada modelo de implantação à analogia de transporte.',
 ['pub|Pública','pri|Privada','hib|Híbrida','com|Comunitária'],
 [['🚌 O ônibus: compartilhada, pela Internet, para qualquer cliente','pub','Muita gente usa a mesma infraestrutura.'],
  ['🚗 O carro próprio: só da organização','pri','Exclusiva, mas você cuida dela.'],
  ['🚗+🚌 Carro próprio e ônibus, usados juntos','hib','Duas nuvens conectadas.'],
  ['🚐 A van compartilhada por vizinhos com a mesma necessidade','com','Várias organizações com interesses parecidos.']],{unico:true});

J['so4-responsabilidade']=G('Segurança compartilhada: de quem é?',
 'Na nuvem, a segurança é dividida. O provedor cuida do prédio. Você cuida da sua chave e do que guarda lá dentro.',
 ['prov|🏢 Provedor','cli|🧑 Cliente'],
 [['Proteger os prédios e os servidores físicos','prov','Você nunca vê o data center.'],
  ['Proteger a infraestrutura de rede e o hardware','prov','É a base de tudo.'],
  ['Proteger as senhas e contas de acesso','cli','Senha fraca é culpa de quem a escolheu.'],
  ['Cuidar dos seus dados','cli','O conteúdo é seu.'],
  ['Configurar as permissões corretamente','cli','Deixar um arquivo “público” por engano é erro de configuração.'],
  ['Manter os servidores e a energia funcionando','prov','É o trabalho do data center.']]);

J['so4-nist']=G('As 5 características da nuvem (NIST)',
 'Ligue cada característica à analogia.',
 ['auto|Autoatendimento','rede|Acesso pela rede','pool|Agrupamento de recursos','elas|Elasticidade','med|Serviço medido'],
 [['📲 Pedir um recurso sozinho, sem falar com atendente','auto','Você sobe a máquina por um painel.'],
  ['🌍 Usar de qualquer aparelho, pela Internet','rede','Só precisa de conexão.'],
  ['🏘️ Vários clientes dividem os mesmos servidores','pool','Como os moradores que dividem o prédio.'],
  ['🪗 Aumentar e diminuir os recursos conforme a demanda','elas','Como uma sanfona.'],
  ['⚡ Pagar pelo que usou, como a conta de luz','med','Consumo medido, cobrança por uso.']],{unico:true});

/* ===== Jogos de ordenar passos ===== */
function O(t,a,p,o){return Object.assign({titulo:t,ajuda:a,passos:p.map(function(x){return{t:x[0],why:x[1]}})},o||{})}
J['so3-ordem-servico']=O('A receita para configurar um serviço no Linux',
 'Sempre que for colocar um serviço no ar, siga esta ordem. Ela evita muita dor de cabeça.',
 [['Instalar o pacote','Com o apt install.'],
  ['Configurar os arquivos (em /etc)','Ajustar o serviço ao que você precisa.'],
  ['Testar a configuração antes de reiniciar','Um erro de digitação pode derrubar o serviço, então teste antes.'],
  ['Reiniciar o serviço','Para valer a nova configuração.'],
  ['Testar a partir de um cliente','O teste final: funciona para quem vai usar?']]);
var V={'so1-hipervisor':'c1-intro','so1-redes':'c1-redes','so1-vm-container':'c1-cont','so2-ad':'c2-ad','so2-backup':'c2-backup','so2-dhcp':'c2-dns','so2-core':'c2-inst','so3-comandos':'c3-adm','so3-pastas':'c3-inst','so3-permissoes':'c3-adm','so3-servicos':'c3-serv','so3-gerencia':'c3-adm','so3-ordem-servico':'c3-serv','so4-servico':'c4-serv','so4-implantacao':'c4-impl','so4-responsabilidade':'c4-prov','so4-nist':'c4-conc'};
Object.keys(V).forEach(function(k){if(J[k])J[k].ver=V[k]});

})();
