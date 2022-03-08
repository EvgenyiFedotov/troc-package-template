const { exec } = require("child_process");

class CustomPlugin {
  constructor(name, command, stage = "afterEmit") {
    this.name = name;
    this.command = command;
    this.stage = stage;
  }

  static execHandler(_err, stdout, stderr) {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
  }

  apply(compiler) {
    compiler.hooks[this.stage].tap(this.name, () => {
      exec(this.command, CustomPlugin.execHandler);
    });
  }
}

module.exports = CustomPlugin;
