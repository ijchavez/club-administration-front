# Club Administration Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Development server

1- Run `ng serve` for a default environment in this case is production. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  
2- Run `ng serve --configuration=production` for a production environment. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  
3- Run `ng serve --configuration=dev` for a local environment. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
#### Dockerfile:
1- Run `docker build -t club-administration-front . ` to run the dockerfile  
2- Run `docker tag club-administration-front graviel/club-administration-front:0.0.3` to add a tag version.  
3- Run `docker push graviel/club-administration-front:0.0.3` to push the new image to the docker hub


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
## Configuration
1- node: v16.14.2.  
2- npm: 9.5.1
