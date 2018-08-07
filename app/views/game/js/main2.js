var config = {
    type: Phaser.AUTO,
    width: 7*32,
    height: 7*32,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;
var map;
var camera;
var cursors;
var layer0;
var layer1;
var layer2;

function preload(){
    this.load.tilemapTiledJSON('map','assets/map/maze.json');
    this.load.image('tile', 'assets/images/tile.png');
    this.load.image('player', 'assets/images/char1.png');
}
function create(){
    
    // make tile map
    map = this.make.tilemap({ key: 'map' });
    //first: tilename in json file  second: tile image key
    var tiles = map.addTilesetImage('tmaze', 'tile'); 
    layer0 = map.createStaticLayer('ground', tiles, 0, 0);
    layer1 = map.createStaticLayer('wall', tiles, 0, 0);
    layer2 = map.createStaticLayer('bound', tiles, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    layer2.setCollisionByProperty({ collides: true });
    const spawnplayer = map.findObject("object", obj => obj.name === "player");
    
    //player part
    player = this.physics.add.image(spawnplayer.x, spawnplayer.y, 'player');
    this.physics.add.collider(player, layer1);
    this.physics.add.collider(player, layer2);
    
    //camera set
    camera = this.cameras.main;
    camera.setBounds(0, 0, 31*32, 31*32);
    camera.startFollow(player);
    camera.followOffset.set(0, 0);
    
    //커서 인풋
    cursors = this.input.keyboard.createCursorKeys();
}
function update(){
    if (cursors.left.isDown)
    {
        var tile = layer0.getTileAtWorldXY(player.x - 32, player.y, true);
        var tile2 = layer1.getTileAtWorldXY(player.x - 32, player.y, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x -= 32;
            player.angle = 180;
        }
    }
    else if (cursors.right.isDown)
    {
        var tile = layer0.getTileAtWorldXY(player.x + 32, player.y, true);
        var tile2 = layer1.getTileAtWorldXY(player.x + 32, player.y, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x += 32;
            player.angle = 0;
        }
    }
    else if (cursors.up.isDown)
    {
        var tile = layer0.getTileAtWorldXY(player.x, player.y - 32, true);
        var tile2 = layer1.getTileAtWorldXY(player.x , player.y - 32, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y -= 32;
            player.angle = -90;
        }
    }
    else if (cursors.down.isDown)
    {
        var tile = layer0.getTileAtWorldXY(player.x, player.y + 32, true);
        var tile2 = layer1.getTileAtWorldXY(player.x, player.y + 32, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y += 32;
            player.angle = -90;
        }
    }
    else
    {
        
    }
}
// function move(dir) {
//     if (dir == "up") {myGamePiece.speedY = -1; }
//     if (dir == "down") {myGamePiece.speedY = 1; }
//     if (dir == "left") {myGamePiece.speedX = -1; }
//     if (dir == "right") {myGamePiece.speedX = 1; }
// }