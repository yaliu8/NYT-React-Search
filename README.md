# New York Times Article Search

This is a React.js app that allows users to query, display and save articles from the NY Times API. 

## App Flow
User has the ability to SEARCH for an article. The user will be displayed the first 5 articles that meet the query criteria from the NY Times API. Information provided includes article title, date and URL. Users can click on the URL to redirect to the NY Times article in a new tab. 

Users are able to SAVE articles to a saved articles section. 

Users are able to REMOVE articles from the saved articles section. 

The app uses Node/Express for the server and routing, MongoDB/Mongoose for the database and models. React JS for rendering components, axios for internal/external API calls and bootstrap for styling. 

## Getting Started

To run on your local machine:

1. Ensure MongoDB and Node are set up on your computer
2. Cd into this repo and run **npm install** to install dependencies
2. In another terminal window run **mongod**
3. In the root of the directory run **node server.js**
4. In a third CLI window, go to root and enter **yarn start**. This will start the webpack dev server.Your browser should automatically open a new tab containing the app.
5. You can also navigate to **localhost:3000** in your browser

### Dependencies

You will need to yarn install the following node modules:

1. express
2. mongoose
3. helpers
4. body-parser
5. axios
6. react
7. react-dom
8. react-router-dom
9. react-scripts
10. morgan
11. babel