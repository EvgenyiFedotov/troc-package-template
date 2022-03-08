const { spawn } = require("child_process");
const { resolve } = require("path");
const { readFile, writeFile } = require("fs/promises");

const file = resolve(__dirname, "../dist/cli.js");
const child = spawn("chmod", ["+x", file]);

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

readFile(file)
  .then((data) => data.toString())
  .then((data) => writeFile(file, `#!/usr/bin/env node\n${data}`));
