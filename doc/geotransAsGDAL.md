gdal_commands
=============

The geo-translate `geotrans` command line tool is a wrapper to conviently and reliably call the GDAL toolset to translate TopoPDFs and rasters.  For a better understanding of this module, this list will go over the GDAL commands used by the module functions.

## Commands for `geotrans`

---

## `pdfinfo`

Used to print metadata regarding a Topo GeoPDF with `gdalinfo`

---

## Example

```bash
$ gdalinfo topo_map.pdf -mdd LAYERS

### output
Driver: PDF/Geospatial PDF
Files: topo_map.pdf
Size is 3412, 4350
Coordinate System is:
PROJCS["UTM Zone 12, Northern Hemisphere",
    GEOGCS["unknown",
        DATUM["North_American_Datum_1983",
            SPHEROID["GRS 1980",6378137,298.257222101],
            TOWGS84[0.9738,-1.9453,-0.5486,0,0,0,0]],
        PRIMEM["Greenwich",0],
        UNIT["degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["latitude_of_origin",0],
    PARAMETER["central_meridian",-111],
    PARAMETER["scale_factor",0.9996],
    PARAMETER["false_easting",500000],
    PARAMETER["false_northing",0],
    UNIT["Meter",1]]
GeoTransform =
  406119.3385113286, 4.063845019161707, -0.03670410685413894
  3722560.367061069, -0.03670410685413894, -4.063845019161707
Metadata:
  AUTHOR=USGS National Geospatial Technical Operations Center
  CREATION_DATE=D:20141120133217Z
  CREATOR=ESRI ArcSOC 10.0.2.3200
  KEYWORDS=Topographic, Transportation, Hydrography, Orthoimage, U.S. National Grid, imageryBaseMapsEarthCover, Imagery and Base Maps, Geographic Names Information System
  NEATLINE=POLYGON ((418902.57026353 3720981.8615796,418776.290233006 3707000.25251582,407051.271884205 3707106.15131962,407177.551914731 3721087.7603834,418902.57026353 3720981.8615796))
  SUBJECT=This image map depicts geographic features on the surface of the earth.  It was created to provide a representation of accessible geospatial data which is readily available to enhance the capability of Federal, State, and local emergency responders for homeland security efforts.  This image map is generated from selected National Map data holdings and other cartographic data.
  TITLE=USGS 7.5-minute image map for Paradise Valley, Arizona
Metadata (LAYERS):
  LAYER_00_NAME=Map_Collar
  LAYER_01_NAME=Map_Collar.Map_Elements
  LAYER_02_NAME=Map_Frame
  LAYER_03_NAME=Map_Frame.Projection_and_Grids
  LAYER_04_NAME=Map_Frame.Geographic_Names
  LAYER_05_NAME=Map_Frame.Structures
  LAYER_06_NAME=Map_Frame.Transportation
  LAYER_07_NAME=Map_Frame.Transportation.Road_Names_and_Shields
  LAYER_08_NAME=Map_Frame.Transportation.Road_Features
  LAYER_09_NAME=Map_Frame.Transportation.Trails
  LAYER_10_NAME=Map_Frame.Transportation.Railroads
  LAYER_11_NAME=Map_Frame.Transportation.Airports
  LAYER_12_NAME=Map_Frame.PLSS
  LAYER_13_NAME=Map_Frame.Hydrography
  LAYER_14_NAME=Map_Frame.Terrain
  LAYER_15_NAME=Map_Frame.Terrain.Contours
  LAYER_16_NAME=Map_Frame.Terrain.Shaded_Relief
  LAYER_17_NAME=Map_Frame.Woodland
  LAYER_18_NAME=Map_Frame.Boundaries
  LAYER_19_NAME=Map_Frame.Boundaries.Jurisdictional_Boundaries
  LAYER_20_NAME=Map_Frame.Boundaries.Jurisdictional_Boundaries.International
  LAYER_21_NAME=Map_Frame.Boundaries.Jurisdictional_Boundaries.State_or_Territory
  LAYER_22_NAME=Map_Frame.Boundaries.Jurisdictional_Boundaries.County_or_Equivalent
  LAYER_23_NAME=Map_Frame.Boundaries.Federal_Administered_Lands
  LAYER_24_NAME=Map_Frame.Boundaries.Federal_Administered_Lands.National_Park_Service
  LAYER_25_NAME=Map_Frame.Boundaries.Federal_Administered_Lands.Department_of_Defense
  LAYER_26_NAME=Map_Frame.Boundaries.Federal_Administered_Lands.Forest_Service
  LAYER_27_NAME=Images
  LAYER_28_NAME=Images.Orthoimage
  LAYER_29_NAME=Barcode
Corner Coordinates:
Upper Left  (  406119.339, 3722560.367) (112d 0'44.33"W, 33d38'19.45"N)
Lower Left  (  405959.676, 3704882.641) (112d 0'43.82"W, 33d28'45.49"N)
Upper Right (  419985.178, 3722435.133) (111d51'46.09"W, 33d38'19.46"N)
Lower Right (  419825.515, 3704757.407) (111d51'46.57"W, 33d28'45.48"N)
Center      (  412972.427, 3713658.887) (111d56'15.20"W, 33d33'32.55"N)
Band 1 Block=3412x1 Type=Byte, ColorInterp=Red
Band 2 Block=3412x1 Type=Byte, ColorInterp=Green
Band 3 Block=3412x1 Type=Byte, ColorInterp=Blue
```

