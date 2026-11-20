/* Ferramentas interativas da apostila de Introdução à Programação com Python */
(function(){
  'use strict';
  function $(id){return document.getElementById(id)}
  // Botão "Executar" (Python Tutor) nos blocos de código Python
  [].forEach.call(document.querySelectorAll('pre.py'),function(pre){
    if(pre.classList.contains('nr'))return;
    var code=pre.querySelector('code');if(!code)return;
    var txt=code.textContent.trim();
    var a=document.createElement('a');a.className='pyrun';a.target='_blank';a.rel='noopener noreferrer';a.textContent='▶ Executar';
    a.title='Abre o Python Tutor e mostra o programa passo a passo';
    a.href='https://pythontutor.com/render.html#code='+encodeURIComponent(txt)+'&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false';
    pre.insertBefore(a,pre.querySelector('.cp'));
  });

  // --- Cap. 1: plano de estudos ---
  (function(){
    var m=$('twMin');if(!m)return;var d=$('twDays');
    function r(){
      var mi=+m.value,di=+d.value,h=mi*di/60;
      $('twMv').textContent=mi;$('twDv').textContent=di;
      $('twFill').style.width=Math.min(100,h/10*100)+'%';
      var msg='Em 1 semana: <b>'+h.toFixed(1).replace('.',',')+' h</b>. Em 8 semanas: <b>'+(h*8).toFixed(0)+' h</b>. ';
      if(di<=2)msg+='<span class="ok-n">Poucos dias.</span> Tente estudar em mais dias, mesmo que por menos tempo: o cérebro precisa de repetição.';
      else if(mi>90)msg+='<span class="ok-n">Sessões longas cansam.</span> Divida em duas partes, com pausa no meio.';
      else if(mi>=25&&di>=4)msg+='<span class="ok-y">Ótimo plano!</span> É curto e frequente, o jeito que funciona.';
      else msg+='Bom começo. Se puder, chegue a <b>30 minutos em 4 ou 5 dias</b>.';
      $('twTxt').innerHTML=msg;
    }
    m.oninput=r;d.oninput=r;r();
  })();

  // --- Cap. 1: mito ou verdade ---
  (function(){
    var q=$('mtQ');if(!q)return;
    var Q=[['Só aprende a programar quem é muito bom em matemática.',false,'Mito. O que mais conta é vontade e prática.'],
      ['Errar muito no começo é normal.',true,'Verdade. Os melhores programadores sabem interpretar e corrigir erros.'],
      ['Ler bastante sem digitar o código é suficiente.',false,'Mito. Programação se aprende colocando a mão na massa.'],
      ['Estudar 30 minutos por dia pode render mais que 5 horas em um dia só.',true,'Verdade. A repetição espaçada ajuda o cérebro a fixar.'],
      ['O computador entende o que você quis dizer, mesmo que o código esteja errado.',false,'Mito. O computador faz exatamente o que você manda.'],
      ['Se aparecer uma mensagem de erro, é sinal de que você não serve para programar.',false,'Mito. Mensagem de erro é pista, não punição.'],
      ['Sentir-se perdido no começo acontece com muita gente.',true,'Verdade. Todo especialista já foi iniciante.']],cur,ok=0,tot=0;
    function next(){var i;do{i=Math.floor(Math.random()*Q.length)}while(Q[i]===cur);cur=Q[i];q.textContent=cur[0]}
    function ans(v){tot++;var c=v===cur[1];if(c)ok++;$('mtTxt').innerHTML=(c?'<span class="ok-y">✔ Certo!</span> ':'<span class="ok-n">✘ Quase!</span> ')+cur[2]+' Acertos: '+ok+' de '+tot+'.';next()}
    $('mtV').onclick=function(){ans(true)};$('mtM').onclick=function(){ans(false)};next();
  })();

  // --- Cap. 2: mini-interpretador ---
  (function(){
    var O=$('rpO');if(!O)return;var I=$('rpI'),V=$('rpV'),env={};
    function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function num(v,f){return {t:f?'float':'int',v:v}}
    function fmt(x){if(x.t==='str')return x.v;if(x.t==='float'){var s=String(x.v);if(isFinite(x.v)&&/^-?\d+$/.test(s))s+='.0';return s.replace('Infinity','inf')}return String(x.v)}
    function rep(x){return x.t==='str'?"'"+x.v+"'":fmt(x)}
    function err(n,m){var e=new Error(m);e.py=n;throw e}
    function tok(s){var r=[],i=0,m,re=/\s*(?:(\d+\.?\d*|\.\d+)|([A-Za-z_À-ÿ][\wÀ-ÿ]*)|("[^"]*"|'[^']*')|(\*\*|\/\/|[-+*\/%()=,]))/y;
      while(i<s.length){if(/^\s*$/.test(s.slice(i)))break;re.lastIndex=i;m=re.exec(s);if(!m)err('SyntaxError','invalid syntax');i=re.lastIndex;
        if(m[1]!==undefined)r.push({k:'n',v:m[1]});else if(m[2])r.push({k:'id',v:m[2]});else if(m[3])r.push({k:'s',v:m[3].slice(1,-1)});else r.push({k:'op',v:m[4]})}
      return r}
    function run(src){
      var T=tok(src),p=0;
      function pk(){return T[p]}function ok(v){return T[p]&&T[p].k==='op'&&T[p].v===v}
      function ex(v){if(!ok(v))err('SyntaxError','invalid syntax');p++}
      function bin(a,o,b){
        if(a.t==='str'||b.t==='str'){
          if(o==='+'){if(a.t==='str'&&b.t==='str')return {t:'str',v:a.v+b.v};err('TypeError','can only concatenate str (not "'+(a.t==='str'?(b.t==='int'?'int':'float'):'str')+'") to str')}
          if(o==='*'){var s=a.t==='str'?a:b,n=a.t==='str'?b:a;if(n.t==='int')return {t:'str',v:n.v>0?s.v.repeat(n.v):''}}
          err('TypeError',"unsupported operand type(s) for "+o)}
        var f=a.t==='float'||b.t==='float',x=a.v,y=b.v;
        if(o==='+')return num(x+y,f);if(o==='-')return num(x-y,f);if(o==='*')return num(x*y,f);
        if(o==='**'){if(!f&&y<0)return num(Math.pow(x,y),true);return num(Math.pow(x,y),f)}
        if(y===0)err('ZeroDivisionError',o==='/'?'division by zero':(o==='%'?'modulo by zero':'integer division or modulo by zero'));
        if(o==='/')return num(x/y,true);if(o==='//')return num(Math.floor(x/y),f);
        return num(x-y*Math.floor(x/y),f)}
      function atom(){var t=pk();if(!t)err('SyntaxError','invalid syntax');
        if(t.k==='n'){p++;return /[.]/.test(t.v)?num(parseFloat(t.v),true):num(parseInt(t.v,10),false)}
        if(t.k==='s'){p++;return {t:'str',v:t.v}}
        if(t.k==='id'){p++;
          if(ok('(')){p++;var a=[];if(!ok(')')){a.push(add());while(ok(',')){p++;a.push(add())}}ex(')');
            if(t.v==='print'){return {t:'print',v:a.map(fmt).join(' ')}}
            err('NameError',"name '"+t.v+"' is not defined")}
          if(!(t.v in env))err('NameError',"name '"+t.v+"' is not defined");return env[t.v]}
        if(ok('(')){p++;var v=add();ex(')');return v}
        err('SyntaxError','invalid syntax')}
      function pw(){var a=atom();if(ok('**')){p++;return bin(a,'**',un())}return a}
      function un(){if(ok('-')){p++;var a=un();return a.t==='str'?err('TypeError','bad operand type for unary -'):num(-a.v,a.t==='float')}if(ok('+')){p++;return un()}return pw()}
      function mul(){var a=un();while(ok('*')||ok('/')||ok('//')||ok('%')){var o=T[p++].v;a=bin(a,o,un())}return a}
      function add(){var a=mul();while(ok('+')||ok('-')){var o=T[p++].v;a=bin(a,o,mul())}return a}
      if(!T.length)return null;
      if(T.length>1&&T[0].k==='id'&&T[1].k==='op'&&T[1].v==='='){p=2;var v=add();if(p<T.length)err('SyntaxError','invalid syntax');env[T[0].v]=v;return null}
      var r=add();if(p<T.length)err('SyntaxError','invalid syntax');return r}
    function shelf(){var k=Object.keys(env);V.innerHTML=k.length?'<em>Variáveis:</em>'+k.map(function(n){return '<span>'+esc(n)+' = '+esc(rep(env[n]))+'</span>'}).join(''):'<em>Nenhuma variável ainda. Experimente <code>a = 2</code>.</em>'}
    function line(h,c){var d=document.createElement('div');if(c)d.className=c;d.innerHTML=h;O.appendChild(d);O.scrollTop=O.scrollHeight}
    function go(src){
      line('<span class="c">&gt;&gt;&gt;</span> '+esc(src));
      try{var r=run(src);if(r){if(r.t==='print')line(esc(r.v));else line(esc(rep(r)))}}
      catch(e){if(e.py)line('<span class="e">'+e.py+': '+esc(e.message)+'</span>');else line('<span class="e">SyntaxError: invalid syntax</span>')}
      shelf()}
    I.onkeydown=function(e){if(e.key==='Enter'){var s=I.value;I.value='';go(s)}};
    $('rpC').onclick=function(){O.innerHTML='';env={};shelf();I.focus()};
    var S=['2 + 3 * 4','(2 + 3) * 4','7 / 2','7 // 2','7 % 2','2 ** 10','a = 5','a * 3','print("Oi, mundo!")','"ha" * 3','10 / 0'],sg=$('rpS');
    S.forEach(function(s){var b=document.createElement('button');b.type='button';b.className='alt';b.textContent=s;b.onclick=function(){go(s)};sg.appendChild(b)});
    line('<span class="o">Python (faz de conta). Digite um comando e aperte Enter.</span>');shelf();
  })();

  // --- Cap. 2: desafio da precedência ---
  (function(){
    var q=$('pcQ');if(!q)return;var cur;
    var L=[['2 + 3 * 4',14],['(2 + 3) * 4',20],['10 - 2 * 3',4],['2 ** 3 * 2',16],['2 * 3 ** 2',18],['20 / 4 + 1',6],['(1 + 2) ** 2',9],['10 % 4 + 1',3],['100 - 10 * 2 ** 2',60],['(8 - 2) * (1 + 1)',12],['2 + 6 / 2',5],['3 * 2 ** 2 - 1',11]];
    function next(){var i;do{i=Math.floor(Math.random()*L.length)}while(L[i]===cur);cur=L[i];q.textContent=cur[0];$('pcA').value='';$('pcT').innerHTML=''}
    function ck(){var a=parseFloat(String($('pcA').value).replace(',','.'));if(isNaN(a)){$('pcT').innerHTML='Digite um número.';return}
      $('pcT').innerHTML=a===cur[1]?'<span class="ok-y">✔ Certo!</span> Resultado: '+cur[1]+'.':'<span class="ok-n">✘ Quase!</span> Lembre: primeiro <code>**</code>, depois <code>* / %</code>, depois <code>+ -</code>. O resultado é '+cur[1]+' (em Python viria como '+(/[\/]/.test(cur[0])?cur[1]+'.0':cur[1])+').'}
    $('pcB').onclick=ck;$('pcN').onclick=next;$('pcA').onkeydown=function(e){if(e.key==='Enter')ck()};next();
  })();

})();
