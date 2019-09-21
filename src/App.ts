/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

namespace App {
  export let game: Phaser.Game = null;
}

async function launch(): Promise<void> {

  let game = new Tty.Game();
  App.game = game;
}

window.onload = launch;
