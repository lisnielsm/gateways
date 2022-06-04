# Gateways Project

This is a project that allows the storage, creation, update and deletion of gateway devices. It uses firebase as a database to store devices and images associated with them as well as for user authentication. It is made with Redux-Toolkit to store global states and material ui for visual components.

## Build

This project was created using **create-react-app** command so it can be built using the 
```
npm install
``` 
command and it will automatically download all the node modules needed to run the program.


## Run

To run the program just press the command
```
npm start
``` 


## Test

This project uses 2 different technologies to test the components. Testing-library and Jest are used for some unit tests and the rest of the unit, integration and e2e tests are done with Cypress. To run the tests of the testing library, the following command must be put in the console:
```
npm run test
```
It must be verified that all the tests passed correctly.

To test the Cypress tests, it can be done in two different ways: the first is to run the tests in the background and obtain a report on the console of the tests carried out, this is done with the command:
```
npx cypress run
```

The second way is by setting up a visual interface and running the tests manually, selecting a predefined browser and seeing everything as if it were a user interacting with the application. To use this way, use the command:
```
npx cypress open
```


## File and folder structure

"**/**": It contains the package.json files with the project dependencies, the gitignore to select the files or folders that are not included in version control, and this README file.

"**/cypress**": It contains all the configuration and tests for Cypress.

"**/node_modules**": It contains all the node modules needed to run the application.

"**/public**": It contains the images for the PWA creation for the application and the index.html where the React application is mounted.

"**/src/\_\_test\_\_**": Contains all the tests of the application.

"**/src/components**": It is where all the components of the application are located.

"**/src/firebase**": Firebase configuration.

"**/src/hooks**": Contains custom hook for authentication.

"**/src/services**": Contains the user and gateway slices that are exported as a service containing the slice reducer, actions, and state selectors.

"**src/styles**": Contains components individual styles.

"**src**": Contains the global styles of the application, the main routing and the store to store the global states.

## How to use the application

The first thing that appears when the application is opened is the login page that allows quick authentication with a previously registered username and password, if you have not registered in the application you can go to the CREATE ACCOUNT button (upper right corner) to put your data personal and register in the system. Once authenticated within the system, a table will be displayed with all the gateways created by the authenticated user. If you click on the application logo (with the text Gateways) you can access this page immediately. In the NEW GATEWAY button you can create a new device, a form will open for you to fill in the device data, you can add an image that identifies it, as well as new peripherals if you wish. If you want to go back without creating the device there is a BACK button but if you want to save it you can hit the CREATE button. In the Options column you can see 3 buttons, the first allows editing the device, the second the deletion and the third to see its details. If you want to close the session, you can always do it with the CLOSE SESSION button (upper right corner).
