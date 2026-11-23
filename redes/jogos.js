/* Jogos de arrastar e soltar da apostila de Redes (o motor está em ../assets/jogos.js) */
window.JOGOS={
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
};
