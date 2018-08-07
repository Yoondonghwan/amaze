var config = {
    type: Phaser.AUTO,
    width: 32*7,
    height: 32*7,
    pixelArt: true,
    parent: 'game',
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
//var cursors;
const scale = 1.34;
var game = new Phaser.Game(config);
var player;
var ghost, ghost1;
//var cursors;
var map;
var camera;
var gameOver = false;
var movedown,moveleft,moveright,moveup;
var layer0,layer1,layer2;
var goal = false;
function preload(){
    this.load.tilemapTiledJSON('map','./assets/map/maze.json');
    this.load.image('tile', './assets/images/tile.png');
    this.load.image('player', './assets/images/char1.png');
}
function create(){
    
    
    // make tile map
    map = this.make.tilemap({ key: 'map' });
    //first: t*ilename in json file  second: tile image key
    var tiles = map.addTilesetImage('tmaze', 'tile'); 
    layer0 = map.createStaticLayer('ground', tiles, 0, 0);
    layer1 = map.createStaticLayer('wall', tiles, 0, 0);
    layer2 = map.createStaticLayer('bound', tiles, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    layer2.setCollisionByProperty({ collides: true });
    const spawnplayer = map.findObject("object", obj => obj.name === "player");
    goalobj = map.findObject("object", obj => obj.name === "goal");
    
    //player part
    player = this.physics.add.sprite(spawnplayer.x, spawnplayer.y, 'player').setOrigin(0.5, 0.5);
    this.physics.add.collider(player, layer1);
    this.physics.add.collider(player, layer2);
    
    // ghost
    ghost  =this.physics.add.sprite(spawnplayer.x+227, spawnplayer.y+242, 'player').setVelocity(-50, 59).setBounce(1,1).setOrigin(0.5, 0.5);
    this.physics.add.collider(ghost, layer2);
    
    ghost1  =this.physics.add.sprite(spawnplayer.x+150, spawnplayer.y+153, 'player').setVelocity(65, -63).setBounce(1,1).setOrigin(0.5, 0.5);
    this.physics.add.collider(ghost1, layer2);

    //camera set
    camera = this.cameras.main;
    camera.setBounds(0, 0, 31*32, 31*32);
    camera.startFollow(player);
    camera.followOffset.set(0, 0);

    // game over
    this.physics.add.overlap(player, ghost, hitgh, null, this);
    this.physics.add.overlap(player, ghost1, hitgh1, null, this);
    // goal
    this.physics.add.overlap(player,goal,hitgoal, null, this);
}
function hitgh (player, ghost)
{
    this.physics.pause();

    gameOver = true;
}
function hitgh1 (player, ghost1)
{
    this.physics.pause();

    gameOver = true;
}
function hitgoal (player, goalogj)
{
    this.physics.pause();

    goal = true;
}
function update(){
    
    if (gameOver)
    {
        //this.scene.start(config);
        this.add.text(player.x-32, player.y-46, 'Game Over', { font: '16px Courier', fill: '#00ff00' });
        this.add.text(player.x-32*3.2, player.y-26, 'click to start restart', { font: '16px Courier', fill: '#00ff00' });

        this.input.once('pointerup', function (event) {

             this.scene.restart();
            gameOver=false;
        }, this);
        //return;
    }
    var tile = layer0.getTileAtWorldXY(player.x, player.y , true);
    if(tile.index === 74)
    {
        //this.scene.start(config);
        this.add.text(player.x-32, player.y-46, 'Goal', { font: '16px Courier', fill: '#00ff00' });
        this.add.text(player.x-32*3.2, player.y-26, 'click to start restart', { font: '16px Courier', fill: '#00ff00' });

        this.input.once('pointerup', function (event) {

             this.scene.restart();
            goal=false;
        }, this);
        //return;
    }
    
}
    

function moveup() {
        var tile = layer0.getTileAtWorldXY(player.x, player.y - 32, true);
        var tile2 = layer1.getTileAtWorldXY(player.x , player.y - 32, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y -= 32;
            player.angle = 180;
        }    
}

function movedown() {
        var tile = layer0.getTileAtWorldXY(player.x, player.y + 32, true);
        var tile2 = layer1.getTileAtWorldXY(player.x, player.y + 32, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y += 32;
            player.angle = 0;
        }
}

function moveleft() {
        var tile = layer0.getTileAtWorldXY(player.x - 32, player.y, true);
        var tile2 = layer1.getTileAtWorldXY(player.x - 32, player.y, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x -= 32;
            player.angle = 90;
        }

}

function moveright() {
        var tile = layer0.getTileAtWorldXY(player.x + 32, player.y, true);
        var tile2 = layer1.getTileAtWorldXY(player.x + 32, player.y, true);
        if (tile.index === 20||tile2.index === 20)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x += 32;
            player.angle = -90;
        }

}

function clearmove() {
    // player.speedX = 0; 
    // myGamePiece.speedY = 0; 
    //player.setVelocity(0,0);
    player.anims.play('idle');

    
}