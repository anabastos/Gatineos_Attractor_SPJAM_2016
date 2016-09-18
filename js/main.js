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

    game.load.spritesheet('gatineo', 'images/gatineo.png', 88, 80);
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
    
    this.life = 3;
    this.countergatineos = 0;
    this.counterPontos = 0;

    var background = game.add.sprite(0, 0, 'background');

    this.vasourinha = game.add.sprite(620, 30, 'vasourinha');
    this.vasourinha.inputEnabled = true;
    this.vasourinha.input.enableDrag();

    //Cria itemzinhos
    this.almofadinha = game.add.sprite(420, 480, 'almofadinha');
    this.aguinha = game.add.sprite(120, 505, 'aguinha');
    this.racao = game.add.sprite(020, 440, 'racao');
    this.caixinha = game.add.sprite(260, 205, 'caixinha');
    this.brinquedinho = game.add.sprite(620, 430, 'brinquedinho');
    var bounce = this.brinquedinho.animations.add('bounce');
    this.brinquedinho.animations.play('bounce', 2, true);

    //poe na famigerada lista as coisa
    this.items = [this.racao, this.aguinha, this.caixinha, this.almofadinha, this.brinquedinho];

    //cria gatineo
    this.gatineo = game.add.sprite(game.world.centerX, game.world.centerY, 'gatineo');
    this.countergatineos += 1;
    this.gatineo.inputEnabled = true;
    this.gatineo.input.enableDrag();
    this.gatineo.anchor.setTo(0.5, 0.5);
    var walk = this.gatineo.animations.add('walk');
    walk.enableUpdate = true;
    this.gatineo.animations.play('walk', 3, true);
    this.gatineo.status = -1;

    //cria balaozinho de status junto ao gatineo
    this.balaozinho = game.add.sprite(0, 0, 'balaozinho');
    this.balaozinho.visible = false;
    this.balaozinho.alignTo(this.gatineo, Phaser.TOP_RIGHT, 16);

    //text menu
    this.text = game.add.text(100, 120, "Pontos de Atração: " + this.counterPontos
                                 + '\n Gatineos: ' + this.countergatineos + "  Vidas: " + this.life );
    this.text.fill = '#ffffff';
    this.text.font = 'Arial';

    timer = game.time.create(false);
    timer.loop(3000, changeStatus, this);
    timer.loop(7000, decreaseLife, this);
    timer.loop(3000, walking, this);
    timer.start();

    console.log('create end')
}

function walking(){


    var walkDirection = Math.floor((Math.random() * 4) + 1); 
    //Se for 1 ou 2 o gato anda no eito x, se for impar o eixo x e' decrescido
    if (walkDirection <= 2){
        var x = this.gatineo.x + 100*(Math.pow(-1, walkDirection));
    } else {
        var y = this.gatineo.y + 100*(Math.pow(-1, walkDirection));
    }
    this.gatineo.rotation = this.game.physics.arcade.movetoXY(this.gatineo, x, y, 300);
    //this.gatineo.animations.play('walk', 3, true);
    this.gatineo.animations.frame = 1;

}

function changeStatus(){
    if (this.balaozinho.visible == false){
        this.balaozinho.visible = true;
        status = Math.floor((Math.random() * 5) + 1); 
        this.gatineo.status = status - 1;
        this.balaozinho.animations.frame = status - 1;
    }
    
}

function decreaseLife(){
    //TODO: timer de status
}

function update () {


    if (checkOverlap(this.gatineo, this.brinquedinho)){
      this.text.setText("Pontos de Atração: " + this.counterPontos
                                 + '\n Gatineosss: ' + this.countergatineos);
    } 

    this.balaozinho.alignTo(this.gatineo, Phaser.TOP_RIGHT, 16);

    var pontuou = 0;
    this.items.forEach((item, index) => {
        if (checkOverlap(item, this.gatineo)){
            if ((this.gatineo.status == index) && (pontuou == 0)){
                this.point = game.add.text(0, 0, "+20");
                this.point.alignTo(this.gatineo, Phaser.TOP_RIGHT, 16);
                this.counterPontos += 20;
                pontuou = 1;
            }
        }
    });
    //destruir ponto

    //this.gatineo.body.velocity.x = 0;
    //this.gatineo.body.velocity.y = 0;
}



function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}