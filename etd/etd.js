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
})();
