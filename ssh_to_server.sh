#!/bin/bash

set -f

server=${{ secrets.PROD_SERVER }}

mysql_password=${{ secrets.MYSQL_ROOT_PASSWORD }} 
mysql_db=${{ secrets.MYSQL_DB }} 


echo 'Starting to Deploy...'

# ssh and set the environment variables, and finally run the deployment script
ssh ubuntu@$server "cd xtrack-app \
    && export MYSQL_ROOT_PASSWORD=$mysql_password \
    && export MYSQL_DB=$mysql_db \
    && git pull origin stage \
    && sudo chmod 777 deploy.sh \
    && ./deploy.sh"

echo 'Deployment completed successfully'
# ${{ secrets.SSH_KEY }}