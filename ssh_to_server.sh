#!/bin/bash

set -f

server=$PROD_SERVER

mysql_password=$MYSQL_ROOT_PASSWORD 
mysql_db=$MYSQL_DATABASE 


echo 'Starting to Deploy...'

echo $server

echo $mysql_password

echo $mysql_db

# ssh and set the environment variables, and finally run the deployment script
ssh ubuntu@$server "cd xtrack-app \
    && export MYSQL_ROOT_PASSWORD=$mysql_password \
    && export MYSQL_DATABASE=$mysql_db \
    && git pull origin stage \
    && sudo chmod 777 deploy.sh \
    && ./deploy.sh"

echo 'Deployment completed successfully'
# ${{ secrets.SSH_KEY }}