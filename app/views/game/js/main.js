var config = {
    type: Phaser.AUTO,
    width: 7*32,
    height: 7*32,
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

var game = new Phaser.Game(config);
var player;
//var cursors;
var map;
//var camera;


function preload(){
    this.load.tilemapTiledJSON('map','assets/map/maze.json');
    this.load.image('tile', 'assets/images/tile.png');
    this.load.atlas('player', 'assets/images/player.png', 'assets/json/player.json');
}
function create(){
    
    // make tile map
    map = this.make.tilemap({ key: 'map' });
    //first: tilename in json file  second: tile image key
    var tiles = map.addTilesetImage('tmaze', 'tile');
    var layer0 = map.createStaticLayer('ground', tiles, 0, 0);
    var layer1 = map.createStaticLayer('wall', tiles, 0, 0);
    var layer2 = map.createStaticLayer('bound', tiles, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    layer2.setCollisionByProperty({ collides: true });
    const spawnplayer = map.findObject("object", obj => obj.name === "player");
    
    //player part
    player = this.physics.add.sprite(spawnplayer.x, spawnplayer.y, 'player');
    this.physics.add.collider(player, layer1);
    this.physics.add.collider(player, layer2);
    
    //camera set
    camera = this.cameras.main;
    camera.setBounds(0, 0, 31*32, 31*32);
    camera.startFollow(player);
    camera.followOffset.set(0, 0);

    // add animation
    this.anims.create({ 
        key: 'down', 
        frames: this.anims.generateFrameNames('player', { prefix: 'down_', start:1, end: 2, zeroPad: 4 }),
        frameRate: 3,
        repeat: -1 
    });
    this.anims.create({ 
        key: 'left', 
        frames: this.anims.generateFrameNames('player', { prefix: 'left_', start:1, end: 2, zeroPad: 4 }),
        frameRate: 3,
        repeat: -1 
    });
    this.anims.create({ 
        key: 'idle', 
        frames: this.anims.generateFrameNames('player', { prefix: 'down_', end: 0, zeroPad: 4 }),
        repeat: -1 
    });
    
    //커서 인풋
    cursors = this.input.keyboard.createCursorKeys();
}
function update(){
    if (cursors.left.isDown)
    {
        player.setVelocity(-80, 0);
    
        player.anims.play('left', true);
        
        player.flipX = false;
    }
    else if (cursors.right.isDown)
    {
        player.setVelocity(80, 0);
    
        player.anims.play('left', true);
        
        player.flipX = true;
    }
    else if (cursors.up.isDown)
    {
        player.setVelocity(0, -80);
    
        player.anims.play('down', true);
        
        player.flipY = true;
    }
    else if (cursors.down.isDown)
    {
        player.setVelocity(0, 80);
    
        player.anims.play('down', true);
        
        player.flipY = false;
    }
    else
    {
        player.setVelocity(0,0);
        player.anims.play('idle');
    }
}
