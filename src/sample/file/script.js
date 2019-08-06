;(function (){
var fileInput01 = document.getElementById('fileInput01');
var fileInput02 = document.getElementById('fileInput02');
var fileInput03 = document.getElementById('fileInput03');
var fileInput04 = document.getElementById('fileInput04');

//inputされたFileへのアクセス(テキスト編)
fileInput01.addEventListener('change', function(ev) {
  var files = ev.target.files; //fileListオブジェクト取得

  var file = files[0];
  if(!file)return;

  console.log(file.name);
  console.log(file.lastModifiedDate);//DateObjectで返る
  console.log(file.size);
  console.log(file.type);

  //Fileの中身の取得
  var reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.addEventListener('load', function(e){
    console.log(e.target.result);
  });
});

//inputされたFileへのアクセス(バイナリ編)
fileInput02.addEventListener('change', function(ev) {
  var files = ev.target.files; //fileListオブジェクト取得

  var file = files[0];
  if(!file)return;

  //Fileの中身の取得
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.addEventListener('load', function(e){
    var buffer = e.target.result;
    var arr = new Uint8Array(buffer);
    for(var i=0; i<10; i++) {
      console.log(arr[i])
    }
  });
});

//inputされたFileへのアクセス(DateURL編)
fileInput03.addEventListener('change', function(ev) {
  var files = ev.target.files; //fileListオブジェクト取得

  var file = files[0];
  if(!file)return;

  //Fileの中身の取得
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', function(e){
    var buffer = e.target.result;
    var img = document.createElement('img');
    img.src = buffer;
    document.body.appendChild(img);
    });
});

//inputされたFileへのアクセス(オブジェクトURL編)
fileInput04.addEventListener('change', function(ev) {
  var files = ev.target.files; //fileListオブジェクト取得

  var file = files[0];
  if(!file)return;

  //Fileの中身の取得
  var objURL = URL.createObjectURL(file);
  console.log(objURL);
  var img = document.createElement('img');
  img.src = objURL;
  document.body.appendChild(img);
});

})();
