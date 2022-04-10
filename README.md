# DASHBOARD TEMPLATE

### Build
The instructions below are for a local development build, and includes the instructions on how to build this project/repo for deployment to testing & external hosting envirnments. Any future testing parameters will be documented in these instructions.

1. Node requirements
   1. Install the latest version of Node.JS that is compatible with you OS
    2. Open a command line and create a folder location 
    3.  Clone this repo
2. Run these NPM commands to build the app
     1. **npm install** 
     2. **npm update** 
     3. **npm audit fix -force** 
     4. **npm prune** 
     5. **npm start** 
        1. This is the default starting point & command for running any "create-react-app" template.
        2. This command includes an NodeJs environment parameter for using a locally hosted version of the QAI Service API
            1. **'set REACT_APP_API_BASE_URL=http://localhost:8080'**
            2. **'set REACT_APP_API_BASE_URL=http://127.0.0.1:8080'**        
     6. **npm run build** 
        1. **build** - This command includes an NodeJs environment parameter for being used in an overall build deployment, with the URI for the QAI Service API being set to the defualt 'localhost' value
            1. **'set REACT_APP_API_BASE_URL=http://localhost'**
            2. **'set REACT_APP_API_BASE_URL=http://127.0.0.1'**
        2. **deployment** 
           1. After the **npm run build** command is complete, copy or deploy the **/build** folder & all contents to a hosting environment
     7. **npm run dev-start** 
        1. This is configured to open a web browser at **http://localhost:3131/**
        2. This command includes an NodeJs environment parameter for using a locally hosted version of the QAI Service API
            1. **'set REACT_APP_API_BASE_URL=http://localhost:8080'**
            2. **'set REACT_APP_API_BASE_URL=http://127.0.0.1:8080'**
        3. This is configured to set NodeJs node environment variable
           1. **'set HTTPS=false'**
        4. This is configured to set NodeJs node environment variable for selecting a specific web browser to be used for starting this project
            1. **'set BROWSER=C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'**
 3. AI Service Direct Monitoring
    1. use a curl command to view the ServerSentEvents being sent from an AI Service
        1. **'curl http://[base-uri:8080]/events'**

### Deployment
The project in this repo in set to run locally on a developer's machine and is also configurable to be deployed for use on testing & build type environments.Offline, as part of the QUIVR products deployments moving forward. See instructions in the **'[Build](#build)'** section of this document.

### Application Architecure Notes
 1. Built using **React 17.x - "create-react-app"** basic template
 2. **./config.js**
    1.  Some configuration settings for debugging and "feature flags"
 3. **./index.js**
    1. is an **IIFE** structure, based on "DOMContentLoaded"
    2. **"Immediately invoked function expression"**
       1. https://developer.mozilla.org/en-US/docs/Glossary/IIFE
 4. **./App.js** is the main React root component. This includes use of the following:
    1. **react-router** direction & redirection logic for routes found in ./pages/routes.js
    2. **React Context** context-scoped functioned & browser storage are assigned here
    3. **SiteNavigation** custom control is the only layout control instantiated


### Other Notes
TBD


### Additional Resources
1. Node.JS - https://nodejs.org/
2. NPM - https://docs.npmjs.com/
3. React - https://reactjs.org/
4. Browser technologies 
   * JavaScript - https://developer.mozilla.org/en-US/docs/Web/JavaScript
   * SVG - https://developer.mozilla.org/en-US/docs/Web/Guide/Graphics
   * HTML - https://developer.mozilla.org/en-US/docs/Web/HTML
   * CSS - https://developer.mozilla.org/en-US/docs/Web/CSS
5. SVG Filters
    * https://webplatform.github.io/docs/svg/tutorials/smarter_svg_filters/
    * https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL
6. jsPDF
    * https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
7. NEXE
   * https://github.com/nexe/nexe

