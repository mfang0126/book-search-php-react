# PHP Book Search App

The application is made with React and Lumen.
Styled-components as the main css styling and league/csv for managing the file as the basic database.

## Instruction with shell in the root (is the one with this README.md)

```
./run.sh
```

## Instruction the command in the root (is the one with this README.md)

Please run command step by step below

```
cd ./book-search-frontend
yarn
cd ../book-search-backend
composer install
nohup php -S localhost:8000 -t public > phpd.log 2>&1 &
cd ../book-search-frontend
yarn start
```

## Objectives

- Search for books
  - Autocomplete feature
- Explore the search results
- Check further details of the books
