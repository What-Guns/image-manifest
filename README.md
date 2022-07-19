# What Guns Manifest Generator
`wg-manifest` is a script to generate a JSON file containing a manifest of all of the files in a given folder and its subfolders. This is intended for use in loading images and audio into JavaScript/HTML browser games: the game can fetch the manifest, then load all images from the manifest by fetching their paths.

## Usage
### Generating the manifest
Install this NPM module:
````
    $ npm install -g wg-manifest 
````
Pass in the directory on which the manifest should be generated. By default, the manifest will go to standard output:
````
    $ wg-manifest ./images
````
To write the manifest to a file, use the `-o` tag:
````
    $ wg-manifest -o=imageManifest.json ./images
````
To restrict the manifest to only certain file extensions, use `--audio`, `--image`, or a custom list of extensions with `-e`;
````
    $ wg-manifest --audio --image -e=tiff,json ./media
````
If you have a `watch` program installed, you can keep the manifest up to date:
````
    $ watch "wg-manifest -o=imageManifest.json ./images"
````

### Using the manifest
If the manifest is written to a known place, a website could `fetch` the manifest, then use the file paths to create `Image` objects to draw to a canvas. I'm working on another project that will provide facilites for using this manifest.
