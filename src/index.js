#!/usr/bin/env node

const fs = require("fs");

function createFile() {
  const filename = process.argv[2];
  const cwd = process.cwd();
  fs.writeFileSync(
    `${cwd}/${filename}`,
    "export default function helloWold() { console.log('Hello World') }"
  );
  console.log(`${filename} created at ${cwd}`);
}

createFile();