---

## `pdf2tif`

Used to convert a Topo GeoPDF to a Tiff image with customizeable outputs with `gdal_translate`.

---

# Examples

---

## Simple

```bash
$ gdal_translate topo_map.pdf output_topo_map.tif -of GTiff
```

__Breakdown__
- `gdal_translate`: A command line utility provided available when GDAL is installed.
- `topo_map.pdf`: The path and filename to an existing Topo GeoPDF from which the export is derived.
- `output_topo_map.tif`: The path & filename of the to be created GeoTiff which is derived from the `topo_map.pdf`.
- `-of GTiff`: The option GDAL uses to know the desired output format of the translated Topo GeoPDF.

---

## Custom Layers

Create a map with just the vector data and no labels.  See [`pdfinfo`](#pdfinfo) to get all Topo GeoPDF layers.

```bash
$ gdal_translate topo_map.pdf output_topo_map.tif -of GTiff --config GDAL_PDF_LAYERS "Map_Collar,Map_Collar.Map_Elements,Map_Frame,Map_Frame.Projection_and_Grids,Map_Frame.Structures,Map_Frame.Transportation,Map_Frame.Transportation.Road_Features,Map_Frame.Transportation.Trails,Map_Frame.Transportation.Railroads,Map_Frame.Transportation.Airports,Map_Frame.Hydrography,Map_Frame.Terrain,Map_Frame.Terrain.Contours,Map_Frame.Woodland,Map_Frame.Boundaries,Map_Frame.Boundaries.Jurisdictional_Boundaries,Map_Frame.Boundaries.Jurisdictional_Boundaries.International,Map_Frame.Boundaries.Jurisdictional_Boundaries.State_or_Territory,Map_Frame.Boundaries.Jurisdictional_Boundaries.County_or_Equivalent,Map_Frame.Boundaries.Federal_Administered_Lands,Map_Frame.Boundaries.Federal_Administered_Lands.National_Park_Service,Map_Frame.Boundaries.Federal_Administered_Lands.Department_of_Defense,Map_Frame.Boundaries.Federal_Administered_Lands.Forest_Service,Barcode"
```

__Breakdown__
- `--config GDAL_PDF_LAYERS`: The config option which takes a list of comma seperated map layers to be added to the created tiff.
  - _Default:_ ALL

---

## With Compression

```bash
$ gdal_translate topo_map.pdf output_topo_map.tif -of GTiff -co COMPRESS=DEFLATE
```

__Breakdown__
- `-co`: A option GDAL uses for the GeoTiff creation options.
  - `COMPRESS=DEFLATE`: A `-co` value to tell GDAL to compress the tiff using a deflate algorithm
    - Default: _NONE_
    - Available: _JPEG, LZW, PACKBITS, DEFLATE, CCITTRLE, CCITTFAX3, CCITTFAX4 or LZMA_

---

