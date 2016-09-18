var game = new Phaser.Game(
    800, 
    600, 
    Phaser.AUTO, 
    '', 
    { 
        preload: preload,
        create: create,
        update: update
    }
);


function preload () {

    game.load.spritesheet('catineo', 'images/gatineo.png', 88, 80);
    game.load.image('almofadinha', 'images/almofadinha.png');
    game.load.image('background', 'images/background.png');
    game.load.image('vasourinha', 'images/vasourinha.png');
    game.load.image('caixinha', 'images/caixinha.png');
    game.load.image('mijo', 'images/mijo.png');
    game.load.image('bolapelo', 'images/bolapelo.png');
    game.load.spritesheet('brinquedinho', 'images/brinquedinho.png', 104, 52);
    game.load.spritesheet('aguinha', 'images/aguinha.png', 60, 32);
    game.load.spritesheet('racao', 'images/racao.png', 60, 32);
    game.load.spritesheet('balaozinho', 'images/balaozinho.png', 64, 52);
}

function create () {
    console.log('create init')
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.counterCatineos = 0;
    this.counterPontos = 0;

    var background = game.add.sprite(0, 0, 'background');

    var vasourinha = game.add.sprite(620, 30, 'vasourinha');
    vasourinha.inputEnabled = true;
    vasourinha.input.enableDrag();

    this.almofadinha = game.add.sprite(420, 480, 'almofadinha');
    this.aguinha = game.add.sprite(120, 505, 'aguinha');
    this.racao = game.add.sprite(020, 440, 'racao');
    this.caixinha = game.add.sprite(260, 205, 'caixinha');

    this.brinquedinho = game.add.sprite(620, 430, 'brinquedinho');
    var bounce = this.brinquedinho.animations.add('bounce');
    this.brinquedinho.animations.play('bounce', 50, true);

    //falta por brinquedo
    this.items = [this.racao, this.aguinha, this.caixinha, this.almofadinha, this.brinquedinho];

    this.balaozinho = game.add.sprite(0, 0, 'balaozinho');
    this.balaozinho.visible = false;

    this.catineo = game.add.sprite(game.world.centerX, game.world.centerY, 'catineo');
    this.counterCatineos += 1;
    
    this.catineo.inputEnabled = true;
    this.catineo.input.enableDrag();
    this.catineo.anchor.setTo(0.5, 0.5);

    var walk = this.catineo.animations.add('walk');
    this.catineo.animations.play('walk');

    this.balaozinho.alignTo(this.catineo, Phaser.TOP_RIGHT, 16);

    this.text = game.add.text(100, 120, "Pontos de Atração: " + this.counterPontos
                                 + '\n Gatineos: ' + this.counterCatineos);
    this.text.fill = '#ffffff';
    this.text.font = 'Arial';

    timer = game.time.create(false);
    timer.loop(6000, changeStatus, this);
    timer.loop(7000, decreaseLife, this);
    timer.start();

    console.log('create end')
}

function criarNovoCatineo(){

}

function walking(catineo){
    catineo.animations.stop();
}

function changeStatus(){
    if (this.balaozinho.visible == false){
        this.balaozinho.visible = true;
        status = Math.floor((Math.random() * 5)); 
        this.balaozinho.animations.frame = status;
    }
    
}

function decreaseLife(){
    //TODO: timer de status
}

function status(){
    //randomize
    var pics = [ 0, 1, 2, 3, 4, 5 ];
    var i = 0;
    
    pics.forEach(function(pic) {

        
        pic.animations.frame = 2;

        game.time.events.add(1000 + (i * 500), this.showPicture, this, pic);
        i++;

    });
}

function update () {


    if (checkOverlap(this.catineo, this.brinquedinho)){
      this.text.setText("Pontos de Atração: " + this.counterPontos
                                 + '\n Gatineosss: ' + this.counterCatineos);
    } 

    this.balaozinho.alignTo(this.catineo, Phaser.TOP_RIGHT, 16);

    // this.items.forEach(function(item) {
    //     if (checkOverlap(item, this.gatineo)){
    //         if (this.balaozinho.animations.frame == 0){
    //             console.log("memes");
    //         }
    //     }
    // });

}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}