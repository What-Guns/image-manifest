# What Guns Image Manifest Generator
NPM module to generate a manifest of all of the images in a given folder, for purposes of loading them in the browser without having to hardcode all of the iamge paths.

## Usage
### Generating the manifest
Maybe someday this will be on NPM. Until then, download and install the repository:
````
    $ npm install -g ./
````
Pass in the directory where this images are located. By default, the manifest will go to standard output:
````
    $ wg-image-manifest ./images
````
To write the manifest to a file, use the `-o` tag:
````
    $ wg-image-manifest -o=imageManifest.json ./images
````
If you have a `watch` program installed, you can keep the manifest up to date:
````
    $ watch "wg-image-manifest -o=imageManifest.json ./images"
````

### Using the manifest
If the manifest is written to a known place, a website could `fetch` the manifest, then use the file paths to create `Image` objects to draw to a canvas. I'm working on another project that will provide facilites for using this manifest.
