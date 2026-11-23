/* Motor de jogos de arrastar e soltar, compartilhado pelas apostilas.
   Uso: <div class="jogo" data-jogo="id"></div> e window.JOGOS={id:{...}} no JS da disciplina.
   Dados: {titulo, ajuda, zonas:[{id,rotulo,sub}], itens:[{t,z,why}], unico, mono, ver}
   - unico:true  = cada caixa recebe uma peça só (ligar termos).
   - mono:true   = peças e caixas em fonte de código (Python).
   - ver:'c1-hist' = id da seção para "Reler esta parte" (padrão: o capítulo).
   - passos:[{t,why}] = jogo de ORDENAR: os passos já na ordem certa; o motor embaralha.
   Jogos de classificar com mais de 8 peças sorteiam 8 a cada partida. */
(function(){
  'use strict';
  var CURSO=document.body.dataset.curso||'apostila',KEY='ap:'+CURSO+':jogos',SKEY='ap:jogos:som';
  var best={},som=true,actx=null;
  function load(){try{best=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){best={}}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(best))}catch(e){}
    try{window.dispatchEvent(new CustomEvent('jogos:update'))}catch(e){}}
  load();try{som=localStorage.getItem(SKEY)!=='0'}catch(e){}
  window.addEventListener('jogos:reset',function(){best={}});

  /* ---- som e vibração (curtos; dá para desligar) ---- */
  function tone(seq){
    if(!som)return;
    try{
      actx=actx||new (window.AudioContext||window.webkitAudioContext)();
      var t=actx.currentTime;
      seq.forEach(function(n){
        var o=actx.createOscillator(),g=actx.createGain();o.type='sine';o.frequency.value=n[0];
        g.gain.setValueAtTime(.0001,t+n[2]);g.gain.exponentialRampToValueAtTime(.12,t+n[2]+.01);
        g.gain.exponentialRampToValueAtTime(.0001,t+n[2]+n[1]);
        o.connect(g);g.connect(actx.destination);o.start(t+n[2]);o.stop(t+n[2]+n[1]+.02);
      });
    }catch(e){}
  }
  function buzz(p){if(som&&navigator.vibrate){try{navigator.vibrate(p)}catch(e){}}}
  function fx(k){
    if(k==='ok'){tone([[660,.09,0],[880,.12,.09]]);buzz(25)}
    else if(k==='bad'){tone([[200,.18,0]]);buzz([50,40,50])}
    else{tone([[523,.1,0],[659,.1,.1],[784,.1,.2],[1047,.25,.3]]);buzz([40,40,40,40,150])}
  }
  function paintSom(){
    [].forEach.call(document.querySelectorAll('.jg-som'),function(b){
      b.textContent=som?'🔊':'🔇';b.setAttribute('aria-pressed',som?'true':'false');
      b.title=som?'Som e vibração ligados (toque para desligar)':'Som e vibração desligados (toque para ligar)';
    });
  }

  function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e}
  function stars(n){return n<=1?3:n<=4?2:1}
  function rnd(){return Math.random()-.5}
  function zoneAt(x,y){var e=document.elementFromPoint(x,y);return e&&e.closest('.jg-zone')}

  /* prepara as zonas e as peças desta partida (ordenar, sortear) */
  function prep(g){
    if(g.passos){
      return {ordem:true,unico:true,
        zonas:g.passos.map(function(p,i){return{id:'s'+i,rotulo:(i+1)+'º passo'}}),
        itens:g.passos.map(function(p,i){return{t:p.t,z:'s'+i,why:p.why}})};
    }
    var it=g.itens.slice();
    if(!g.unico&&it.length>8){
      var by={},out=[];
      it.forEach(function(x){(by[x.z]=by[x.z]||[]).push(x)});
      Object.keys(by).forEach(function(z){var a=by[z];out.push(a.splice(Math.floor(Math.random()*a.length),1)[0])});
      var rest=[].concat.apply([],Object.keys(by).map(function(z){return by[z]})).sort(rnd);
      it=out.concat(rest.slice(0,Math.max(0,8-out.length)));
      return {zonas:g.zonas,itens:it,unico:g.unico,sorteio:true};
    }
    return {zonas:g.zonas,itens:it,unico:g.unico};
  }

  function build(box,id,g){
    var P=prep(g);
    box.textContent='';box.classList.add('jg');box.classList.toggle('jg-ordem',!!P.ordem);
    var errs=0,ok=0,sel=null,total=P.itens.length,missed={};
    box._play={itens:P.itens};
    var head=el('div','jg-head');
    head.appendChild(el('h4','jg-title','🎮 '+g.titulo));
    var sb=el('button','jg-som');sb.type='button';
    sb.onclick=function(){som=!som;try{localStorage.setItem(SKEY,som?'1':'0')}catch(e){}paintSom();if(som)tone([[660,.08,0]])};
    head.appendChild(sb);box.appendChild(head);
    box.appendChild(el('p','jg-help',g.ajuda+(P.ordem?' Arraste cada passo para a posição certa.':'')+' (Toque na peça e depois na caixa, ou arraste.)'+(P.sorteio?' A cada partida as peças são sorteadas.':'')));
    var bar=el('div','jg-bar');bar.innerHTML='<i></i>';box.appendChild(bar);
    var tray=el('div','jg-tray');tray.setAttribute('aria-label','Peças');box.appendChild(tray);
    var zs=el('div','jg-zones');box.appendChild(zs);
    var msg=el('div','jg-msg',P.ordem?'👆 Coloque os passos na ordem certa.':'👆 Pegue uma peça e coloque na caixa certa.');
    msg.setAttribute('role','status');msg.setAttribute('aria-live','polite');box.appendChild(msg);
    var rb=el('button','retry','↺ Jogar de novo');rb.type='button';rb.onclick=function(){build(box,id,g)};
    var rec=el('span','jg-rec',best[id]?'  Melhor: '+'⭐'.repeat(best[id]):'');
    paintSom();

    P.zonas.forEach(function(z){
      var d=el('div','jg-zone');if(g.mono)d.classList.add('jg-mono');
      d.dataset.id=z.id;d.tabIndex=0;d.setAttribute('role','button');
      d.setAttribute('aria-label','Caixa: '+z.rotulo);
      d.appendChild(el('div','jg-lab',z.rotulo));if(z.sub)d.appendChild(el('div','jg-sub',z.sub));
      d.appendChild(el('div','slot'));zs.appendChild(d);
      d.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();drop(d)}};
    });
    P.itens.slice().sort(rnd).forEach(function(it){
      var c=el('div','jg-chip',it.t);c.tabIndex=0;c.setAttribute('role','button');c._it=it;
      if(g.mono)c.classList.add('jg-mono');tray.appendChild(c);
      c.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(c)}};
    });

    function pick(c){
      if(c.classList.contains('done'))return;
      if(sel)sel.classList.remove('sel');
      sel=(sel===c)?null:c;if(sel)sel.classList.add('sel');
    }
    function drop(z,chip){
      chip=chip||sel;if(!chip)return;
      var slot=z.querySelector('.slot'),full=P.unico&&slot.children.length>=1;
      if(chip._it.z===z.dataset.id&&!full){
        slot.appendChild(chip);chip.classList.remove('sel');chip.classList.add('done');chip.tabIndex=-1;chip.setAttribute('role','text');
        sel=null;ok++;msg.className='jg-msg';msg.textContent='✅ Isso! '+chip._it.why;
        bar.firstChild.style.width=(ok/total*100)+'%';
        if(ok===total)win();else fx('ok');
      }else{
        errs++;missed[chip._it.t]=1;fx('bad');
        z.classList.remove('shake');void z.offsetWidth;z.classList.add('shake');
        msg.className='jg-msg bad';
        msg.textContent=P.ordem?'❌ Ainda não é esse passo. Pense: o que precisa acontecer antes?':'❌ Ops, essa não é a certa. Pense na analogia e tente de novo!';
      }
    }
    function win(){
      var s=stars(errs);msg.className='jg-msg win';fx('win');
      msg.textContent='🎉 Mandou bem! '+'⭐'.repeat(s)+' (erros: '+errs+')';
      if(!best[id]||s>best[id])best[id]=s;
      save();
      rec.textContent='  Melhor: '+'⭐'.repeat(best[id]);msg.appendChild(rec);
      var mk=Object.keys(missed);
      if(mk.length){
        var ch=box.closest('section.chapter'),rev=el('div','jg-rev');
        rev.appendChild(el('b','','📖 Para revisar: '));
        rev.appendChild(document.createTextNode(mk.join(' · ')+'  '));
        var a=el('a','','Reler esta parte');a.href='#'+(g.ver||(ch?ch.id:''));rev.appendChild(a);
        box.appendChild(rev);
      }
      box.appendChild(rb);
    }
    zs.onclick=function(e){var z=e.target.closest('.jg-zone');if(z&&!drag)drop(z)};
    tray.onclick=function(e){var c=e.target.closest('.jg-chip');if(c&&!drag)pick(c)};

    /* arrastar com o ponteiro (mouse, toque, caneta) */
    var drag=null,justDragged=false;
    tray.addEventListener('pointerdown',function(e){
      var c=e.target.closest('.jg-chip');if(!c||c.classList.contains('done')||e.button>0)return;
      var r=c.getBoundingClientRect();
      drag={c:c,sx:e.clientX,sy:e.clientY,dx:e.clientX-r.left,dy:e.clientY-r.top,w:r.width,g:null,over:null};
    });
    function move(e){
      if(!drag)return;
      if(!drag.g){
        if(Math.abs(e.clientX-drag.sx)+Math.abs(e.clientY-drag.sy)<8)return;
        var gh=drag.c.cloneNode(true);gh.classList.add('jg-ghost');gh.style.width=drag.w+'px';document.body.appendChild(gh);
        drag.g=gh;drag.c.classList.add('lifted');
      }
      e.preventDefault();
      drag.g.style.left=(e.clientX-drag.dx)+'px';drag.g.style.top=(e.clientY-drag.dy)+'px';
      var z=zoneAt(e.clientX,e.clientY);
      if(drag.over&&drag.over!==z)drag.over.classList.remove('over');
      if(z)z.classList.add('over');drag.over=z;
      var h=innerHeight;if(e.clientY>h-70)scrollBy(0,12);else if(e.clientY<70)scrollBy(0,-12);
    }
    function up(e){
      if(!drag)return;var d=drag;drag=null;
      if(!d.g)return;
      d.g.remove();d.c.classList.remove('lifted');if(d.over)d.over.classList.remove('over');
      var z=zoneAt(e.clientX,e.clientY);
      justDragged=true;setTimeout(function(){justDragged=false},0);
      if(z&&box.contains(z))drop(z,d.c);
    }
    if(box._cleanup)box._cleanup();
    document.addEventListener('pointermove',move,{passive:false});
    document.addEventListener('pointerup',up);
    box._cleanup=function(){document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up)};
    if(!box._guard){box._guard=1;box.addEventListener('click',function(e){if(justDragged)e.stopPropagation()},true)}
  }

  function init(){
    var J=window.JOGOS||{};
    [].forEach.call(document.querySelectorAll('.jogo[data-jogo]'),function(b){
      var g=J[b.dataset.jogo];if(g)build(b,b.dataset.jogo,g);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
