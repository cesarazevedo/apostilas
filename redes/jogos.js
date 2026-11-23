/* Jogos de arrastar e soltar da apostila de Redes (o motor está em ../assets/jogos.js) */
window.JOGOS=window.JOGOS||{};
Object.assign(window.JOGOS,{
 'r1-dispositivos':{titulo:'Final ou intermediário?',
  ajuda:'Dispositivo final é quem pede ou usa os dados. Intermediário é quem leva os dados até o destino.',
  zonas:[{id:'fin',rotulo:'💻 Dispositivo final',sub:'A casa onde a encomenda chega'},{id:'int',rotulo:'🔀 Intermediário',sub:'O carteiro e o cruzamento'}],
  itens:[
   {t:'Notebook',z:'fin',why:'Você usa o notebook: ele é o começo ou o fim da conversa.'},
   {t:'Celular',z:'fin',why:'É um dispositivo final: quem pede a página é você.'},
   {t:'Smart TV',z:'fin',why:'Recebe o vídeo e mostra na tela. É o destino.'},
   {t:'Impressora de rede',z:'fin',why:'Recebe o arquivo e imprime. Ponta da rede.'},
   {t:'Câmera de segurança IP',z:'fin',why:'Gera as imagens e envia. Também é ponta.'},
   {t:'Switch',z:'int',why:'Entrega o quadro só para a porta certa, como a portaria do condomínio.'},
   {t:'Roteador',z:'int',why:'Escolhe o caminho entre redes, como o carteiro que decide a rota.'},
   {t:'Ponto de acesso Wi-Fi',z:'int',why:'Só leva os dados do ar para o cabo. Não usa a informação.'},
   {t:'Hub',z:'int',why:'Repete tudo para todo mundo. Antigo, mas é intermediário.'},
   {t:'Modem',z:'int',why:'Traduz o sinal entre a sua casa e o provedor.'}]},

 'r1-areas':{titulo:'Qual é o tamanho da rede?',
  ajuda:'Ligue cada situação ao tipo de rede por área de cobertura.',unico:true,
  zonas:[{id:'pan',rotulo:'PAN',sub:'Pessoal'},{id:'lan',rotulo:'LAN',sub:'Local'},{id:'man',rotulo:'MAN',sub:'Metropolitana'},{id:'wan',rotulo:'WAN',sub:'Geográfica'}],
  itens:[
   {t:'Fone Bluetooth ligado ao celular',z:'pan',why:'Alcance de poucos metros: sua “bolha” pessoal.'},
   {t:'Laboratório de informática da escola',z:'lan',why:'Um prédio ou sala: o território típico da LAN.'},
   {t:'Rede que liga as escolas de uma cidade',z:'man',why:'Cobre uma cidade inteira, como a rede de ônibus municipal.'},
   {t:'Banco ligando agências de estados diferentes',z:'wan',why:'Cobre grandes distâncias, como as rodovias entre estados.'}]},

 'r1-componentes':{titulo:'Ligue o componente à analogia',
  ajuda:'Toda rede tem 4 componentes. Qual analogia combina com cada um?',unico:true,
  zonas:[{id:'fin',rotulo:'Dispositivo final'},{id:'int',rotulo:'Dispositivo intermediário'},{id:'meio',rotulo:'Meio de transmissão'},{id:'prot',rotulo:'Protocolo'}],
  itens:[
   {t:'🏠 A casa que manda e recebe cartas',z:'fin',why:'É onde a comunicação começa e termina.'},
   {t:'📮 O correio que separa e encaminha as cartas',z:'int',why:'Não escreve nem lê a carta: só leva até o destino.'},
   {t:'🛣️ A rua por onde o carteiro passa',z:'meio',why:'Cabo, fibra ou ondas de rádio: é o caminho dos sinais.'},
   {t:'🗣️ A língua que os dois falam',z:'prot',why:'Sem regras combinadas, um não entende o outro.'}]}
});

