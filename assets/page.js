(function(){
  function flash(btn,word){
    var t=btn.querySelector('span'),old=t.textContent;
    t.textContent=word;btn.classList.add('done');
    setTimeout(function(){t.textContent=old;btn.classList.remove('done')},2500);
  }
  function copyText(text,box,ok,fail){
    function fallback(){
      try{
        var r=document.createRange();r.selectNodeContents(box);
        var s=window.getSelection();s.removeAllRanges();s.addRange(r);
        if(document.execCommand('copy')){ok()}else{fail()}
      }catch(e){fail()}
    }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(ok).catch(fallback);
    }else{fallback()}
  }
  function parts(btn,attr){
    var id=btn.getAttribute(attr);
    return {box:document.getElementById(id),msg:document.getElementById('m-'+id)};
  }
  function copy(btn){
    var p=parts(btn,'data-copy');
    copyText(p.box.textContent,p.box,
      function(){flash(btn,'복사됨');p.msg.textContent='이제 대화창에 붙여넣기 하세요.'},
      function(){p.msg.textContent='프롬프트 글을 길게 눌러 복사해 주세요.'});
  }
  function share(btn){
    var p=parts(btn,'data-share'),text=p.box.textContent+'\n\n— 지쿱AI대학교 · 지쿱파트너스 교육용 프롬프트 (AI로사쌤)';
    function viaCopy(){
      copyText(text,p.box,
        function(){flash(btn,'복사됨');p.msg.textContent='프롬프트가 복사됐어요. 보낼 곳에 붙여넣기 하세요.'},
        function(){p.msg.textContent='프롬프트 글을 길게 눌러 복사해 주세요.'});
    }
    if(navigator.share){
      navigator.share({text:text}).catch(function(e){
        if(e&&e.name==='AbortError'){return}
        viaCopy();
      });
    }else{viaCopy()}
  }
  var i,bs=document.querySelectorAll('button[data-copy]');
  for(i=0;i<bs.length;i++){bs[i].addEventListener('click',function(){copy(this)})}
  bs=document.querySelectorAll('button[data-share]');
  for(i=0;i<bs.length;i++){bs[i].addEventListener('click',function(){share(this)})}
})();
