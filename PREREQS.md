prereqs
=======

Installation and setup guides for prerequisites software.

## GDAL v2.0

For GeoPDF's, libpoppler, libpodofo, or PDFium must be installed for read support.

#### Install for Ubuntu 14.04

```bash
#!/bin/bash

## Ubuntu
## PreReqs

sudo apt-get install subversion git
sudo apt-get install swig python-dev
sudo apt-get install cmake-qt-gui make bison flex gcc g++ libtool
sudo apt-get install lib1g-dev libcurl4-gnutls-dev liblcms2-dev liblcms2-utils

sudo apt-get install libpng12-dev libtiff4-dev
sudo apt-get install libspatialite-dev

## Instal libpoppler for GeoPDF support
sudo apt-get install libproj-dev libpoppler-dev

## Install OpenJPEG for JPEG200 Support
sudo apt-get install -y libopenjpeg-dev openjpeg-tools

## Install ESRI FileGDB API for FileGDB support
## Sign up and dowload tar.gz from ESRI
## http://www.esri.com/apps/products/download/#File_Geodatabase_API_1.4
## Save the tar.gz to $HOME
tar -zxvf FileGDB_API_1_4-64.tar.gz

cd FileGDB_API-64
export LLD_LIBRARY_PATH=`pwd` /lib
cd samples
make
sudo cp ../lib/* /usr/local/lib
sudo ldconfig
cd $HOME

## Download and configure gdal
wget http://download.osgeo.org/gdal/2.0.1/gdal-2.0.1.tar.gz
tar -zvxf gdal-2.0.1.tar.gz
cd gdal-2.0.1/
./configure --with-python --with-poppler=yes \
--with-geos --with-geotiff --with-jpeg --with-png \
--with-expat --with-libkml --with-curl --with-spatialite \
--with-fgdb=$HOME/FileGDB_API-64
make
sudo make install

```


