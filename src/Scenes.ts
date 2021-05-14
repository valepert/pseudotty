namespace Tty {
  export class SceneBase extends Phaser.Scene {

    public get gameWidth(): number {
      return this.sys.game.config.width as number;
    }

    public get gameHeight(): number {
      return this.sys.game.config.height as number;
    }

    protected setView(): void {
      this.cameras.main.centerOn(0, 0);
    }
  }

  export class Boot extends SceneBase {
    protected stripCursor = (input) => input.replace(Constants.cursor, Constants.emptyString);
    protected linesNumber = (textBlock) => textBlock.split('\n').length;

    protected specialChars = [
      Phaser.Input.Keyboard.KeyCodes.SHIFT,
      Phaser.Input.Keyboard.KeyCodes.CTRL,
      Phaser.Input.Keyboard.KeyCodes.ALT,
      Phaser.Input.Keyboard.KeyCodes.UP,
      Phaser.Input.Keyboard.KeyCodes.LEFT,
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
      Phaser.Input.Keyboard.KeyCodes.DOWN
    ]

    protected keyPressed = (event) =>
      event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER ? '\n' :
      this.specialChars.some(key => key == event.keyCode) ? '' : event.key.toUpperCase();

    protected isBackSpace = (event) =>
      event.keyCode == Phaser.Input.Keyboard.KeyCodes.BACKSPACE

    protected isSpecialKey = (event) =>
      event.altKey || event.ctrlKey || event.metaKey ||
      event.keyCode == Phaser.Input.Keyboard.KeyCodes.TAB || event.keyCode == Phaser.Input.Keyboard.KeyCodes.BACKSPACE

    protected scrollText = (text) =>
      this.linesNumber(text) == Constants.screenLines ?
        text.split('\n').slice(1, Constants.screenLines).join('\n') :
        text

    protected backspaceText = (text) => {
      var lines = text.split('\n');
      var last = lines.slice(-1)[0]
      lines[lines.length - 1] = last.slice(0, last.length - 1);
      return lines.join('\n');
    }

    public create(): void {
      console.log("Starting tty...");
      this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

      this.add.text(0, 0, "*** TTY - LNR 1975 ***", {
        fontFamily: Constants.fontMonospace,
        fontSize: Constants.fontSizeSmall,
        align: 'center',
        fixedWidth: this.gameWidth,
        fixedHeight: 30,
        backgroundColor: Constants.colorWhite,
        color: Constants.colorBlue,
      }).setOrigin(0, 0);

      var terminal = this.add.text(0, 35, Constants.cursor, {
        fontFamily: Constants.fontMonospace,
        fontSize: Constants.fontSizeLarge,
        color: Constants.colorWhite,
      });

      const writeTerminal = (event) => {
        terminal.text = this.stripCursor(terminal.text);

        if (!this.isSpecialKey(event)) {
          terminal.text += this.keyPressed(event);
        }
        
        if (this.isBackSpace(event)) {
          terminal.text = this.backspaceText(terminal.text);
        }

        terminal.text += Constants.cursor;

        terminal.text = this.scrollText(terminal.text);
      }

      this.input.keyboard.on('keyup', writeTerminal);
    }
  }
}
