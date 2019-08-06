;(function($){

$(window).on('load', function(){

  var mapSVG = (function() {

    //jsonファイルの取得
    $.ajax({
      url: 'area_info.json',
      type: 'GET',
      dataType: 'json'
    }).done(function(data) {

      //各種変数の定義
      var json = data[0],
          $mapSVG = $(document.getElementById('mapSVG').contentDocument),
          $area = $mapSVG.find('.js-area');
          $pre = $area.find('.js-pre');

      //SVG上の各県への処理
      $pre.each(function(){
        var preName = $(this).attr('id');

        Object.keys(json).forEach(function(area) {
          var pre_list = json[area].area_pre,
              $pre_area = $mapSVG.parent();

          //JSONの中から該当の項目を見つけた後
          if(pre_list[preName]) {
            pre_area_state = pre_list[preName].state;
            $preBg = $mapSVG.find('#' + preName).find('.js-pre-bg');

            function _changeBgColor(target, color) {
              target.css({'fill': color});
            }

            function _paingPre() {
              if(pre_area_state === 'expanded') {
                _changeBgColor($preBg, '#9ede65');
              } else if(pre_area_state === 'excluded') {
                _changeBgColor($preBg, '#dedede');
              }
            }

            _paingPre();

            $preBg.color = $preBg.css('fill');
          }
        });
      });

      $area.each(function(){
        var area = $(this).attr('id');

        $(this).on('mouseenter', function(){
          $(this).find('.js-pre-bg').css({
            "cursor": "pointer",
            "fill": '#ff8e14'
          });
        });

        $(this).on('mouseleave', function(){
          $(this).find('.js-pre-bg').each(function(){
            if(json[area].area_pre[$(this).parent().attr('id')].state === 'expanded') {
              $(this).css({
                'fill': '#9ede65'
              });
            } else if(json[area].area_pre[$(this).parent().attr('id')].state === 'excluded') {
              $(this).css({
                'fill': '#dedede'
              });
            } else {
              $(this).css({
                'fill': '#6FBA2C'
              });
            }
          });
        });

      });

      //各県をクリックした時の動作
      $pre.on('click', function(){
        var pre_area, pre_area_char, pre_list, pre_name, pre_char, pre_state, pre_comment, pre_new,
        area_list, area_list_title, area_list_item, i;

        $('.map_list_area').empty();

        pre_name = $(this).attr('id');

        Object.keys(data[0]).forEach(function(area) {
          pre_list = data[0][area].area_pre;
          if(pre_list[pre_name]) {
            pre_area = data[0][area];
            pre_area_char = pre_area.area_name;
          }
        });

        area_list = $('<dl class="area_list"></dl>');
        area_list_title = $('<dt class="area_list_title"></dt>');
        area_list_title.text(pre_area_char);
        area_list.append(area_list_title);

        Object.keys(pre_area.area_pre).forEach(function(pre) {
          pre_char = pre_area.area_pre[pre].name || '';
          pre_comment = pre_area.area_pre[pre].comment || '';
          pre_new = pre_area.area_pre[pre].new || false;
          area_list_item = $('<dd class="area_list_item"></dd>');

          area_list_item.text(pre_char);
          if(pre_new) {
            area_list_item.append($('<span class="area_list_new">NEW<span>'));
          }
          if(pre_comment) {
            area_list_item.append($('<span class="area_list_comment">' + pre_comment + '<span>'));
          }

          area_list.append(area_list_item);
        });

        $('.map_list_area').append(area_list);
      });
    });

  })();
});

})(jQuery);
