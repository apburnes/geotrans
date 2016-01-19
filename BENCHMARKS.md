benchmarks
==========

## gdal2tif

#### Compression: _NONE_

```bash
$ gdal_translate -co COMPRESS=NONE input.pdf output.tif
```

__Processing Time__

- real    4m51.203s
- user    4m49.466s
- sys     0m1.452s

__File Size__

- Input PDF: ~28MB
- Output TIF: ~44MB

#### Compression: _JPEG_

```bash
$ gdal_translate -co COMPRESS=JPEG input.pdf output.tif
```

__Processing Time__

- real    28m15.700s
- user    28m5.665s
- sys     0m8.445s

__File Size__

- Input PDF: ~28MB
- Output TIF: ~9MB


#### Compression: _DEFLATE_

_Default ZLEVEL(1-9) Compression: 6_

```bash
$ gdal_translate -co COMPRESS=DEFLATE input.pdf output.tif
```

__Processing Time__

- real    4m50.365s
- user    4m48.734s
- sys     0m1.352s

__File Size__

- Input PDF: ~28MB
- Output TIF: ~23MB


#### Compression: _DEFLATE -multi-threaded_

```bash
$ gdal_translate -co COMPRESS=DEFLATE -co NUM_THREADS=ALL_CPUS input.pdf output.tif
```

__Processing Time__

- real    4m54.963s
- user    4m54.266s
- sys     0m1.572s

__File Size__

- Input PDF: ~28MB
- Output TIF: ~9MB

