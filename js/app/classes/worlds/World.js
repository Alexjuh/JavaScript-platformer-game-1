define(['Class','TileLoader','Utils','EntityManager','Player','Tree','SpatialGrid'],function(Class,Tile,Utils,EntityManager,Player,Tree,SpatialGrid){

  var World = Class.extend({
    init:function(_path,_handler){
      this.tiles = [];
      this.handler = _handler;
      _handler.setWorld(this);
      this.entityManager = new EntityManager(_handler,new Player(_handler,100,100));
      this.loadWorld(_path);
      this.spatialGrid = new SpatialGrid(this.width * Tile.TILEWIDTH,this.height * Tile.TILEHEIGHT,100);
      this.entityManager.addEntity(new Tree(_handler,100,400)); // 100 en 400: verplaats boom
      this.entityManager.addEntity(new Tree(_handler,150,500));
      this.entityManager.getPlayer().setX(this.spawnX);
      this.entityManager.getPlayer().setY(this.spawnY);
    },
    loadWorld:function(_path){
      var file = Utils.loadFileAsString(_path);
      var tokens = file.replace( /\n/g, " ").split( " " );
      this.width = tokens[0];
      this.height = tokens[1];
      this.spawnX = tokens[2] * Tile.TILEWIDTH;
      this.spawnY = tokens[3] * Tile.TILEHEIGHT;
      for(y=0;y<this.height;y++){
        for(x=0;x<this.width;x++){
          if(!this.tiles[x])
            this.tiles[x] = [];
            this.tiles[x][y] = parseInt(tokens[(x + (y * this.width))+4]);
        }
      }
    },
    tick:function(_dt){
      this.entityManager.tick(_dt);
    },
    render:function(_g){
      var xStart = parseInt(Math.max(0,
      this.handler.getGameCamera().getxOffset()/Tile.TILEWIDTH));
      var xEnd = parseInt(Math.min(this.width,
        (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / Tile.TILEWIDTH + 1));

      var yStart = parseInt(Math.max(0,
      this.handler.getGameCamera().getyOffset()/Tile.TILEHEIGHT));
      var yEnd = parseInt(Math.min(this.height,
        (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / Tile.TILEHEIGHT + 1));

      for(y=yStart;y<yEnd;y++){
        for(x=xStart;x<xEnd;x++){
          this.getTile(x,y).render(_g,x * Tile.TILEWIDTH - this.handler.getGameCamera().getxOffset(),y * Tile.TILEHEIGHT - this.handler.getGameCamera().getyOffset());
        }
      }

      this.entityManager.render(_g);
    },
    getTile:function(_x,_y){
      return Tile.tiles[this.tiles[_x][_y]];
    },
    getWidth:function(){
      return this.width;
    },
    getHeight:function(){
      return this.height;
    },
    getEntityManager:function(){
      return this.entityManager;
    },
    getSpatialGrid:function(){
      return this.spatialGrid;
    }
  });

  return World;
});
