# RGWebsite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Launch web site from scratch

The simpliest way to launch it is under Linux.
You should have these packages installed:
 - mongodb (v3.0.6)
 - nodejs (v7.6.0)
 - a recent browser (chrome, chromium or firefox)

# Launch the mongo db daemon
Create a folder that will receive the database files. We will name it target_db_dir.
Then launch the daemon in command line: `mongod --dbpath target_db_dir`

# Build the angular project (typescript files)
Checkout the directory of the project, and go at the root of it.
Run `ng build` if you just want to build and deploy.
Run `ng build --watch` if you want to debug (will compile as soon as you change a file).

# Launch the node web server
From the root directory:
Run `node server/bin/root` to launch the web site in production.
Run `nodemon server/bin/root` if you want to work (will compile the changed files at runtime like ng)

## Further help (Angular 2)

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
