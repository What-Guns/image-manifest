import fs from 'fs';

function addManifestEntry(path, extensions) {
  return function(manifest, fileName) {
    const stat = fs.statSync(path + "/" + fileName);
    if (stat.isDirectory()) {
      manifest[fileName] = generateManifest(path + "/" + fileName, extensions);
    } else {
      const chunks = fileName.split('.');
      const nameOfFile = chunks.slice(0, -1).join('.');
      const extension = chunks.slice(-1)[0];
      if (extensions.includes(extension)) {
        manifest[nameOfFile] = path + "/" + fileName;
      }
    }
    return manifest;
  }
}

function generateManifest(path, extensions) {
  return fs.readdirSync(path).reduce(addManifestEntry(path, extensions), {});
}

export default generateManifest;
