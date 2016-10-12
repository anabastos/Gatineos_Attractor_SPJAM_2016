import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    var almofadinha = this.load.image('almofadinha', 'assets/images/almofadinha.png');
    var caixinha = this.load.image('caixinha', 'assets/images/caixinha.png');
    var brinquedinho = this.load.spritesheet('brinquedinho', 'assets/images/brinquedinho.png', 104, 52);
    //var bounce = brinquedinho.animations.add('bounce');
    //brinquedinho.animations.play('bounce', 2, true);
    var aguinha = this.load.spritesheet('aguinha', 'assets/images/aguinha.png', 60, 32);
    var racao = this.load.spritesheet('racao', 'assets/images/racao.png', 60, 32);

    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('background', 'assets/images/background.png');
    this.load.image('vasourinha', 'assets/images/vasourinha.png');
    this.load.image('mijo', 'assets/images/mijo.png');
    this.load.image('bolapelo', 'assets/images/bolapelo.png');
    this.load.spritesheet('balaozinho', 'assets/images/balaozinho.png', 64, 52);
    this.load.spritesheet('gatineo', 'assets/images/gatineo.png', 88, 80);
  
    this.items = [racao, aguinha, caixinha, almofadinha, brinquedinho];
  }

  create () {
    this.state.start('Game')
  }

}
