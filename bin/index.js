#!/usr/bin/env node

const IMAGE_FILE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'bmp',
];

const AUDIO_FILE_EXTENSIONS = [
  'ogg',
  'mp3',
  'wav',
];

import fs from 'fs';
import generateManifest from '../lib/manifest.js';

function usage() {
  console.log(
`Usage: wg-manifest [options] <dir-path>

Options:
  -o=<output-file>: write the manifest to an output file
  -h, --help:       display this help message
  -e=audio:         only include files with an audio extension (.ogg, .mp3, .wav)
  -e=image:         only include files with an image extension (.jpg, .jpeg, .png, .bmp)
  -e=<extensions>:  use a custom, comma-separated list of extensions (example: -e=ts,js,jsx,json) 
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

let extensions = IMAGE_FILE_EXTENSIONS;
const extensionsOption = options.find(o => o.startsWith('-e='))?.split('=')[1];
if (extensionsOption === 'audio') {
  extensions = AUDIO_FILE_EXTENSIONS;
} else if (extensionsOption === 'image') {
  extensions = IMAGE_FILE_EXTENSIONS;
} else if (extensionsOption) {
  extensions = extensionsOption.split(',');
}

const path = args[args.length - 1];

const manifest = JSON.stringify(generateManifest(path, extensions), null, 2) + "\n";
if (outputFile) {
  if (outputFile.endsWith('.json')) {
    fs.writeFileSync(outputFile, manifest);
  } else {
    fs.writeFileSync(outputFile + ".json", manifest);
  }
} else {
  console.log(manifest);
}
