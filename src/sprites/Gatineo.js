import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    this.anchor.setTo(0.5)
    this.game.physics.arcade.enable(this);

	var walk = this.animations.add('walk');
    walk.enableUpdate = true;
    this.animations.play('walk', 3, true);
    this.status = -1;
    this.life = 3;
    this.gatineoTween = this.game.add.tween(this);

    this.balaozinho = game.add.sprite(0, 0, 'balaozinho');
    this.balaozinho.visible = false;

    this.inputEnabled = true;
    this.input.enableDrag();
    this.events.onDragStart.add(onDragStart, this);
    this.events.onDragStop.add((currentSprite, endSprite) => {
        if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {
            currentSprite.input.draggable = false;
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
      })){ 
            currentSprite.position.copyFrom(currentSprite.originalPosition);
        } 
        if (this.status != -1){
            this.balaozinho.visible = true;
        }
    }, this);


    var timer = game.time.create(false);
	    timer.loop(20000, changeStatus, this);
	    timer.loop(5000, checkStatus, this);
	    timer.loop(15000, walking, this);
	    timer.start();

	function changeStatus(){
	    if (this.balaozinho.visible == false){
	        this.balaozinho.visible = true;
	        var status = Math.floor((Math.random() * 5) + 1); 
	        this.status = status - 1;
	        this.balaozinho.animations.frame = status - 1;
	    }    
	}

	function checkStatus(){
	    if (this.status != -1){
	        this.life -= 1;
	    }
	}

	function walking(){
	    //if (this.gatineo.status == -1){
	        var walkDirection = Math.floor((Math.random() * 4) + 1); 
	        //Se for 1 ou 2 o gato anda no eito x, se for impar o eixo x e' decrescido
	        if (walkDirection <= 2){

	            var positionTweenX = this.x + 120*(Math.pow(-1, walkDirection));
	            this.gatineoTween.to({ x: positionTweenX}, 3000, 'Linear', true, 0);
	        } else {
	            var positionTweenY = this.y + 120*(Math.pow(-1, walkDirection));
	            if (positionTweenY > 185 && positionTweenY < 500){
	                this.gatineoTween.to({ y: positionTweenY}, 3000, 'Linear', true, 0);
	            }
	        }
	        this.animations.frame = 1;
	}

	function onDragStart(){
		this.balaozinho.visible = false;
	}

	function createBalaozinho(){

	}
	//console.log(this.balaozinho)

}

  update () {

  	if (this.game.items){
	  	this.game.items.forEach((item, index) => {
	        if (checkOverlap(item, this)){
	        	console.log("overlap!")
		        if ((this.status == index)){
		        console.log("sadjusai")
		            this.game.point.visible = true;
		            this.game.point.setText("+20");
		            this.game.point.alignTo(this, Phaser.TOP_TOP, 16);
		            this.game.counterPontos += 20;
		            this.balaozinho.visible = false;
		            this.status = -1;
		            this.life = 3;
		        }
		    }
		});
  	}
	
    function checkOverlap(spriteA, spriteB) {
      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();

      return Phaser.Rectangle.intersects(boundsA, boundsB);
    }

    this.balaozinho.alignTo(this, Phaser.TOP_RIGHT, 16);
  }

}