/* ===== Capítulo 2: Padrões e modelos ===== */
Object.assign(window.JOGOS,{
 'r2-camadas':{titulo:'Das 7 camadas do OSI para as 4 do TCP/IP',
  ajuda:'Em qual camada do TCP/IP cada camada do OSI se encaixa?',
  zonas:[{id:'apl',rotulo:'Aplicação',sub:'TCP/IP'},{id:'tra',rotulo:'Transporte',sub:'TCP/IP'},{id:'net',rotulo:'Internet',sub:'TCP/IP'},{id:'ace',rotulo:'Acesso à rede',sub:'TCP/IP'}],
  itens:[
   {t:'OSI: Aplicação',z:'apl',why:'É onde ficam os programas, como navegador e e-mail.'},
   {t:'OSI: Apresentação',z:'apl',why:'No TCP/IP, o formato dos dados é tratado junto com a aplicação.'},
   {t:'OSI: Sessão',z:'apl',why:'Controlar o diálogo também fica com a aplicação no TCP/IP.'},
   {t:'OSI: Transporte',z:'tra',why:'Mesmo nome nos dois modelos: leva ao programa certo (porta).'},
   {t:'OSI: Rede',z:'net',why:'É a camada do IP e dos roteadores.'},
   {t:'OSI: Enlace',z:'ace',why:'Cuida do vizinho direto (MAC, switch). No TCP/IP vira Acesso à rede.'},
   {t:'OSI: Física',z:'ace',why:'Cabos e sinais também ficam no Acesso à rede.'}]},

 'r2-unidades':{titulo:'Como se chama o “pacote” em cada camada?',
  ajuda:'Cada camada dá um nome ao bloco de dados. Ligue a camada ao nome.',unico:true,
  zonas:[{id:'msg',rotulo:'Mensagem'},{id:'seg',rotulo:'Segmento'},{id:'pac',rotulo:'Pacote'},{id:'qua',rotulo:'Quadro'},{id:'bit',rotulo:'Bits'}],
  itens:[
   {t:'Aplicação: o texto da carta que você escreveu',z:'msg',why:'É o conteúdo original, ainda sem embrulho.'},
   {t:'Transporte: a carta no 1º envelope, com a porta',z:'seg',why:'O transporte acrescenta as portas de origem e destino.'},
   {t:'Rede: o 2º envelope, com o endereço IP',z:'pac',why:'A camada de rede acrescenta os IPs.'},
   {t:'Enlace: o 3º envelope, com os MACs',z:'qua',why:'O enlace acrescenta o cabeçalho e o FCS.'},
   {t:'Física: os sinais elétricos, luz ou rádio',z:'bit',why:'No cabo só existem 0s e 1s.'}]},

 'r2-modelos':{titulo:'OSI ou TCP/IP?',
  ajuda:'Cada afirmação descreve melhor qual modelo?',
  zonas:[{id:'osi',rotulo:'📘 OSI',sub:'modelo de referência'},{id:'tcp',rotulo:'🌐 TCP/IP',sub:'o que a Internet usa'}],
  itens:[
   {t:'Tem 7 camadas',z:'osi',why:'Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace e Física.'},
   {t:'Tem 4 camadas',z:'tcp',why:'Aplicação, Transporte, Internet e Acesso à rede.'},
   {t:'É o modelo usado de verdade na Internet',z:'tcp',why:'A Internet foi construída em cima do TCP/IP.'},
   {t:'Serve como modelo de referência para estudar',z:'osi',why:'É a “planta” que todo mundo usa para explicar redes.'},
   {t:'Separa Apresentação e Sessão em camadas próprias',z:'osi',why:'No TCP/IP essas funções ficam na Aplicação.'},
   {t:'Tem a camada chamada Internet',z:'tcp',why:'No OSI, ela se chama Rede.'},
   {t:'Tem a camada chamada Enlace',z:'osi',why:'No TCP/IP, enlace e física viram Acesso à rede.'}]}
});

