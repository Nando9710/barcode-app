# BarcodeApp

## Run app locally with cli

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`.

## Run app with docker image

### Load barcode-app docker image

Run `docker load -i barcodeApp.tar` to load a project image 'barcode-app'.

### Check barcode-app docker image loaded

Run `docker images` to check the image 'barcode-app' has been loaded.

### Run app

Run `docker run -d -it -p 80:80/tcp barcode-app`. Navigate to `http://localhost:80/`.

## Running unit tests

Run `ng test` to execute the unit tests..
