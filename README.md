SWRM 2021 Events app.

## Parse CSV files 

    cd ./scripts
    node parse.js <input file>

## How to build app

Install dependencies:

    npm install

Build bundle:

    npx webpack

Run local server with hot reloading:

    npx webpack serve


## Deployment

Run `npx webpack` and then upload all files in `./public/` to an AWS static site bucket.