/* ===== Capítulo 3: Acesso à rede ===== */
Object.assign(window.JOGOS,{
 'r3-cabo-wifi':{titulo:'Cabeado ou sem fio?',
  ajuda:'Ethernet (802.3) usa cabo. Wi-Fi (802.11) usa ondas de rádio. De quem é cada peça?',
  zonas:[{id:'eth',rotulo:'🔌 Ethernet',sub:'IEEE 802.3'},{id:'wifi',rotulo:'📶 Wi-Fi',sub:'IEEE 802.11'}],
  itens:[
   {t:'Cabo UTP com conector RJ-45',z:'eth',why:'O cabo de par trançado é o meio da Ethernet.'},
   {t:'Switch',z:'eth',why:'Liga os equipamentos por cabo e aprende os MACs.'},
   {t:'Fibra óptica (usa luz)',z:'eth',why:'Também é Ethernet e vai muito mais longe que o UTP.'},
   {t:'Limite de 100 m por trecho de UTP',z:'eth',why:'Passou disso, precisa de repetidor, switch ou fibra.'},
   {t:'SSID (nome da rede)',z:'wifi',why:'É o nome que aparece na lista de redes do celular.'},
   {t:'Ponto de acesso (AP)',z:'wifi',why:'Faz a ponte entre o ar e o cabo.'},
   {t:'CSMA/CA',z:'wifi',why:'Cada um espera sua vez de falar, para não falarem juntos.'},
   {t:'Canais e faixas de 2,4 e 5 GHz',z:'wifi',why:'Como as estações de rádio: cada rede escolhe a sua.'},
   {t:'Segurança com WPA2 ou WPA3',z:'wifi',why:'O ar é aberto a todos, então a senha e a criptografia são essenciais.'}]},

 'r3-quadro':{titulo:'Monte o quadro Ethernet',
  ajuda:'O quadro é como um envelope. Ligue cada campo ao que ele faz.',unico:true,
  zonas:[{id:'dst',rotulo:'MAC de destino'},{id:'src',rotulo:'MAC de origem'},{id:'tip',rotulo:'Tipo'},{id:'dad',rotulo:'Dados'},{id:'fcs',rotulo:'FCS'}],
  itens:[
   {t:'✉️ Endereço do destinatário no envelope',z:'dst',why:'Diz para qual placa de rede o quadro vai.'},
   {t:'📬 Remetente, para saber quem enviou',z:'src',why:'É o MAC de quem mandou.'},
   {t:'🏷️ Etiqueta: “dentro tem IPv4, IPv6 ou ARP”',z:'tip',why:'Diz ao receptor o que vem lá dentro.'},
   {t:'📄 A carta que está dentro do envelope',z:'dad',why:'É o pacote vindo da camada de rede.'},
   {t:'🔍 Selo de conferência: detecta se chegou com erro',z:'fcs',why:'Se a conta não bate, o quadro é jogado fora.'}]},

 'r3-faixas':{titulo:'2,4 GHz ou 5/6 GHz?',
  ajuda:'Cada faixa tem vantagens e desvantagens. Qual frase combina com qual?',
  zonas:[{id:'g24',rotulo:'📻 2,4 GHz',sub:'a de longo alcance'},{id:'g5',rotulo:'🚀 5 e 6 GHz',sub:'as mais rápidas'}],
  itens:[
   {t:'Alcança mais longe',z:'g24',why:'Como um som grave: vai mais longe.'},
   {t:'Atravessa melhor as paredes',z:'g24',why:'Ondas mais “longas” passam melhor pelos obstáculos.'},
   {t:'Sofre interferência de micro-ondas e Bluetooth',z:'g24',why:'Muita coisa usa essa faixa, é uma rua congestionada.'},
   {t:'Muito congestionada pelas redes dos vizinhos',z:'g24',why:'Tem poucos canais livres.'},
   {t:'Mais velocidade',z:'g5',why:'É a pista expressa.'},
   {t:'Mais canais livres',z:'g5',why:'Menos gente disputando o mesmo canal.'},
   {t:'Alcance menor',z:'g5',why:'Quanto mais rápida, menos longe chega.'},
   {t:'Sofre mais com paredes',z:'g5',why:'Uma parede de concreto atrapalha bastante.'}]}
});

