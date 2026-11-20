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

})();
