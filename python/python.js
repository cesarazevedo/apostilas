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
})();
