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
  --image:          only include files with an image extension (.jpg, .jpeg, .png, .bmp)
  --audio:          only include files with an audio extension (.ogg, .mp3, .wav)           
  -e=<extensions>:  use a custom, comma-separated list of extensions (example: -e=ts,js,jsx,json) 
`
  );
}

function findExtensions(options) {
  return options.map(o => {
    if (o === '--image') return IMAGE_FILE_EXTENSIONS;
    if (o === '--audio') return AUDIO_FILE_EXTENSIONS;
    if (o.startsWith('-e=')) return o.split('=')[1].split(',');
    return [];
  }).flat();
}

const args = process.argv;

if (args.length < 3) {
  usage();
  process.exit(1);
}

const options = args.slice(2);
if (options.includes('-h') || options.includes('--help')) {
  usage();
  process.exit(0);
}

const outputFile = options.find(o => o.startsWith('-o='))?.split('=')[1];

const extensions = findExtensions(options);
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
