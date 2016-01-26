#[Open Source Routing Machine](http://project-osrm.org/)
The Open Source Routing Machine (OSRM) provides travel distances, times, and routing directions between latitude and longitude point pairs. These directions are useful for several situations such as when considering locations of new facilities such as VHA Hospitals or Clinics. 

OSRM is easily built on open-source platforms such as Ubuntu. In this example, I build OSRM on a Google Compute Instance, and extract routing data for North America.

Create a GCE instance, but make sure to allocate adequate disk space. The compressed US-Midwest osm file is over 1.5GB.

After creating a Ubuntu 14.04 instance, run:

    sudo apt-get install build-essential git cmake pkg-config \
    libbz2-dev libstxxl-dev libstxxl-doc libstxxl1 libxml2-dev \
    libzip-dev libboost-all-dev lua5.1 liblua5.1-0-dev libluabind-dev libluajit-5.1-dev libtbb-dev


Then, to download and build OSRM:

    git clone https://github.com/Project-OSRM/osrm-backend.git
    cd osrm-backend
    mkdir -p build
    cd build
    cmake ..
    make
    sudo make install


OSRM extracts the road network information from mapping data. North American mapping data is availalble from [Geofabrik](http://download.geofabrik.de/north-america.html).

To get the US Midwest up and running:

    wget http://download.geofabrik.de/north-america/us-midwest-latest.osm.pbf
    ./osrm-extract us-midwest-latest.osm.pbf
    ./osrm-prepare us-midwest-latest.osrm
    ./osrm-routed us-midwest-latest.osrm




Resources:
https://www.digitalocean.com/community/tutorials/how-to-set-up-an-osrm-server-on-ubuntu-14-04


