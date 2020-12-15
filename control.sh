#!/bin/bash

azCorrection=0
alCorrection=0
zoom=0

if [ "$1" = "tl" ]
then
    folder="dest_folder/"
    mkdir -p $folder
fi

IFS=','
while true 
do
    location=$(node sun_location.mjs)
    read -ra coord <<< "$location"
    node ptz_control.js ${coord[0]} $azCorrection ${coord[1]} $alCorrection $zoom

    if [ "$1" = "tl" ]
    then
        filename=$(date +%Y-%m-%d_%H.%M.%S)".jpg"
        ffmpeg -rtsp_transport tcp -i "<rtsp address>" -r 1 -vframes 1 $folder$filename
    fi

done