/* ===== Capítulo 4: Camada de internet ===== */
Object.assign(window.JOGOS,{
 'r4-enderecos':{titulo:'Privado, público ou especial?',
  ajuda:'Faixas privadas: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16. Cuidado com as pegadinhas!',
  zonas:[{id:'pri',rotulo:'🏠 Privado',sub:'só dentro da rede'},{id:'pub',rotulo:'🌍 Público',sub:'roda na Internet'},{id:'esp',rotulo:'⚙️ Especial',sub:'loopback e APIPA'}],
  itens:[
   {t:'10.20.30.40',z:'pri',why:'Toda a faixa 10.x.x.x é privada.'},
   {t:'172.20.5.9',z:'pri',why:'172.16 a 172.31 é privado.'},
   {t:'192.168.0.10',z:'pri',why:'O endereço clássico do roteador de casa.'},
   {t:'8.8.8.8',z:'pub',why:'É o DNS do Google, um endereço público.'},
   {t:'172.32.0.1',z:'pub',why:'Pegadinha: o privado acaba em 172.31.255.255.'},
   {t:'172.15.0.1',z:'pub',why:'Pegadinha: o privado começa em 172.16.'},
   {t:'127.0.0.1',z:'esp',why:'Loopback: “o próprio computador”.'},
   {t:'169.254.12.7',z:'esp',why:'APIPA: o computador se deu esse IP porque o DHCP falhou.'}]},

 'r4-protocolos':{titulo:'Quem faz o quê na camada de internet?',
  ajuda:'Ligue cada peça à analogia.',unico:true,
  zonas:[{id:'ip',rotulo:'IP'},{id:'arp',rotulo:'ARP'},{id:'icmp',rotulo:'ICMP'},{id:'tab',rotulo:'Tabela de roteamento'},{id:'pad',rotulo:'Rota padrão (0.0.0.0/0)'}],
  itens:[
   {t:'🏷️ O endereço postal que leva a carta de ponta a ponta',z:'ip',why:'O IP leva o pacote entre redes, sem garantia de entrega.'},
   {t:'📣 “Quem tem o IP 192.168.0.5? Responda com seu MAC!”',z:'arp',why:'O ARP descobre o MAC a partir do IP, na rede local.'},
   {t:'🛎️ O aviso “destino inalcançável” e o teste do ping',z:'icmp',why:'O ICMP leva avisos e dá base ao ping e ao traceroute.'},
   {t:'🗺️ O mapa que o roteador consulta para escolher o caminho',z:'tab',why:'Vale a rota de prefixo mais longo.'},
   {t:'🚪 “Na dúvida, mande por aqui”',z:'pad',why:'É para onde vai tudo que não tem rota mais específica.'}]},

 'r4-ipv':{titulo:'IPv4 ou IPv6?',
  ajuda:'Qual versão do IP cada característica descreve?',
  zonas:[{id:'v4',rotulo:'IPv4'},{id:'v6',rotulo:'IPv6'}],
  itens:[
   {t:'32 bits',z:'v4',why:'Quatro números de 0 a 255.'},
   {t:'128 bits',z:'v6',why:'Um espaço tão grande que não deve acabar.'},
   {t:'Cerca de 4,3 bilhões de endereços',z:'v4',why:'Foi o que esgotou.'},
   {t:'Escrito em hexadecimal',z:'v6',why:'Usa números e letras de a a f.'},
   {t:'Pode abreviar com “::” (uma vez só)',z:'v6',why:'O “::” substitui uma sequência de zeros.'},
   {t:'192.168.0.1',z:'v4',why:'Quatro números separados por pontos.'},
   {t:'2001:db8::1',z:'v6',why:'Grupos separados por dois-pontos.'},
   {t:'Esgotou e levou à criação da outra versão',z:'v4',why:'Faltaram endereços, e por isso nasceu o IPv6.'}]},

 'r4-roteamento':{titulo:'Roteamento estático ou dinâmico?',
  ajuda:'Estático é o mapa desenhado à mão. Dinâmico é o GPS que se atualiza.',
  zonas:[{id:'est',rotulo:'✍️ Estático',sub:'manual'},{id:'din',rotulo:'📡 Dinâmico',sub:'automático'}],
  itens:[
   {t:'O administrador digita cada rota',z:'est',why:'Tudo na mão, como desenhar o mapa.'},
   {t:'RIP, OSPF e BGP',z:'din',why:'São os protocolos de roteamento dinâmico.'},
   {t:'Se um caminho cai, é preciso corrigir manualmente',z:'est',why:'O roteador não percebe sozinho.'},
   {t:'Se um caminho cai, a rede se ajusta sozinha',z:'din',why:'Como o GPS que recalcula a rota.'},
   {t:'Simples e bom para redes pequenas',z:'est',why:'Poucas rotas, fácil de manter.'},
   {t:'Os roteadores trocam informações entre si',z:'din',why:'Eles “conversam” para descobrir os caminhos.'}]}
});

