define(['Class'],function(Class){

  var width,height,size,grid;
  var SpatialGrid = Class.extend({
    init:function(_width,_height,_size){
      width = parseInt(_width / _size);
      height = parseInt(_height / _size);
      size = _size;
      grid = [];
      for(var i=0;i<=width;i++){
        grid[i] = [];
        for(var j=0;j<=height;j++){
          grid[i][j] = [];
        }
      }
    },
    //Insert entities in gridsquare
    insert:function(_rect,_ent){
      var startX = Math.max(0,parseInt(_rect.x / size));
      var startY = Math.max(0,parseInt(_rect.y / size));
      var endX = Math.min(width,parseInt((_rect.x + _rect.width)/size));
      var endY = Math.min(height,parseInt((_rect.y + _rect.height)/size));
      for(var y = startY;y<=endY;y++){
        for(var x = startX;x<=endX;x++){
        if(grid[x][y].indexOf(_ent)==-1)
          grid[x][y].push(_ent);
        }
      }
    },
    //retrieve all other entities from gridsquare
    retrieve:function(_rect,_ent){
      var startX = Math.max(0,parseInt(_rect.x / size));
      var startY = Math.max(0,parseInt(_rect.y / size));
      var endX = Math.min(width,parseInt((_rect.x + _rect.width)/size));
      var endY = Math.min(height,parseInt((_rect.y + _rect.height)/size));
      var entities = [];
      for(var y = startY;y<=endY;y++){
        for(var x = startX;x<=endX;x++){
          grid[x][y].forEach(function(e){
            if(e !== _ent && entities.indexOf(e)==-1)
              entities.push(e);
          });
        }
      }
      return entities;
    },
    //remove entity from gridsquare
    remove:function(_rect,_ent){
      var startX = Math.max(0,parseInt(_rect.x / size));
      var startY = Math.max(0,parseInt(_rect.y / size));
      var endX = Math.min(width,parseInt((_rect.x + _rect.width)/size));
      var endY = Math.min(height,parseInt((_rect.y + _rect.height)/size));
      for(var y = startY;y<=endY;y++){
        for(var x = startX;x<=endX;x++){
          for(var i = 0;i<grid[x][y].length;i++){
            if(grid[x][y][i] == _ent)
              grid[x][y].splice(i,1);
          }
        }
      }
    },
    //render gridsquares - optional
    render:function(_g,_handler){
      for(var y=0;y<=height;y++){
        for(var x=0;x<=width;x++){
          var xpos = (x*size) - _handler.getGameCamera().getxOffset();
          var ypos = (y*size) - _handler.getGameCamera().getyOffset();
          _g.strokeRect(xpos,ypos,size,size);
          if(grid[x][y].length>0){
            // _g.fillStyle = "Blue";
            // _g.fillRect(xpos,ypos,size,size);
          }
        }
      }
    },
    //getters
    getWidth:function(){
      return width;
    },
    getHeight:function(){
      return height;
    },
    getSize:function(){
      return size;
    }
  });

  return SpatialGrid;
});
