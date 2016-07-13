# Genre Explorer

This project uses spotify api in order to try to suggest songs within a genre the user is unfamiliar with but interested in, by analyzing a song they like, recording its attributes, and then finding tracks with similar attributes but within the genre they select.


## Installation

These examples run on Node.js. On [its website](http://www.nodejs.org/download/) you can find instructions on how to install it. You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm.

Once installed, clone the repository and install its dependencies running:

    $ npm install

## Running the examples
In order to run the different examples, open the folder with the name of the flow you want to try out, and run its `app.js` file. For instance, to run the Authorization Code example do:

    $ cd authorization_code
    $ node app.js

Then, open `http://localhost:8888` in a browser.

###Usage
1. Log in to spotify.
2. Search for a song that you like 
3. Select the song you like
4. Enter the genre you want to explore
5. The app will return a list of tracks within the genre you want to explore which are musically comparable to the song you selected. 
