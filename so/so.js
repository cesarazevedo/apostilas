/* Ferramentas interativas da apostila de Sistemas Operacionais de Redes */
(function(){
  // --- Quantas VMs cabem? ---
  var host=document.getElementById('rcHost');
  if(host){
    var vm=document.getElementById('rcVm'),n=document.getElementById('rcN'),bar=document.getElementById('rcBar'),msg=document.getElementById('rcMsg');
    function rc(){
      var H=+host.value,V=+vm.value,N=Math.max(1,Math.min(20,+n.value||1)),used=V*N,reserve=Math.max(4,H*0.25),left=H-used,maxVm=Math.max(0,Math.floor((H-reserve)/V));
      var pct=Math.min(100,used/H*100),cls,txt;
      if(left>=reserve){cls=['#2e7d32','✅ <b>Confortável.</b> '];}
      else if(left>=2){cls=['#f9a825','⚠️ <b>Apertado.</b> O seu computador pode ficar lento. '];}
      else{cls=['#c62828','⛔ <b>Não cabe.</b> '];}
      bar.style.width=pct+'%';bar.style.background=cls[0];
      msg.innerHTML=cls[1]+N+' VM'+(N>1?'s':'')+' de '+V+' GB usam <b>'+used+' GB</b> dos '+H+' GB. '+(left>0?'Sobram <b>'+left+' GB</b> para o hospedeiro.':'Faltam <b>'+(-left)+' GB</b>.')+
        '<br>Pela regra prática (reservar '+reserve+' GB), cabem <b>'+maxVm+'</b> VM'+(maxVm===1?'':'s')+' de '+V+' GB.';
    }
    host.onchange=vm.onchange=n.oninput=rc;rc();
  }

  // --- Modos de rede do VirtualBox ---
  var modes=document.getElementById('nmModes');
  if(modes){
    var svg=document.getElementById('nmSvg'),txt=document.getElementById('nmTxt'),tab=document.getElementById('nmTab');
    var Y='<span class="ok-y">✅ Sim</span>',N='<span class="ok-n">⛔ Não</span>',W=function(t){return '<span class="ok-w">⚠️ '+t+'</span>'};
    var M=[
      {k:'NAT',d:'Cada VM sai para a Internet pelo endereço do hospedeiro, como se estivesse atrás de um roteador só dela. É o modo padrão do VirtualBox.',
       n:{vsw:0,nat:2,nic:0,host:0,inet:1},
       r:[Y,N,W('só a VM chega ao host (pelo 10.0.2.2); o host só chega à VM com redirecionamento de portas'),N+' (sem redirecionamento de portas)'],
       u:'Navegar e baixar pacotes em uma VM simples.'},
      {k:'Rede NAT',d:'Como o NAT, mas as VMs que usam a mesma “rede NAT” ficam no mesmo segmento e conversam entre si, além de acessar a Internet.',
       n:{vsw:1,nat:1,nic:0,host:0,inet:1},
       r:[Y,Y,W('o host só chega à VM com redirecionamento de portas'),N+' (sem redirecionamento de portas)'],
       u:'Laboratório com várias VMs que também precisam de Internet.'},
      {k:'Placa em ponte',d:'A placa da VM é ligada à placa física do hospedeiro. A VM recebe um IP da rede real e aparece nela como mais um computador.',
       n:{vsw:1,nat:0,nic:1,host:0,inet:1},
       r:[Y,Y,Y,Y],u:'Servidor de laboratório que outros computadores precisam acessar (site, domínio).'},
      {k:'Rede interna',d:'Um switch virtual isolado: só as VMs com o mesmo nome de rede conversam entre si. Nem o hospedeiro participa.',
       n:{vsw:1,nat:0,nic:0,host:0,inet:0},
       r:[N,Y,N,N],u:'Simular uma rede fechada (por exemplo, um domínio de testes).'},
      {k:'Somente hospedeiro',d:'Uma rede privada entre as VMs e o seu computador. Não há saída para a Internet.',
       n:{vsw:1,nat:0,nic:0,host:1,inet:0},
       r:[N,Y,Y,N],u:'Acessar uma VM só a partir do seu computador (servidor de teste).'}
    ];
    var rows=['VM → Internet','VM ↔ outra VM','VM ↔ hospedeiro (seu PC)','Outros PCs da rede → VM'];
    function box(x,y,w,h,label,f,s,dash){return '<rect x="'+(x-w/2)+'" y="'+(y-h/2)+'" width="'+w+'" height="'+h+'" rx="8" fill="'+f+'" stroke="'+s+'" stroke-width="2.5"'+(dash?' stroke-dasharray="6 4" opacity=".6"':'')+'/><text x="'+x+'" y="'+(y+5)+'" text-anchor="middle" font-size="14" font-weight="600">'+label+'</text>';}
    function line(a,b,c){return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+(c||'#546e7a')+'" stroke-width="3"/>';}
    function draw(m){
      var inet=[260,36],v1=[140,274],v2=[380,274],vsw=[260,222],mid=[260,150],n1=[140,214],n2=[380,214];
      var s='<rect width="520" height="330" rx="12" fill="#f8fafc"/><rect x="16" y="96" width="488" height="222" rx="14" fill="#eceff1" stroke="#90a4ae" stroke-width="2" stroke-dasharray="7 5"/><text x="30" y="118" font-size="13" fill="#546e7a" style="fill:#546e7a">Seu computador (hospedeiro)</text>';
      if(m.k==='NAT'){
        s+=line(v1,n1)+line(v2,n2)+line(n1,inet)+line(n2,inet);
        s+=box(inet[0],inet[1],220,40,'Internet / rede física','#e3f2fd','#1565c0')+box(n1[0],n1[1],70,32,'NAT','#e8f5e9','#2e7d32')+box(n2[0],n2[1],70,32,'NAT','#e8f5e9','#2e7d32');
      }else{
        if(m.n.vsw)s+=line(v1,vsw)+line(v2,vsw);
        if(m.k==='Rede NAT')s+=line(vsw,mid)+line(mid,inet);
        if(m.k==='Placa em ponte')s+=line(vsw,mid)+line(mid,inet);
        if(m.k==='Somente hospedeiro')s+=line(vsw,mid);
        s+=box(inet[0],inet[1],220,40,m.n.inet?'Internet / rede física':'Internet (sem acesso)','#e3f2fd','#1565c0',!m.n.inet);
        s+=box(vsw[0],vsw[1],150,34,'Switch virtual','#e8f5e9','#2e7d32');
        if(m.n.nat)s+=box(mid[0],mid[1],120,32,'NAT','#e8f5e9','#2e7d32');
        if(m.n.nic)s+=box(mid[0],mid[1],170,32,'Placa física do PC','#e8f5e9','#2e7d32');
        if(m.n.host)s+=box(mid[0],mid[1],190,32,'Hospedeiro (seu PC)','#fffde7','#b59f00');
      }
      s+=box(v1[0],v1[1],110,36,'VM 1','#fff3e0','#ef6c00')+box(v2[0],v2[1],110,36,'VM 2','#fff3e0','#ef6c00');
      svg.innerHTML=s;
    }
    var btns=[];
    function pick(i){
      btns.forEach(function(b,j){b.classList.toggle('on',i===j);b.setAttribute('aria-pressed',i===j)});
      var m=M[i];draw(m);
      txt.innerHTML='<b>'+m.k+':</b> '+m.d;
      tab.innerHTML=rows.map(function(r,j){return '<tr><td>'+r+'</td><td>'+m.r[j]+'</td></tr>'}).join('')+'<tr><td>Uso típico</td><td>'+m.u+'</td></tr>';
    }
    M.forEach(function(m,i){var b=document.createElement('button');b.type='button';b.textContent=m.k;b.onclick=function(){pick(i)};modes.appendChild(b);btns.push(b);});
    pick(0);
  }
  // --- Capítulo 2: GPO, permissões e escopo DHCP ---
  (function(){
    var gp=document.getElementById('gpOu');
    if(gp){
      var enf=document.getElementById('gpEnf'),out=document.getElementById('gpOut');
      var G={dom:{n:'Política do Domínio',s:{fundo:'logo da escola',usb:'⛔ bloqueado'}},alu:{n:'Política dos Alunos',s:{painel:'⛔ bloqueado'}},lab:{n:'Política do Laboratório',s:{usb:'✅ permitido'}}};
      var chain={prof:['dom'],alu:['dom','alu'],lab:['dom','alu','lab']};
      var names={fundo:'Fundo de tela',usb:'Uso de USB',painel:'Painel de Controle'};
      function gpRun(){
        var ids=chain[gp.value],val={},src={};
        ids.forEach(function(id){for(var k in G[id].s){val[k]=G[id].s[k];src[k]=G[id].n;}});
        if(enf.checked){for(var k in G.dom.s){val[k]=G.dom.s[k];src[k]=G.dom.n+' (imposta)';}}
        var h='<b>Políticas aplicadas, na ordem:</b> '+ids.map(function(i){return G[i].n}).join(' → ')+'.<br><b>Resultado final:</b><ul style="margin:6px 0 0">';
        ['fundo','usb','painel'].forEach(function(k){h+='<li>'+names[k]+': <b>'+(val[k]||'não configurado (padrão do Windows)')+'</b>'+(src[k]?' <span style="color:var(--suave)">← '+src[k]+'</span>':'')+'</li>';});
        out.innerHTML=h+'</ul>';
      }
      gp.onchange=enf.onchange=gpRun;gpRun();
    }
    var pS=document.getElementById('pmS');
    if(pS){
      var pA=document.getElementById('pmA'),pB=document.getElementById('pmB'),pO=document.getElementById('pmOut');
      var NM=['Sem acesso','Leitura','Alteração (modificar)','Controle total'];
      var WH=['não consegue nem abrir','pode apenas <b>ler</b> os arquivos','pode <b>ler, criar, alterar e apagar</b> arquivos','pode <b>tudo</b>, inclusive mudar permissões'];
      function pm(){
        var ntfs=Math.max(+pA.value,+pB.value),sh=+pS.value,net=Math.min(ntfs,sh);
        pO.innerHTML='NTFS somado dos grupos: <b>'+NM[ntfs]+'</b> · Compartilhamento: <b>'+NM[sh]+'</b>.<br>🌐 <b>Pela rede</b> (a mais restritiva): <b>'+NM[net]+'</b>, o usuário '+WH[net]+'.<br>🖥️ <b>No próprio servidor</b> (só NTFS): <b>'+NM[ntfs]+'</b>.';
      }
      pS.onchange=pA.onchange=pB.onchange=pm;pm();
    }
    var dP=document.getElementById('dhP');
    if(dP){
      var dF=document.getElementById('dhF'),dD=document.getElementById('dhD'),dO=document.getElementById('dhOut');
      function dh(){
        var p=+dP.value,tot=Math.pow(2,32-p)-2,f=Math.max(1,Math.min(+dF.value||1,tot-1)),dev=Math.max(1,+dD.value||1);
        var scope=tot-f,from=f+1,to=tot,clients=Math.max(0,dev-f);
        var ok=clients<=scope,tight=clients>scope*0.8;
        dO.innerHTML='Rede <code>192.168.50.0/'+p+'</code>: <b>'+tot+'</b> endereços utilizáveis (do .1 ao .'+tot+').<br>IPs fixos: <b>.1 a .'+f+'</b>. Escopo DHCP sugerido: <b>192.168.50.'+from+' a 192.168.50.'+to+'</b> ('+scope+' endereços).<br>'+
          (ok?(tight?'⚠️ <b>Apertado:</b> ':'✅ <b>Suficiente:</b> ')+'cerca de '+clients+' clientes para '+scope+' endereços.':'⛔ <b>Faltam '+(clients-scope)+' endereços.</b> Use uma rede maior (prefixo menor) ou divida os dispositivos em sub-redes.');
      }
      dP.onchange=dF.oninput=dD.oninput=dh;dh();
    }
  })();
  // --- Capítulo 3: calculadora de chmod e terminal de treino ---
  (function(){
    var cm=document.getElementById('cm');
    if(cm){
      var bx=[].slice.call(cm.querySelectorAll('input[data-b]')),oct=document.getElementById('cmOct'),out=document.getElementById('cmOut');
      var NOTE={'777':'⚠️ Todos podem tudo, inclusive apagar e alterar. Evite: quase nunca é necessário.','755':'✅ Típico de pastas e programas: todos entram e leem; só o dono altera.','644':'✅ Típico de arquivos comuns: todos leem; só o dono altera.','600':'🔒 Só o dono lê e escreve. Ótimo para chaves e senhas.','700':'🔒 Só o dono acessa a pasta.'};
      function bits(){var m=0;bx.forEach(function(b){if(b.checked)m|=1<<(+b.dataset.b)});return m;}
      function show(m){
        var o=((m>>6)&7).toString()+((m>>3)&7)+(m&7),sym='';
        for(var i=8;i>=0;i--)sym+=(m>>i&1)?'rwx'[(8-i)%3]:'-';
        oct.value=o;
        var who=['dono','grupo','outros'],t=[];
        for(var k=0;k<3;k++){var d=(m>>(6-3*k))&7;t.push('<b>'+who[k]+'</b>: '+(d?[(d&4)?'ler':'',(d&2)?'alterar':'',(d&1)?'executar':''].filter(Boolean).join(', '):'nada'));}
        out.innerHTML='<code>chmod '+o+' arquivo</code> · aparece no <code>ls -l</code> como <code>-'+sym+'</code><br>'+t.join(' · ')+(NOTE[o]?'<br>'+NOTE[o]:'');
      }
      function fromOct(){var v=oct.value.replace(/[^0-7]/g,'');if(v.length!==3)return;var m=(+v[0]<<6)|(+v[1]<<3)|(+v[2]);bx.forEach(function(b){b.checked=!!(m>>(+b.dataset.b)&1)});show(m);}
      bx.forEach(function(b){b.onchange=function(){show(bits())}});
      oct.oninput=fromOct;
      [].forEach.call(cm.querySelectorAll('[data-p]'),function(b){b.onclick=function(){oct.value=b.dataset.p;fromOct();}});
      fromOct();
    }

    var box=document.getElementById('ttBox');
    if(box){
      var outEl=document.getElementById('ttOut'),inp=document.getElementById('ttIn'),ps=document.getElementById('ttPs'),miss=document.getElementById('ttMiss');
      var fs={t:'d',c:{home:{t:'d',c:{aluno:{t:'d',c:{'leiame.txt':{t:'f',x:'Bem-vindo ao terminal de treino!'},docs:{t:'d',c:{}}}}}},etc:{t:'d',c:{hostname:{t:'f',x:'srv-linux'}}},var:{t:'d',c:{log:{t:'d',c:{}}}},tmp:{t:'d',c:{}}}};
      var cwd=['home','aluno'],hist=[],hi=0;
      function node(path){var n=fs;for(var i=0;i<path.length;i++){if(n.t!=='d'||!n.c[path[i]])return null;n=n.c[path[i]];}return n;}
      function resolve(p){var parts=p==='~'||p===''?['home','aluno']:(p[0]==='/'?[]:cwd.slice());
        if(p.slice(0,2)==='~/'){parts=['home','aluno'];p=p.slice(2);}
        p.split('/').forEach(function(s){if(!s||s==='.')return;if(s==='..')parts.pop();else parts.push(s);});return parts;}
      function dirStr(){var h=['home','aluno'];var same=cwd.length>=2&&cwd[0]==='home'&&cwd[1]==='aluno';return same?'~'+(cwd.length>2?'/'+cwd.slice(2).join('/'):''):'/'+cwd.join('/');}
      function prompt(){ps.textContent='aluno@srv:'+dirStr()+'$';}
      function print(t){outEl.textContent+=t+'\n';outEl.scrollTop=outEl.scrollHeight;}
      var done={};
      var M=[
        ['Crie a pasta <code>projetos</code> na sua pasta pessoal (<code>mkdir</code>)',function(){var n=node(['home','aluno','projetos']);return n&&n.t==='d'}],
        ['Dentro dela, crie o arquivo <code>ola.txt</code> com um texto (<code>echo oi &gt; ola.txt</code>)',function(){var n=node(['home','aluno','projetos','ola.txt']);return n&&n.t==='f'&&n.x.length>0}],
        ['Crie a pasta <code>backup</code> e copie o arquivo para lá (<code>cp</code>)',function(){var n=node(['home','aluno','backup','ola.txt']);return n&&n.t==='f'}],
        ['Apague o original (<code>rm</code>) e leia a cópia (<code>cat</code>)',function(){var a=node(['home','aluno','projetos','ola.txt']),b=node(['home','aluno','backup','ola.txt']);return !a&&b}]
      ];
      function mis(){miss.innerHTML=M.map(function(m,i){if(!done[i]&&m[1]())done[i]=1;return '<li>'+(done[i]?'✅':'⬜')+' '+m[0]+'</li>'}).join('')+(Object.keys(done).length===M.length?'<li>🎉 <b>Missões cumpridas!</b></li>':'');}
      function split(l){var a=[],r=/"([^"]*)"|'([^']*)'|(\S+)/g,m;while((m=r.exec(l)))a.push(m[1]!==undefined?m[1]:m[2]!==undefined?m[2]:m[3]);return a;}
      function run(line){
        print(ps.textContent+' '+line);
        var redir=null,mm=line.match(/^(.*?)(>>?)\s*(\S+)\s*$/);
        if(mm&&/^\s*echo/.test(mm[1])){line=mm[1];redir={app:mm[2]==='>>',f:mm[3]};}
        var a=split(line);if(!a.length)return;var c=a[0],args=a.slice(1);
        var flags=args.filter(function(x){return x[0]==='-'}).join(''),pos=args.filter(function(x){return x[0]!=='-'});
        if(c==='echo'){var t=pos.join(' ');if(redir){var path=resolve(redir.f),par=node(path.slice(0,-1)),nm=path[path.length-1];
            if(!par||par.t!=='d'){print('bash: '+redir.f+': Arquivo ou diretório inexistente');return;}
            var ex=par.c[nm];if(ex&&ex.t==='d'){print('bash: '+redir.f+': É um diretório');return;}
            par.c[nm]={t:'f',x:(redir.app&&ex?ex.x+'\n':'')+t};}else print(t);return;}
        switch(c){
          case 'help':print('Comandos: pwd, ls [-l], cd, mkdir, touch, cat, echo, cp, mv, rm, whoami, clear\nExemplos: ls -l | cd .. | echo oi > a.txt | cp a.txt b.txt');break;
          case 'pwd':print('/'+cwd.join('/'));break;
          case 'whoami':print('aluno');break;
          case 'clear':outEl.textContent='';break;
          case 'ls':{var d=pos[0]?node(resolve(pos[0])):node(cwd);if(!d){print('ls: não foi possível acessar \''+pos[0]+'\': Arquivo ou diretório inexistente');break;}
            if(d.t==='f'){print(pos[0]);break;}
            var names=Object.keys(d.c).sort();
            if(flags.indexOf('l')>-1){names.forEach(function(n){var x=d.c[n];print((x.t==='d'?'drwxr-xr-x':'-rw-r--r--')+' 1 aluno aluno '+(x.t==='d'?4096:x.x.length)+' nov 19 10:00 '+n)});}
            else print(names.join('  '));break;}
          case 'cd':{var p=resolve(pos[0]||'~'),n=node(p);if(!n)print('bash: cd: '+pos[0]+': Arquivo ou diretório inexistente');else if(n.t!=='d')print('bash: cd: '+pos[0]+': Não é um diretório');else cwd=p;break;}
          case 'mkdir':case 'touch':pos.forEach(function(f){var p=resolve(f),par=node(p.slice(0,-1)),nm=p[p.length-1];
              if(!par||par.t!=='d'){print(c+': não foi possível criar \''+f+'\': Arquivo ou diretório inexistente');return;}
              if(par.c[nm]){if(c==='mkdir')print('mkdir: não foi possível criar o diretório \''+f+'\': O arquivo já existe');return;}
              par.c[nm]=c==='mkdir'?{t:'d',c:{}}:{t:'f',x:''};});if(!pos.length)print(c+': operando ausente');break;
          case 'cat':pos.forEach(function(f){var n=node(resolve(f));if(!n)print('cat: '+f+': Arquivo ou diretório inexistente');else if(n.t==='d')print('cat: '+f+': É um diretório');else print(n.x);});break;
          case 'rm':pos.forEach(function(f){var p=resolve(f),par=node(p.slice(0,-1)),nm=p[p.length-1],n=par&&par.c&&par.c[nm];
              if(!n)print('rm: não foi possível remover \''+f+'\': Arquivo ou diretório inexistente');
              else if(n.t==='d'&&flags.indexOf('r')<0)print('rm: não foi possível remover \''+f+'\': É um diretório (use rm -r)');
              else delete par.c[nm];});break;
          case 'cp':case 'mv':{if(pos.length<2){print(c+': operando ausente');break;}
            var src=node(resolve(pos[0]));if(!src){print(c+': não foi possível obter estado de \''+pos[0]+'\': Arquivo ou diretório inexistente');break;}
            if(src.t==='d'&&c==='cp'&&flags.indexOf('r')<0){print('cp: -r não especificado; omitindo o diretório \''+pos[0]+'\'');break;}
            var dp=resolve(pos[1]),dn=node(dp),np,nm;
            if(dn&&dn.t==='d'){np=dn;nm=resolve(pos[0]).slice(-1)[0];}else{np=node(dp.slice(0,-1));nm=dp[dp.length-1];}
            if(!np||np.t!=='d'){print(c+': destino inexistente');break;}
            np.c[nm]=JSON.parse(JSON.stringify(src));
            if(c==='mv'){var sp=resolve(pos[0]),spar=node(sp.slice(0,-1));if(spar!==np||sp[sp.length-1]!==nm)delete spar.c[sp[sp.length-1]];}
            break;}
          default:print('bash: '+c+': comando não encontrado (digite help)');
        }
      }
      inp.addEventListener('keydown',function(e){
        if(e.key==='Enter'){var l=inp.value;inp.value='';if(l.trim())hist.push(l);hi=hist.length;run(l);prompt();mis();}
        else if(e.key==='ArrowUp'){if(hi>0){hi--;inp.value=hist[hi];}e.preventDefault();}
        else if(e.key==='ArrowDown'){if(hi<hist.length-1){hi++;inp.value=hist[hi];}else{hi=hist.length;inp.value='';}e.preventDefault();}
      });
      box.addEventListener('click',function(){inp.focus()});
      print('Terminal de treino. Digite help para ver os comandos.');prompt();mis();
    }
  })();
})();
