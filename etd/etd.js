/* Ferramentas interativas da apostila de Educação em Tecnologias Digitais */
(function(){
  'use strict';
  function $(id){return document.getElementById(id)}
  function mkBtns(box,items,cb,cls){
    var bs=[];
    items.forEach(function(t,i){var b=document.createElement('button');b.type='button';b.textContent=t;if(cls)b.className=cls;b.setAttribute('aria-pressed','false');
      b.onclick=function(){cb(i,b,bs)};bs.push(b);box.appendChild(b)});
    return bs;
  }

  // --- Conheça as peças ---
  (function(){
    var box=$('pcBtns');if(!box)return;
    var P=[
      {k:'monitor',n:'Monitor',t:'Saída',d:'Mostra as imagens e os textos. É a “janela” do computador.',c:'O prato pronto, servido na mesa.'},
      {k:'teclado',n:'Teclado',t:'Entrada',d:'Serve para digitar letras, números e dar comandos.',c:'O pedido que chega à cozinha.'},
      {k:'mouse',n:'Mouse',t:'Entrada',d:'Move a setinha na tela e permite clicar, abrir e arrastar.',c:'O dedo que aponta o que você quer.'},
      {k:'som',n:'Caixa de som',t:'Saída',d:'Toca os sons: música, vídeos e avisos.',c:'O garçom que chama pelo nome.'},
      {k:'gabinete',n:'Gabinete',t:'Guarda as peças',d:'A caixa que guarda as peças de dentro: processador, memória, disco e fonte. Tem o botão de ligar.',c:'A cozinha inteira.'},
      {k:'cpu',n:'Processador',t:'Processamento',d:'O “cérebro”: faz as contas e executa as ordens dos programas.',c:'O cozinheiro.'},
      {k:'ram',n:'Memória RAM',t:'Memória de trabalho',d:'Guarda o que você está usando agora. Quando desliga, esvazia.',c:'A bancada de trabalho.'},
      {k:'hd',n:'HD ou SSD',t:'Armazenamento',d:'Guarda arquivos e programas por muito tempo, mesmo desligado.',c:'A despensa.'}
    ];
    var info=$('pcInfo'),svg=$('pcSvg'),by={};
    function show(k){
      var p=by[k];
      [].forEach.call(box.children,function(b){var on=b.dataset.k===k;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
      [].forEach.call(svg.querySelectorAll('.part'),function(g){g.classList.toggle('on',g.dataset.k===k)});
      info.innerHTML='<b>'+p.n+'</b><span class="tg">'+p.t+'</span><br>'+p.d+'<br>🍳 <i>Na cozinha:</i> '+p.c;
    }
    P.forEach(function(p){by[p.k]=p;var b=document.createElement('button');b.type='button';b.textContent=p.n;b.dataset.k=p.k;b.setAttribute('aria-pressed','false');b.onclick=function(){show(p.k)};box.appendChild(b)});
    [].forEach.call(svg.querySelectorAll('.part'),function(g){g.onclick=function(){show(g.dataset.k)}});
    show('monitor');
  })();

  // --- Entrada, saída ou armazenamento ---
  (function(){
    var dev=$('ioDev');if(!dev)return;
    var D=[['⌨️','Teclado',0],['🖱️','Mouse',0],['🎤','Microfone',0],['📷','Câmera (webcam)',0],['🖨️','Scanner',0],
           ['🖥️','Monitor',1],['🔊','Caixa de som',1],['🎧','Fone de ouvido',1],['🖨️','Impressora',1],
           ['💾','Pendrive',2],['📀','HD externo',2],['🗂️','Cartão de memória',2]];
    var names=['Entrada','Saída','Armazenamento'],txt=$('ioTxt'),bag=[],n=0,pts=0,cur=null,lock=false;
    function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
    function next(){
      if(n>=10){dev.innerHTML='🎉';txt.innerHTML='Você acertou <b>'+pts+' de 10</b>. '+(pts>=8?'Muito bem!':'Dá para melhorar: tente de novo!');
        var again=document.createElement('button');again.type='button';again.className='big';again.textContent='↻ Jogar de novo';again.onclick=start;
        $('ioBtns').innerHTML='';$('ioBtns').appendChild(again);return}
      cur=bag[n];lock=false;dev.innerHTML=cur[0]+'<b>'+cur[1]+'</b>';
      $('ioBtns').innerHTML='';
      mkBtns($('ioBtns'),names,function(i){
        if(lock)return;lock=true;var ok=i===cur[2];if(ok)pts++;
        txt.innerHTML=ok?'<span class="ok-y">✅ Certo!</span> '+cur[1]+' é de <b>'+names[cur[2]].toLowerCase()+'</b>.':'<span class="ok-n">❌ Quase!</span> '+cur[1]+' é de <b>'+names[cur[2]].toLowerCase()+'</b>.';
        n++;setTimeout(next,1300);
      });
    }
    function start(){bag=shuffle(D.slice()).slice(0,10);n=0;pts=0;txt.textContent='';next()}
    start();
  })();

  // --- Treino do mouse ---
  (function(){
    var arena=$('mtArena');if(!arena)return;
    var tg=$('mtTarget'),task=$('mtTask'),out=$('mtOut'),st=$('mtStart');
    var T=[{k:'click',t:'Clique <b>uma vez</b> na bolinha (botão esquerdo).',i:'●'},
           {k:'dbl',t:'Faça <b>duplo clique</b> na bolinha (dois cliques rápidos).',i:'●●'},
           {k:'right',t:'Clique na bolinha com o <b>botão direito</b>.',i:'◐'}];
    var n=0,pts=0,cur=null,run=false,t0=0;
    function place(){
      var w=arena.clientWidth-96,h=arena.clientHeight-96;
      tg.style.left=Math.max(4,Math.round(Math.random()*w))+'px';tg.style.top=Math.max(4,Math.round(Math.random()*h))+'px';tg.style.display='block';
    }
    function next(){
      if(n>=10){run=false;tg.style.display='none';task.textContent='Treino terminado!';
        out.innerHTML='Você acertou <b>'+pts+' de 10</b>. '+(pts>=8?'Muito bem, o mouse já é seu amigo!':'Treine mais uma vez: a prática leva à firmeza.');
        st.textContent='↻ Treinar de novo';st.disabled=false;return}
      cur=T[Math.floor(Math.random()*3)];task.innerHTML=(n+1)+'/10: '+cur.t;tg.textContent=cur.i;place();
    }
    function hit(ok){
      if(!run)return;if(ok)pts++;n++;out.innerHTML=ok?'<span class="ok-y">✅ Certo!</span>':'<span class="ok-n">❌ Não foi desta vez.</span>';next();
    }
    var timer=null;
    function decide(kind){clearTimeout(timer);if(run)hit(kind===cur.k)}
    tg.addEventListener('click',function(e){if(!run)return;clearTimeout(timer);
      if(e.detail>=2)decide('dbl');else timer=setTimeout(function(){decide('click')},320)});
    tg.addEventListener('contextmenu',function(e){e.preventDefault();decide('right')});
    arena.addEventListener('contextmenu',function(e){e.preventDefault()});
    st.onclick=function(){n=0;pts=0;run=true;out.textContent='';st.disabled=true;next()};
  })();

  // ===== Capítulo 2: teclado e treinador de digitação =====
  var NS='http://www.w3.org/2000/svg';
  // [rótulo, símbolo com Shift, largura, dedo (p,a,m,i,t), mão (L,R), tipo, id]
  var ROWS=[
    [["'",'"',1,'p','L','p'],['1','!',1,'p','L','n'],['2','@',1,'a','L','n'],['3','#',1,'m','L','n'],['4','$',1,'i','L','n'],['5','%',1,'i','L','n'],['6','¨',1,'i','R','n'],['7','&',1,'i','R','n'],['8','*',1,'m','R','n'],['9','(',1,'a','R','n'],['0',')',1,'p','R','n'],['-','_',1,'p','R','p'],['=','+',1,'p','R','p'],['Backspace','',2,'p','R','e','back']],
    [['Tab','',1.5,'p','L','s','tab'],['q','Q',1,'p','L','l'],['w','W',1,'a','L','l'],['e','E',1,'m','L','l'],['r','R',1,'i','L','l'],['t','T',1,'i','L','l'],['y','Y',1,'i','R','l'],['u','U',1,'i','R','l'],['i','I',1,'m','R','l'],['o','O',1,'a','R','l'],['p','P',1,'p','R','l'],['´','`',1,'p','R','a','ac'],['[','{',1,'p','R','p']],
    [['Caps','',1.75,'p','L','s','caps'],['a','A',1,'p','L','l'],['s','S',1,'a','L','l'],['d','D',1,'m','L','l'],['f','F',1,'i','L','l'],['g','G',1,'i','L','l'],['h','H',1,'i','R','l'],['j','J',1,'i','R','l'],['k','K',1,'m','R','l'],['l','L',1,'a','R','l'],['ç','Ç',1,'p','R','l'],['~','^',1,'p','R','a','til'],[']','}',1,'p','R','p'],['Enter','',1.25,'p','R','e','enter']],
    [['Shift','',1.25,'p','L','s','shl'],['\\','|',1,'p','L','p'],['z','Z',1,'p','L','l'],['x','X',1,'a','L','l'],['c','C',1,'m','L','l'],['v','V',1,'i','L','l'],['b','B',1,'i','L','l'],['n','N',1,'i','R','l'],['m','M',1,'i','R','l'],[',','<',1,'m','R','p'],['.','>',1,'a','R','p'],[';',':',1,'p','R','p'],['/','?',1,'p','R','p'],['Shift','',1.75,'p','R','s','shr']],
    [['Ctrl','',1.5,'p','L','s'],['Win','',1.25,'p','L','s'],['Alt','',1.5,'t','L','s'],['Espaço','',6.5,'t','L','e','space'],['AltGr','',1.5,'t','R','s'],['Win','',1.25,'p','R','s'],['Ctrl','',1.5,'p','R','s']]
  ];
  var FN={p:'mindinho',a:'anelar',m:'médio',i:'indicador',t:'polegar'};
  function buildKb(svg){
    var U=38,G=3,keys=[],y=4;
    svg.setAttribute('viewBox','0 0 '+(15*U+8)+' '+(5*U+8));
    svg.innerHTML='';
    ROWS.forEach(function(row){
      var x=4;
      row.forEach(function(d){
        var w=d[2]*U-G,g=document.createElementNS(NS,'g');g.setAttribute('class','k');g.setAttribute('data-f',d[3]);
        var r=document.createElementNS(NS,'rect');r.setAttribute('x',x);r.setAttribute('y',y);r.setAttribute('width',w);r.setAttribute('height',U-G);r.setAttribute('rx',5);
        var t=document.createElementNS(NS,'text');t.setAttribute('x',x+w/2);t.setAttribute('y',y+(U-G)/2+4);
        var lab=d[0].length===1?d[0].toUpperCase():d[0];
        if(d[0]==='Backspace')lab='← Apagar';
        t.textContent=lab;
        g.appendChild(r);g.appendChild(t);
        if(d[0]==='f'||d[0]==='j'){var b=document.createElementNS(NS,'line');b.setAttribute('class','bump');b.setAttribute('x1',x+w/2-6);b.setAttribute('x2',x+w/2+6);b.setAttribute('y1',y+U-G-5);b.setAttribute('y2',y+U-G-5);g.appendChild(b)}
        svg.appendChild(g);
        keys.push({el:g,base:d[0],sh:d[1],f:d[3],h:d[4],type:d[5],id:d[6]||'',label:lab});
        x+=d[2]*U;
      });
      y+=U;
    });
    return keys;
  }
  function kName(k){
    var N={back:'Backspace (apagar)',tab:'Tab',caps:'Caps Lock',enter:'Enter',space:'Espaço',shl:'Shift (esquerdo)',shr:'Shift (direito)'};
    return N[k.id]||(k.base.length>1?k.base:'tecla '+k.base.toUpperCase());
  }

  // --- Explorador do teclado ---
  (function(){
    var svg=$('kxSvg');if(!svg)return;
    var keys=buildKb(svg),info=$('kxInfo'),box=$('kxBtns');
    var G=[
      {n:'Letras',f:function(k){return k.type==='l'},t:'As <b>letras</b> ficam nas três fileiras do meio. Repare na ordem QWERTY: Q W E R T Y.'},
      {n:'Números',f:function(k){return k.type==='n'},t:'Os <b>números</b> ficam na fileira de cima. Com o <b>Shift</b>, saem os símbolos (! @ # $ % ...).'},
      {n:'Pontuação e símbolos',f:function(k){return k.type==='p'},t:'Ponto, vírgula, ponto e vírgula, barra, hífen... Algumas têm um segundo símbolo, que sai com o <b>Shift</b>.'},
      {n:'Acentos',f:function(k){return k.type==='a'},t:'As teclas de <b>acento</b> (´ e ~). Aperte o acento <b>e depois</b> a letra. Com o Shift saem a crase (`) e o circunflexo (^). O <b>Ç</b> tem tecla própria.'},
      {n:'Teclas de apoio',f:function(k){return k.type==='s'},t:'<b>Shift</b>, <b>Caps Lock</b>, <b>Tab</b>, <b>Ctrl</b>, <b>Alt</b>, <b>AltGr</b> e a tecla do <b>Windows</b> ajudam as outras. Sozinhas, quase não escrevem nada.'},
      {n:'Enter, Espaço e Apagar',f:function(k){return k.type==='e'},t:'<b>Enter</b> pula de linha, <b>Espaço</b> separa as palavras e <b>Backspace</b> apaga o que você escreveu errado.'}
    ];
    var sel=-1;
    function show(i){
      sel=i;[].forEach.call(box.children,function(b,j){var on=j===i;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
      keys.forEach(function(k){k.el.classList.toggle('on',G[i].f(k))});info.innerHTML=G[i].t;
    }
    G.forEach(function(g,i){var b=document.createElement('button');b.type='button';b.textContent=g.n;b.setAttribute('aria-pressed','false');b.onclick=function(){show(i)};box.appendChild(b)});
    keys.forEach(function(k){k.el.onclick=function(){
      [].forEach.call(box.children,function(b){b.classList.remove('on');b.setAttribute('aria-pressed','false')});
      keys.forEach(function(x){x.el.classList.toggle('on',x===k)});
      var h=k.h==='L'?'esquerda':'direita',d=k.id==='space'?'os <b>polegares</b>':'o dedo <b>'+FN[k.f]+'</b> da mão <b>'+h+'</b>';
      var extra={back:'Apaga a letra que está antes do cursor.',tab:'Pula para a próxima casinha ou dá um recuo.',caps:'Trava as letras maiúsculas.',enter:'Pula para a linha de baixo.',space:'Deixa um espaço entre as palavras.',shl:'Segure para letra maiúscula ou símbolo de cima.',shr:'Segure para letra maiúscula ou símbolo de cima.'}[k.id];
      if(!extra&&k.base==='Ctrl'||k.base==='Alt')extra='Junto com outra tecla, forma um atalho (como Ctrl + C).';
      if(k.base==='AltGr')extra='Dá acesso a símbolos extras.';
      if(k.base==='Win')extra='Abre o menu Iniciar.';
      info.innerHTML='<b>'+kName(k)+'</b>'+(k.sh&&k.type!=='l'?' (com Shift: <b>'+k.sh+'</b>)':'')+'<br>Quem aperta: '+d+'.'+(extra?'<br>'+extra:'');
    }});
    show(0);
  })();

  // --- Mapa dos dedos ---
  (function(){var svg=$('fdSvg');if(svg)buildKb(svg)})();

  // --- Treinador de digitação ---
  (function(){
    var svg=$('tkSvg');if(!svg)return;
    var keys=buildKb(svg),inp=$('tkIn'),txt=$('tkText'),hint=$('tkHint'),out=$('tkOut'),lbox=$('tkLessons');
    var L=[
      {n:'1 · Linha do meio',t:'asdf jklç fdsa çlkj sala fala dada gala saga lado falsa salsa alça'},
      {n:'2 · Linha de cima',t:'torta pato quero preto porta prato tapete outro pesquisa tropa'},
      {n:'3 · Linha de baixo',t:'bola vaso zebra banana cavalo caneca nuvem camada bomba maxixe'},
      {n:'4 · Maiúsculas e acentos',t:'Maria foi à feira de manhã. João comprou pão e café. Você gosta de açaí?'},
      {n:'5 · Números e símbolos',t:'Telefone: (84) 99999-1234. E-mail: maria@email.com. Total: R$ 25,50.'},
      {n:'6 · Texto de verdade',t:'Aprender a digitar é como aprender a andar de bicicleta: no começo parece difícil, mas com treino fica natural.'}
    ];
    var best={};try{best=JSON.parse(localStorage.getItem('etd:tk')||'{}')}catch(e){}
    var cur=0,target='',t0=0,errs=0,prev=0,done=false;
    var ACC={'\u0301':'ac','\u0300':'ac!','\u0303':'til','\u0302':'til!'};
    function byBase(c){return keys.filter(function(k){return k.base===c&&k.type!=='s'})[0]}
    function bySh(c){return keys.filter(function(k){return k.sh===c})[0]}
    function hintFor(ch){
      var r={keys:[],shiftKey:null,text:''},d=ch.normalize('NFD'),base=d.charAt(0),mark=d.length>1?d.charAt(1):'',k,acc=mark?ACC[mark]:null;
      if(ch===' '){r.keys=[keys.filter(function(x){return x.id==='space'})[0]];r.text='Aperte o <b>Espaço</b> com o polegar.';return r}
      var up=base.toLowerCase()!==base,needShift=false;
      if(up){k=byBase(base.toLowerCase());needShift=true}else{k=byBase(base);if(!k){k=bySh(base);needShift=!!k}}
      if(!k)return r;
      var other=function(x){return x.h==='L'?'shr':'shl'};
      var fing='com o dedo <b>'+FN[k.f]+'</b> da mão <b>'+(k.h==='L'?'esquerda':'direita')+'</b>';
      if(acc){
        var ak=keys.filter(function(x){return x.id===acc.replace('!','')})[0],aS=acc.indexOf('!')>0;
        r.keys=[ak,k];
        r.text='Para escrever <b>'+ch+'</b>: primeiro o <b>acento</b> ('+(aS?'segure o <b>Shift</b> e aperte a tecla destacada':'tecla destacada')+'), depois a letra <b>'+base.toUpperCase()+'</b>'+(up?' com o Shift':'')+'.';
        if(aS)r.shiftKey=other(ak);else if(up)r.shiftKey=other(k);
        return r}
      r.keys=[k];
      var nome=k.base.length===1?k.base.toUpperCase():k.base;
      r.text=(needShift?'Segure o <b>Shift</b> e aperte a tecla <b>'+nome+'</b> ':'Aperte a tecla <b>'+nome+'</b> ')+fing+'.';
      if(needShift)r.shiftKey=other(k);
      return r;
    }
    function clear(){keys.forEach(function(k){k.el.classList.remove('nx','sx')})}
    function render(){
      var v=inp.value,h='',bad=-1;
      for(var i=0;i<target.length;i++){
        var c=target.charAt(i),cls;
        if(i<v.length){cls=v.charAt(i)===c?'o':'b';if(cls==='b'&&bad<0)bad=i}
        else cls=(i===v.length&&!done)?'c':'p';
        h+='<span class="'+cls+'">'+(c===' '?'&nbsp;':c.replace('&','&amp;').replace('<','&lt;'))+'</span>';
      }
      txt.innerHTML=h;clear();
      if(done)return;
      if(bad>=0||v.length>target.length){hint.innerHTML='❌ Apague com o <b>Backspace</b> até corrigir o erro.';keys.filter(function(k){return k.id==='back'})[0].el.classList.add('nx');return}
      var r=hintFor(target.charAt(v.length));hint.innerHTML=r.text||'';
      r.keys.forEach(function(k){k.el.classList.add('nx')});
      if(r.shiftKey)keys.filter(function(k){return k.id===r.shiftKey})[0].el.classList.add('nx','sx');
    }
    function finish(){
      done=true;inp.disabled=true;var sec=Math.max(1,(Date.now()-t0)/1000),n=target.length,acc=Math.max(0,Math.round((n-errs)/n*100)),ppm=Math.round((n/5)/(sec/60));
      var key='l'+cur,b=best[key];if(!b||acc>b.a||(acc===b.a&&ppm>b.p))best[key]={a:acc,p:ppm};try{localStorage.setItem('etd:tk',JSON.stringify(best))}catch(e){}
      out.innerHTML='🎉 <b>Lição concluída!</b> Acertos: <b>'+acc+'%</b> · Velocidade: <b>'+ppm+' PPM</b> · Tempo: <b>'+Math.round(sec)+' s</b>.<br>'+(acc>=90?'Muito bem! Tente a próxima lição ou repita para ir mais rápido.':'Quase lá! Repita a lição com calma: <b>acerte primeiro, acelere depois</b>.')+' <button type="button" id="tkAgain">↻ Repetir</button>';
      $('tkAgain').onclick=function(){load(cur)};render();
    }
    function proc(){
      var v=inp.value;
      if(v.length>prev){for(var i=prev;i<v.length&&i<target.length;i++){if(!t0)t0=Date.now();if(v.charAt(i)!==target.charAt(i))errs++}}
      prev=v.length;render();
      if(v.length>=target.length&&v===target)finish();
    }
    inp.addEventListener('input',function(e){if(!e.isComposing)proc()});
    inp.addEventListener('compositionend',function(){setTimeout(proc,0)});
    inp.addEventListener('paste',function(e){e.preventDefault()});
    function load(i){
      cur=i;target=L[i].t;errs=0;prev=0;t0=0;done=false;inp.disabled=false;inp.value='';out.textContent='';
      [].forEach.call(lbox.children,function(b,j){var on=j===i;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
      var b=best['l'+i];if(b)out.innerHTML='Seu melhor nesta lição: <b>'+b.a+'%</b> de acertos, <b>'+b.p+' PPM</b>.';
      render();
    }
    L.forEach(function(l,i){var b=document.createElement('button');b.type='button';b.textContent=l.n;b.setAttribute('aria-pressed','false');b.onclick=function(){load(i);inp.focus()};lbox.appendChild(b)});
    load(0);
  })();

  // --- Cap. 3: tela do Word ---
  (function(){
    var box=$('wdBtns');if(!box)return;
    var P=[
      {k:'acesso',n:'Acesso rápido',d:'Botões de uso constante: salvar (disquete), desfazer e refazer.'},
      {k:'titulo',n:'Barra de título',d:'Mostra o nome do documento. Se ainda não salvou, aparece “Documento1”.'},
      {k:'guias',n:'Guias',d:'As “gavetas” da caixa de ferramentas: Página Inicial, Inserir, Layout, Revisão...'},
      {k:'faixa',n:'Faixa de opções',d:'Os botões da guia aberta. Na Página Inicial ficam colar, fonte (N, I, S), parágrafo e estilos.'},
      {k:'pagina',n:'Folha',d:'O papel onde você escreve. O risquinho que pisca é o cursor.'},
      {k:'status',n:'Barra de status',d:'Mostra a página atual, o número de palavras e o zoom (para aumentar ou diminuir a folha na tela).'}
    ];
    var info=$('wdInfo'),svg=$('wdSvg'),by={};
    function sel(k){
      var p=P.filter(function(x){return x.k===k})[0];
      [].forEach.call(svg.querySelectorAll('.part'),function(g){g.classList.toggle('on',g.getAttribute('data-k')===k)});
      bs.forEach(function(b,i){var on=P[i].k===k;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
      info.innerHTML='<b>'+p.n+'</b><br>'+p.d;
    }
    var bs=mkBtns(box,P.map(function(x){return x.n}),function(i){sel(P[i].k)});
    [].forEach.call(svg.querySelectorAll('.part'),function(g){g.addEventListener('click',function(){sel(g.getAttribute('data-k'))})});
    sel('guias');
  })();

  // --- Cap. 3: simulador de formatação ---
  (function(){
    var tg=$('fmTg');if(!tg)return;
    var st={n:false,i:false,s:false,col:'#111111',al:'left',lst:false};
    var prev=$('fmPrev'),how=$('fmHow'),font=$('fmFont'),size=$('fmSize'),sv=$('fmSv');
    var HOW={n:'Botão <b>N</b> (Negrito), grupo Fonte.',i:'Botão <b>I</b> (Itálico), grupo Fonte.',s:'Botão <b>S</b> (Sublinhado), grupo Fonte.',lst:'Botão de <b>marcadores</b> (bolinhas), grupo Parágrafo.',
      font:'Caixinha com o <b>nome da letra</b>, grupo Fonte.',size:'Caixinha com o <b>número</b>, grupo Fonte.',col:'Botão <b>A</b> com traço colorido, grupo Fonte.',al:'Botões de <b>alinhamento</b>, grupo Parágrafo.'};
    function say(k){how.innerHTML='👉 No Word: '+HOW[k]}
    function render(){
      var css='font-family:'+font.value+';font-size:'+size.value+'px;color:'+st.col+';text-align:'+st.al+';';
      if(st.n)css+='font-weight:700;';if(st.i)css+='font-style:italic;';if(st.s)css+='text-decoration:underline;';
      var t='Festa na escola';
      prev.innerHTML=st.lst?'<div style="'+css+'">'+t+'</div><ul style="'+css+'"><li>Traga um prato</li><li>Traga uma bebida</li></ul>':'<div style="'+css+'">'+t+'</div><div style="'+css+'font-size:16px;font-weight:400;font-style:normal;text-decoration:none">Domingo, às 10 horas, no pátio.</div>';
      sv.textContent=size.value;
    }
    var T=[['N','n'],['I','i'],['S','s'],['• Lista','lst']];
    T.forEach(function(t){var b=document.createElement('button');b.type='button';b.textContent=t[0];b.setAttribute('aria-pressed','false');
      b.onclick=function(){st[t[1]]=!st[t[1]];b.classList.toggle('on',st[t[1]]);b.setAttribute('aria-pressed',st[t[1]]);say(t[1]);render()};tg.appendChild(b)});
    var C=[['#111111','Preto'],['#c62828','Vermelho'],['#1565c0','Azul'],['#2e7d32','Verde']],cb=$('fmCol');
    C.forEach(function(c){var b=document.createElement('button');b.type='button';b.style.background=c[0];b.title=c[1];b.setAttribute('aria-label',c[1]);
      b.onclick=function(){st.col=c[0];[].forEach.call(cb.children,function(x){x.classList.remove('on')});b.classList.add('on');say('col');render()};cb.appendChild(b)});
    cb.children[0].classList.add('on');
    var A=[['⬅ Esquerda','left'],['⬛ Centro','center'],['➡ Direita','right']],ab=$('fmAl');
    A.forEach(function(a,i){var b=document.createElement('button');b.type='button';b.textContent=a[0];
      b.onclick=function(){st.al=a[1];[].forEach.call(ab.children,function(x){x.classList.remove('on')});b.classList.add('on');say('al');render()};ab.appendChild(b);if(i===0)b.classList.add('on')});
    font.onchange=function(){say('font');render()};size.oninput=function(){say('size');render()};
    render();say('n');how.innerHTML='Mexa nos botões acima e veja a folha mudar.';
  })();

  // --- Cap. 3: jogo dos botões ---
  (function(){
    var ic=$('btIc');if(!ic)return;
    var Q=[['N','Negrito (letra grossa)'],['I','Itálico (letra inclinada)'],['S','Sublinhado'],['💾','Salvar'],['↶','Desfazer'],['🖨️','Imprimir'],['📋','Colar'],['A','Cor da letra'],['•','Marcadores (lista)'],['☰','Alinhar o texto']];
    var bb=$('btBtns'),tx=$('btTxt'),cur,ok=0,tot=0;
    function next(){
      cur=Q[Math.floor(Math.random()*Q.length)];
      ic.innerHTML=cur[0]+'<b>Para que serve este botão?</b>';
      var opts=Q.map(function(q){return q[1]}).sort(function(){return Math.random()-.5});
      var pick=[cur[1]];opts.forEach(function(o){if(pick.length<4&&pick.indexOf(o)<0)pick.push(o)});
      pick.sort(function(){return Math.random()-.5});
      bb.innerHTML='';
      pick.forEach(function(o){var b=document.createElement('button');b.type='button';b.textContent=o;
        b.onclick=function(){tot++;if(o===cur[1]){ok++;tx.innerHTML='<span class="ok-y">✔ Muito bem!</span> Acertos: '+ok+' de '+tot+'.'}else{tx.innerHTML='<span class="ok-n">✘ Quase!</span> Era: <b>'+cur[1]+'</b>. Acertos: '+ok+' de '+tot+'.'}next()};bb.appendChild(b)});
    }
    next();
  })();

  // --- Cap. 4: endereços da planilha ---
  (function(){
    var g=$('xgGrid');if(!g)return;
    var L=['A','B','C','D','E'],play=false,target=null,ok=0,tot=0,txt=$('xgTxt');
    g.appendChild(document.createElement('div'));
    L.forEach(function(l){var d=document.createElement('div');d.className='h';d.textContent=l;g.appendChild(d)});
    for(var r=1;r<=5;r++){
      var h=document.createElement('div');h.className='h';h.textContent=r;g.appendChild(h);
      L.forEach(function(l){var d=document.createElement('div');d.className='c';d.setAttribute('role','gridcell');d.tabIndex=0;d.setAttribute('data-a',l+r);
        function act(){
          [].forEach.call(g.querySelectorAll('.c'),function(x){x.classList.remove('on')});d.classList.add('on');
          var a=d.getAttribute('data-a');
          if(!play){txt.innerHTML='Você clicou na célula <b>'+a+'</b>: coluna <b>'+a[0]+'</b>, linha <b>'+a[1]+'</b>.';return}
          tot++;
          if(a===target){ok++;txt.innerHTML='<span class="ok-y">✔ Isso!</span> ('+ok+' de '+tot+') '}else{txt.innerHTML='<span class="ok-n">✘ Essa é a '+a+'.</span> ('+ok+' de '+tot+') '}
          nextT();
        }
        d.onclick=act;d.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();act()}};g.appendChild(d)});
    }
    function nextT(){var a;do{a=L[Math.floor(Math.random()*5)]+(1+Math.floor(Math.random()*5))}while(a===target);target=a;txt.innerHTML+='Ache a célula <b>'+target+'</b>.'}
    $('xgPlay').onclick=function(){play=!play;this.textContent=play?'⏹ Parar o jogo':'🎯 Jogar: achar a célula';ok=0;tot=0;if(play){target=null;txt.innerHTML='';nextT()}else txt.innerHTML='Clique em uma célula.'};
  })();

  // --- Cap. 4: mini-planilha com fórmulas ---
  (function(){
    var tab=$('xsTab');if(!tab)return;
    var D=[['Arroz',2,6],['Feijão',1,8],['Leite',3,5],['Óleo',1,7]];
    var fns=['SOMA','MÉDIA','MÁXIMO','MÍNIMO'],fn=0,rows=[];
    function money(v){return 'R$ '+v.toFixed(2).replace('.',',')}
    var h='<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><th>1</th><td><b>Produto</b></td><td><b>Qtd</b></td><td><b>Preço</b></td><td><b>Total</b></td></tr>';
    D.forEach(function(d,i){h+='<tr><th>'+(i+2)+'</th><td>'+d[0]+'</td><td><input type="number" min="0" value="'+d[1]+'" data-i="'+i+'" data-c="1" aria-label="Quantidade de '+d[0]+'"></td><td><input type="number" min="0" step="0.5" value="'+d[2]+'" data-i="'+i+'" data-c="2" aria-label="Preço de '+d[0]+'"></td><td id="xsT'+i+'"></td></tr>'});
    h+='<tr class="res"><th>6</th><td id="xsLb"></td><td></td><td></td><td id="xsRes"></td></tr>';
    tab.innerHTML=h;
    function calc(){
      var tot=[];
      D.forEach(function(d,i){
        var q=parseFloat(tab.querySelector('[data-i="'+i+'"][data-c="1"]').value)||0,p=parseFloat(tab.querySelector('[data-i="'+i+'"][data-c="2"]').value)||0;
        tot.push(q*p);$('xsT'+i).textContent=money(q*p);
      });
      var r=[tot.reduce(function(a,b){return a+b},0),0,Math.max.apply(null,tot),Math.min.apply(null,tot)];r[1]=r[0]/tot.length;
      $('xsLb').textContent='D6: =' +fns[fn]+'(D2:D5)';$('xsRes').textContent=money(r[fn]);
      $('xsTxt').innerHTML='Fórmula nos totais: <b>=B2*C2</b> (e igual nas outras linhas). Em D6: <b>='+fns[fn]+'(D2:D5)</b> = <b>'+money(r[fn])+'</b>.';
    }
    tab.addEventListener('input',calc);
    mkBtns($('xsFn'),fns,function(i,b,bs){fn=i;bs.forEach(function(x,j){x.classList.toggle('on',j===i);x.setAttribute('aria-pressed',j===i)});calc()});
    $('xsFn').children[0].classList.add('on');
    calc();
  })();
})();