/* ===== Capítulo 5: Camada de transporte ===== */
Object.assign(window.JOGOS,{
 'r5-tcp-udp':{titulo:'TCP ou UDP?',
  ajuda:'TCP é a carta registrada. UDP é o panfleto jogado na caixa de correio.',
  zonas:[{id:'tcp',rotulo:'📦 TCP',sub:'confiável'},{id:'udp',rotulo:'⚡ UDP',sub:'rápido e leve'}],
  itens:[
   {t:'Handshake de 3 vias',z:'tcp',why:'Antes de falar, os dois combinam: “alô, estou aqui, ok!”.'},
   {t:'Reenvia o que se perdeu',z:'tcp',why:'Se não chegou o recibo, manda de novo.'},
   {t:'Entrega na ordem certa',z:'tcp',why:'Numera os segmentos e reorganiza no destino.'},
   {t:'Navegar em sites (HTTP/HTTPS)',z:'tcp',why:'Uma página incompleta não serve, precisa de confiabilidade.'},
   {t:'E-mail e transferência de arquivos',z:'tcp',why:'Não pode faltar nenhum pedacinho.'},
   {t:'Cabeçalho de apenas 8 bytes',z:'udp',why:'Leve: quase sem “embrulho”.'},
   {t:'Sem conexão e sem garantias',z:'udp',why:'Manda e pronto, sem perguntar se chegou.'},
   {t:'Chamada de voz e vídeo ao vivo',z:'udp',why:'Melhor perder um pedacinho do que atrasar tudo.'},
   {t:'Jogos online',z:'udp',why:'Velocidade vale mais que a perfeição.'},
   {t:'Consultas DNS e DHCP',z:'udp',why:'Mensagens curtas e rápidas.'}]},

 'r5-portas':{titulo:'Portas conhecidas',
  ajuda:'Cada serviço tem uma “porta” padrão, como o número do apartamento. Ligue as duas coisas.',unico:true,
  zonas:[{id:'p21',rotulo:'Porta 21'},{id:'p22',rotulo:'Porta 22'},{id:'p25',rotulo:'Porta 25'},{id:'p53',rotulo:'Porta 53'},{id:'p80',rotulo:'Porta 80'},{id:'p443',rotulo:'Porta 443'}],
  itens:[
   {t:'FTP (transferência de arquivos)',z:'p21',why:'Porta de controle do FTP.'},
   {t:'SSH (acesso remoto seguro)',z:'p22',why:'O terminal remoto com criptografia.'},
   {t:'SMTP (envio de e-mail)',z:'p25',why:'É a porta do servidor de envio.'},
   {t:'DNS (nomes em IPs)',z:'p53',why:'A lista telefônica da Internet.'},
   {t:'HTTP (web sem criptografia)',z:'p80',why:'A web “aberta”.'},
   {t:'HTTPS (web com criptografia)',z:'p443',why:'O cadeado do navegador.'}]},

 'r5-handshake':{titulo:'O handshake do TCP',
  ajuda:'Antes de conversar, o TCP “abre a ligação”. Ligue cada passo à fala correspondente.',unico:true,
  zonas:[{id:'syn',rotulo:'1º passo: SYN'},{id:'synack',rotulo:'2º passo: SYN+ACK'},{id:'ack',rotulo:'3º passo: ACK'},{id:'re',rotulo:'Se faltar confirmação'}],
  itens:[
   {t:'📞 Cliente: “Alô, quero conversar. Você está aí?”',z:'syn',why:'O cliente pede para abrir a conexão.'},
   {t:'🙋 Servidor: “Estou, e você me ouve bem?”',z:'synack',why:'O servidor aceita e também pede confirmação.'},
   {t:'👍 Cliente: “Ouço sim. Vamos começar!”',z:'ack',why:'A conexão está aberta, já dá para trocar dados.'},
   {t:'🔁 Carteiro: “Não recebi o recibo, vou mandar de novo”',z:'re',why:'O TCP reenvia o que não foi confirmado.'}]}
});

