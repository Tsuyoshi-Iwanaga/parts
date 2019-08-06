;(function(){
  var content =  $('.js-question'),
      backBtn = $('.js-back'),
      nextBtn = $('.js-next'),
      showBtn = $('.js-show'),
      input = $('.js-input'),
      table = $('.js-table'),
      tableContent = $('.js-tableContent'),
      activeSectionNum = 0;

  initDisplay = function() {
    content.removeClass('is-active');
    content.eq(0).addClass('is-active');
    judgeBtnExist();
  },

  loadInfo = function() {
    for (var i=0; i < content.length-1; i++) {
      var item = _getDataLocalStorage('Q'+ i);
      input.eq(i - 1).val(item.replace(/["]/g,''));

      tableContent.eq(i - 1).text(item.replace(/["]/g,''));
    }
  }

  bindEvents = function() {
    backBtn.on('click', function(ev){
      switchSection(-1);
      judgeBtnExist();
    });
    nextBtn.on('click', function(ev){
      switchSection(1);
      judgeBtnExist();
    });
    showBtn.on('click', function(ev){
      if(table.hasClass('is-active')) {
        table.removeClass('is-active');
      } else {
        table.addClass('is-active');
      }
    });
    input.on('load input', function(ev){
      var lines = parseInt($(this).css('lineHeight'));
      var height = ($(this).val() + '\n').match(/\n/g).length;
      $(this).height(height  * lines);
    });
  },

  judgeBtnExist = function() {
    if (activeSectionNum === 0) {
      backBtn.hide();
      nextBtn.show();
    } else if (activeSectionNum === input.length - 1) {
      nextBtn.hide();
      backBtn.show();
    } else {
      backBtn.show();
      nextBtn.show();
    }
  }

  switchSection = function(moveNum) {
    var inputValue = '';

    inputValue = input.eq(activeSectionNum).val();

    content.eq(activeSectionNum).removeClass('is-active');
    content.eq(activeSectionNum + moveNum).addClass('is-active');

    _upDateLocalStorage(`Q${activeSectionNum + 1}`, inputValue);
    tableContent.eq(activeSectionNum).text(inputValue.replace(/["]/g,''));

    activeSectionNum += moveNum;
  }

  createTable = function() {

  }

  //localStorage
  _upDateLocalStorage = function(key, value, callback) {
    if(typeof(Storage) === 'undefined'){ alert('Your Browser Not Supportd'); return; }
  
    var ls = localStorage;
  
    if (Object.prototype.toString.call(value) === '[object Object]'||'[object Array]') {
      value = JSON.stringify(value);
    }
  
    ls.setItem(key, value);
  
    if(callback) {
      window.addEventListener('storage', function(e) {
        callback(e);
      });
    }
  },
  
  _getDataLocalStorage = function(key) {
    if(typeof(Storage) === 'undefined'){ alert('Your Browser Not Supportd'); return; }
  
    var ls = localStorage,
        value = ls.getItem(key) || '';
  
    if(value === 'true'|| value === 'false') {
      value = !!value //文字列から真偽値に
    } else if (value.match(/[\[|{].*[\]|}]/)) {
      value = JSON.parse(value); //文字列からオブジェクトに
    }
  
    return value;
  },

  //mainProcess
  Ctrl = (function() {

    var init = function() {
      initDisplay();
      bindEvents();
      loadInfo();
    };

    return {
      init: init
    }
  }());

  //excute
  $(function(){
    Ctrl.init();
  });

}());