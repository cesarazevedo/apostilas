/* Simuladores e ferramentas específicos da apostila de Redes */
(function(){
  // --- Topologias interativas ---
  var T=[
    {k:'Estrela',n:[[150,150,'SW'],[150,35],[255,95],[255,205],[150,265],[45,205],[45,95]],e:[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]],
      p:'Fácil de instalar; falha em um cabo afeta só um computador.',c:'O switch central é ponto único de falha; gasta mais cabo.'},
    {k:'Barramento',n:[[40,150],[110,150],[180,150],[250,150]],e:[[0,1],[1,2],[2,3]],bus:true,
      p:'Barato e simples, usava pouco cabo.',c:'Se o cabo principal rompe, toda a rede cai; difícil achar defeitos.'},
    {k:'Anel',n:[[150,40],[255,115],[215,235],[85,235],[45,115]],e:[[0,1],[1,2],[2,3],[3,4],[4,0]],
      p:'Acesso organizado: cada dispositivo passa o dado ao próximo.',c:'Uma quebra pode interromper o anel inteiro (no anel simples).'},
    {k:'Malha',n:[[150,40],[255,115],[215,235],[85,235],[45,115]],e:[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],
      p:'Muito resistente: se um caminho cai, existem outros.',c:'Caro e complexo: muitos cabos e conexões.'},
    {k:'Árvore',n:[[150,40,'SW'],[75,125,'SW'],[225,125,'SW'],[35,225],[115,225],[185,225],[265,225]],e:[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]],
      p:'Organiza bem redes grandes em níveis (como em prédios).',c:'Se o nó de cima falha, os de baixo ficam isolados.'}
  ];
  var tabs=document.getElementById('topoTabs'),panels=document.getElementById('topoPanels');
  T.forEach(function(t,i){
    var b=document.createElement('button');b.textContent=t.k;if(!i)b.className='on';tabs.appendChild(b);
    var svg='<svg viewBox="0 0 300 300" role="img" aria-label="Topologia '+t.k+'">';
    if(t.bus)svg+='<line x1="20" y1="150" x2="280" y2="150" stroke="#546e7a" stroke-width="5"/>';
    t.e.forEach(function(e){var a=t.n[e[0]],c=t.n[e[1]];if(!t.bus)svg+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+c[0]+'" y2="'+c[1]+'" stroke="#90a4ae" stroke-width="3"/>';});
    t.n.forEach(function(n,j){
      var sw=n[2]==='SW';
      if(t.bus)svg+='<line x1="'+n[0]+'" y1="150" x2="'+n[0]+'" y2="'+(j%2?200:100)+'" stroke="#90a4ae" stroke-width="3"/>';
      var y=t.bus?(j%2?215:85):n[1],x=n[0];
      svg+= sw? '<rect x="'+(x-20)+'" y="'+(y-14)+'" width="40" height="28" rx="6" fill="#2e7d32"/><text x="'+x+'" y="'+(y+5)+'" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">SW</text>'
              : '<circle cx="'+x+'" cy="'+y+'" r="17" fill="#e3f2fd" stroke="#1565c0" stroke-width="3"/><text x="'+x+'" y="'+(y+5)+'" text-anchor="middle" font-size="13">💻</text>';
    });
    svg+='</svg>';
    var d=document.createElement('div');d.className='topo-panel'+(i?'':' on');
    d.innerHTML='<h4 style="margin:0 0 6px">'+t.k+'</h4>'+svg+'<div class="pc"><div class="pro"><b>👍 Vantagens</b><br>'+t.p+'</div><div class="con"><b>👎 Desvantagens</b><br>'+t.c+'</div></div>';
    panels.appendChild(d);
    b.onclick=function(){[].forEach.call(tabs.children,function(x){x.classList.remove('on')});[].forEach.call(panels.children,function(x){x.classList.remove('on')});b.classList.add('on');d.classList.add('on');};
  });


  // --- Camadas OSI (sanfona) ---
  [].forEach.call(document.querySelectorAll('.lh'),function(b){
    b.onclick=function(){b.parentNode.classList.toggle("exp")};
  });

  // --- Encapsulamento passo a passo ---
  var encView=document.getElementById('encView'),encTxt=document.getElementById('encTxt'),step=0;
  var steps=[
    ['<div class="eb dados"><span class="data">Dados</span></div>','<b>Camada de Aplicação.</b> Tudo começa com a mensagem do programa, por exemplo, o pedido de uma página web.'],
    ['<div class="eb seg"><span class="h4">Cab. Transporte</span><div class="eb dados"><span class="data">Dados</span></div></div>','<b>Camada de Transporte.</b> Adiciona o cabeçalho com as <b>portas</b> de origem e destino. O resultado é o <b>segmento</b>.'],
    ['<div class="eb pac"><span class="h3">Cab. IP</span><div class="eb seg"><span class="h4">Cab. Transp.</span><div class="eb dados"><span class="data">Dados</span></div></div></div>','<b>Camada de Internet (Rede).</b> Adiciona o cabeçalho com os <b>endereços IP</b>. O resultado é o <b>pacote</b>.'],
    ['<div class="eb qua"><span class="h2">Cab. Enlace</span><div class="eb pac"><span class="h3">Cab. IP</span><div class="eb seg"><span class="h4">Cab. Transp.</span><div class="eb dados"><span class="data">Dados</span></div></div></div><span class="h2">Final</span></div>','<b>Camada de Acesso à rede.</b> Adiciona o cabeçalho com os <b>endereços MAC</b> e um final para checar erros. O resultado é o <b>quadro</b>.'],
    ['<div class="eb dados"><span class="bits">0101 1100 1010 0111 …</span></div>','<b>Meio físico.</b> O quadro vira <b>bits</b> (sinais elétricos, luz ou ondas de rádio) e viaja até o destino. Lá, o caminho é refeito ao contrário: é o desencapsulamento.']
  ];
  function drawEnc(){encView.innerHTML=steps[step][0];encTxt.innerHTML=steps[step][1];document.getElementById('encNext').disabled=step===steps.length-1;}
  document.getElementById('encNext').onclick=function(){if(step<steps.length-1){step++;drawEnc();}};
  document.getElementById('encReset').onclick=function(){step=0;drawEnc();};
  drawEnc();
  window.addEventListener('beforeprint',function(){step=3;drawEnc();});


  // --- Simulador de switch ---
  (function(){
    var pcs=[['A','AA:AA:AA:AA:AA:AA'],['B','BB:BB:BB:BB:BB:BB'],['C','CC:CC:CC:CC:CC:CC'],['D','DD:DD:DD:DD:DD:DD']];
    var src=document.getElementById('swSrc'),dst=document.getElementById('swDst'),box=document.getElementById('swPcs'),msg=document.getElementById('swMsg'),tab=document.getElementById('swTab');
    if(!src)return;
    var table={};
    pcs.forEach(function(p,i){
      src.add(new Option('PC '+p[0],i));dst.add(new Option('PC '+p[0],i));
      var d=document.createElement('div');d.className='pcx';d.id='pcx'+i;
      d.innerHTML='<b>PC '+p[0]+'</b><small>Porta '+(i+1)+'</small><small>'+p[1]+'</small>';box.appendChild(d);
    });
    dst.value=2;
    function clear(){pcs.forEach(function(p,i){document.getElementById('pcx'+i).className='pcx'});}
    function draw(){
      var h='',k;
      for(k in table)h+='<tr><td>'+table[k]+'</td><td><code>'+k+'</code></td></tr>';
      tab.innerHTML=h||'<tr><td colspan="2" style="color:#6b7280">Tabela vazia</td></tr>';
    }
    document.getElementById('swSend').onclick=function(){
      var s=+src.value,d=+dst.value;clear();
      if(s===d){msg.innerHTML='Escolha uma origem e um destino <b>diferentes</b>.';return;}
      var learned=!(pcs[s][1] in table);
      table[pcs[s][1]]=s+1;
      document.getElementById('pcx'+s).classList.add('tx');
      var text='O switch recebeu o quadro na porta '+(s+1)+(learned?' e <b>aprendeu</b> que o MAC do PC '+pcs[s][0]+' está nessa porta. ':'. ');
      if(pcs[d][1] in table){
        document.getElementById('pcx'+d).classList.add('rx');
        pcs.forEach(function(p,i){if(i!==s&&i!==d)document.getElementById('pcx'+i).classList.add('dr');});
        text+='Ele já conhecia o destino, então enviou <b>somente pela porta '+(d+1)+'</b>.';
      }else{
        pcs.forEach(function(p,i){if(i!==s)document.getElementById('pcx'+i).classList.add(i===d?'rx':'dr');});
        text+='Ele <b>não conhece</b> o MAC do PC '+pcs[d][0]+', então fez <b>flooding</b>: enviou por todas as portas, menos a de origem. Só o PC '+pcs[d][0]+' aceita o quadro; os outros descartam.';
      }
      msg.innerHTML=text;draw();
    };
    document.getElementById('swReset').onclick=function(){table={};clear();msg.innerHTML='Tabela limpa. O switch esqueceu tudo.';draw();};
    draw();
  })();

  // --- Calculadora de sub-rede IPv4 + simulador de roteamento ---
  (function(){
    function ip2n(s){var p=String(s).trim().split('.');if(p.length!==4)return null;var n=0;
      for(var i=0;i<4;i++){if(!/^\d{1,3}$/.test(p[i]))return null;var v=+p[i];if(v>255)return null;n=n*256+v;}return n;}
    function n2ip(n){return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');}
    function maskOf(p){return p===0?0:((0xFFFFFFFF<<(32-p))>>>0);}
    function pad(n){var s=n.toString(2);while(s.length<32)s='0'+s;return s;}

    var ipIn=document.getElementById('ipIn'),sel=document.getElementById('ipPfx');
    if(ipIn){
      for(var p=8;p<=30;p++)sel.add(new Option('/'+p,p));
      sel.value=26;
      var out=document.getElementById('ipOut'),bitsEl=document.getElementById('ipBits');
      function kind(n){
        var a=n>>>24,b=(n>>>16)&255;
        if(a===10)return 'Privado (10.0.0.0/8)';
        if(a===172&&b>=16&&b<=31)return 'Privado (172.16.0.0/12)';
        if(a===192&&b===168)return 'Privado (192.168.0.0/16)';
        if(a===127)return 'Loopback (o próprio computador)';
        if(a===169&&b===254)return 'Link-local / APIPA';
        if(a>=224&&a<=239)return 'Multicast';
        if(a>=240)return 'Reservado';
        return 'Público';
      }
      function calc(){
        var n=ip2n(ipIn.value),pf=+sel.value;
        if(n===null){out.innerHTML='<tr><td colspan="2" class="bad">Endereço inválido. Use o formato 192.168.10.77 (4 números de 0 a 255).</td></tr>';bitsEl.innerHTML='';return;}
        var m=maskOf(pf),net=(n&m)>>>0,bc=(net|(~m>>>0))>>>0,hosts=Math.pow(2,32-pf)-2;
        var b=pad(n),h='';
        for(var i=0;i<32;i++){h+='<span class="'+(i<pf?'n':'h')+'">'+b[i]+'</span>';if(i%8===7&&i<31)h+='<span class="d">.</span>';}
        bitsEl.innerHTML=h;
        var rows=[['Endereço IP',n2ip(n)],['Máscara de sub-rede',n2ip(m)+' (/'+pf+')'],['Endereço de rede',n2ip(net)],
          ['Primeiro host',n2ip(net+1)],['Último host',n2ip(bc-1)],['Broadcast',n2ip(bc)],
          ['Hosts utilizáveis',hosts.toLocaleString('pt-BR')],['Tipo',kind(n)]];
        out.innerHTML=rows.map(function(r){return '<tr><td>'+r[0]+'</td><td><b>'+r[1]+'</b></td></tr>'}).join('');
      }
      document.getElementById('ipGo').onclick=calc;sel.onchange=calc;
      ipIn.onkeydown=function(e){if(e.key==='Enter')calc();};
      calc();
    }

    var rtIn=document.getElementById('rtIn');
    if(rtIn){
      var routes=[['192.168.1.0',24,'entrega <b>direto na rede</b>, pela interface Gi0/0'],['192.168.2.0',24,'envia para <b>10.0.0.2</b>, pela interface Gi0/1'],
                  ['192.168.2.128',25,'envia para <b>10.0.0.6</b>, pela interface Gi0/2'],['0.0.0.0',0,'envia para <b>10.0.0.9</b>, pela interface Gi0/3 (rota padrão)']];
      var msg=document.getElementById('rtMsg');
      function route(){
        var n=ip2n(rtIn.value);
        [0,1,2,3].forEach(function(i){document.getElementById('rt'+i).classList.remove('hit')});
        if(n===null){msg.innerHTML='<span class="bad">Endereço inválido.</span>';return;}
        var best=-1,bp=-1,cands=[];
        routes.forEach(function(r,i){
          var m=maskOf(r[1]);
          if(((n&m)>>>0)===ip2n(r[0])){cands.push(i+1);if(r[1]>bp){bp=r[1];best=i;}}
        });
        document.getElementById('rt'+best).classList.add('hit');
        msg.innerHTML='Destino <b>'+n2ip(n)+'</b> combina com a(s) rota(s) <b>'+cands.join(', ')+'</b>'+
          (cands.length>1?'. Vale a de <b>prefixo mais longo</b> (/'+bp+'), a rota '+(best+1):'. Rota escolhida: '+(best+1))+
          '. O roteador '+routes[best][2]+'.';
      }
      document.getElementById('rtGo').onclick=route;
      rtIn.onkeydown=function(e){if(e.key==='Enter')route();};
      [].forEach.call(document.querySelectorAll('#rt [data-ex]'),function(b){b.onclick=function(){rtIn.value=b.dataset.ex;route();};});
      route();
    }
  
    // --- Exercícios de sub-rede aleatórios ---
    (function(){
      var Q=document.getElementById('exQ');if(!Q)return;
      var inp=document.getElementById('exIn'),fb=document.getElementById('exFb'),sol=document.getElementById('exSolBox'),sc=document.getElementById('exScore');
      var cur=null,hits=0,tries=0,solved=false;
      function r(a,b){return a+Math.floor(Math.random()*(b-a+1));}
      function newQ(){
        var base=[[10,0,0,0],[172,16+r(0,15),0,0],[192,168,0,0]][r(0,2)];
        var p=r(20,30);
        var ip=[base[0],base[0]===10?r(0,255):base[1],r(0,255),r(1,254)];
        if(base[0]===192)ip[1]=168;
        var n=ip2n(ip.join('.')),m=maskOf(p),net=(n&m)>>>0,bc=(net|(~m>>>0))>>>0,size=Math.pow(2,32-p);
        var types=[
          {q:'Qual é o <b>endereço de rede</b>?',a:n2ip(net),t:'ip'},
          {q:'Qual é o <b>endereço de broadcast</b>?',a:n2ip(bc),t:'ip'},
          {q:'Qual é o <b>primeiro host utilizável</b>?',a:n2ip(net+1),t:'ip'},
          {q:'Qual é o <b>último host utilizável</b>?',a:n2ip(bc-1),t:'ip'},
          {q:'Quantos <b>hosts utilizáveis</b> existem nessa sub-rede?',a:String(size-2),t:'num'}
        ];
        var t=types[r(0,types.length-1)];
        cur={t:t,ip:n2ip(n),p:p,net:net,bc:bc,size:size,mask:n2ip(m)};
        Q.innerHTML='O computador tem o IP <code>'+cur.ip+'/'+p+'</code>. '+t.q;
        inp.value='';fb.textContent='';sol.classList.remove('show');sol.innerHTML='';solved=false;inp.focus();
      }
      function explain(){
        var c=cur;
        return '<b>Passo a passo:</b><br>1) O prefixo <b>/'+c.p+'</b> corresponde à máscara <b>'+c.mask+'</b>.<br>'+
          '2) Sobram <b>'+(32-c.p)+'</b> bits para hosts, então o bloco tem 2<sup>'+(32-c.p)+'</sup> = <b>'+c.size+'</b> endereços.<br>'+
          '3) A rede começa no maior múltiplo desse tamanho que não passa do IP: <b>'+n2ip(c.net)+'</b>.<br>'+
          '4) O broadcast é o último endereço do bloco: <b>'+n2ip(c.bc)+'</b>.<br>'+
          '5) Hosts utilizáveis: de <b>'+n2ip(c.net+1)+'</b> até <b>'+n2ip(c.bc-1)+'</b> (total <b>'+(c.size-2)+'</b>, pois rede e broadcast não contam).';
      }
      document.getElementById('exOk').onclick=function(){
        if(solved)return;
        var v=inp.value.trim();if(!v){fb.textContent='Digite uma resposta primeiro.';return;}
        tries++;solved=true;
        var ok=cur.t.t==='ip'?(ip2n(v)!==null&&n2ip(ip2n(v))===cur.t.a):(v.replace(/\./g,'')===cur.t.a);
        if(ok){hits++;fb.innerHTML='✅ <b>Correto!</b>';}else{fb.innerHTML='❌ Não foi dessa vez. A resposta era <b>'+cur.t.a+'</b>.';}
        sol.innerHTML=explain();sol.classList.add('show');
        sc.textContent='Acertos: '+hits+' de '+tries;
      };
      document.getElementById('exSol').onclick=function(){sol.innerHTML=explain();sol.classList.add('show');};
      document.getElementById('exNew').onclick=newQ;
      inp.addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('exOk').click();});
      newQ();
    })();
  })();

  // --- Handshake TCP passo a passo ---
  (function(){
    var rowsEl=document.getElementById('hsRows');if(!rowsEl)return;
    var S=[
      {d:'r',c:'syn',t:'SYN · seq=100',s:'Cliente → Servidor',x:'<b>1. SYN.</b> O cliente diz: “Quero abrir uma conexão. Meu número inicial é 100.”'},
      {d:'l',c:'syn',t:'SYN+ACK · seq=300 · ack=101',s:'Servidor → Cliente',x:'<b>2. SYN+ACK.</b> O servidor responde: “Aceito. Meu número inicial é 300 e já recebi o seu 100, então espero o 101.”'},
      {d:'r',c:'ack',t:'ACK · ack=301',s:'Cliente → Servidor',x:'<b>3. ACK.</b> O cliente confirma: “Recebi o seu 300, espero o 301.” <b>Conexão estabelecida!</b> Agora os dois podem enviar dados.'},
      {d:'r',c:'dat',t:'DADOS · seq=101 · 50 bytes',s:'Cliente → Servidor',x:'<b>4. Dados.</b> O cliente envia 50 bytes, começando no byte 101.'},
      {d:'l',c:'ack',t:'ACK · ack=151',s:'Servidor → Cliente',x:'<b>5. Confirmação.</b> O servidor diz: “Recebi até o byte 150. Pode mandar o 151.” Se esse ACK não chegasse, o cliente reenviaria os dados.'},
      {d:'r',c:'fin',t:'FIN',s:'Cliente → Servidor',x:'<b>6. Encerramento.</b> O cliente envia FIN: “Terminei.” O servidor confirma (ACK), envia também o seu FIN e a conexão se fecha.'}
    ];
    var k=0,txt=document.getElementById('hsTxt'),nx=document.getElementById('hsNext');
    function draw(){
      rowsEl.innerHTML=S.slice(0,k+1).map(function(s){return '<div class="hsr '+(s.d==='r'?'l':'r')+'"><div class="hsb '+s.c+'">'+(s.d==='r'?'➡️ ':'⬅️ ')+s.t+'<small>'+s.s+'</small></div></div>'}).join('');
      txt.innerHTML=S[k].x;nx.disabled=k===S.length-1;
    }
    nx.onclick=function(){if(k<S.length-1){k++;draw();}};
    document.getElementById('hsReset').onclick=function(){k=0;draw();};
    window.addEventListener('beforeprint',function(){k=S.length-1;draw();});
    draw();
  })();

  // --- Passo a passo genérico (e-mail, DNS, DHCP) ---
  (function(){
    var Q='dat',A='ack',B='syn';
    var D={
      mail:[
        {r:[['l',Q,'Maria → servidor de e-mail dela · SMTP (porta 587)','“Entregue esta mensagem para joao@escola.com.”']],x:'<b>1. Enviar.</b> Maria escreve a mensagem e clica em Enviar. O programa de e-mail entrega a mensagem ao <b>servidor SMTP</b> dela.'},
        {r:[['l',Q,'Servidor da Maria → DNS','Qual é o servidor de e-mail (registro MX) de escola.com?'],['r',A,'DNS → servidor da Maria','É mail.escola.com']],x:'<b>2. Descobrir o destino.</b> O servidor da Maria consulta o <b>DNS</b> (registro <b>MX</b>) para saber qual servidor recebe os e-mails de <code>escola.com</code>.'},
        {r:[['l',Q,'Servidor da Maria → mail.escola.com · SMTP (porta 25)','Entrega da mensagem entre servidores']],x:'<b>3. Entrega entre servidores.</b> Os dois servidores conversam por <b>SMTP</b> e a mensagem é transferida.'},
        {r:[['r',A,'mail.escola.com','Mensagem guardada na caixa postal de João']],x:'<b>4. Caixa postal.</b> A mensagem fica armazenada no servidor, esperando João. Ele nem precisa estar online.'},
        {r:[['l',Q,'João → mail.escola.com · IMAP (porta 993) ou POP3 (995)','“Tenho mensagens novas?”'],['r',A,'mail.escola.com → João','Sim, aqui está a mensagem da Maria']],x:'<b>5. Leitura.</b> João abre o programa de e-mail, que usa <b>IMAP</b> ou <b>POP3</b> para buscar a mensagem. O SMTP só serve para <b>enviar</b>.'}
      ],
      dns:[
        {r:[['l',Q,'Navegador → resolvedor DNS','Qual é o IP de www.ifrn.edu.br?']],x:'<b>1. A pergunta.</b> O navegador não sabe o IP e pergunta ao <b>resolvedor DNS</b> (normalmente o do seu provedor ou o 8.8.8.8). O cache está vazio.'},
        {r:[['l',Q,'Resolvedor → servidor raiz (.)','Quem cuida do .br?'],['r',A,'Raiz → resolvedor','Pergunte aos servidores do .br']],x:'<b>2. Servidor raiz.</b> O raiz não sabe o IP, mas sabe indicar quem cuida do <b>.br</b>.'},
        {r:[['l',Q,'Resolvedor → servidor do .br','Quem cuida de ifrn.edu.br?'],['r',A,'Servidor .br → resolvedor','Pergunte ao servidor de nomes do IFRN']],x:'<b>3. Domínio de topo.</b> Os servidores do .br indicam quem responde por <b>ifrn.edu.br</b>. (Na prática, pode haver mais um nível de indicação, como o <code>edu.br</code>.)'},
        {r:[['l',Q,'Resolvedor → servidor autoritativo do IFRN','Qual é o IP de www.ifrn.edu.br?'],['r',A,'Autoritativo → resolvedor','É 203.0.113.10 (TTL: 3600 s)']],x:'<b>4. Quem sabe de verdade.</b> O servidor <b>autoritativo</b> do domínio conhece o IP e responde, informando por quanto tempo a resposta vale (<b>TTL</b>).'},
        {r:[['r',A,'Resolvedor → navegador','203.0.113.10']],x:'<b>5. Resposta final.</b> O resolvedor devolve o IP ao navegador e o guarda em <b>cache</b>. Agora o navegador abre uma conexão TCP com esse IP (porta 443) e faz o pedido HTTP.'}
      ],
      dhcp:[
        {r:[['l',B,'DISCOVER · broadcast (255.255.255.255)','“Tem algum servidor DHCP aí? Preciso de um endereço.”']],x:'<b>1. Discover.</b> O cliente ainda não tem IP (usa 0.0.0.0), então <b>grita em broadcast</b> (UDP, porta 67 do servidor).'},
        {r:[['r',A,'OFFER · servidor → cliente','Ofereço 192.168.1.50 /24 · gateway 192.168.1.1 · DNS 192.168.1.1 · 24 h']],x:'<b>2. Offer.</b> O servidor DHCP oferece um endereço livre e as demais configurações, com o tempo de concessão.'},
        {r:[['l',B,'REQUEST · broadcast','“Aceito o endereço 192.168.1.50 oferecido por você.”']],x:'<b>3. Request.</b> O cliente aceita a oferta. Ele usa broadcast para que outros servidores DHCP, caso existam, saibam que suas ofertas foram recusadas.'},
        {r:[['r',A,'ACK · servidor → cliente','Confirmado! O 192.168.1.50 é seu por 24 horas.']],x:'<b>4. Ack.</b> O servidor confirma. O cliente configura a placa de rede e já pode navegar. Perto da metade do tempo, ele pedirá a <b>renovação</b>.'}
      ]
    };
    [].forEach.call(document.querySelectorAll('.stp'),function(el){
      var S=D[el.dataset.steps],rows=el.querySelector('.stp-rows'),txt=el.querySelector('.stp-txt'),nx=el.querySelector('.stp-next'),k=0;
      function draw(){
        var h='';
        S.slice(0,k+1).forEach(function(st){st.r.forEach(function(r){
          h+='<div class="hsr '+r[0]+'"><div class="hsb '+r[1]+'">'+(r[0]==='l'?'➡️ ':'⬅️ ')+r[2]+'<small>'+r[3]+'</small></div></div>';
        });});
        rows.innerHTML=h;txt.innerHTML=S[k].x;nx.disabled=k===S.length-1;
      }
      nx.onclick=function(){if(k<S.length-1){k++;draw();}};
      el.querySelector('.stp-reset').onclick=function(){k=0;draw();};
      window.addEventListener('beforeprint',function(){k=S.length-1;draw();});
      draw();
    });
  })();

  // --- Simulador TCP x UDP com perdas ---
  (function(){
    var go=document.getElementById('lsGo');if(!go)return;
    var pr=document.getElementById('lsP'),pv=document.getElementById('lsV'),U=document.getElementById('lsU'),T=document.getElementById('lsT'),m=document.getElementById('lsMsg');
    pr.oninput=function(){pv.textContent=pr.value+'%'};
    function run(){
      var p=pr.value/100,N=10,u='',t='',lost=0,retx=0,i,tries;
      for(i=1;i<=N;i++){
        if(Math.random()<p){lost++;u+='<div class="lb lost">'+i+'</div>';}else u+='<div class="lb ok">'+i+'</div>';
        tries=1;while(Math.random()<p&&tries<30)tries++;
        retx+=tries-1;
        t+='<div class="lb ok">'+i+(tries>1?'<em>×'+tries+'</em>':'')+'</div>';
      }
      U.innerHTML=u;T.innerHTML=t;
      m.innerHTML='<b>UDP:</b> entregou <b>'+(N-lost)+' de '+N+'</b>'+(lost?' ('+lost+' perdido'+(lost>1?'s':'')+' para sempre).':'.')+
        ' <b>TCP:</b> entregou <b>'+N+' de '+N+'</b>, com <b>'+retx+' retransmiss'+(retx===1?'ão':'ões')+'</b>'+(retx?' (tempo extra).':'.');
    }
    go.onclick=run;run();
  })();

  // --- Capítulo 7: César, phishing, senha e firewall ---
  (function(){
    // Cifra de César
    var csIn=document.getElementById('csIn');
    if(csIn){
      var K=document.getElementById('csK'),M=document.getElementById('csM'),O=document.getElementById('csOut');
      for(var i=1;i<=25;i++)K.add(new Option(i,i));K.value=3;
      function cs(){
        var s=csIn.value.normalize('NFD').replace(/[̀-ͯ]/g,''),k=((+K.value)*(+M.value)%26+26)%26,r='';
        for(var j=0;j<s.length;j++){
          var c=s.charCodeAt(j);
          if(c>=65&&c<=90)r+=String.fromCharCode((c-65+k)%26+65);
          else if(c>=97&&c<=122)r+=String.fromCharCode((c-97+k)%26+97);
          else r+=s[j];
        }
        O.textContent=r;
      }
      csIn.oninput=cs;K.onchange=cs;M.onchange=cs;cs();
    }

    // Phishing: sinais clicáveis
    var hots=document.querySelectorAll('#mail .hot');
    if(hots.length){
      var tip=document.getElementById('mailTip'),ct=document.getElementById('mailCt'),found=0;
      [].forEach.call(hots,function(h){
        h.onclick=function(){
          tip.innerHTML=h.dataset.tip;
          if(!h.classList.contains('found')){h.classList.add('found');found++;}
          ct.textContent=found+' de '+hots.length+' sinais encontrados'+(found===hots.length?' 🎉 Você achou todos!':'');
        };
      });
    }

    // Verificador de senha
    var pw=document.getElementById('pwIn');
    if(pw){
      var bar=document.getElementById('pwBar'),msg=document.getElementById('pwMsg');
      var common=['123456','1234567','12345678','123456789','1234567890','password','senha','senha123','qwerty','qwerty123','abc123','admin','admin123','111111','123123','000000','654321','brasil','iloveyou','minhasenha','minhasenha123','1q2w3e','12345','1234','letmein','mudar123'];
      function dur(s){var m=60,h=3600,d=86400,y=31557600;
        if(s<1)return 'menos de 1 segundo';
        if(s<m)return Math.round(s)+' segundos';
        if(s<h)return Math.round(s/m)+' minutos';
        if(s<d)return Math.round(s/h)+' horas';
        if(s<y)return Math.round(s/d)+' dias';
        if(s<y*1000)return Math.round(s/y).toLocaleString('pt-BR')+' anos';
        if(s<y*1e6)return Math.round(s/y/1000).toLocaleString('pt-BR')+' mil anos';
        return 'milhões de anos ou mais';}
      function check(){
        var v=pw.value;
        if(!v){bar.style.width='0';msg.innerHTML='Digite algo para ver a estimativa.';return;}
        var pool=0;
        if(/[a-z]/.test(v))pool+=26;if(/[A-Z]/.test(v))pool+=26;if(/[0-9]/.test(v))pool+=10;if(/[^A-Za-z0-9]/.test(v))pool+=33;
        var bits=v.length*Math.log(pool)/Math.LN2,weak='';
        if(common.indexOf(v.toLowerCase())>-1){bits=1;weak='Está entre as senhas mais usadas e vazadas: seria descoberta quase na hora.';}
        else if(/^(.)\1+$/.test(v)){bits=Math.min(bits,6);weak='Repete o mesmo caractere.';}
        else if(/^(0123|1234|2345|3456|4567|5678|6789|abcd|qwer)/i.test(v)&&v.length<12){bits=Math.min(bits,16);weak='Segue uma sequência fácil de adivinhar.';}
        var lvl=bits<28?['Muito fraca','#c62828']:bits<36?['Fraca','#ef6c00']:bits<60?['Razoável','#f9a825']:bits<80?['Forte','#2e7d32']:['Muito forte','#1b5e20'];
        bar.style.width=Math.min(100,Math.max(4,bits/80*100))+'%';bar.style.background=lvl[1];
        var secs=Math.pow(2,Math.max(bits-1,0))/1e10;
        msg.innerHTML='<b style="color:'+lvl[1]+'">'+lvl[0]+'</b> · '+v.length+' caracteres · tempo estimado para descobrir por força bruta: <b>'+dur(secs)+'</b>.'+(weak?'<br>⚠️ '+weak:'')+
          (v.length<12&&!weak?'<br>💡 Dica: senhas com 12 ou mais caracteres, de preferência uma frase, ficam bem mais fortes.':'');
      }
      pw.oninput=check;check();
    }

    // Simulador de firewall
    var fwS=document.getElementById('fwS');
    if(fwS){
      var D=document.getElementById('fwD'),V=document.getElementById('fwV'),out=document.getElementById('fwMsg');
      var rules=[
        {a:true,s:['lan'],d:['net'],v:['http','https']},
        {a:true,s:['lan'],d:['net'],v:['dns']},
        {a:true,s:'any',d:['web'],v:['https']},
        {a:false,s:'any',d:'any',v:'any'}
      ];
      function m(list,x){return list==='any'||list.indexOf(x)>-1;}
      function fw(){
        [0,1,2,3].forEach(function(i){document.getElementById('fw'+i).classList.remove('hit')});
        var s=fwS.value,d=D.value,v=V.value;
        if(s===d){out.innerHTML='Origem e destino estão na <b>mesma rede</b>: esse tráfego nem passa pelo firewall. Escolha origem e destino diferentes.';return;}
        for(var i=0;i<rules.length;i++){
          var r=rules[i];
          if(m(r.s,s)&&m(r.d,d)&&m(r.v,v)){
            document.getElementById('fw'+i).classList.add('hit');
            out.innerHTML=(r.a?'✅ <b>PERMITIDO</b>':'⛔ <b>NEGADO</b>')+' pela regra <b>'+(i+1)+'</b>. '+
              (i===3?'Nenhuma regra anterior permitiu esse tráfego, então vale a <b>regra padrão: negar</b>.':'A primeira regra que combina é a que vale.');
            return;
          }
        }
      }
      document.getElementById('fwGo').onclick=fw;fwS.onchange=fw;D.onchange=fw;V.onchange=fw;fw();
    }
  })();

})();