/* ===== Capítulo 6: Camada de aplicação ===== */
Object.assign(window.JOGOS,{
 'r6-protocolos':{titulo:'Protocolo e analogia',
  ajuda:'Ligue cada protocolo de aplicação ao que ele faz.',unico:true,
  zonas:[{id:'http',rotulo:'HTTP/HTTPS'},{id:'dns',rotulo:'DNS'},{id:'dhcp',rotulo:'DHCP'},{id:'smtp',rotulo:'SMTP'},{id:'pop',rotulo:'POP3'},{id:'imap',rotulo:'IMAP'},{id:'ftp',rotulo:'FTP'},{id:'ssh',rotulo:'SSH'}],
  itens:[
   {t:'🛒 Pedir e receber páginas da Web',z:'http',why:'O navegador pede, o servidor entrega.'},
   {t:'📖 Lista telefônica: traduz nome em IP',z:'dns',why:'Você digita o nome, ele descobre o número.'},
   {t:'🎫 Distribui IP, máscara, gateway e DNS',z:'dhcp',why:'Como a recepção que entrega crachá e mapa ao visitante.'},
   {t:'📮 Correio que ENVIA a mensagem',z:'smtp',why:'SMTP só envia.'},
   {t:'📥 Baixa o e-mail para o seu aparelho',z:'pop',why:'Pega a carta e leva para casa.'},
   {t:'☁️ Mantém o e-mail no servidor, sincronizado nos aparelhos',z:'imap',why:'A caixa de correio continua na nuvem e todos os aparelhos veem o mesmo.'},
   {t:'🚚 Transfere arquivos, mas sem criptografia',z:'ftp',why:'Para segurança, prefira SFTP ou FTPS.'},
   {t:'🔐 Terminal remoto com criptografia',z:'ssh',why:'Substitui o Telnet, que mandava tudo aberto.'}]},

 'r6-status':{titulo:'Códigos de status HTTP',
  ajuda:'O servidor responde com um número. Em qual família cada código cai?',
  zonas:[{id:'c2',rotulo:'2xx',sub:'deu certo'},{id:'c3',rotulo:'3xx',sub:'foi para outro lugar'},{id:'c4',rotulo:'4xx',sub:'erro do cliente'},{id:'c5',rotulo:'5xx',sub:'erro do servidor'}],
  itens:[
   {t:'200 OK',z:'c2',why:'Tudo certo.'},
   {t:'201 Created',z:'c2',why:'Foi criado com sucesso. Família 2xx = sucesso.'},
   {t:'301 Moved Permanently',z:'c3',why:'A página mudou de endereço para sempre.'},
   {t:'302 Found',z:'c3',why:'Redirecionamento temporário.'},
   {t:'403 Forbidden',z:'c4',why:'Você não tem permissão. O erro está do lado de quem pediu.'},
   {t:'404 Not Found',z:'c4',why:'Você pediu uma página que não existe.'},
   {t:'500 Internal Server Error',z:'c5',why:'O servidor se atrapalhou.'},
   {t:'503 Service Unavailable',z:'c5',why:'O servidor está fora do ar ou sobrecarregado.'}]},

 'r6-dhcp':{titulo:'A conversa do DHCP (DORA)',
  ajuda:'Quatro mensagens para ganhar um IP. Ligue cada uma à fala.',unico:true,
  zonas:[{id:'d',rotulo:'Discover'},{id:'o',rotulo:'Offer'},{id:'r',rotulo:'Request'},{id:'a',rotulo:'Ack'}],
  itens:[
   {t:'📢 Cliente: “Tem algum servidor aí? Preciso de um IP!”',z:'d',why:'O cliente chega sem endereço e grita para todos.'},
   {t:'🎁 Servidor: “Posso te oferecer o 192.168.0.50”',z:'o',why:'O servidor faz uma oferta.'},
   {t:'✋ Cliente: “Aceito esse IP!”',z:'r',why:'O cliente pede formalmente o IP oferecido.'},
   {t:'✅ Servidor: “Confirmado, é seu pelo tempo combinado”',z:'a',why:'A configuração é entregue e o cliente já pode usar a rede.'}]},

 'r6-seguro':{titulo:'Com ou sem criptografia?',
  ajuda:'Alguns protocolos mandam tudo “aberto”, como cartão-postal. Outros usam envelope lacrado.',
  zonas:[{id:'aberto',rotulo:'📮 Cartão-postal',sub:'sem criptografia'},{id:'lacrado',rotulo:'🔒 Envelope lacrado',sub:'com criptografia'}],
  itens:[
   {t:'Telnet',z:'aberto',why:'Manda até a senha aberta pela rede.'},
   {t:'FTP',z:'aberto',why:'Sem criptografia, por isso se prefere SFTP ou FTPS.'},
   {t:'HTTP (porta 80)',z:'aberto',why:'Qualquer um no caminho pode ler.'},
   {t:'SSH',z:'lacrado',why:'O substituto seguro do Telnet.'},
   {t:'SFTP',z:'lacrado',why:'A versão segura da transferência de arquivos.'},
   {t:'FTPS',z:'lacrado',why:'FTP com camada de criptografia.'},
   {t:'HTTPS (porta 443)',z:'lacrado',why:'O cadeado do navegador.'}]}
});

