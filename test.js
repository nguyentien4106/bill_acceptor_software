var c=document.getElementById("strip");
var ctx=c.getContext("2d");
var imageObj1 = new Image();
var imageObj2 = new Image();
imageObj1.src = "./photo1.jpg"
imageObj1.onload = function() {
   ctx.drawImage(imageObj1, 0, 0, 328, 526);
   imageObj2.src = "./photo2.jpg";
   imageObj2.onload = function() {
      ctx.drawImage(imageObj2, 15, 85, 300, 300);
      var img = c.toDataURL("image/png");
      document.write('<img src="' + img + '" width="328" height="526"/>');
   }
};