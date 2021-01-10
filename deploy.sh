#!/bin/bash

containers_count=$(docker ps -a | grep . -c)

containers_name=$(docker ps -a | awk 'FNR > 1 {print $NF}')

images_count=$(docker images | grep . -c)

image_names=$(docker images | awk '{print $1}')

echo 'Test env here: $MYSQL_DATABASE';



# running container count > 1 => stop & remove the containers (except db)
if [[ $containers_count -gt 1 ]]; then
    for i in "$containers_name"; do
        for name in $i; do
            if [[ $name == "xtrack-server" || $name == "xtrackdb" ]];
            then
                docker stop $name
                docker rm $name
            fi
        done
    done
fi


# image count > 1 => remove the images (except the db)
if [[ $images_count -gt 1 ]]; then
    for j in "$image_names"; do
        for image in $j; do
            if [[ $image == "mysql" ]]; then
                docker rmi "$image:8"
            fi

            if [[ $image == "xtrack-server" ]]; then
                docker rmi "$image:latest"
            fi
        done
    done
fi

# start containers again
docker-compose up --build -d