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

    //game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
}

function create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.counterLife = 3;
    this.countergatineos = 0;
    this.counterPontos = 0;

    var music = game.add.audio('boden');
    music.play();

    var background = game.add.sprite(0, 0, 'background');

    this.vasourinha = game.add.sprite(620, 30, 'vasourinha');
    this.vasourinha.inputEnabled = true;
    this.vasourinha.input.enableDrag();

    //Cria itemzinhos
    this.almofadinha = game.add.sprite(420, 530, 'almofadinha');
    this.aguinha = game.add.sprite(140, 555, 'aguinha');
    this.racao = game.add.sprite(20, 490, 'racao');
    this.caixinha = game.add.sprite(260, 205, 'caixinha');
    this.brinquedinho = game.add.sprite(660, 480, 'brinquedinho');
    var bounce = this.brinquedinho.animations.add('bounce');
    this.brinquedinho.animations.play('bounce', 2, true);

    //poe na famigerada lista as coisa
    this.items = [this.racao, this.aguinha, this.caixinha, this.almofadinha, this.brinquedinho];

    //cria gatineo

    gatineos = game.add.group;

    this.gatineo = game.add.sprite(game.world.centerX, game.world.centerY, 'gatineo');
    
    this.game.physics.arcade.enable(this.gatineo);
    this.gatineo.originalPosition =  this.gatineo.position.clone();

    this.gatineo.inputEnabled = true;
    this.gatineo.input.enableDrag();
    this.gatineo.events.onDragStart.add(onDragStart, this);
    this.gatineo.events.onDragStop.add( function(currentSprite, endSprite){
        if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {
            currentSprite.input.draggable = false;
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
      })){ 
            currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
        if (this.gatineo.status != -1){
            this.balaozinho.visible = true;
        }
    }, this);

    this.gatineo.anchor.setTo(0.5, 0.5);
    //console.log("#"+((1<<24)*Math.random()|0).toString(16))
    //this.gatineo.tint = "#"+((1<<24)*Math.random()|0).toString(16);
    var walk = this.gatineo.animations.add('walk');
    walk.enableUpdate = true;
    this.gatineo.animations.play('walk', 3, true);
    this.gatineo.status = -1;
    this.gatineo.life = 3;
    this.gatineoTween = game.add.tween(this.gatineo);

    //cria balaozinho de status junto ao gatineo
    this.balaozinho = game.add.sprite(0, 0, 'balaozinho');
    this.balaozinho.visible = false;
    this.balaozinho.alignTo(this.gatineo, Phaser.TOP_RIGHT, 16);

    //text menu
    this.countergatineos += 1;
    this.text = game.add.text(100, 120, "Pontos de Atração: " + this.counterPontos
                                 + '\n Gatineos: ' + this.countergatineos + "  Vidas: " + this.counterLife );
    this.text.fill = '#ffffff';
    this.text.font = 'Arial';
    this.point = game.add.text(0, 0, "");

    this.timeTreta = 1;

    if (this.counterLife != 0){
        timer = game.time.create(false);
        timer.loop(13000, changeStatus, this);
        timer.loop(5000, checkStatus, this);
        timer.loop(20000, pee, this);
        timer.loop(8000, walking, this);
        timer.loop(2000, fadeTextPoint, this);
    }
   
    timer.start();
}

function fadeTextPoint() {
    this.point.visible = false;
}

function onDragStart(){
    this.balaozinho.visible = false;
}

function checkStatus(){
    if (this.gatineo.status != -1){
        this.gatineo.life -= 1;
    }
}


function pee(){
    this.peeOrPelo = Math.floor((Math.random() * 2)) ? game.add.sprite(0, 0, 'bolapelo') : game.add.sprite(0, 0, 'mijo'); 
    this.peeOrPelo.alignTo(this.gatineo, Phaser.BOTTOM_RIGHT, 16);
}

function walking(){
    //if (this.gatineo.status == -1){
        var walkDirection = Math.floor((Math.random() * 4) + 1); 
        //Se for 1 ou 2 o gato anda no eito x, se for impar o eixo x e' decrescido
        if (walkDirection <= 2){
            //this.gatineo.scale.x *= Math.pow(-1, walkDirection);
            var positionTweenX = this.gatineo.position.x + 120*(Math.pow(-1, walkDirection));
            console.log('x' + positionTweenX);
            this.gatineoTween.to({ x: positionTweenX}, 3000, 'Linear', true, 0);
        } else {
            var positionTweenY = this.gatineo.position.y + 120*(Math.pow(-1, walkDirection));
            if (positionTweenY > 185 && positionTweenY < 500){
                console.log('y' + positionTweenY);
                this.gatineoTween.to({ y: positionTweenY}, 3000, 'Linear', true, 0);
            }
        }
        this.gatineo.animations.frame = 1;
    //}
    
}

function changeStatus(){
    if (this.balaozinho.visible == false){
        this.balaozinho.visible = true;
        status = Math.floor((Math.random() * 5) + 1); 
        this.gatineo.status = status - 1;
        this.balaozinho.animations.frame = status - 1;
        //timer.loop(8000, decreaseLife(status), this);
    }
    
}

function update () {

    this.timeTreta += 1
    this.balaozinho.alignTo(this.gatineo, Phaser.TOP_RIGHT, 16);

    this.items.forEach((item, index) => {
        if (checkOverlap(item, this.gatineo)){
            if ((this.gatineo.status == index)){
                this.point.visible = true;
                this.point.setText("+20");
                this.point.alignTo(this.gatineo, Phaser.TOP_TOP, 16);
                this.counterPontos += 20;
                this.balaozinho.visible = false;
                this.gatineo.status = -1;
                this.gatineo.life = 3;
            }
        }
    });


    if (this.peeOrPelo){
        if (checkOverlap(this.peeOrPelo, this.vasourinha) && this.peeOrPelo.visible == true){
            this.point.visible = true;
                this.point.setText("+10");
                this.point.alignTo(this.gatineo, Phaser.TOP_TOP, 16);
            this.counterPontos += 10;
            this.peeOrPelo.visible = false;
        }
    }
    
    this.text.setText("Pontos de Atração: " + this.counterPontos
                         + '\n Gatineos: ' + this.countergatineos + '  Vidas: ' + this.counterLife);

    if (this.counterLife == 0){
        gameOver(this.text);
    }
    this.counterLife = decreaseLife(this.gatineo, this.balaozinho, this.counterLife);
}

function decreaseLife(gatineo, balaozinho, life){
    if (gatineo.life == 0){
        life -= 1;
        gatineo.visible = false;
        balaozinho.visible = false;
        gatineo.life = 3;
        gatineo.status = -1;
    }
    return life;
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function gameOver(text){
    text.setText("Game Over! " + this.counterPontos + "Pontos de Atração e \n"
        + this.countergatineos + " Gatineos!");
};