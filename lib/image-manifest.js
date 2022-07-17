import fs from 'fs';

const IMAGE_FILE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'bmp',
];

function pullImages(path) {
  return function(manifest, fileName) {
    const stat = fs.statSync(path + "/" + fileName);
    if (stat.isDirectory()) {
      manifest[fileName] = generateImageManifest(path + "/" + fileName);
    } else {
      const chunks = fileName.split('.');
      const nameOfFile = chunks.slice(0, -1).join('.');
      const extension = chunks.slice(-1)[0];
      if (IMAGE_FILE_EXTENSIONS.includes(extension)) {
        manifest[nameOfFile] = path + "/" + fileName;
      }
    }
    return manifest;
  }
}

function generateImageManifest(path) {
  return fs.readdirSync(path).reduce(pullImages(path), {});
}

export default generateImageManifest;
