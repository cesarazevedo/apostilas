/* Recursos compartilhados das apostilas: tema, quiz, progresso, glossário, acessibilidade, modo offline */
(function(){
  var body=document.body,CURSO=body.dataset.curso||'curso',ROOT=body.dataset.root||'./';
  var KEY='ap:'+CURSO,state={done:{},quiz:{}};
  try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&s.done&&s.quiz)state=s;}catch(e){}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
  var chapters=[].slice.call(document.querySelectorAll('section.chapter:not(.soon-ch)'));
  function chNum(id){return id.replace(/\D/g,'')}

  // --- Acessibilidade básica ---
  var main=document.querySelector('main');
  if(main){main.id='conteudo';main.tabIndex=-1;}
  var skip=document.createElement('a');skip.className='skip';skip.href='#conteudo';skip.textContent='Pular para o conteúdo';
  skip.onclick=function(){if(main){main.focus();}};
  body.insertBefore(skip,body.firstChild);
  [].forEach.call(document.querySelectorAll('th'),function(th){if(!th.hasAttribute('scope'))th.setAttribute('scope','col')});
  [].forEach.call(document.querySelectorAll('.score,.fb,.enc-txt,.mail-tip'),function(e){e.setAttribute('aria-live','polite')});
  var pgEl=document.getElementById('progress');
  if(pgEl){pgEl.setAttribute('role','progressbar');pgEl.setAttribute('aria-label','Progresso de leitura');pgEl.setAttribute('aria-valuemin','0');pgEl.setAttribute('aria-valuemax','100');}
  var nav=document.getElementById('nav');if(nav)nav.setAttribute('aria-label','Sumário da apostila');
  [].forEach.call(document.querySelectorAll('.hot'),function(h){
    h.tabIndex=0;h.setAttribute('role','button');
    h.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();h.click();}});
  });
  // espelha o estado visual (classes) em atributos ARIA
  function sync(el,test,attr){var f=function(){el.setAttribute(attr,test()?'true':'false')};f();new MutationObserver(f).observe(el,{attributes:true,attributeFilter:['class']});}
  [].forEach.call(document.querySelectorAll('.tabs button'),function(b){sync(b,function(){return b.classList.contains('on')},'aria-pressed')});
  [].forEach.call(document.querySelectorAll('.lh'),function(b){var l=b.parentNode;
    var f=function(){b.setAttribute('aria-expanded',l.classList.contains('exp')?'true':'false')};f();new MutationObserver(f).observe(l,{attributes:true,attributeFilter:['class']});});

  // --- Quiz (com nota salva e botão refazer) ---
  [].forEach.call(document.querySelectorAll('.quiz'),function(quiz){
    var qs=quiz.querySelectorAll('.q'),total=qs.length,score=quiz.nextElementSibling,done=0,hits=0;
    var ch=quiz.closest('section.chapter'),chId=ch?ch.id:null;
    var retry=document.createElement('button');retry.className='retry';retry.textContent='🔄 Refazer o quiz';retry.hidden=true;
    score.parentNode.insertBefore(retry,score.nextSibling);
    function reset(){done=0;hits=0;score.textContent='';retry.hidden=true;
      [].forEach.call(qs,function(q){q.dataset.answered='';[].forEach.call(q.querySelectorAll('.opt'),function(o){o.classList.remove('ok','no')});q.querySelector('.fb').classList.remove('show');});}
    retry.onclick=function(){reset();quiz.scrollIntoView({block:'start'});};
    [].forEach.call(qs,function(q){
      [].forEach.call(q.querySelectorAll('.opt'),function(o){
        o.onclick=function(){
          if(q.dataset.answered)return;q.dataset.answered='1';done++;
          var ok=o.dataset.ok==='1';if(ok)hits++;
          o.classList.add(ok?'ok':'no');
          if(!ok){q.querySelector('[data-ok="1"]').classList.add('ok');}
          q.querySelector('.fb').classList.add('show');
          if(done===total){
            score.textContent='Você acertou '+hits+' de '+total+(hits===total?' 🎉 Excelente!':hits>=total*0.6?' 👏 Muito bem!':' 📖 Releia o capítulo e tente de novo.');
            retry.hidden=false;
            if(chId){var best=state.quiz[chId];if(!best||hits/total>=best.h/best.t){state.quiz[chId]={h:hits,t:total};}save();renderProgress();}
          }
        };
      });
    });
  });

  // --- Respostas abertas ---
  [].forEach.call(document.querySelectorAll('.open button'),function(b){
    b.onclick=function(){var a=b.nextElementSibling;a.classList.toggle('show');b.textContent=a.classList.contains('show')?'Ocultar resposta':'Ver resposta';};
  });

  // --- Copiar código ---
  [].forEach.call(document.querySelectorAll('pre .cp'),function(b){
    b.onclick=function(){
      var t=b.parentNode.querySelector('code').innerText;
      var ok=function(){b.textContent='Copiado!';setTimeout(function(){b.textContent='Copiar'},1400)};
      if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,ok);else ok();
    };
  });

  // --- Glossário: termos com explicação ao passar o mouse / tocar / focar ---
  var G=window.GLOSSARIO||{},terms=Object.keys(G);
  if(terms.length){
    var tip=document.createElement('div');tip.id='glTip';tip.setAttribute('role','tooltip');tip.hidden=true;body.appendChild(tip);
    var cur=null;
    function show(el){cur=el;tip.innerHTML='<b>'+el.dataset.t+'</b><br>'+el.dataset.def;tip.hidden=false;
      var r=el.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;
      var x=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2)),y=r.top-h-8;if(y<8)y=r.bottom+8;
      tip.style.left=x+'px';tip.style.top=y+'px';el.setAttribute('aria-describedby','glTip');}
    function hide(){if(cur)cur.removeAttribute('aria-describedby');tip.hidden=true;cur=null;}
    document.addEventListener('keydown',function(e){if(e.key==='Escape')hide()});
    document.addEventListener('click',function(e){if(!e.target.closest('abbr.gl'))hide()});
    var esc=function(t){return t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')};
    var sorted=terms.slice().sort(function(a,b){return b.length-a.length});
    var re=new RegExp('(?<![\\p{L}\\p{N}-])('+sorted.map(esc).join('|')+')(?:s|es)?(?![\\p{L}\\p{N}-])','iu');
    var SKIP='a,code,pre,button,h1,h2,h3,h4,h5,abbr,.lh,.opt,.hot,.nav,.tool,.sw,.enc,.quiz,.open,.mail,.chap-head,.obj,.resumo,.tools,.meta,.hero,.fb,.answer,th';
    chapters.forEach(function(ch){
      var seen={},w=document.createTreeWalker(ch,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
        if(!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;
        var p=n.parentNode;return p.closest(SKIP)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
      var nodes=[];while(w.nextNode())nodes.push(w.currentNode);
      nodes.forEach(function(n){
        var txt=n.nodeValue,m,frag=null,last=0,loop=txt;
        var g=new RegExp(re.source,'giu'),out=document.createDocumentFragment(),any=false;
        while((m=g.exec(txt))){
          var key=sorted.filter(function(t){return t.toLowerCase()===m[1].toLowerCase()})[0];
          if(!key||seen[key])continue;seen[key]=1;any=true;
          out.appendChild(document.createTextNode(txt.slice(last,m.index)));
          var a=document.createElement('abbr');a.className='gl';a.tabIndex=0;a.dataset.t=key;a.dataset.def=G[key];a.textContent=m[0];
          a.onmouseenter=a.onfocus=function(){show(this)};a.onmouseleave=a.onblur=hide;
          a.onclick=function(){cur===this&&!tip.hidden?hide():show(this)};
          out.appendChild(a);last=m.index+m[0].length;
        }
        if(any){out.appendChild(document.createTextNode(txt.slice(last)));n.parentNode.replaceChild(out,n);}
      });
    });
    // seção "Glossário" ao final
    var refs=document.getElementById('refs');
    if(refs){
      var sec=document.createElement('section');sec.id='glossario';
      var dl=terms.slice().sort(function(a,b){return a.localeCompare(b,'pt-BR')}).map(function(t){return '<dt>'+t+'</dt><dd>'+G[t]+'</dd>'}).join('');
      sec.innerHTML='<h2>📖 Glossário</h2><p>Os termos abaixo aparecem sublinhados no texto. Passe o mouse (ou toque) para ver o significado.</p><dl class="gloss">'+dl+'</dl>';
      refs.parentNode.insertBefore(sec,refs);
      var rl=nav&&nav.querySelector('a[href="#refs"]');
      if(rl){var gl=document.createElement('a');gl.href='#glossario';gl.innerHTML='<span class="n" style="background:#546e7a">A</span>Glossário';nav.insertBefore(gl,rl);}
    }
  }

  // --- Progresso do aluno (salvo no navegador) ---
  var sb=document.getElementById('sidebar'),panel=null;
  chapters.forEach(function(ch){
    var lab=document.createElement('label');lab.className='done-box';
    lab.innerHTML='<input type="checkbox"> Marcar este capítulo como concluído';
    var cb=lab.firstChild;cb.checked=!!state.done[ch.id];
    cb.onchange=function(){if(cb.checked)state.done[ch.id]=1;else delete state.done[ch.id];save();renderProgress();};
    ch.appendChild(lab);
  });
  function renderProgress(){
    var n=chapters.length,d=chapters.filter(function(c){return state.done[c.id]}).length;
    chapters.forEach(function(c){
      var a=nav&&nav.querySelector('a[href="#'+c.id+'"]');if(!a)return;
      var m=a.querySelector('.ok-mark');if(state.done[c.id]){if(!m){m=document.createElement('span');m.className='ok-mark';m.textContent='✓';m.setAttribute('aria-label','concluído');a.appendChild(m);}}else if(m)m.remove();
    });
    if(!panel||!sb)return;
    var rows=chapters.map(function(c){var q=state.quiz[c.id];return '<li>'+(state.done[c.id]?'✅':'⬜')+' Cap. '+chNum(c.id)+(q?' · quiz '+q.h+'/'+q.t:'')+'</li>'}).join('');
    panel.innerHTML='<details><summary>📈 Meu progresso: '+d+' de '+n+'</summary><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="'+n+'" aria-valuenow="'+d+'" aria-label="Capítulos concluídos"><i style="width:'+(n?d/n*100:0)+'%"></i></div><ul>'+rows+'</ul><button type="button" class="reset-prog">Zerar progresso</button><small>Salvo apenas neste navegador.</small></details>';
    panel.querySelector('.reset-prog').onclick=function(){if(confirm('Apagar o progresso salvo neste navegador?')){state={done:{},quiz:{}};save();
      [].forEach.call(document.querySelectorAll('.done-box input'),function(i){i.checked=false});renderProgress();}};
  }
  if(sb){var tools=sb.querySelector('.tools');panel=document.createElement('div');panel.className='prog-panel';if(tools)sb.insertBefore(panel,tools);else sb.appendChild(panel);}
  renderProgress();

  // --- Menu, barra de leitura, voltar ao topo, item ativo ---
  var mb=document.getElementById('menuBtn');
  if(sb&&mb){
    mb.setAttribute('aria-expanded','false');mb.setAttribute('aria-controls','sidebar');
    mb.onclick=function(){sb.classList.toggle('open');mb.setAttribute('aria-expanded',sb.classList.contains('open'))};
    [].forEach.call(sb.querySelectorAll('a'),function(a){a.addEventListener('click',function(){sb.classList.remove('open');mb.setAttribute('aria-expanded','false')})});
  }
  var prog=document.getElementById('progress'),topb=document.getElementById('top');
  window.addEventListener('scroll',function(){
    var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
    prog.style.width=p+'%';prog.setAttribute('aria-valuenow',Math.round(p));topb.style.display=h.scrollTop>600?'block':'none';
  });
  topb.onclick=function(){window.scrollTo({top:0})};
  if(sb){
    var links=[].slice.call(sb.querySelectorAll('.nav > a'));
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){var on=l.getAttribute('href')==='#'+e.target.id;l.classList.toggle('on',on);if(on)l.setAttribute('aria-current','true');else l.removeAttribute('aria-current')})}})},{rootMargin:'-20% 0px -70% 0px'});
    document.querySelectorAll('header.hero, section[id]').forEach(function(s){io.observe(s)});
  }

  // --- Modo escuro ---
  (function(){
    var b=document.getElementById('themeBtn'),h=document.documentElement;
    function lab(){var d=h.dataset.theme==='dark';b.textContent=d?'☀️':'🌙';b.title=b.ariaLabel=d?'Mudar para o modo claro':'Mudar para o modo escuro';b.setAttribute('aria-label',b.title);}
    b.onclick=function(){h.dataset.theme=h.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('tema',h.dataset.theme)}catch(e){}lab();};
    lab();
  })();

  // --- Gabarito no PDF ---
  var ans=document.getElementById('ans');
  if(ans){
    ans.onchange=function(){body.classList.toggle('print-answers',ans.checked)};
    window.addEventListener('beforeprint',function(){body.classList.toggle('print-answers',ans.checked)});
  }

  // --- Modo offline (service worker) ---
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){
    window.addEventListener('load',function(){navigator.serviceWorker.register(ROOT+'sw.js').catch(function(){})});
  }
})();
