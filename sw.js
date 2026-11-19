/* Service worker: deixa as apostilas funcionarem sem internet.
   Estratégia: responde do cache e atualiza em segundo plano (a nova versão aparece na visita seguinte). */
var CACHE='apostilas-v2';
var BASE=new URL('./',self.location).pathname;
var CORE=[BASE,BASE+'index.html',BASE+'redes/',BASE+'redes/redes.js',BASE+'redes/glossario.js',BASE+'so/',BASE+'so/so.js',BASE+'so/glossario.js',BASE+'assets/apostila.css',BASE+'assets/apostila.js',BASE+'manifest.webmanifest',BASE+'icon-192.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(caches.open(CACHE).then(function(c){
    return c.match(r).then(function(hit){
      var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit});
      return hit||net;
    });
  }));
});
