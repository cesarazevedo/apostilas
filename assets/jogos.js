/* Motor de jogos de arrastar e soltar, compartilhado pelas apostilas.
   Uso: <div class="jogo" data-jogo="id"></div> e window.JOGOS={id:{...}} no JS da disciplina.
   Dados: {titulo, ajuda, zonas:[{id,rotulo,sub}], itens:[{t,z,why}], unico:true|false}
   unico:true = cada caixa recebe uma peça só (ligar termos).
   mono:true = peças e caixas em fonte de código (Python). */
(function(){
  'use strict';
  var CURSO=document.body.dataset.curso||'apostila',KEY='ap:'+CURSO+':jogos',best={};
  try{best=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(best))}catch(e){}}
  function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e}
  function stars(n){return n<=1?3:n<=4?2:1}
  function zoneAt(x,y){var e=document.elementFromPoint(x,y);return e&&e.closest('.jg-zone')}

  function build(box,id,g){
    box.textContent='';box.classList.add('jg');
    var errs=0,ok=0,sel=null,total=g.itens.length;
    box.appendChild(el('h4','jg-title','🎮 '+g.titulo));
    box.appendChild(el('p','jg-help',g.ajuda+' (Toque na peça e depois na caixa, ou arraste.)'));
    var bar=el('div','jg-bar');bar.innerHTML='<i></i>';box.appendChild(bar);
    var tray=el('div','jg-tray');tray.setAttribute('aria-label','Peças para classificar');box.appendChild(tray);
    var zs=el('div','jg-zones');box.appendChild(zs);
    var msg=el('div','jg-msg','👆 Pegue uma peça e coloque na caixa certa.');msg.setAttribute('role','status');msg.setAttribute('aria-live','polite');box.appendChild(msg);
    var rb=el('button','retry','↺ Jogar de novo');rb.type='button';rb.onclick=function(){build(box,id,g)};
    var rec=el('span','jg-rec',best[id]?'  Melhor: '+'⭐'.repeat(best[id]):'');

    g.zonas.forEach(function(z){
      var d=el('div','jg-zone');if(g.mono)d.classList.add('jg-mono');d.dataset.id=z.id;d.tabIndex=0;d.setAttribute('role','button');
      d.setAttribute('aria-label','Caixa: '+z.rotulo);
      d.appendChild(el('div','jg-lab',z.rotulo));if(z.sub)d.appendChild(el('div','jg-sub',z.sub));
      d.appendChild(el('div','slot'));zs.appendChild(d);
      d.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();drop(d)}};
    });
    g.itens.slice().sort(function(){return Math.random()-.5}).forEach(function(it){
      var c=el('div','jg-chip',it.t);c.tabIndex=0;c.setAttribute('role','button');c._it=it;if(g.mono)c.classList.add('jg-mono');tray.appendChild(c);
      c.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(c)}};
    });

    function pick(c){
      if(c.classList.contains('done'))return;
      if(sel)sel.classList.remove('sel');
      sel=(sel===c)?null:c;if(sel)sel.classList.add('sel');
    }
    function drop(z,chip){
      chip=chip||sel;if(!chip)return;
      var slot=z.querySelector('.slot'),full=g.unico&&slot.children.length>=1;
      if(chip._it.z===z.dataset.id&&!full){
        slot.appendChild(chip);chip.classList.remove('sel');chip.classList.add('done');chip.tabIndex=-1;chip.setAttribute('role','text');
        sel=null;ok++;msg.className='jg-msg';msg.textContent='✅ Isso! '+chip._it.why;
        bar.firstChild.style.width=(ok/total*100)+'%';
        if(ok===total)win();
      }else{
        errs++;z.classList.remove('shake');void z.offsetWidth;z.classList.add('shake');
        msg.className='jg-msg bad';msg.textContent='❌ Ops, essa não é a certa. Pense na analogia e tente de novo!';
      }
    }
    function win(){
      var s=stars(errs);msg.className='jg-msg win';
      msg.textContent='🎉 Mandou bem! '+'⭐'.repeat(s)+' (erros: '+errs+')';
      if(!best[id]||s>best[id]){best[id]=s;save()}
      rec.textContent='  Melhor: '+'⭐'.repeat(best[id]);
      msg.appendChild(rec);box.appendChild(rb);
    }
    zs.onclick=function(e){var z=e.target.closest('.jg-zone');if(z&&!drag)drop(z)};
    tray.onclick=function(e){var c=e.target.closest('.jg-chip');if(c&&!drag)pick(c)};

    /* arrastar com o ponteiro (mouse, toque, caneta) */
    var drag=null,moved=false,justDragged=false;
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
    box._cleanup&&box._cleanup();
    document.addEventListener('pointermove',move,{passive:false});
    document.addEventListener('pointerup',up);
    box._cleanup=function(){document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up)};
    /* ignora o "click" que o navegador dispara logo depois de um arrasto */
    box.addEventListener('click',function(e){if(justDragged)e.stopPropagation()},true);
  }

  function init(){
    var J=window.JOGOS||{};
    [].forEach.call(document.querySelectorAll('.jogo[data-jogo]'),function(b){
      var g=J[b.dataset.jogo];if(g)build(b,b.dataset.jogo,g);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
