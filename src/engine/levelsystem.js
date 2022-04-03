class LevelSystem {
  level = null;
  constructor({ game }) {
    this.game = game;
  }

  changeLevel(level) {
    if (this.level) {
      for (const c of this.game.objects.objects) {
        this.game.objects.remove(c);
      }
      if (this.level.disable) {
        this.level.disable();
      }
    }
    this.game.objects.handlePending();
    this.game.emit("levelunloaded");
    this.level = level;
    if (this.level) {
      for (const c of this.level.objects) {
        this.game.objects.add(c);
      }
      if (this.level.enable) {
        this.level.enable();
      }
    }
    this.game.objects.handlePending();
    this.game.emit("levelchanged");
  }
  restartLevel() {
    this.changeLevel(this.level.clone({ game: this.game }));
  }
  hasNextLevel(level) {
    const _level = level || this.level;
    return _level && _level.nextLevel;
  }
  nextLevel(level) {
    const nextLevel = (level || this.level).nextLevel({ game: this.game });
    this.changeLevel(nextLevel);
  }
}

export default LevelSystem;
