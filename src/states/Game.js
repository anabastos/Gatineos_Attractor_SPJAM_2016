/* globals __DEV__ */
import Phaser from 'phaser'
import Gatineo from '../sprites/Gatineo'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {

    this.counterLife = 3;
    this.countergatineos = 0;
    this.counterPontos = 0;

    //var music = game.add.audio('som');
    //music.play();
    let background = this.game.add.sprite(0, 0, 'background');

    this.score = this.add.text(250, 140, "Pontos de Atração: " + this.counterPontos
                                 + '\n Gatineos: ' + this.countergatineos
                                  + " Vidas: " + this.counterLife );
    this.score.font = 'Press Start 2P'
    this.score.fontSize = 10
    this.score.fill = '#77BFA3'
    this.score.anchor.setTo(0.5)

    this.point = game.add.text(0, 0, "");
    this.point.font = 'Press Start 2P'

    this.items = createFurniture();

    var gatineoTimer = game.time.create(false);
      //timer.loop(13000, changeStatus, this);
      //timer.loop(5000, checkStatus, this);
    gatineoTimer.loop(15000, novoGatineo, this);
    gatineoTimer.start();

    function novoGatineo(){
      this.countergatineos += 1;
      this.gatineo = new Gatineo({
        game: this.game,
        x: this.game.world.centerX,
        y: this.game.world.centerY,
        asset: 'gatineo'
      })
      this.gatineo.tint = Math.random() * 0xffffff

    // set the sprite width to 30% of the game width
      this.game.add.existing(this.gatineo)
    }

    function createFurniture(){
      var almofadinha = game.add.sprite(420, 530, 'almofadinha');
      var aguinha = game.add.sprite(140, 555, 'aguinha');
      var racao = game.add.sprite(20, 490, 'racao');
      var caixinha = game.add.sprite(260, 205, 'caixinha');
      var brinquedinho = game.add.sprite(660, 480, 'brinquedinho');
      var bounce = brinquedinho.animations.add('bounce');
      brinquedinho.animations.play('bounce', 2, true);
      return [racao, aguinha, caixinha, almofadinha, brinquedinho];
    }
  }

  

  update(){
    this.score.setText("Pontos de Atração: " + this.counterPontos
                         + '\n Gatineos: ' + this.countergatineos
                         + " Vidas: " + this.counterLife );
  }


  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.gatineo, 32, 32)
    }
  }
}