/* ===== Capítulo 7: Segurança de redes ===== */
Object.assign(window.JOGOS,{
 'r7-cid':{titulo:'A tríade CID',
  ajuda:'Confidencialidade, Integridade e Disponibilidade. Qual pilar está em jogo?',
  zonas:[{id:'c',rotulo:'🤫 Confidencialidade',sub:'só quem pode vê'},{id:'i',rotulo:'✍️ Integridade',sub:'não foi alterado'},{id:'d',rotulo:'🟢 Disponibilidade',sub:'está no ar'}],
  itens:[
   {t:'Criptografar um arquivo',z:'c',why:'Como um cofre: só abre com a chave.'},
   {t:'Vazamento de dados de clientes',z:'c',why:'Gente que não podia viu a informação.'},
   {t:'Alguém muda o valor de um boleto',z:'i',why:'O dado foi adulterado no meio do caminho.'},
   {t:'Assinatura digital e verificação de integridade',z:'i',why:'Provam que o conteúdo não foi mexido.'},
   {t:'Ataque DDoS que derruba o site',z:'d',why:'O serviço não está disponível quando se precisa.'},
   {t:'Backup e nobreak',z:'d',why:'Garantem que o sistema volte rápido ou continue ligado.'}]},

 'r7-malware':{titulo:'Quem é quem entre os malwares?',
  ajuda:'Ligue cada praga digital à sua característica.',unico:true,
  zonas:[{id:'worm',rotulo:'Worm'},{id:'trojan',rotulo:'Trojan'},{id:'ransom',rotulo:'Ransomware'},{id:'spy',rotulo:'Spyware'},{id:'bot',rotulo:'Botnet'}],
  itens:[
   {t:'🦠 Se espalha sozinho pela rede, sem precisar de você',z:'worm',why:'É o “vírus de gripe”: passa de máquina em máquina.'},
   {t:'🐴 Parece um programa útil, mas esconde o ataque',z:'trojan',why:'O cavalo de Troia: o presente com surpresa dentro.'},
   {t:'🔒 Sequestra seus arquivos e pede resgate',z:'ransom',why:'Por isso o backup 3-2-1 é tão importante.'},
   {t:'👀 Espiona o que você digita e visita',z:'spy',why:'Um espião que anota tudo.'},
   {t:'🧟 Rede de computadores “zumbis” controlados à distância',z:'bot',why:'Usadas, por exemplo, em ataques DDoS.'}]},

 'r7-defesas':{titulo:'Quem protege de quê?',
  ajuda:'Ligue cada defesa à analogia.',unico:true,
  zonas:[{id:'fw',rotulo:'Firewall'},{id:'ids',rotulo:'IDS'},{id:'ips',rotulo:'IPS'},{id:'vpn',rotulo:'VPN'},{id:'av',rotulo:'Anti-malware'}],
  itens:[
   {t:'💂 O porteiro que confere a lista: quem não está nela não entra',z:'fw',why:'Segue regras. Boa prática: negar por padrão.'},
   {t:'🚨 O alarme que apita quando vê algo estranho',z:'ids',why:'O IDS só avisa.'},
   {t:'🛑 O segurança que avisa e também barra o invasor',z:'ips',why:'O IPS bloqueia.'},
   {t:'🚇 Um túnel blindado dentro da Internet',z:'vpn',why:'Criptografa o caminho todo.'},
   {t:'🩺 O médico que procura e remove programas maliciosos',z:'av',why:'Examina arquivos e comportamentos suspeitos.'}]},

 'r7-golpe':{titulo:'Sinal de golpe ou boa prática?',
  ajuda:'Separe o que deve acender o alerta do que deve virar hábito.',
  zonas:[{id:'golpe',rotulo:'🚩 Sinal de golpe',sub:'desconfie!'},{id:'boa',rotulo:'🛡️ Boa prática',sub:'faça sempre'}],
  itens:[
   {t:'Mensagem urgente: “sua conta será bloqueada, clique já!”',z:'golpe',why:'Golpistas usam pressa para você não pensar.'},
   {t:'Link com endereço estranho, quase igual ao do banco',z:'golpe',why:'Phishing imita nomes conhecidos.'},
   {t:'“Você ganhou um prêmio!” em um sorteio que você nunca viu',z:'golpe',why:'Ninguém ganha prêmio sem participar.'},
   {t:'Pedido de senha ou código por mensagem',z:'golpe',why:'Nenhum banco legítimo pede isso.'},
   {t:'Senha longa e diferente em cada site',z:'boa',why:'Uma senha vazada não abre as outras portas.'},
   {t:'Ativar a verificação em duas etapas (MFA)',z:'boa',why:'Mesmo com a senha, o invasor precisa do segundo passo.'},
   {t:'Backup 3-2-1',z:'boa',why:'3 cópias, 2 mídias diferentes, 1 fora do local.'},
   {t:'Manter o sistema atualizado',z:'boa',why:'Atualizar fecha as brechas conhecidas.'}]}
});

