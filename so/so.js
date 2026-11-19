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
})();
