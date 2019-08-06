;(function($){
  $(function(){

    //アコーディオン
    var accWrap = $('.js-accodion'),
        accTitle = accWrap.find('dt'),
        activeClass = 'is-active';

    accTitle.on('click', function(){
      if($(this).parent().hasClass(activeClass)) {
        $(this).parent().removeClass(activeClass)
      } else {
        $(this).parent().addClass(activeClass)
      }
    });

    //タブ
    var tabWrap = $('.js-tab'),
        tabTitle = tabWrap.find('.js-tabHead').children(),
        tabContents = tabWrap.find('.js-tabContent').children(),
        activeClass = 'is-active',
        index = 0;

    function tabSwitch(index) {
      tabTitle.removeClass(activeClass);
      tabContents.removeClass(activeClass);

      tabTitle.eq(index).addClass(activeClass);
      tabContents.eq(index).addClass(activeClass);
    }

    tabTitle.on('click', function(){
      index = tabTitle.index(this);
      tabSwitch(index)
    });

    tabSwitch(index);

  });
})(jQuery);
