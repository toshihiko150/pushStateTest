// 自力で実装した場合。古いブラウザは無視。
$(function() {
  if (window.history && window.history.pushState) {
    // 内容の読み込み処理
    function loadContents(action, url) {
      //$.get(url, { push_state: 'true' })
      $.getJSON(url)
         .done(function(content) {
                 var string = "";
                 if (action=="link1") {
                   string = parseFunc1(content.content)
                 } else if (action=="link2") {
                   string = parseFunc2(content.content)
                 } else if (action=="link3") {
                   string = parseFunc3(content.content)
                 } else if (action=="link4") {
                   string = parseFunc4(content.content)
                 }
                 $('#ajax_area').html(string); 
               });
       $('#ajax_area').html(""); 
    }

    // pushState を使った遷移
    $(document).on('click', 'a', function(e) {
      e.preventDefault();
      loadContents(e.target.dataset.title, e.target.dataset.url);
      history.pushState({title:e.target.dataset.title, url:e.target.dataset.url}, e.target.dataset.title, location.href.match(/(.*)\/(.*)/)[1]+"/"+e.target.dataset.url);
    });

    // popState イベントをハンドリング
    $(window).on('popstate', function(e){
      if (e.originalEvent.state==null) return;
      loadContents(e.originalEvent.state.title, e.originalEvent.state.url);
    });
  }
  //表示する際に、ここの関数を通してから表示する
  function parseFunc1(content){
    return content + "ですよね！";
  }
  function parseFunc2(content){
    return content + "だと思います。";
  }
  function parseFunc3(content){
    return "これがうわさの" + content + "ですか！！"
  }
  function parseFunc4(content){
    return content + "、ありがとうございます。"
  }
});

