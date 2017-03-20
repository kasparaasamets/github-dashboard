# GitHub Dashboard

GitHub Dashboard provides a concise overview of all your repositories and their latest commits, pull requests and issues.

Uses Angular 1.6 and Bootstrap 3.
 
## Running

Fire up dist/index.html in your browser and you're good to go. Supports running from both local drive and server environment.
  
## Development
  
Verify that gulp is installed globally by running the command:

    npm install -g gulp

In this project's root, run the commands:

    npm install
    gulp
    
This will build the project to "dist" folder.

To set up local webserver for development environment, run:
    
    gulp dev
    
This will open http://localhost:8000/dist/index.html in your browser.
 
## Notes

GitHub API does not support CORS for OAuth, so basic auth is used here instead.
https://github.com/isaacs/github/issues/330

Sessions are not persisted because GitHub credentials could be compromised in this frontend-only solution. 

The "dist" folder is included in version control for quick testing.