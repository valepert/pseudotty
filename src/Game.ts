namespace Tty {
  export class Game extends Phaser.Game {
    constructor() {
      let renderer: number = Phaser.AUTO;
      let contentWidth = 800;
      let contentHeight = 600;

      super(
        {
          type: renderer,
          parent: "content",

          width: contentWidth,
          height: contentHeight,
          title: "TTY",
          backgroundColor: Constants.colorGreen,
        }
      );

      this.scene.add("Boot", Boot);
      this.scene.start("Boot");
    }
  }
}
