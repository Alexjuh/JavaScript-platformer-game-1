define(['Jquery', 'Class'], function($, Class){
// private variables
  var canvas,title,width,height,graphics;

  var Display = Class.extend({
    init:function(_title,_width,_height){
      title = _title;
      width = _width;
      height = _height;
      createDisplay();
    },

    // getters
    getTitle:function(){
      return title;
    },
    getWidth:function(){
      return width;
    },
    getHeight:function(){
      return height;
    },
    getGraphics:function(){
      return graphics;
    },
    getCanvas:function(){
      return canvas;
    }
  });

  // private method
  function createDisplay(){
    document.title = title;
    var body = document.body;
    body.innerHTML = "<canvas id='canvas' width='"+width+"' height='"+height+"'></canvas>";
    canvas = document.getElementById("canvas");
    graphics = canvas.getContext("2d");
  }

  CanvasRenderingContext2D.prototype.myDrawImage = function(asset,_x,_y,_width,_height){
    this.drawImage(asset.sheet,asset.x,asset.y,asset.width,asset.height,_x,_y,_width,_height);
  }

  return Display;
});
