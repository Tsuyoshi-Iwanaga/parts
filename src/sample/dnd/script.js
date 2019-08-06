;(function ($){

var $fileUpArea = $('#js-fileUp');
var $inputDrop = document.getElementById('js-inputDrop');

//dragenterイベントのキャンセル
$inputDrop.addEventListener('dragenter', function(e) {
  e.preventDefault();
});

//dragoverイベントでドラッグオペレーションを設定
$inputDrop.addEventListener('dragover', function(e) {
  e.dataTransfer.dropEffect = 'copy';
  e.preventDefault();
});

$inputDrop.addEventListener('drop', function(e) {
  var data = e.dataTransfer.getData('text/url-list');

  if(data) {

  }

});

})(jQuery);
