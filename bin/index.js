#!/usr/bin/env node

import fs from 'fs';
import generateImageManifest from '../lib/image-manifest.js';

function usage() {
  console.log(
`Usage: wg-image-manifest [options] <image-dir-path>

Options:
  -o=<output-file>: write the manifest to an output file
  -h, --help:       display this help message
`
  );
}

const args = process.argv;

if (args.length < 3) {
  usage();
  process.exit(1);
}

const options = args.slice(2, -1);
if (options.includes('-h') || options.includes('--help')) {
  usage();
  process.exit(0);
}

const outputFile = options.find(o => o.startsWith('-o='))?.split('=')[1];

const path = args[args.length - 1];

const manifest = JSON.stringify(generateImageManifest(path), null, 2) + "\n";
if (outputFile) {
  if (outputFile.endsWith('.json')) {
    fs.writeFileSync(outputFile, manifest);
  } else {
    fs.writeFileSync(outputFile + ".json", manifest);
  }
} else {
  console.log(manifest);
}
