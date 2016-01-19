gdallocationinfo command
========================

A GDAL utility used to get the value from a raster with a specified X and Y.

## Examples for `gdallocationinfo`

----

#### Retrieving the elevation value from an ArcGRID raster at a specified pixel.

```bash
$ gdallocationinfo dem/grdn34w112_1/ 0 0

## Prints
Report:
  Location: (0P,0L)
  Band 1:
    Value: 1163.3466796875
```

__Breakdown__
- This command uses `gdallocationinfo` to find the elevation value for the targeted 1 Arc Second ArcGRID DEM (`dem/grdn34w112`) at the top left hand corner pixel location `0 0` in the raster.

----

#### Retrieving the elevation value from an ArcGRID raster at a known latitude and longitude.

```bash
$ gdallocationinfo dem/grdn34w112 -wgs84 -111 33.5

## Prints
Report:
  Location: (3606P,1805L)
  Band 1:
    Value: 941.87890625
```

__Breakdown__
- This command finds the elevation value for the targeted 1 Arc Second ArcGRID DEM (`dem/grdn34w112`) at latitude __33.5__ and longitude of __-111__ specified by the geographic coordinate system flag of `-wgs84`.

----

#### Retrieving the elevation value from an ArcGRID raster at a known XY from a specific Coordinate System.

```bash
$ gdallocationinfo dem/grdn34w112 -l_srs EPSG:3857 -12356483.8043  3961870.9328

## Prints
Report:
  Location: (3605P,1805L)
  Band 1:
    Value: 949.153442382812
```

__Breakdown__
- This command finds the elevation value for the targeted 1 Arc Second ArcGRID DEM (`dem/grdn34w112`) at the meter X __33.5__ and meter Y __-111__ specified by coordinate system input value `-l_srs` set to web mercator `EPSG:3857`.

----
