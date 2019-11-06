#!/bin/bash

cd ./book-search-backend
composer install
nohup php -S localhost:8000 -t public > phpd.log 2>&1 &

cd ../book-search-frontend
yarn
yarn start