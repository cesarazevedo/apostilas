/* Ferramentas interativas da apostila de Introdução à Programação com Python */
(function(){
  'use strict';
  function $(id){return document.getElementById(id)}
  // Botão "Executar" (Python Tutor) nos blocos de código Python
  [].forEach.call(document.querySelectorAll('pre.py'),function(pre){
    if(pre.classList.contains('nr'))return;
    var code=pre.querySelector('code');if(!code)return;
    var cl=code.cloneNode(true);[].forEach.call(cl.querySelectorAll('.output,.user-input,.error'),function(x){x.parentNode.removeChild(x)});
    var txt=cl.textContent.split('\n').map(function(l){return l.replace(/^(>>>|\.\.\.) ?/,'')}).join('\n').trim();
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

  // --- Cap. 3: rastreamento ---
  (function(){
    var c=$('stCode');if(!c)return;
    var L=['divida = 0','compra = 100','divida = divida + compra','compra = 200','divida = divida + compra','compra = 300','divida = divida + compra','compra = 0','print(divida)'];
    var i=0,env={},tela='';
    function show(){
      c.innerHTML=L.map(function(t,k){return '<span style="display:block;padding:0 6px;border-radius:4px;'+(k===i-1?'background:rgba(239,108,0,.25)':'')+'">'+(k+1)+'  '+t+'</span>'}).join('');
      var ks=Object.keys(env);
      $('stV').innerHTML=ks.length?'<em>Variáveis:</em>'+ks.map(function(n){return '<span>'+n+' = '+env[n]+'</span>'}).join('')+(tela?'<span>Tela: '+tela+'</span>':''):'<em>Nada executado ainda.</em>';
      $('stT').innerHTML=i>=L.length?'<span class="ok-y">Fim!</span> A tela mostrou '+tela+'.':(i?'Executada a linha '+i+'.':'');
    }
    function step(){
      if(i>=L.length)return;var t=L[i];i++;
      if(t==='divida = 0')env.divida=0;
      else if(/^compra = /.test(t))env.compra=+t.split('= ')[1];
      else if(/divida \+ compra/.test(t))env.divida=env.divida+env.compra;
      else tela=env.divida;
      show();
    }
    $('stN').onclick=step;$('stR').onclick=function(){i=0;env={};tela='';show()};show();
  })();

  // --- Cap. 3: lógica ao vivo ---
  (function(){
    var o=$('lgO');if(!o)return;var A=true,B=true;
    function f(v){return v?'True':'False'}
    function r(){
      $('lgA').textContent='A = '+f(A);$('lgB').textContent='B = '+f(B);
      o.innerHTML=['not A|'+f(!A),'not B|'+f(!B),'A and B|'+f(A&&B),'A or B|'+f(A||B),'not A or B|'+f(!A||B)].map(function(s){var p=s.split('|');return '<span>'+p[0]+' → <b>'+p[1]+'</b></span>'}).join('');
    }
    $('lgA').onclick=function(){A=!A;r()};$('lgB').onclick=function(){B=!B;r()};r();
  })();

  // --- Cap. 3: fatiador de strings ---
  (function(){
    var s=$('slS');if(!s)return;var a=$('slA'),b=$('slB');
    function esc(x){return x.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function r(){
      var t=s.value,n=t.length,x=parseInt(a.value,10),y=parseInt(b.value,10);
      if(isNaN(x))x=0;if(isNaN(y))y=n;
      var st=x<0?Math.max(0,n+x):Math.min(x,n),en=y<0?Math.max(0,n+y):Math.min(y,n);
      $('slV').innerHTML=t.split('').map(function(ch,k){var on=k>=st&&k<en;return '<span style="'+(on?'background:#ef6c00;color:#fff;border-color:#ef6c00':'')+'">'+esc(ch)+'<sub style="font-size:10px"> '+k+'</sub></span>'}).join('');
      var res=en>st?t.slice(st,en):'';
      $('slT').innerHTML='<code>s['+x+':'+y+']</code> → <b>'+(res?"'"+esc(res)+"'":"'' (vazio)")+'</b>';
    }
    s.oninput=r;a.oninput=r;b.oninput=r;r();
  })();

  // --- Cap. 4: caminhos do if ---
  (function(){
    var m=$('tfM');if(!m)return;
    var L=['if minutos &lt; 200:','    preço = 0.20','elif minutos &lt; 400:','    preço = 0.18','else:','    preço = 0.15'];
    function r(){
      var v=+m.value,k=v<200?0:(v<400?1:2),pr=[0.20,0.18,0.15][k];
      $('tfV').textContent=v;
      $('tfC').innerHTML=L.map(function(t,i){var on=Math.floor(i/2)===k;return '<span style="display:block;padding:0 6px;border-radius:4px;'+(on?'background:rgba(239,108,0,.25)':'opacity:.45')+'">'+t+'</span>'}).join('');
      $('tfT').innerHTML='Com <b>'+v+'</b> minutos, o preço é <b>R$ '+pr.toFixed(2).replace('.',',')+'</b> por minuto. Total: <b>R$ '+(v*pr).toFixed(2).replace('.',',')+'</b>.';
    }
    m.oninput=r;r();
  })();

  // --- Cap. 4: imposto por faixas ---
  (function(){
    var s=$('irS');if(!s)return;
    function f(x){return 'R$ '+x.toFixed(2).replace('.',',')}
    function r(){
      var v=+s.value,a=Math.max(0,Math.min(v,3000)-1000)*0.2,b=Math.max(0,v-3000)*0.35;
      $('irV').textContent=v;
      $('irT').innerHTML='Faixa de 20%: <b>'+f(a)+'</b><br>Faixa de 35%: <b>'+f(b)+'</b><br>Imposto total: <b>'+f(a+b)+'</b>';
    }
    s.oninput=r;r();
  })();

  // --- Cap. 5: while passo a passo ---
  (function(){
    var c=$('wlC');if(!c)return;var fe=$('wlF');
    var L=['x = 1','while x &lt;= fim:','    print(x)','    x = x + 1'];
    var x,ph,tela,msg;
    function reset(){x=null;ph=0;tela=[];msg='';draw()}
    function draw(){
      var act=ph===0?-1:({1:0,2:1,3:2,4:3,5:1,6:-2})[ph];
      c.innerHTML=L.map(function(t,i){return '<span style="display:block;padding:0 6px;border-radius:4px;'+(i===act?'background:rgba(239,108,0,.25)':'')+'">'+t+'</span>'}).join('');
      $('wlFv').textContent=fe.value;
      $('wlV').innerHTML='<em>Variáveis:</em><span>fim = '+fe.value+'</span>'+(x===null?'':'<span>x = '+x+'</span>')+'<span>Tela: '+(tela.join(' ')||'(vazia)')+'</span>';
      $('wlT').innerHTML=msg;
    }
    function step(){
      var fim=+fe.value;
      if(ph===0){x=1;ph=1;msg='x começa valendo 1.'}
      else if(ph===1||ph===5){var ok=x<=fim;msg='Teste: '+x+' &lt;= '+fim+' é <b>'+(ok?'True':'False')+'</b>.';if(ok)ph=2;else{ph=6;msg+=' O laço termina.'}}
      else if(ph===2){tela.push(x);msg='print('+x+')';ph=3}
      else if(ph===3){x=x+1;msg='x agora vale '+x+'.';ph=5}
      draw();
    }
    $('wlN').onclick=step;$('wlR').onclick=reset;fe.oninput=reset;reset();
  })();

  // --- Cap. 5: laços aninhados ---
  (function(){
    var o=$('nsO');if(!o)return;var a,b,n;
    function reset(){a=1;b=0;n=0;o.innerHTML='<span class="c">Aperte “Próximo”.</span>';info()}
    function info(){$('nsV').innerHTML='<span>tabuada = '+a+'</span><span>número = '+(b||'-')+'</span><span>vezes que o bloco interno rodou: '+n+'</span>'}
    function step(){
      if(a>3){return}
      if(b===0)o.innerHTML='';
      b++;n++;
      var d=document.createElement('div');d.textContent=a+' x '+b+' = '+(a*b);o.appendChild(d);
      if(b===4){var e=document.createElement('div');e.className='c';e.textContent='— fim da tabuada do '+a+'; o número volta a 1 —';o.appendChild(e);a++;b=0}
      o.scrollTop=o.scrollHeight;
      if(a>3){var f=document.createElement('div');f.className='o';f.textContent='Fim: 3 tabuadas × 4 números = 12 linhas.';o.appendChild(f)}
      info();
    }
    $('nsN').onclick=step;$('nsR').onclick=reset;reset();
  })();

  // --- Cap. 5: cédulas ---
  (function(){
    var v=$('cdV');if(!v)return;
    function r(){
      var n=parseInt(v.value,10);if(isNaN(n)||n<0){$('cdT').textContent='Digite um número inteiro, zero ou maior.';return}
      var rest=n,out=[];[50,20,10,5,1].forEach(function(c){var q=Math.floor(rest/c);rest-=q*c;if(q)out.push('<b>'+q+'</b> cédula(s) de R$ '+c)});
      $('cdT').innerHTML=out.length?out.join('<br>'):'Nenhuma cédula (valor zero).';
    }
    v.oninput=r;r();
  })();

  // --- Cap. 6: laboratório de listas ---
  (function(){
    var o=$('lsL');if(!o)return;var L;
    function r(msg){
      o.innerHTML=L.length?L.map(function(v,i){return '<span>'+v+'<sub style="font-size:10px"> '+i+'</sub></span>'}).join(''):'<em>Lista vazia: []</em>';
      $('lsT').innerHTML='<code>L = ['+L.join(', ')+']</code> &nbsp; <code>len(L)</code> = <b>'+L.length+'</b>'+(msg?'<br>'+msg:'');
    }
    function reset(){L=[15,8,9];r('')}
    document.querySelectorAll('#ls button[data-o]').forEach(function(b){b.onclick=function(){
      var k=b.dataset.o,v=parseInt($('lsV').value,10);if(isNaN(v))v=0;var m='';
      if(k==='rst')return reset();
      if(k==='app'){L.push(v);m='append('+v+')'}
      else if(k==='ins'){L.unshift(v);m='insert(0, '+v+')'}
      else if(k==='pop'||k==='pop0'){if(!L.length){m='<span class="ok-n">IndexError: pop from empty list</span>'}else{var x=k==='pop'?L.pop():L.shift();m='retirou <b>'+x+'</b> ('+(k==='pop'?'como pilha: sai o último':'como fila: sai o primeiro')+')'}}
      else if(k==='rev'){L.reverse();m='reverse()'}
      else if(k==='srt'){L.sort(function(a,b){return a-b});m='sort()'}
      r(m)}});
    reset();
  })();

  // --- Cap. 6: ordenação da bolha ---
  (function(){
    var o=$('bbL');if(!o)return;var L,p,j,hi,done;
    function draw(){
      o.innerHTML=L.map(function(v,i){var on=!done&&(i===hi||i===hi+1);return '<span style="'+(on?'background:#ef6c00;color:#fff;border-color:#ef6c00':'')+'">'+v+'</span>'}).join('');
    }
    function reset(){L=[];while(L.length<6)L.push(1+Math.floor(Math.random()*9));p=0;j=0;hi=-5;done=false;$('bbT').innerHTML='Lista embaralhada. Aperte o botão.';draw()}
    function step(){
      if(done)return;var n=L.length;
      hi=j;var m='Comparando <b>'+L[j]+'</b> com <b>'+L[j+1]+'</b>: ';
      if(L[j]>L[j+1]){var t=L[j];L[j]=L[j+1];L[j+1]=t;m+='estão fora de ordem, <b>trocou</b>.'}else m+='já estão em ordem.';
      j++;if(j>=n-1-p){j=0;p++;if(p>=n-1){done=true;m='<span class="ok-y">Pronto!</span> A lista está ordenada.'}}
      $('bbT').innerHTML=m;draw();
    }
    $('bbN').onclick=step;$('bbR').onclick=reset;reset();
  })();

  // --- Cap. 7: laboratório de strings ---
  (function(){
    var sel=$('smM');if(!sel)return;
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function rp(x){if(typeof x==='boolean')return x?'True':'False';if(Array.isArray(x))return '['+x.map(rp).join(', ')+']';if(typeof x==='string')return "'"+x+"'";return String(x)}
    var M={'upper()':[0,function(s){return s.toUpperCase()}],'lower()':[0,function(s){return s.toLowerCase()}],'strip()':[0,function(s){return s.trim()}],'len(s)':[0,function(s){return s.length}],
      'split()':[0,function(s){return s.split(/\s+/).filter(Boolean)}],'split(a)':[1,function(s,a){return a?s.split(a):null}],
      'count(a)':[1,function(s,a){if(!a)return s.length+1;return s.split(a).length-1}],'find(a)':[1,function(s,a){return s.indexOf(a)}],
      'startswith(a)':[1,function(s,a){return s.indexOf(a)===0}],'endswith(a)':[1,function(s,a){return a===''||s.slice(-a.length)===a}],
      'a in s':[1,function(s,a){return s.indexOf(a)>=0}],'replace(a, b)':[2,function(s,a,b){return a?s.split(a).join(b):null}],
      'isdigit()':[0,function(s){return /^[0-9]+$/.test(s)}],'isalpha()':[0,function(s){return /^[A-Za-zÀ-ÿ]+$/.test(s)}]};
    Object.keys(M).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=k;sel.appendChild(o)});
    function r(){
      var k=sel.value,m=M[k],s=$('smS').value,a=$('smA').value,b=$('smB').value;
      $('smA').style.display=m[0]>=1?'':'none';$('smB').style.display=m[0]>=2?'':'none';
      var res=m[1](s,a,b),call;
      if(k==='len(s)')call='len(s)';else if(k==='a in s')call=rp(a)+' in s';else call='s.'+k.replace('(a, b)','('+rp(a)+', '+rp(b)+')').replace('(a)','('+rp(a)+')');
      $('smO').innerHTML='<span class="c">s = '+esc(rp(s))+'</span><br><span class="c">&gt;&gt;&gt;</span> '+esc(call)+'<br>'+(res===null?'<span class="e">ValueError: empty separator</span>':esc(rp(res)));
    }
    sel.onchange=r;$('smS').oninput=r;$('smA').oninput=r;$('smB').oninput=r;r();
  })();

  // --- Cap. 7: format ---
  (function(){
    var t=$('fmT');if(!t)return;
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function r(){
      var s=t.value,f=$('fmF').value||' ',a=$('fmA').value,w=+$('fmW').value,n=Math.max(0,w-s.length),L,R;
      if(a==='<'){L=0;R=n}else if(a==='>'){L=n;R=0}else{L=Math.floor(n/2);R=n-L}
      $('fmWv').textContent=w;
      var spec=(f===' '?'':f)+a+w,res=f.repeat(L)+s+f.repeat(R);
      $('fmO').innerHTML='<span class="c">&gt;&gt;&gt;</span> "{0:'+esc(spec)+'}".format("'+esc(s)+'")<br>'+esc("'"+res+"'");
    }
    ['fmT','fmF','fmA','fmW'].forEach(function(i){$(i).oninput=r;$(i).onchange=r});r();
  })();

  // --- Cap. 7: mini forca ---
  (function(){
    var P=$('fcP');if(!P)return;var W=['python','variavel','funcao','algoritmo','lista','indice','string','laco'],w,ac,er,fim,K=$('fcK');
    var boneco=['','O','O|','O|\\','O|\\/','O|\\/ ,','O|\\/ ,,'];
    function draw(){
      P.textContent=w.split('').map(function(c){return ac.indexOf(c)>=0||fim==='lose'?c:'.'}).join(' ');
      var t='Erros: <b>'+er+'</b> de 6';
      if(fim==='win')t='<span class="ok-y">Você acertou!</span>';
      if(fim==='lose')t='<span class="ok-n">Enforcado!</span> A palavra era <b>'+w+'</b>.';
      $('fcT').innerHTML=t;
      K.querySelectorAll('button').forEach(function(b){b.disabled=!!fim||b.dataset.u==='1'});
    }
    function reset(){w=W[Math.floor(Math.random()*W.length)];ac=[];er=0;fim='';
      K.innerHTML='';'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(c){var b=document.createElement('button');b.type='button';b.className='alt';b.textContent=c;b.onclick=function(){
        b.dataset.u='1';if(w.indexOf(c)>=0){ac.push(c);if(w.split('').every(function(x){return ac.indexOf(x)>=0}))fim='win'}else{er++;if(er>=6)fim='lose'}draw()};K.appendChild(b)});
      draw()}
    $('fcR').onclick=reset;reset();
  })();

  // --- Cap. 8: pilha de chamadas ---
  (function(){
    var s=$('faS');if(!s)return;var n,ev,k;
    function build(){
      n=+$('faN').value;$('faV').textContent=n;ev=[];var i,val={};
      for(i=n;i>=1;i--)ev.push({st:n-i+1,t:'Chamou <code>fatorial('+i+')</code>.'});
      val[1]=1;ev.push({st:n,t:'Caso base: <code>fatorial(1)</code> devolve <b>1</b>.',pop:1});
      for(i=2;i<=n;i++){val[i]=i*val[i-1];ev.push({st:n-i+1,t:'<code>fatorial('+i+')</code> devolve '+i+' × '+val[i-1]+' = <b>'+val[i]+'</b>.',pop:i})}
      k=0;draw();
    }
    function draw(){
      var cur=k?ev[k-1]:null,depth=cur?cur.st:0,h='';
      for(var d=1;d<=depth;d++){var f=n-d+1;h+='<span>fatorial('+f+')</span>'}
      s.innerHTML=h||'<em>Pilha vazia.</em>';
      $('faT').innerHTML=cur?cur.t+(k===ev.length?' <span class="ok-y">Fim!</span>':''):'Aperte o botão para começar.';
    }
    function step(){if(k<ev.length){k++;draw()}}
    $('faB').onclick=step;$('faR').onclick=build;$('faN').oninput=build;build();
  })();

  // --- Cap. 8: custo do Fibonacci ---
  (function(){
    var r=$('fbN');if(!r)return;
    function go(){
      var n=+r.value,a=1,b=1,c,i;for(i=2;i<=n;i++){c=1+a+b;a=b;b=c}
      var calls=n<=1?1:b;$('fbV').textContent=n;
      $('fbT').innerHTML='<code>fibonacci('+n+')</code> faz <b>'+calls.toLocaleString('pt-BR')+'</b> chamadas.'+(calls>1e6?' <span class="ok-n">Isso já pesa!</span> Existem jeitos melhores de calcular.':'');
    }
    r.oninput=go;go();
  })();

  // --- Cap. 8: sorteador ---
  (function(){
    var g=$('ddG');if(!g)return;
    g.onclick=function(){
      var a=parseInt($('ddA').value,10),b=parseInt($('ddB').value,10);
      if(isNaN(a)||isNaN(b)||a>b){$('ddT').innerHTML='<span class="ok-n">ValueError:</span> a precisa ser menor ou igual a b.';return}
      var x=a+Math.floor(Math.random()*(b-a+1));
      $('ddT').innerHTML='<code>random.randint('+a+', '+b+')</code> → <b style="font-size:24px">'+x+'</b>';
    };
  })();

  // --- Cap. 9: arquivo de faz de conta ---
  (function(){
    var g=$('flG');if(!g)return;var O=$('flO');
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function rp(x){return "'"+x.replace(/\\/g,'\\\\').replace(/\n/g,'\\n')+"'"}
    g.onclick=function(){
      var m=$('flM').value,ex=$('flE').checked,c=$('flC'),t=$('flT').value.replace(/\\n/g,'\n'),h='<span class="c">&gt;&gt;&gt;</span> open("nomes.txt", "'+m+'")<br>';
      if(m==='r'){
        if(!ex)h+='<span class="e">FileNotFoundError: [Errno 2] No such file or directory: \'nomes.txt\'</span>';
        else h+='<span class="c">&gt;&gt;&gt;</span> f.read()<br>'+esc(rp(c.value))+'<br><span class="c">linhas:</span> '+esc(JSON.stringify(c.value.split('\n').filter(function(x,i,a){return x!==''||i<a.length-1})));
      }else if(m==='w'){
        h+=(ex?'<span class="o">Atenção: o conteúdo anterior foi apagado.</span><br>':'<span class="o">Arquivo criado.</span><br>')+'<span class="c">&gt;&gt;&gt;</span> f.write('+esc(rp(t))+')';
        c.value=t;$('flE').checked=true;
      }else{
        h+=(ex?'<span class="o">Conteúdo anterior mantido.</span><br>':'<span class="o">Arquivo criado.</span><br>')+'<span class="c">&gt;&gt;&gt;</span> f.write('+esc(rp(t))+')';
        c.value=(ex?c.value:'')+t;$('flE').checked=true;
      }
      O.innerHTML=h;
    };
    $('flE').onchange=function(){O.innerHTML='<span class="c">Escolha o modo e clique em Executar.</span>'};
    O.innerHTML='<span class="c">Escolha o modo e clique em Executar.</span>';
  })();

  // --- Cap. 9: leitor de CSV ---
  (function(){
    var t=$('cvT');if(!t)return;
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function r(){
      var d=$('cvD').value,rows=t.value.split('\n').filter(function(x){return x.trim()!==''}).map(function(l){return l.split(d)});
      if(!rows.length){$('cvTab').innerHTML='';$('cvR').textContent='';return}
      var w=rows[0].length;
      $('cvTab').innerHTML=rows.map(function(row,i){return '<tr>'+row.map(function(c){return (i?'<td>':'<th>')+esc(c)+(i?'</td>':'</th>')}).join('')+'</tr>'}).join('');
      if(w===1){$('cvR').innerHTML='<span class="ok-n">Só uma coluna!</span> Provavelmente o delimitador está errado para este arquivo.';return}
      var msg=[];
      for(var j=1;j<w;j++){var s=0,n=0;for(var i=1;i<rows.length;i++){var v=parseFloat((rows[i][j]||'').replace(',','.'));if(!isNaN(v)){s+=v;n++}}if(n)msg.push('média de <b>'+esc(rows[0][j])+'</b>: '+(s/n).toFixed(2))}
      $('cvR').innerHTML=rows.length-1+' linha(s) de dados, '+w+' colunas.'+(msg.length?'<br>'+msg.join(' · '):'');
    }
    t.oninput=r;$('cvD').onchange=r;r();
  })();

  // --- Cap. 10: duas contas ---
  (function(){
    var s=$('ocS');if(!s)return;var C,N=['ana','bruno'];
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function r(m){s.innerHTML=C.map(function(c,i){return '<span>'+N[i]+'.saldo = <b>'+c.toFixed(2).replace(/\.00$/,'')+'</b></span>'}).join('');$('ocT').innerHTML=m||''}
    function reset(){C=[100,0];r('Estado inicial: <code>ana = Conta("Ana", 100)</code> e <code>bruno = Conta("Bruno")</code>.')}
    [].forEach.call(document.querySelectorAll('#oc button[data-o]'),function(b){b.onclick=function(){
      var k=b.dataset.o;if(k==='rst')return reset();
      var q=+$('ocQ').value,v=parseFloat($('ocV').value);if(isNaN(v)||v<0){r('Digite um valor válido.');return}
      if(k==='dep'){C[q]+=v;r('<code>'+N[q]+'.depositar('+v+')</code>')}
      else if(v>C[q]){r('<code>'+N[q]+'.sacar('+v+')</code> → Saldo insuficiente!')}
      else{C[q]-=v;r('<code>'+N[q]+'.sacar('+v+')</code>')}}});
    reset();
  })();

  // --- Cap. 10: fábrica de objetos ---
  (function(){
    var L=$('pfL');if(!L)return;var O=[];
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function draw(){
      L.innerHTML=O.length?'':'<em>Nenhum objeto criado ainda.</em>';
      O.forEach(function(o,i){var b=document.createElement('span');b.innerHTML='pessoa'+(i+1)+'<br><small>nome: '+esc(o.n)+'<br>idade: '+o.i+'</small><br>';
        var k=document.createElement('button');k.type='button';k.className='alt';k.textContent='apresentar()';k.onclick=function(){$('pfT').innerHTML='<code>pessoa'+(i+1)+'.apresentar()</code> → Olá, eu sou '+esc(o.n)+' e tenho '+o.i+' anos.'};b.appendChild(k);L.appendChild(b)});
    }
    $('pfC').onclick=function(){var n=$('pfN').value.trim(),i=parseInt($('pfI').value,10);if(!n||isNaN(i)||i<0){$('pfT').textContent='Preencha o nome e a idade.';return}
      O.push({n:n,i:i});$('pfN').value='';$('pfI').value='';$('pfT').innerHTML='<code>pessoa'+O.length+' = Pessoa("'+esc(n)+'", '+i+')</code>';draw()};
    $('pfX').onclick=function(){O=[];$('pfT').textContent='';draw()};
    draw();
  })();

  // --- Cap. 11: laboratório de SQL ---
  (function(){
    var G=$('sqG');if(!G)return;var T,nid;
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function reset(){T=[{id:1,nome:'Ana',nota:8.5},{id:2,nome:'Bruno',nota:5},{id:3,nome:'Carla',nota:7},{id:4,nome:'Diego',nota:9.5}];nid=5}
    function err(m){var e=new Error(m);e.sql=1;throw e}
    function val(s){s=s.trim();var m=s.match(/^'(.*)'$/);if(m)return m[1];if(/^-?\d+(\.\d+)?$/.test(s))return parseFloat(s);err('valor inválido: '+s)}
    function col(c){c=c.trim().toLowerCase();if(['id','nome','nota'].indexOf(c)<0)err('no such column: '+c);return c}
    function cond(w){
      if(!w)return function(){return true};
      var P=w.split(/\s+and\s+/i).map(function(x){var m=x.trim().match(/^(\w+)\s*(>=|<=|!=|<>|=|>|<)\s*(.+)$/);if(!m)err('syntax error perto de "'+x.trim()+'"');var c=col(m[1]),o=m[2],v=val(m[3]);return function(r){var a=r[c];switch(o){case '=':return a===v;case '!=':case '<>':return a!==v;case '>':return a>v;case '<':return a<v;case '>=':return a>=v;default:return a<=v}}});
      return function(r){return P.every(function(f){return f(r)})};
    }
    function agg(c,rows){
      var m=c.trim().match(/^(count|avg|max|min|sum)\(\s*(\*|\w+)\s*\)$/i);if(!m)return null;
      var f=m[1].toLowerCase(),k=m[2]==='*'?null:col(m[2]),v=k?rows.map(function(r){return r[k]}):rows;
      if(f==='count')return v.length;if(!v.length)return null;
      if(f==='sum')return v.reduce(function(a,b){return a+b},0);if(f==='avg')return v.reduce(function(a,b){return a+b},0)/v.length;
      return f==='max'?Math.max.apply(null,v):Math.min.apply(null,v);
    }
    function run(sql){
      var s=sql.trim().replace(/;$/,''),m;
      if(m=s.match(/^select\s+(.+?)\s+from\s+alunos(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(\w+)(?:\s+(asc|desc))?)?$/i)){
        var rows=T.filter(cond(m[2]));
        if(m[3]){var k=col(m[3]),d=(m[4]||'').toLowerCase()==='desc'?-1:1;rows=rows.slice().sort(function(a,b){return a[k]<b[k]?-d:a[k]>b[k]?d:0})}
        var cs=m[1].split(','),res;
        if(agg(cs[0],rows)!==null||/\(/.test(cs[0])){res={cols:cs.map(function(c){return c.trim()}),rows:[cs.map(function(c){var v=agg(c,rows);if(v===null&&!/count/i.test(c))return 'NULL';return v})]}}
        else{var ks=m[1].trim()==='*'?['id','nome','nota']:cs.map(col);res={cols:ks,rows:rows.map(function(r){return ks.map(function(k){return r[k]})})}}
        return {res:res,msg:res.rows.length+' linha(s) no resultado.'};
      }
      if(m=s.match(/^insert\s+into\s+alunos\s*\(([^)]+)\)\s*values\s*\((.+)\)$/i)){
        var cs2=m[1].split(',').map(col),vs=(m[2].match(/'[^']*'|[^,]+/g)||[]).map(val);
        if(cs2.length!==vs.length)err(cs2.length+' colunas, mas '+vs.length+' valores');
        var r={id:nid++,nome:null,nota:null};cs2.forEach(function(c,i){if(c==='id')r.id=vs[i];else r[c]=vs[i]});
        if(r.nome===null)err('NOT NULL constraint failed: alunos.nome');T.push(r);return {msg:'1 linha inserida (id '+r.id+').'};
      }
      if(m=s.match(/^update\s+alunos\s+set\s+(\w+)\s*=\s*('[^']*'|[^\s]+)(?:\s+where\s+(.+))?$/i)){
        var c3=col(m[1]),v3=val(m[2]),f=cond(m[3]),n=0;T.forEach(function(r){if(f(r)){r[c3]=v3;n++}});return {msg:n+' linha(s) alterada(s).'+(m[3]?'':' (sem WHERE: todas as linhas!)')};
      }
      if(m=s.match(/^delete\s+from\s+alunos(?:\s+where\s+(.+))?$/i)){
        var f4=cond(m[1]),b=T.length;T=T.filter(function(r){return !f4(r)});return {msg:(b-T.length)+' linha(s) apagada(s).'+(m[1]?'':' (sem WHERE: todas as linhas!)')};
      }
      err('syntax error');
    }
    function table(c,rows){return '<tr>'+c.map(function(x){return '<th>'+esc(x)+'</th>'}).join('')+'</tr>'+rows.map(function(r){return '<tr>'+r.map(function(x){return '<td>'+esc(x)+'</td>'}).join('')+'</tr>'}).join('')}
    function show(){$('sqTab').innerHTML=table(['id','nome','nota'],T.map(function(r){return [r.id,r.nome,r.nota]}))}
    function go(){
      try{var o=run($('sqI').value);$('sqM').innerHTML='<span class="ok-y">✔</span> '+esc(o.msg);$('sqRes').innerHTML=o.res?table(o.res.cols,o.res.rows):''}
      catch(e){$('sqM').innerHTML='<span class="ok-n">✘ Erro:</span> '+esc(e.sql?e.message:'syntax error');$('sqRes').innerHTML=''}
      show();
    }
    var S=["SELECT * FROM alunos","SELECT nome FROM alunos WHERE nota >= 7","SELECT * FROM alunos ORDER BY nota DESC","SELECT AVG(nota), COUNT(*) FROM alunos","INSERT INTO alunos (nome, nota) VALUES ('Eva', 6.5)","UPDATE alunos SET nota = 6 WHERE nome = 'Bruno'","DELETE FROM alunos WHERE id = 2"],sg=$('sqS');
    S.forEach(function(q){var b=document.createElement('button');b.type='button';b.className='alt';b.style.fontSize='13px';b.textContent=q;b.onclick=function(){$('sqI').value=q;go()};sg.appendChild(b)});
    G.onclick=go;$('sqI').onkeydown=function(e){if(e.key==='Enter')go()};$('sqR').onclick=function(){reset();$('sqM').textContent='Tabela restaurada.';$('sqRes').innerHTML='';show()};
    reset();show();
  })();

  // --- Cap. 11: injeção de SQL ---
  (function(){
    var v=$('ijV');if(!v)return;
    function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
    function r(){
      var t=v.value,bad="SELECT * FROM alunos WHERE nome = '"+t+"'",inj=/'\s*or\s*'?1'?\s*=\s*'?1/i.test(t);
      var nb=inj?'<span class="e">TODOS os 4 alunos!</span>':(t==='Ana'?'1 aluno':'0 alunos');
      $('ijO').innerHTML='<span class="o">Juntando textos (errado):</span><br>'+esc(bad)+'<br>→ '+nb+'<br><br><span class="o">Com ? (certo):</span><br>cursor.execute("SELECT * FROM alunos WHERE nome = ?", ('+esc(JSON.stringify(t))+',))<br>→ '+(t==='Ana'?'1 aluno':'0 alunos (nenhum aluno tem esse nome exato)');
    }
    v.oninput=r;[].forEach.call(document.querySelectorAll('#ij [data-v]'),function(b){b.onclick=function(){v.value=b.dataset.v;r()}});r();
  })();

})();
