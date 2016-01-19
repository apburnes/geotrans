geo-transform
=============

Transform geodata formats... with GDAL!

## PreReqs

See [PREREQS.md](/PREREQS.md)

## Benchmarks

See [BENCHMARKS.md](/BENCHMARKS.md)

## Install

Packaged using Nodejs and NPM.

```bash
## Install globally
$> npm install git+ssh://git@ngtocgit.cr.usgs.gov/aburnes/geo-transfom -g
```

## Usage - Command Line

### pdf2tif

Convert a geopdf to tif

```bash
$> geotrans pdf2tif input.pdf output.tif
```

##### Options

- `--clipped`: Clips the geopdf topo map to the neatline so the output tif is just the data on the map.
- `--topo-type`: Select from a preset layer configs
  - Default: `all`
  - Others: `terrain`, `imagery`, `carto`
- `--layers`: A list of comma seperated layers wraped in double quotes
  - example: `--layers "geographic_names,structures,transportation,road_names"`
- `--compress`: Compress the output tif dem
  - types:
    - Default: `None`
    - Others: `JPEG`, `DEFLATE`, `LZW`

### grid2tif

Convert an Arc Grid dem to tif

```bash
$> geotrans grid2tif input_dem/ output_dem.tif
```

##### Options

- `--compress`: Compress the output tif dem
  - types:
    - Default: `None`
    - Others: `JPEG`, `DEFLATE`, `LZW`

### grid2img

Convert an Arc Grid dem to img

```bash
$> geotrans grid2img input_dem/ output_dem.tif
```

##### Options

- `--compress`: Compress the output tif dem
  - types:
    - Default: `None`
    - Others: `JPEG`, `DEFLATE`, `LZW`

## Underlying Commands

Currently, Node.js is only used to build/streamline the cli interface/interactions and manage the child processes. Most `geotrans` functions
can be called directly from the command prompt if desired. This is a rundown on the processes actually being called.

- See [geotransAsGDAL.md](/doc/geotransAsGDAL.md)

For other GDAL commands that are not built into the `geotrans` module, look through the `doc` folder to learn how to integrate GDAL with USGS data.

- See [doc](/doc)

## Contact

aburnes@usgs.gov