/* ===== Jogos de ordenar passos ===== */
(function(){
function O(t,a,p,o){return Object.assign({titulo:t,ajuda:a,passos:p.map(function(x){return{t:x[0],why:x[1]}})},o||{})}
var J=window.JOGOS;
J['r2-ordem-encap']=O('Descendo as camadas: o encapsulamento',
 'Quando você envia uma mensagem, ela desce pelas camadas do TCP/IP e cada uma coloca seu “envelope”. Qual a ordem?',
 [['Aplicação cria a mensagem','Tudo começa no programa, como o navegador ou o e-mail.'],
  ['Transporte cria o segmento (com as portas)','A camada de transporte adiciona as portas de origem e destino.'],
  ['Internet cria o pacote (com os IPs)','A camada de rede adiciona os endereços IP.'],
  ['Acesso à rede cria o quadro (com os MACs)','O cabeçalho com os MACs e o FCS é colocado.'],
  ['Os bits seguem pelo cabo, fibra ou ar','Só no fim viram sinais elétricos, luz ou ondas.']]);
J['r5-ordem-tcp']=O('A vida de uma conexão TCP',
 'O TCP abre a conexão, troca dados e depois encerra. Coloque as etapas na ordem.',
 [['SYN: o cliente pede para abrir a conexão','O primeiro passo do handshake de 3 vias.'],
  ['SYN+ACK: o servidor aceita e também pede confirmação','O segundo passo.'],
  ['ACK: o cliente confirma, e a conexão está aberta','O terceiro passo.'],
  ['Os dados são trocados, com confirmações e reenvios','A conversa de verdade acontece.'],
  ['FIN: a conexão é encerrada','Quando termina, os dois lados se despedem.']]);
J['r6-ordem-dora']=O('As 4 mensagens do DHCP',
 'Para ganhar um IP automaticamente, o computador troca 4 mensagens com o servidor. Qual a ordem?',
 [['Discover: o cliente procura um servidor DHCP','O cliente chega sem endereço e grita para todos.'],
  ['Offer: o servidor oferece um IP','O servidor faz uma oferta.'],
  ['Request: o cliente pede o IP oferecido','O cliente aceita formalmente.'],
  ['Ack: o servidor confirma a configuração','Agora o cliente já pode usar a rede.']]);
J['r6-ordem-web']=O('O que acontece quando você abre um site',
 'Você digita um endereço e a página aparece. Nos bastidores, muita coisa acontece em ordem.',
 [['Você digita o endereço no navegador','Tudo começa com o pedido.'],
  ['O DNS traduz o nome em um endereço IP','A lista telefônica da Internet.'],
  ['O navegador abre uma conexão TCP com o servidor','O handshake de 3 vias.'],
  ['O navegador envia o pedido HTTP (GET)','“Me mande a página, por favor.”'],
  ['O servidor responde (200 OK) com a página','O código 200 significa sucesso.'],
  ['O navegador mostra a página na tela','Fim da viagem.']]);
})();

/* Onde reler, quando o aluno errar */
(function(){var V={"r1-dispositivos": "c1-comp", "r1-areas": "c1-class", "r1-componentes": "c1-comp", "r2-camadas": "c2-tcp", "r2-unidades": "c2-enc", "r2-modelos": "c2-tcp", "r2-ordem-encap": "c2-enc", "r3-cabo-wifi": "c3-eth", "r3-quadro": "c3-eth", "r3-faixas": "c3-wifi", "r4-enderecos": "c4-end", "r4-protocolos": "c4-ip", "r4-ipv": "c4-ip", "r4-roteamento": "c4-rot", "r5-tcp-udp": "c5-comp", "r5-portas": "c5-portas", "r5-handshake": "c5-hs", "r5-ordem-tcp": "c5-hs", "r6-protocolos": "c6-web", "r6-status": "c6-web", "r6-dhcp": "c6-dns", "r6-seguro": "c6-ssh", "r6-ordem-dora": "c6-dns", "r6-ordem-web": "c6-web", "r7-cid": "c7-intro", "r7-malware": "c7-amea", "r7-defesas": "c7-sol", "r7-golpe": "c7-amea"};Object.keys(V).forEach(function(k){if(window.JOGOS[k])window.JOGOS[k].ver=V[k]})})();
